# Discord post

Paste into the applications channel. Links point at this branch; swap them if the
sample moves to its own repo with Pages enabled, which gives a one-click demo.

---

Applying for **Phase 1 and Phase 2**, and consenting to the background checks for Phase 2.

Rather than describe what I would do with the eighty pages, I built one unit the way I would build the rest and brought it with me.

**Unit 4, Sharing the Road.** Right-of-way, stopped school buses, assured clear distance.
https://github.com/workflo17/workflo17/tree/claude/ohio-driver-education-app-dhkuux/ohio-driver-ed

- 3 content pages and 3 graded checkpoints, written from statute with the R.C. section on every legal claim
- 2 remediation branches that re-teach the specific misconception behind a wrong answer, then re-check with a variant instead of showing the same question again
- A Moodle XML question bank that imports as-is: category set in-file, idnumbers, per-answer feedback, statute tags
- Completion set to require view, grade, passing grade and end of lesson reached, so a student cannot close the tab on the last question and be marked done
- A **Build view** toggle showing the jump table, the completion settings and a live log of every jump, because documenting settings is a Phase 1 deliverable

Answer the school bus question wrong on purpose. The remediation branch is the part of a Moodle Lesson that is easy to configure and easy to configure incorrectly, so it is the part worth showing.

It also ships a checker (`node moodle/check.mjs`, no dependencies) that fails when a jump points at a renamed page, a distractor loses its feedback, a question loses its citation tag, or a checkpoint has no question left in the bank. It caught a real bug in the sample while I was building it.

Straight about where I come from: my Moodle before this was editing an existing course at work, and what I know about Lesson jumps and XML I learned building the unit above. I am not a licensed instructor either, so legal sign-off should sit with someone qualified. What I do bring to Phase 2 is years of sales, which is the same job as student support by email, chat and phone, just with a different thing on the other end of the call.

Full write-up, including what I would want clear about the profit share before committing: https://github.com/workflo17/workflo17/blob/claude/ohio-driver-education-app-dhkuux/ohio-driver-ed/application.md

Portfolio: donflo.vercel.app
