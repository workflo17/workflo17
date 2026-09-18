#!/usr/bin/env node
/*
  node moodle/check.mjs

  Checks the things that go wrong quietly when you are building eighty curriculum
  pages against a deadline, and that nobody catches by clicking around:

    - a question loses its idnumber in a re-import and becomes untraceable
    - a distractor ships with no feedback, so a wrong answer teaches nothing
    - an answer's jump is left on the Moodle default and the remediation branch
      never fires
    - a page cites a statute that is not on the source list
    - a Lesson checkpoint has no matching question left in the bank

  No dependencies. Exit code 1 on any failure, so it can gate a commit.
*/

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const at = p => resolve(HERE, "..", p);

const fails = [];
const passes = [];
const bad = (where, msg) => fails.push(`${where}: ${msg}`);
const ok = msg => passes.push(msg);

/* ------------------------------------------------------- read the sources */

const xml = readFileSync(at("moodle/unit-04-questions.xml"), "utf8");
const html = readFileSync(at("index.html"), "utf8");
const sources = readFileSync(at("docs/sources.md"), "utf8");

/* ------------------------------------------------------- the question bank */

const blocks = [...xml.matchAll(/<question type="(?!category)([^"]+)">([\s\S]*?)<\/question>/g)]
  .map(m => ({ type: m[1], xml: m[2] }));

if (!blocks.length) bad("unit-04-questions.xml", "no questions found");

