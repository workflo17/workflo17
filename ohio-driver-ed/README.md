# Ohio driver education: application and build sample

An application for the Ohio online driver education project, plus one unit of the
course built as a work sample.

| File | What it is |
|---|---|
| [`index.html`](index.html) | **Start here.** Unit 4 of the course, playable. One file, no build step, no external requests |
| [`application.md`](application.md) | The full application: phase selection, what the sample proves, where I am weak, questions |
| [`discord-post.md`](discord-post.md) | The short version, sized for the applications channel |
| [`moodle/unit-04-questions.xml`](moodle/unit-04-questions.xml) | The question bank, importable through Question bank → Import → Moodle XML |
| [`moodle/check.mjs`](moodle/check.mjs) | `node moodle/check.mjs`. No dependencies. Exit 1 on any failure |
| [`docs/qa-checklist.md`](docs/qa-checklist.md) | Per-unit sign-off checklist, marking which items a machine checks |
| [`docs/sources.md`](docs/sources.md) | Every statute cited, and what still needs verifying before publication |

## The sample

**Unit 4, Sharing the Road.** Right-of-way, stopped school buses, assured clear
distance ahead. Three content pages, three graded checkpoints, two remediation
branches.

Answer the school bus question wrong on purpose. The remediation branch is the
part of a Moodle Lesson that is easy to configure and easy to configure
incorrectly, so it is the part worth showing.

**Build view** exposes the jump table, the page flow, the completion settings and
a log of every jump you triggered. Documenting settings is a Phase 1 deliverable,
so it is in the sample rather than promised.

## The checker

```
node moodle/check.mjs
```

Fails when a question loses its idnumber or citation tag, when an answer ships
with no feedback, when a jump points at a page that no longer exists, when a page
is unreachable, when a remediation page has no return jump, when a page cites a
statute that is not in `docs/sources.md`, or when a Lesson checkpoint has no
question left in the bank.

It caught a real bug during the build: the remediation pages' return jump lived
in a function rather than in the page data, so nothing declared where a student
went after review. Moving the jump into the data fixed it, which is where Moodle
keeps it anyway.

## On the law

Every legal statement carries the Ohio Revised Code section it comes from, and
the same citations are tagged onto the matching questions in the XML.
`docs/sources.md` lists all of them and, separately, what still has to be checked
against the current Ohio Digest of Motor Vehicle Laws and the state driver
training curriculum before anything like this goes in front of a student.

Sample content for an application. Not a licensed course, and not legal advice.
