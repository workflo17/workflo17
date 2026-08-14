# workflo17

I build small, self-contained software: games, and local tools that run on the machine
instead of in someone's cloud.

Several of these run in your browser right now. The rest live in private repos, because
they're personal projects rather than products. This page is the index to all of it.

Lately that includes tools and workflows for businesses and local communities, not just
games: Bitemap is the first public piece of that thread.

---

## Play something

### [Grubs TD](https://github.com/workflo17/ant-td) · [play it in your browser](https://workflo17.github.io/ant-td/)

![Grubs TD: a boss fight on the picnic map, with a full roster of star-ranked ant towers defending the trail](assets/grubs-td.png)

A procedural ant tower defense in Canvas 2D and WebAudio. No build step, no dependencies,
no install: one page that works on desktop or phone, with a guided tutorial on the first
round.

### [Granulab](https://github.com/workflo17/granulab) · [play it in your browser](https://granulab-workflo17.vercel.app)

A falling-sand powder game in TypeScript and WebGL, with a sim core written twice (once in
TypeScript, once in AssemblyScript compiled to WASM) and a parity test proving the two
produce bit-identical worlds. A temperature field drives every phase change, from ice
melting to sand turning to glass at magma contact, and an in-game maker lets you invent
your own elements, chemistry included. A whole scene compresses to a share code of about
280 characters you can paste in chat.

### [Bitemap](https://github.com/workflo17/bitemap) · [open the map](https://bitemap-workflo17.vercel.app)

Every licensed restaurant in New York City, all 30,075 of them, on one 3D map colored by
cuisine, with curated food crawls drawn as subway strip maps. Vanilla JS and MapLibre GL
over the city's open inspection data. No build step, no paid APIs.

---

## Use something

### [Tend](https://github.com/workflo17/tend) · [see it work](https://tend-demo-workflo17.vercel.app)

An interactive work sample built for a job application in one day: a simulated SMS
re-engagement agent for a mental health company, with the sales reasoning behind every
message annotated beside the thread, red-team buttons that prove the crisis and opt-out
guardrails hold, and four follow-on products built as playable sketches. One HTML file,
no framework, no external requests.

### [JobFit Lens](https://github.com/workflo17/jobfit-lens)

A Chrome extension that scores the job posting you're reading against your own skill
list: match percentage, missing skills, salary and remote signals. Runs entirely on your
machine, reads the page only when you click the icon, and the scoring engine ships with
its node test suite.

### [agent-lanes](https://github.com/workflo17/agent-lanes)

The coordination protocol I use to run multiple AI coding agents on one codebase at the
same time: single-writer lanes, a shared board, landing rules. Three markdown files,
nothing to install. Distilled from the system that keeps parallel sessions from colliding
on the ant simulations below.

---

## Ants, at length

Two simulations, one question: what does a colony do when nobody is playing it?

**Vivarium** · *private* · Three.js / WebGL

A zero-player ecosystem simulation. It's a 3D volume of soil you orbit, slice and X-ray
while colonies dig branching underground cities, forage, war, breed and die on their own
for weeks. There's no win condition. The camera sweeps in one motion from a god's-eye view
of the whole terrarium down to street level behind a single high-detail ant with
articulated legs and working mandibles, which stays cheap because visual detail is
decoupled from the simulation. The sim is deterministic and snapshot-safe: same seed, same
event stream, every run.

**A Living Formicarium** · *private* · vanilla JS

The 2D sibling. It ships as one self-contained `.html` file, so it can go to Steam or
Google Play without a runtime. A test suite proves the editable module split never drifts
from the shipped monolith.

**Ant Raid** · *private* · Node.js + WebSockets

Grubs TD's offensive sibling: a multiplayer game where friends join with a room code and
play the swarm instead of the defense.

---

## Also built

**Castle Clash Live** · *private* · Node.js

A game that *is* a TikTok LIVE stream. Viewers play by commenting, liking and sending
gifts; a backend reads the live chat feed and pipes those events into a 1080×1920 canvas
that LIVE Studio captures. It's playable end to end against a built-in event simulator,
with no TikTok connection at all.

**ECHO** · *private* · Next.js + TypeScript + Postgres

A music discovery backend whose recommendations explain their own ranking instead of
returning an unexplained list. Runs in a seeded demo mode with no database attached, and
switches to Postgres when you give it one.

**FALA!** · *private* · vanilla JS

A Brazilian Portuguese app that installs to a phone home screen. Spaced repetition, native
neural audio, no backend.

**LED Studio** · *private* · Node.js

A control surface for desktop RGB lighting. It speaks the OpenRGB SDK protocol over TCP
directly, with zero npm dependencies, and serves demo devices while the daemon is down so
the interface still works.

---

## How I build

**No build step where I can avoid one.** Grubs TD, Bitemap, FALA! and A Living Formicarium
are all just files you can open.

**Local-first.** Most of these run on a machine rather than a server, and keep their data
there. The three browser projects up top are the slice that could travel.

**Determinism is a test, not a promise.** A change to Vivarium's sim has to produce a
bit-identical event stream from the same seed, and its snapshots have to round-trip
byte-identical, before it lands. Granulab holds its two engines to the same standard.

**Built by directing agents.** I have no formal programming background; everything here
is built by directing fleets of AI coding agents, coordinated with
[agent-lanes](https://github.com/workflo17/agent-lanes) when several work the same repo
at once. The craft I bring is knowing what to build, what good looks like, and what to
refuse.

**Working with:** JavaScript · TypeScript · Node · Three.js / WebGL · Canvas 2D ·
MapLibre GL · Next.js · Postgres · Python · Blender

---

Found a bug, or got stuck somewhere? Open an issue on whichever public repo is closest.
"This part confused me" counts as a bug report here, and it's the most useful kind.
