# Prompts for a local image generator

The five mockups beside this file were rendered in a headless browser from HTML and SVG,
not generated. If you want photoreal versions, these are the prompts to feed your own
model. Composite the real vector mark on afterwards — no image model will draw a logo
correctly, so generate the *scene* and place the logo yourself.

Brand constants for every prompt: deep teal `#1A3D39`, sage `#A8BFB4`, mint white `#F1F8F4`.

---

**Van** — `photograph of a clean white Ford Transit panel van parked on a suburban Illinois
street, three-quarter front view, side door facing camera, overcast soft daylight, shallow
depth of field, blank white side panel with no markings, commercial vehicle photography,
50mm, eye level`

**Business cards** — `two business cards on a dark walnut desk, one dark teal, one warm
white, slightly overlapping at an angle, soft window light from the left, shallow depth of
field, subtle paper texture and debossed edge, product photography, 85mm macro, blank
faces`

**Glass door** — `photograph of a modern small office glass entrance door with a brushed
aluminium frame and vertical pull handle, frosted lower half, blurred warm office interior
behind, daylight, straight on, blank glass with no lettering`

**Polo** — `macro photograph of teal pique polo shirt fabric, left chest area, natural
folds, soft directional light, visible knit texture and a stitched seam, no logo, shallow
depth of field, apparel product photography`

**Screen** — `open laptop on a clean desk in a bright office, screen facing camera and
blank white, soft daylight, shallow depth of field, minimal desk styling, 35mm`

---

## Why this was not generated here

This session runs in a remote container. It has no local image generator, and your own
machine's localhost is not reachable from it. The one image path that is wired up — the
`design` skill's Gemini calls (`gemini-3-pro-image-preview`, `gemini-2.5-flash-image`) —
cannot run either: the skill synced as `SKILL.md` only, with none of the `scripts/` it
shells out to, and there is no `GEMINI_API_KEY` set. The Google endpoint itself is
reachable, so a key plus the missing scripts would be enough to make it work.
