# Deep Ancestry Atlas — data layers and the research-tool argument

Companion to [`deep-ancestry-atlas.md`](deep-ancestry-atlas.md). That document covers the
migration pipeline. This one covers everything else you can put on the globe, and the harder
question of what separates a research instrument from a nice thing to look at.

---

## 0. The argument, first

A layer stack is a toy. **The joins between layers are the tool.**

Anyone can put archaeological sites on a map. The thing nobody has built is the query that
crosses datasets: *given this place and this century, return every ancient genome, every
radiocarbon date, every excavated site, every isotope sample and every pollen core, each with
a resolvable citation.* That question currently takes a graduate student a week. It should
take four seconds.

So the layers below are chosen for what they let you **cross-reference**, not for how they
look on their own.

---

## 1. Where people were

### Pleiades — *shipped in the prototype*

The gazetteer of the classical world. **41,480 place resources** (v4.1, 28 May 2025),
**CC BY 3.0**, with GIS-ready CSVs in the `data/gis/` directory of the
`isawnyu/pleiades.datasets` repository — no scraping, no API key, ~16 MB.

Of those, 32,902 are physically located sites; the prototype ships all of them. The mix:

| class | count | |
|---|---|---|
| settlement | 12,964 | towns, cities, villages |
| other site | 10,453 | villas, baths, theatres, find-spots |
| infrastructure | 4,039 | roads, bridges, ports, aqueducts, mines |
| sacred | 2,158 | temples, sanctuaries, churches |
| military | 1,840 | forts, walls, towers, camps |
| funerary | 1,448 | cemeteries, tombs, tumuli |

Two things about this dataset matter more than the count:

- **It carries its own uncertainty.** Every place has a `location_precision` field and an
  `accuracy_radius` in metres. 4,052 of the 32,902 are flagged **rough** — Athens among them.
  The prototype renders rough positions dimmer and says so on the record. A tool that
  silently drew all 32,902 as equally certain points would be misrepresenting its own source.
- **Dates are not in the GIS package.** Time periods live in the JSON serialization, one file
  per place under a hierarchical path (`data/json/1/1/8/7/118731.json`). Getting per-site
  dates means pulling the full JSON dump. Until then, gate the layer on the *dataset's*
  coverage window (c.1200 BCE – 640 CE) and label it as such, which is what the prototype does.

**Coverage caveat that is itself a finding:** Pleiades is Mediterranean-centric. Turn the
layer on and Europe, Anatolia and North Africa blaze while everywhere else stays dark. That
is not where people lived. It is where classicists worked. See §5.

### ROAD — the deep-time counterpart

**The ROCEEH Out of Africa Database.** 2,300+ localities and 22,000+ assemblages covering
**3 million to 20,000 years ago** across Africa and Eurasia, integrating archaeology,
palaeoanthropology, palaeobotany, palaeontology and palaeogeography, compiled from 5,000+
publications in eight languages. Open access via its Simple Search and AskROAD tools; full
SQL and map-module access after registration.

This is the single most important addition for this project, because it covers **exactly the
window the migration story lives in and Pleiades does not.** Pleiades starts when the
interesting part is nearly over.

### p3k14c — dates as data

**180,070 archaeological radiocarbon ages** worldwide, cleaned under one protocol, as a
single CSV, archived at tDAR. The largest and most geographically complete set of
archaeological ¹⁴C dates assembled.

Radiocarbon date density is the standard proxy for human population density through time. So
this layer is not just "sites" — it is **an independent population curve you can run against
the genetic one.** Where they disagree, something interesting is happening (or someone's
sampling is skewed).

`c14bazAAR` (rOpenSci) harvests and harmonises many regional ¹⁴C databases and is the
practical ingestion route.

### World Historical Gazetteer

1.8 million modern place references, ~60,000 temporally scoped records, 600+ published
datasets, an API, and the **Linked Places** format. Less a layer than a *join key* — the way
you reconcile your places against everyone else's.

### Itiner-E and Seshat