const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`));
  return m ? m[1] : null;
};
const textOf = frag => {
  if (frag === null) return "";
  const cdata = frag.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  const inner = cdata ? cdata[1] : frag.replace(/<[^>]+>/g, " ");
  return inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
};

const seenIds = new Set();
const bankCheckpoints = new Set();
const bankCites = new Set();

for (const q of blocks) {
  const name = textOf(tag(q.xml, "name")) || "(unnamed)";
  const where = `question ${name}`;

  const id = textOf(tag(q.xml, "idnumber"));
  if (!/^U\d{2}-Q\d{2}$/.test(id)) bad(where, `idnumber "${id}" does not match U<nn>-Q<nn>`);
  else if (seenIds.has(id)) bad(where, `duplicate idnumber ${id}`);
  else seenIds.add(id);

  if (!textOf(tag(q.xml, "generalfeedback"))) bad(where, "empty generalfeedback");

  const tags = [...q.xml.matchAll(/<tag>\s*<text>([^<]+)<\/text>\s*<\/tag>/g)].map(m => m[1].trim());
  const rc = tags.filter(t => t.startsWith("rc-"));
  if (!rc.length) bad(where, "no rc-* tag naming the statute it tests");
  rc.forEach(t => bankCites.add("R.C. " + t.slice(3)));

  const cp = tags.filter(t => t.startsWith("checkpoint-"));
  if (!cp.length) bad(where, "no checkpoint-* tag tying it to a Lesson checkpoint");
  cp.forEach(t => bankCheckpoints.add(t.slice("checkpoint-".length)));

  const answers = [...q.xml.matchAll(/<answer fraction="([^"]+)"[^>]*>([\s\S]*?)<\/answer>/g)];
  if (answers.length < 2) bad(where, `only ${answers.length} answer(s)`);

  let full = 0;
  answers.forEach((a, i) => {
    const fraction = Number(a[1]);
    if (!Number.isFinite(fraction)) bad(where, `answer ${i + 1} has non-numeric fraction "${a[1]}"`);
    if (fraction === 100) full++;
    if (!textOf(tag(a[2], "feedback"))) bad(where, `answer ${i + 1} ships with no feedback`);
  });
  if (full !== 1) bad(where, `${full} answers at fraction 100, expected exactly 1`);
}
if (!fails.length) ok(`${blocks.length} questions: idnumbers, tags, feedback and fractions all present`);

/* ------------------------------------------------------- the lesson graph */

const literal = html.match(/const PAGES = (\[[\s\S]*?\n\]);\n/);
if (!literal) {
  bad("index.html", "could not find the PAGES literal");
} else {
  const PAGES = new Function("return " + literal[1])();
  const ids = new Set(PAGES.map(p => p.id));
  const lessonCheckpoints = new Set();
  const lessonCites = new Set();
  const reachable = new Set(["P4.1"]);

  const mainOrder = PAGES.filter(p => p.track === "main").map(p => p.id);
  const nextOnMain = id => {
    const i = mainOrder.indexOf(id);
    return i > -1 && i < mainOrder.length - 1 ? mainOrder[i + 1] : "END";
  };

  const reach = id => {
    if (id === "END" || reachable.has(id)) return;
    reachable.add(id);
  };

  for (const p of PAGES) {
    const where = `page ${p.id}`;
    if (!p.cites || !p.cites.length) bad(where, "no citations listed");
    (p.cites || []).forEach(c => lessonCites.add(c));
    if (p.checkpoint) lessonCheckpoints.add(p.checkpoint);

    if (p.kind === "question") {
      const right = p.options.filter(o => o.correct);
      if (right.length !== 1) bad(where, `${right.length} correct options, expected exactly 1`);
      p.options.forEach((o, i) => {
        const label = `${where} option ${"ABCD"[i]}`;
        if (!o.jump) bad(label, "no jump target, so Moodle would fall through to Next page");
        else if (o.jump !== "END" && !ids.has(o.jump)) bad(label, `jumps to "${o.jump}", which is not a page`);
        else reach(o.jump);
        if (!o.why || o.why.length < 20) bad(label, "feedback missing or too thin to teach anything");
      });
      if (!p.checkpoint) bad(where, "question page with no checkpoint, so it cannot gate completion");
    } else {
      if (!p.body || p.body.length < 200) bad(where, "content page body is empty or a stub");
      if (p.kind === "remediation" && !p.next) bad(where, "remediation page with no return jump: the student lands here and stops");
      const target = p.next || nextOnMain(p.id);
      if (target !== "END" && !ids.has(target)) bad(where, `continue points at "${target}", which is not a page`);
      reach(target);
    }
  }

  for (const p of PAGES) {
    if (!reachable.has(p.id)) bad(`page ${p.id}`, "unreachable: no jump or continue anywhere points here");
  }

  const missing = [...lessonCheckpoints].filter(c => !bankCheckpoints.has(c));
  if (missing.length) bad("bank/lesson sync", `checkpoints with no question in the bank: ${missing.join(", ")}`);
  const stray = [...bankCheckpoints].filter(c => !lessonCheckpoints.has(c));
  if (stray.length) bad("bank/lesson sync", `questions tagged for checkpoints the lesson does not have: ${stray.join(", ")}`);

  if (lessonCheckpoints.size) ok(`lesson graph: ${PAGES.length} pages, every jump resolves, every page reachable`);
  if (!missing.length && !stray.length) ok(`bank and lesson agree on ${lessonCheckpoints.size} checkpoints`);

  /* --------------------------------------------- citations against sources */

  const used = new Set([...lessonCites, ...bankCites,
    ...[...html.matchAll(/R\.C\.\s*(\d+\.\d+)/g)].map(m => "R.C. " + m[1])]);
  const undocumented = [...used].filter(c => !sources.includes(c));
  if (undocumented.length) bad("docs/sources.md", `cited but not listed: ${undocumented.join(", ")}`);
  else ok(`${used.size} statute citations all listed in docs/sources.md`);
}

/* ------------------------------------------------------- report */

for (const p of passes) console.log("  ok    " + p);
for (const f of fails) console.error("  FAIL  " + f);
console.log("");
if (fails.length) {
  console.error(`${fails.length} problem${fails.length === 1 ? "" : "s"} found.`);
  process.exit(1);
}
console.log("Unit 4 clean.");
