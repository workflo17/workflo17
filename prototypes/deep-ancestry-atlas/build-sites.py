import csv, json, struct, base64, sys
csv.field_size_limit(10**8)

# place_id -> set(types)
types={}
with open('pl_places_place_types.csv',newline='',encoding='utf-8-sig') as f:
    for r in csv.DictReader(f):
        types.setdefault(r['place_id'],set()).add(r['place_type'])

# renderable classes, in priority order (first match wins)
CLASSES=[
 ("settlement", {"settlement","settlement-modern","city-wall","urban"}),
 ("sacred",     {"temple","temple-2","sanctuary","church","church-2","abbey","abbey-church",
                 "synagogue","mosque","shrine","oracle","altar","monastery"}),
 ("military",   {"fort","fort-2","fortress","tower","wall","camp","military-installation"}),
 ("funerary",   {"cemetery","tomb","tumulus","mausoleum","necropolis","catacomb"}),
 ("infra",      {"road","bridge","station","aqueduct","port","harbor","canal","mine",
                 "quarry","lighthouse","dam","well","kiln","production"}),
 ("site",       {"archaeological-site","villa","ruin","find-spot","estate","bath","theatre",
                 "amphitheatre","circus","stadium","forum","agora","market","palace"}),
]
# excluded: not physical/located sites
SKIP={"unlocated","label","unlabeled","people","region","province","ethnos"}

def classify(ts):
    if not ts or ts & SKIP and not (ts - SKIP): return None
    for i,(name,s) in enumerate(CLASSES):
        if ts & s: return i
    if ts - SKIP: return 5          # other physical feature -> "site"
    return None

PREC={"precise":0,"related":1,"rough":2,"unlocated":3}
rows=[]
with open('pl_places.csv',newline='',encoding='utf-8-sig') as f:
    for r in csv.DictReader(f):
        try:
            lat=float(r['representative_latitude']); lon=float(r['representative_longitude'])
        except (ValueError,TypeError,KeyError): continue
        if not(-90<=lat<=90 and -180<=lon<=180): continue
        pid=r['id']
        ts=types.get(pid,set())
        cls=classify(ts)
        if cls is None: continue
        prec=PREC.get((r.get('location_precision') or '').strip(),2)
        if prec==3: continue
        title=(r.get('title') or '').strip().replace('\t',' ').replace('\n',' ')
        rows.append((int(pid),lat,lon,cls,prec,title))

print("sites kept:",len(rows), file=sys.stderr)
import collections
print(collections.Counter(CLASSES[r[3]][0] for r in rows), file=sys.stderr)
print(collections.Counter(r[4] for r in rows), file=sys.stderr)

# binary: int32 lat*1e5, int32 lon*1e5, uint8 class, uint8 precision  (ids live in the sidecar)
buf=bytearray()
for pid,lat,lon,cls,prec,_ in rows:
    buf+=struct.pack('<iiBB',round(lat*1e5),round(lon*1e5),cls,prec)
titles="\n".join(str(r[0])+"\t"+r[5] for r in rows)
open('sites.b64','w').write(base64.b64encode(bytes(buf)).decode())
open('sites_titles.txt','w',encoding='utf-8').write(titles)
print("binary b64 bytes:",len(base64.b64encode(bytes(buf))), file=sys.stderr)
print("titles bytes:",len(titles.encode()), file=sys.stderr)
