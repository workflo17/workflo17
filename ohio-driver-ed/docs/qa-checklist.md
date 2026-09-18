# Unit sign-off checklist

One pass per unit, run before the unit is called done. Unit 4 in this folder is
the worked example. Items marked **auto** are covered by `node moodle/check.mjs`
and should never be checked by hand.

The point of writing it down is that eighty pages is too many to hold in your
head, and the failures are quiet ones. A broken jump does not throw an error. It
just lets a student who missed something walk on.

## 1. Content and sequence

- [ ] Every page in the unit exists and has real content, not a heading and a stub. **auto**
- [ ] Page order matches the unit outline, and the outline matches the state curriculum topic it covers.
- [ ] Each page's opening sentence states what the page is for. A student who lands here from a jump has no preceding context.
- [ ] Terminology matches the curriculum's own wording. Where a page introduces a term, it is the term used on the test.
- [ ] Concepts a later unit depends on are actually taught here, not assumed.
- [ ] Reading level suits a sixteen-year-old reading on a phone, without dropping precision on what the law says.

## 2. Legal accuracy

- [ ] Every statement of law carries the R.C. section it comes from. **auto**
- [ ] Every citation used appears in `sources.md`. **auto**
- [ ] Every citation has been read against the current statute text on codes.ohio.gov, and the date checked is recorded.
- [ ] Page reconciled against the current Ohio Digest of Motor Vehicle Laws.
- [ ] No page states a penalty, fee or hour requirement as fact without a source, since those change most often.
- [ ] Anything that resolves to a judgement call rather than statute is written as guidance and not as law.

## 3. Questions and banks

- [ ] Every question has an idnumber in the `U<nn>-Q<nn>` scheme and it is unique. **auto**
- [ ] Every question carries an `rc-*` tag naming what it tests and a `checkpoint-*` tag tying it to the Lesson. **auto**
- [ ] Every answer, correct and incorrect, has feedback. A distractor with no feedback wastes the one moment the student is paying attention. **auto**
- [ ] General feedback restates the rule, so it lands whatever was picked. **auto**
- [ ] Exactly one answer at fraction 100 on single-answer questions. **auto**
- [ ] Every Lesson checkpoint has at least one question in the bank, and no question is tagged for a checkpoint that no longer exists. **auto**
- [ ] Distractors are the mistakes students actually make. An obviously wrong option tests nothing.
- [ ] XML imported into a scratch category first, confirmed, then moved. Never straight into the live bank.
- [ ] Import re-run after any edit, to confirm the file is still valid and idnumbers still match.

## 4. Lesson flow and remediation

- [ ] Every answer has an explicit jump. None left on the Moodle default. **auto**
- [ ] Every jump target resolves to a page that exists. **auto**
- [ ] Every page is reachable from the unit's first page. **auto**
- [ ] Every remediation page has a return jump, so a student cannot land there and stop. **auto**
- [ ] Remediation re-teaches the specific misconception behind the wrong answer, rather than repeating the content page.
- [ ] After remediation the student meets a re-check, not the same question with the answer now visible.
- [ ] Walked once per wrong answer, end to end, as a student. Every distractor, not a sample.

## 5. Settings and completion

- [ ] Allow student review off, and try-again off, so remediation fires instead of being bypassed.
- [ ] Action after correct answer set to follow the lesson path, so per-answer jumps are not overridden.
- [ ] Completion requires view, grade, passing grade, and end of lesson reached. Require-grade alone marks a failed attempt complete.
- [ ] Practice lesson off, or no grade is recorded and completion can never be met.
- [ ] Minimum number of questions set, so a short path cannot inflate a percentage.
- [ ] Grade to pass set, and it matches what the unit is supposed to guarantee.
- [ ] Settings recorded in the unit's build notes, with a line on why each one is what it is.

## 6. Media, links and references

- [ ] Every video plays, and is captioned. A course a deaf student cannot take is not a finished course.
- [ ] Every external link resolves, and goes to a source that will still be there next year. Prefer a state page over a blog.
- [ ] Links to state sources point at the page, not a PDF that moves each revision.
- [ ] Required references are reachable without a login and without leaving the course.
- [ ] Media has a text alternative that carries the same information, not a filename.

## 7. Accessibility and formatting

- [ ] Headings nest properly, one h1 per page, no level skipped. Screen reader users navigate by heading.
- [ ] Images have alt text that says what the image teaches. Decorative images have empty alt.
- [ ] Colour is never the only carrier of meaning. A red-only "wrong" marker is invisible to a colour-blind student.
- [ ] Text contrast meets WCAG AA at the sizes actually used.
- [ ] Whole unit operable by keyboard alone, including every question page and every continue button.
- [ ] Layout holds at 360px wide. Most of these students are on a phone.
- [ ] Tables have header cells, and no table is used for layout.
- [ ] Formatting matches the rest of the course. Same heading style, same callout style, same citation style.

## 8. Progression and records

- [ ] Completion report shows the unit completing for a test student who passes.
- [ ] It does **not** complete for a test student who fails a checkpoint, or who closes the tab on the last page.
- [ ] Attempts and grades land where the course expects them for the state's record-keeping.
- [ ] Unit tested end to end on a fresh student account, not on an account with editing rights. Teacher accounts see a course students never meet.

## 9. Documentation

- [ ] Build notes updated: settings, jump table, anything non-obvious about the unit.
- [ ] Anything worked around rather than solved is written down as an open issue, with what was tried.
- [ ] Anything that looks like a curriculum gap rather than a build problem is raised rather than papered over.
