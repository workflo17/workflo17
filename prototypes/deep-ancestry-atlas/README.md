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

## Formats

Point layers are 15-byte records — `int32` lat and lon at 1e-5°, `int32` years BP, `uint16`
uncertainty, `uint8` class/flags — base64'd into `.txt` because artifact hosting serves no binary
media type. Metadata rides in tab-separated sidecars loaded lazily, only when a record is
inspected or a query is exported. Geography is a 48,000-point Fibonacci-sphere bitmask, 8 KB.
