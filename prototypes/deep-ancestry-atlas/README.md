# Deep Ancestry Atlas — prototype

A 3D globe carrying **262,000+ georeferenced records** from seven published datasets, plus a
lineage tree derived from real ancient genomes, a cross-layer spatial query, and an export that
carries citations.

Plan: [`docs/deep-ancestry-atlas.md`](../../docs/deep-ancestry-atlas.md) ·
Layer research: [`docs/deep-ancestry-atlas-layers.md`](../../docs/deep-ancestry-atlas-layers.md)

## Running it

`index.html` fetches its data from a sibling `d/` directory, so it needs a server, not `file://`:

```sh
cd build && ./fetch-sources.sh          # downloads every upstream source
pip install pyreadr
python3 build-tree.py                   # AADR haplogroup calls -> clade trees
python3 build-haplink.py                # genome -> clade index, for lineage filtering
python3 build-layers.py                 # everything else -> out/
cd .. && mkdir -p d && cp build/out/* d/
python3 -m http.server 8000             # then open localhost:8000
```

## Layers

| Layer | Records | Source | Licence |
|---|---:|---|---|
| Ancient genomes | 19,029 | AADR v66 via Poseidon `aadr-archive` | cite the AADR release DOI |
| Radiocarbon dates | 175,426 | p3k14c (PEOPLE 3000) | see tDAR collection |
| Ancient places | 32,902 | Pleiades gazetteer v4.1 | CC BY 3.0 |
| Roads & routes | 3,840 polylines | AWMC (Barrington Atlas derived) | ODbL 1.0 |
| Languages | 26,696 | Glottolog CLDF | CC BY 4.0 |
| Documented societies | 1,291 | D-PLACE Ethnographic Atlas | CC BY 4.0 |
| Ancient metagenomes | 3,241 | AncientMetagenomeDir (SPAAM) | CC BY 4.0 |
| Land outlines | 48,000 points | Natural Earth 110m | public domain |

## The lineage tree is derived, not typed in

Haplogroup nomenclature **is** the topology — `R1b1a1` nests inside `R1b1` inside `R1b` — so the
tree is built by prefix-parsing the AADR's own Y and mtDNA calls across 19,029 dated individuals.
701 Y clades and 705 mtDNA clades come out of it.

Two honest constraints are built into the result, and stated in the interface:

- **A node's date is its oldest observed member, not a TMRCA.** A clade is always older than the
  oldest person we happened to dig up carrying it. Because clade membership is nested, the oldest
  member of a parent is automatically at least as old as the oldest member of any child, so
  branches always run forward in time without needing an assumption.
- **A node's position is a summary statistic of where its carriers were excavated**, which is not
  where the clade arose. The page offers both estimators — spherical centroid of all members, and
  the location of the single oldest member — because they disagree, and the disagreement is the
  point.

A **reference backbone** mode carries the hand-entered published tree instead, for the deep
structure the sampled record cannot reach. It is labelled as not-observed.

## Things the data says that the interface makes you confront

- **99.3% of ancient genomes are younger than 15,000 BP.** The deep-time story rests on <1% of
  the evidence. The coverage tab plots this per layer.
- **The observed Y tree is a forest, not a tree.** Its macro-haplogroups have no connections above
  them, because the AADR's nomenclature doesn't encode the deep backbone and no sampled individual
  bridges them. The reference mode shows what the literature supplies instead.
- **Pleiades lights up the Mediterranean and nothing else.** That is where classicists worked.

## Tracing a lineage

Select a clade and the **Migration path** card lays out its route from the root: every waypoint
numbered on the globe, with position, leg distance, elapsed time and implied pace, exportable as
CSV. `fly this path` walks the camera through the waypoints while the clock advances with it.

The card is built to argue with itself, because the honest answer is that a clade's route is not
observed:

- It reports the path length under **both** position estimators. When they disagree by more than
  1.6x it says so, because the gap measures how much of the route is coming from the choice of
  statistic rather than from the data. For Y-DNA N1a1a1a1a the two differ by nearly 6x.
- It flags legs spanning **zero years** — where parent and child share the same oldest sampled
  individual, so the leg dates nothing.
- It refuses an implausible pace. Q1b1a1a on the oldest-sample estimator implies 11,508 km per
  millennium, and the card says plainly that this is not a rate of travel: Q's oldest sampled
  carrier is Anzick-1 in Montana, so the waypoints are not in ancestral order. A parent clade's
  oldest carrier can sit deep inside a descendant population.

## Filters

- **Only carriers of the selected clade** — matches each individual's own haplogroup call against
  the clade tree, so the evidence layer collapses to exactly the people carrying that lineage
  (R1b1a1b1a1a2: 19,029 genomes to 725). Usable calls exist for 51.8% of individuals at Y and
  77.1% at mtDNA.
- **Date range** — a hard filter in years BP; the scrubber then animates inside it.
- **Genome quality** — the AADR's own assessment grades (Pass / provisional / questionable / critical).
- **Per-layer class filters** and a **clade search** that reaches below the detail cut and pulls
  the full tree in when it needs to.

## Formats

Point layers are 15-byte records — `int32` lat and lon at 1e-5°, `int32` years BP, `uint16`
uncertainty, `uint8` class/flags — base64'd into `.txt` because artifact hosting serves no binary
media type. Metadata rides in tab-separated sidecars loaded lazily, only when a record is
inspected or a query is exported. Geography is a 48,000-point Fibonacci-sphere bitmask, 8 KB.
