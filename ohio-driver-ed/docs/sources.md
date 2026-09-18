# Sources

Every legal statement in `index.html` and every question in
`moodle/unit-04-questions.xml` traces to one of these. `node moodle/check.mjs`
fails if a citation appears in the course and not on this list.

## Statute

| Citation | Subject | Used in |
|---|---|---|
| R.C. 4511.01 | Definitions. Right-of-way is the right to proceed uninterruptedly **in a lawful manner** in preference to another road user approaching from a different direction. | P4.1, Q4.3, U04-Q06 |
| R.C. 4511.21 | Speed limits and assured clear distance ahead. No person shall drive faster than will permit stopping within the assured clear distance ahead; speed must also be reasonable and proper for conditions. | P4.3, R4.3, Q4.2, U04-Q04, U04-Q05 |
| R.C. 4511.41 | Right-of-way at intersections. Two vehicles arriving from different roads at approximately the same time: the driver on the left yields to the vehicle on the right. | P4.1, Q4.3, U04-Q06 |
| R.C. 4511.43 | Stop and yield signs. After stopping, still yield to traffic in the intersection and to traffic approaching so closely as to constitute an immediate hazard. | P4.1, U04-Q07 |
| R.C. 4511.75 | Stopping for a stopped school bus. Stop at least ten feet from the front or rear; stay stopped until the bus moves or the driver signals. A driver **meeting** the bus need not stop on a highway of four or more traffic lanes; a driver overtaking it must stop regardless. Buses on divided highways and on roads of four or more lanes load and unload on the children's residence side. | P4.2, R4.2, Q4.1, Q4.1b, U04-Q01, U04-Q02, U04-Q03 |

Statute text: `codes.ohio.gov/ohio-revised-code/section-<number>`.

## Case law referenced in general terms

The unit says Ohio courts have held a driver keeps preferred-party status unless
that driver violated a legal requirement. That is the holding in *Deming v.
Osinski*, and it is why the "in a lawful manner" clause in R.C. 4511.01 has bite.
Student-facing pages state the rule without naming the case. The citation lives
here so the claim is checkable.

## Program requirements referenced

- Driver education is required for Ohio license applicants **under 21** for
  applications on or after **30 September 2025**, widened from under 18. The
  change rode in the state budget signed 1 July 2025.
- The course is **24 hours** of classroom or online instruction, **8 hours**
  behind the wheel, and **50 hours** of supervised driving.
- Online classroom instruction is delivered by providers approved by the Ohio
  Department of Public Safety, against the state driver training curriculum.

## Verification still owed before publication

These are steps in `qa-checklist.md`, not assumptions this sample has already
cleared:

1. Read every citation above against the current statute text on codes.ohio.gov
   and record the version date checked.
2. Reconcile every page against the current **Ohio Digest of Motor Vehicle Laws**
   and against the state driver training curriculum outline, unit by unit.
3. Confirm the terminology matches the curriculum's own wording, so a student
   does not meet one name for a concept here and a different one on the test.
4. Re-run steps 1 to 3 on a fixed schedule after launch, and whenever the
   legislature amends Chapter 4511. A course that was accurate at launch is not
   a course that stays accurate.