**Itiner-E** (Brughmans, de Soto et al., 2024) — digital atlas of ancient roads, segment by
segment. Turns a scatter of sites into a **network**, which is what migration actually uses.

**Seshat: Global History Databank** — polities and social complexity from the Neolithic to
the Industrial Revolution, on Zenodo. Note the licence: **CC BY-NC-SA**. Fine for a public
research tool, a problem the moment anything commercial touches it.

---

## 2. Who moved — individually

This is the tier that would make the project genuinely novel, because nobody visualizes it.

### Strontium isotopes

⁸⁷Sr/⁸⁶Sr in tooth enamel is fixed in childhood from local food and water. Compare an
individual's value against the local baseline and you learn whether **that specific person**
grew up where they were buried. Not a population-level inference — a personal one.

- **Global compilation of bioavailable strontium isotope data** (Stantis, Willmes, Le Corre
  et al., *Scientific Data* 13:299, 2026) — **28,347 published bioavailable ⁸⁷Sr/⁸⁶Sr values
  from over 150 countries.** This is the baseline isoscape, in one place, finally.
- **IsoArcH** — open-access, collaborative isotope bioarchaeology database; georeferenced
  samples with full archaeological metadata. Siblings: AfriArch, IsoMedIta, SrIsoMed.

**The visualization nobody has built:** for each isotopically non-local individual, draw a
short arrow from their probable childhood region to their grave. Thousands of them. Migration
at the scale of one human life, rendered next to migration at the scale of a hundred
millennia. The contrast between the two is the whole point — and it is an honest corrective
to arcs that imply whole peoples marching across continents.

### Ancient pathogens

**AncientMetagenomeDir** (SPAAM community, on GitHub) — community-curated, standardised
metadata for published ancient metagenomic samples.

*Yersinia pestis* is the showcase: the earliest known human infections date to about 5,000
years ago, and the window between 6,000 and 4,000 BP was critical to the evolution and
ecology of plague. Pathogens travel with people, so plague genomes are an **independent
tracer of human contact networks** — and they date arrival events precisely.

---

## 3. The world they moved through

- **Beyer 2020 / Krapp 2021** via `pastclim` — biomes, NPP, land and ice masks per time
  slice. Covered in the main plan; still the highest-impact visual layer.
- **Neotoma Paleoecology Database** — **>3.8 million observations, >17,000 datasets, >9,200
  sites**: fossil pollen, vertebrates, diatoms, ostracodes, plant macrofossils, insects,
  stable isotopes. JSON REST API, an R package, and full database snapshots. This is
  vegetation and megafauna through time — the ecology people were actually walking into.
- **De Groeve et al. 2022** coastlines, **ICE-6G_C** ice sheets. Covered in the main plan.

---

## 4. What they carried

### Domestication and the spread of farming

Agriculture begins in the Fertile Crescent around 12,000 years ago. Domesticates spread
beyond the domestication zone during the PPNB (8700–6200 BC) into central Turkey, Cyprus,
Crete and southern Greece. Crucially, wheat, barley, millet and rice moved along **distinct
northern and southern routes, reflecting selective long-distance transport rather than
wholesale demographic diffusion.**

That last clause is a *testable claim you can put on screen next to the genetic paths.* Where
crops moved but genes did not, you are looking at trade and adoption. Where both moved
together, you are looking at people. This layer is the sharpest tool in the box for
distinguishing the two — and it is the one the public most often gets wrong.

Data is fragmented: AsCAD and the southwest Asia archaeobotany database are entry points, but
expect manual compilation from supplementary tables. Budget accordingly.

### Language

**Glottolog** — language varieties, genealogical affiliation, macro-area, ISO codes,
coordinates. **D-PLACE** — 1,400+ societies with geography, language, culture and
environment, using Glottolog for family assignment.

Language family versus genetic lineage is one of the oldest and most contested questions in
the field. Showing both and letting them disagree is more honest, and more interesting, than
any single narrative.

---

## 5. The other hominins

There is no clean, coordinate-complete fossil-site database for Neanderthals and Denisovans —
ROAD is the best available source for localities. For introgression, Sankararaman et al.
mapped Denisovan and Neanderthal ancestry across 120 present-day populations, and **ASH**
(arcseqhub.com) visualizes archaic segments.

