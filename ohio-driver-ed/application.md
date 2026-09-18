# Application: Ohio online driver education

**Applying for:** Phase 1 (course build) and Phase 2 (instructional support).
**Contact:** don.flo17@gmail.com · [donflo.vercel.app](https://donflo.vercel.app) · github.com/workflo17
**Work sample:** this folder. Open `index.html` and answer the school bus question wrong on purpose.

---

## Why I built something instead of writing more here

You have the structure already: ten units, ten Lesson activities, eighty pages,
question banks drafted, outlines written. What is left is production with
verification attached. Getting content in, in the right order, formatted the
same way every time, and then proving that a student cannot finish a unit
without having actually cleared it.

That is a hard thing to claim credibly in a paragraph, so I built one unit the
way I would build the other seventy-nine and shipped it with this application.

**Unit 4, Sharing the Road.** Three content pages, three graded checkpoints, two
remediation branches, a Moodle XML question bank that imports as-is, and a
dependency-free checker that fails when the unit breaks.

Toggle **Build view** in the sample. The jump table, the completion settings and
the decision log for whatever you just clicked are all there, because that
documentation is a Phase 1 deliverable and not an afterthought.

---

## Your Phase 1 list, against the sample

| What you asked for | Where it is |
|---|---|
| Populate and expand pages from source material | Six pages written from statute, at a reading level for a sixteen-year-old on a phone, with the law intact |
| Maintain content sequence within each unit | Each page sets up the next. The unit's last question cannot be answered without pages 1 and 3 |
| Consistent formatting for readability and accessibility | One heading scale, one callout pattern, one citation pattern. Keyboard operable, 360px wide, meaning never carried by colour alone, focus visible |
| Import and configure quiz questions from Moodle XML | `moodle/unit-04-questions.xml`. Seven questions, category set in-file, idnumbers, per-answer feedback, statute tags |
| Configure lesson review and remediation paths | Two branches. Each re-teaches the specific misconception behind the wrong answer, then re-checks with a variant rather than showing the same question again |
| Verify navigation, completion tracking, progression | Completion requires view, grade, passing grade **and** end of lesson reached. `node moodle/check.mjs` proves every page is reachable and every jump resolves |
| Document critical Moodle settings and technical issues | `Build view` in the sample, plus `docs/qa-checklist.md` |
| Add instructional videos, links, references, media | The checklist item, not the sample. I had no media from you to place |

---

## The part I would actually bring

**A checker that runs on every change.** Eighty pages of regulated content has one
failure mode that matters: something quietly stops being true, or stops being
reachable, and nobody notices until a student is affected. `moodle/check.mjs`
fails the build when a question loses its citation tag, when a distractor ships
with no feedback, when an answer's jump points at a page that was renamed, when
a page cites a statute that is not on the source list, or when a Lesson
checkpoint no longer has a question in the bank.

It caught a real bug in this sample while I was building it. The remediation
pages' return jump was living in a function rather than in the page data, so
nothing declared where a student went after review. The checker called the
remediation re-check unreachable and I moved the jump into the data, which is
where Moodle keeps it anyway. That is the whole argument for writing the checker
before you need it.

**Instructional design that survives contact with a real student.** The closest
thing on my portfolio is [FALA!](https://workflo17.github.io/fala/), a language
trainer with 240 cards, spaced repetition and native audio, that installs to a
phone and keeps working with no signal. Self-paced coursework for people who
will do it in ten-minute pieces on a phone is the same problem as yours.

**Verification as a deliverable.** In the [Mindbloom
Dossier](https://workflo17.github.io/mindbloom-dossier/) I shipped a 90-message
labelled test set and a runnable harness to settle an argument about automated
messaging safety with evidence instead of assertion. Same instinct applied here:
the QA checklist marks which items a machine checks and which need a human, so
nobody wastes a human on something a script does better.

---

## Where I am weaker, stated plainly

**Moodle.** My hands-on Moodle before this was editing existing courses at work,
both of them sales training, one of those for medical aesthetic services. I had
editing rights, changed pages and updated material. I had not built a course from
scratch, configured Lesson jumps, or imported a question bank. What I know about
the jump model and Moodle XML, I learned building the unit attached to this
application, and I would rather tell you that now than have you find it out in
week three.

What carries over is the shape of the work rather than the subject. Source
material arrives as documents somebody else wrote, and the job is getting it into
the LMS intact, consistent, and in the right order. That is your first Phase 1
bullet, and it is the part I have done before.

What does not carry over is the audience. Those courses taught adults who were
being paid to be there, and they taught persuasion. This one teaches sixteen year
olds on a phone who would rather be doing anything else, and it teaches law. That
is a different job, and it is why the sample is written the way it is.

I have also not administered a production install for a regulated program, and I
have not been through ODPS approval or the state's record-keeping requirements.
On a real install I would want a first week shadowing whoever knows your approval
constraints, and I would expect my first unit to come back with corrections.

What that also means is that some of the curve is already paid. The unit in this
folder is what the first stretch of it produced, checker included.

**No formal programming background.** Everything on my portfolio is built by
directing AI coding agents, and I say so on my profile rather than letting
someone discover it. For this role I think it is the right shape rather than a
caveat: eighty pages is a production problem, and the risk in production at
speed is accuracy drift. The answer to drift is not working slower, it is a
checker that fails loudly. That is what the sample is.

**Not a driving instructor.** I am not licensed and I am not claiming domain
authority over the curriculum. I can follow a state curriculum precisely, cite
everything, and flag what looks wrong. Sign-off on legal accuracy should sit with
someone qualified to give it, and I would rather that be explicit from the start.

---

## Phase 2

I am applying for both phases and I consent to the federal and state background
checks.

Most of my working life has been in sales. Phase 2 is email, chat, forum and
telephone support for sixteen to twenty-one year olds and, more often, their
parents, and that is work I have actually done for years, at volume, with
someone counting. Reading a frustrated message and working out in two questions
whether the stated problem is the real one. Writing plainly to a person who did
not want to be reading anything. Logging every contact so the next person is not
starting cold. Knowing the difference between a question you answer and a
question you escalate. That is the Phase 2 list, and it is the part of this job I
have the most mileage in.

Building the course is the other half of it. The person who configured the jumps
can tell in one question whether a student is stuck on the content or stuck on
the navigation. And support requests are the best evidence you will ever get
about which of the eighty pages is not doing its job, so I would want them logged
against the page that caused them. Phase 2 should feed corrections back into the
curriculum rather than answer the same question forever.

---

## Two things I want clear before committing

Neither of these is an objection. Both are things I would rather ask now than
discover in month four.

**How "profit" is defined, and when the first operating month starts.** Phase 1
runs September to December with no revenue, and the share runs one year from the
first operating month. I want the definition in writing, and a sense of what
happens to Phase 1 contributors if launch slips past January 2027.

**How many people hold a share.** The share is per person rather than pooled, so
five people at 5% is a materially different company from fifteen. Knowing the
intended headcount for each phase tells me what I am agreeing to.

---

## Questions about the work

1. Which Moodle version and hosting, and would I have course-editor rights or site admin?
2. Is the course pursuing ODPS approval as a 24-hour online provider, and does the ten-unit outline already map to the state driver training curriculum, or is that mapping part of Phase 1?
3. What form is the source material in, and how complete is it? Expanding an outline and reformatting finished prose are different jobs at different speeds.
4. Are the question banks written or drafted? The sample assumes I would be configuring and importing rather than authoring.
5. Who signs off on legal accuracy, and what is the process when I flag something that looks wrong?
6. Behind-the-wheel and the 50 supervised hours sit outside the online course. Does the platform need to track or verify them?
7. What is the review cadence in Phase 1? I would rather have my first unit torn apart in week two than build nine more the wrong way.

---

## Links

- This sample: `index.html`, `moodle/`, `docs/`
- Portfolio: [donflo.vercel.app](https://donflo.vercel.app)
- [FALA!](https://workflo17.github.io/fala/) · self-paced coursework on a phone, no backend
- [Mindbloom Dossier](https://workflo17.github.io/mindbloom-dossier/) · verification shipped as a deliverable
- [Night Desk](https://workflo17.github.io/night-desk/) · state machine with its reasoning exposed beside it
- [GitHub](https://github.com/workflo17)
