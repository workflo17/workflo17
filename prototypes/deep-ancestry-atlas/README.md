# Deep Ancestry Atlas — prototype

Open `index.html` in a browser. No build step, no dependencies, no server.

Plan and research: [`docs/deep-ancestry-atlas.md`](../../docs/deep-ancestry-atlas.md)

## What this is

A working prototype of the rendering engine for a 3D human-migration atlas: hand-rolled
WebGL2 globe, a dated lineage tree drawn as great-circle branches, GPU particle flow along
the grown portion of each branch, and time carried as a single shader uniform so scrubbing
300,000 years costs nothing.

## Real vs. scaffold

**Real:** the renderer, the time model, and the geography — genuine Natural Earth 110m land
polygons, resampled to 48,000 uniformly distributed points and shipped as an 8 KB bitmask.

**Scaffold:** the lineage table. ~75 Y-DNA and ~41 mtDNA nodes hand-entered from published
consensus clade ages and approximate origin regions. Illustrative, not a research dataset.
Phase 1 of the plan replaces it with the Allen Ancient DNA Resource.

## Regenerating the land mask

```sh
curl -O https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson
python3 build-landmask.py        # writes landmask.b64 → paste into LANDMASK in index.html
```

Natural Earth is public domain. The script samples a Fibonacci sphere (uniform density, no
polar bunching), tests each point against the land polygons with holes handled, and emits a
base64 bitmask. Point positions are regenerated from the index at load, so only the mask
ships.