One geographic fact is worth a whole view on its own: **Denisovan remains are known only from
Siberia and Tibet, while Denisovan ancestry peaks in Papua and Australia.** The gap between
where the bones are and where the genes are is a visualization in itself, and it teaches the
central lesson of the whole project — absence of evidence is about excavation, not about people.

---

## 6. What actually makes it a research tool

Eight requirements. The prototype now demonstrates the first three.

1. **The spatio-temporal join.** Pick a point or region, pick a window, get every record from
   every layer. *In the prototype:* select a lineage node, set a radius, and it returns the
   matching ancient places broken down by class — 5,539 places within 500 km of the J2
   Mediterranean node, for instance.
2. **Every record carries a resolvable citation.** *In the prototype:* the exported CSV has
   `pleiades_id`, coordinates at full precision, `location_precision`, distance, and a live
   `https://pleiades.stoa.org/places/...` URI on every row. If a user cannot cite it, it is
   not a research tool.
3. **Uncertainty is a rendered channel, not a footnote.** *In the prototype:* "rough"
   positions are drawn dimmer and smaller, and the inspector says *treat as approximate*.
   Extend this to radiocarbon distributions and ancestral-location posteriors.
4. **Coverage as a first-class layer.** Every dataset gets a "what has actually been sampled
   here" view. The Pleiades layer demonstrates the problem vividly by accident: a blazing
   Mediterranean and a dark everywhere-else. Make that explicit rather than leaving users to
   misread density as history.
5. **Pinned versions and a manifest.** AADR v66.0, Pleiades v4.1, YFull v14.05.00, p3k14c
   release DOI. A "latest" pointer silently breaks reproducibility.
6. **Report what you dropped.** The prototype's pipeline kept 32,902 of 41,480 Pleiades
   places; the rest are unlocated records, map labels, ethnic groups and regions. That number
   belongs in the interface, not just in a script's stderr.
7. **Bring your own data.** Upload a CSV of `(lat, lon, date, label)` and it becomes a layer,
   queryable against everything else. This is the single feature that converts the thing from
   "nice to look at" into "I used it for my paper."
8. **Permalinks and an API.** Every view state in the URL; every query re-runnable by someone
   else. Reproducibility is a UI feature, not just a data-management one.

---

## 7. Licensing, at a glance

| Source | Terms | Note |
|---|---|---|
| Pleiades | CC BY 3.0 | attribution; notify pleiades.admin@nyu.edu of reuse |
| Natural Earth | public domain | |
| AADR | freely available | cite the versioned release DOI |
| Seshat | **CC BY-NC-SA** | non-commercial — a constraint if this ever monetises |
| ROAD | open tools; registration for full | |
| p3k14c | via tDAR | check the collection's terms |
| Neotoma | community-curated | cite constituent databases, not just Neotoma |
| Sr compilation | *Scientific Data* | typically CC BY; confirm per-article |
| Glottolog / D-PLACE | open | |

And overriding all of it: **CARE** (Indigenous data governance). "It is publicly downloadable"
is not the same as "it is yours to publish on a globe." See §6 of the main plan.

---

## 8. Suggested order

| | Layer | Why now |
|---|---|---|
| **A** | p3k14c radiocarbon | An independent population curve to test the genetic one against. Single CSV. Highest value per unit effort. |
| **B** | ROAD | Covers the deep-time window that is the entire subject. |
| **C** | Coverage/density views | Cheap, and it stops the tool from lying by omission. |
| **D** | Strontium mobility | The genuinely novel visualization. Individual-scale migration. |
| **E** | Neotoma + pastclim | The environment, which explains the routes. |
| **F** | Glottolog / D-PLACE | The contested overlay; high public interest. |
| **G** | Domestication | Highest manual-compilation cost; do it once the frame is proven. |
| **H** | Pathogens | A precise, datable tracer of contact. |

Ship after each. A tool with two well-joined, well-cited layers beats one with eight
half-integrated ones.
