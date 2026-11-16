import json,re,sys,datetime
sys.stdout.reconfigure(encoding="utf-8")
cache=json.load(open("cache.json"))
readme=open("../../awesome-ai-agent-stack/README.md",encoding="utf-8").read().lower()
listed={m.rstrip(".") for m in re.findall(r"github\.com/([a-z0-9_.-]+/[a-z0-9_.-]+)",readme)}
cut=(datetime.datetime.now(datetime.timezone.utc)-datetime.timedelta(days=365)).strftime("%Y-%m-%dT")
files=sys.argv[1:]
c=set()
for f in files: c|=set(x.lower() for x in open(f,encoding="utf-8").read().split())
out=[cache[k] for k in c if cache.get(k) and cache[k][1]>=1000 and cache[k][2]>=cut and not cache[k][3] and not cache[k][4] and k not in listed and cache[k][0].lower() not in listed]
for v in sorted(out,key=lambda x:-x[1]): print(v[0],v[1],(v[5] or "")[:60].replace("\n"," "))
