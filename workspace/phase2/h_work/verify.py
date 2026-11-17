import subprocess,json,sys,re,datetime,concurrent.futures as cf,os
readme=open("../../awesome-ai-agent-stack/README.md",encoding="utf-8").read().lower()
listed=set(m.rstrip(".") for m in re.findall(r"github\.com/([a-z0-9_.-]+/[a-z0-9_.-]+)",readme))
listed={x[:-4] if x.endswith(".git") else x for x in listed}
cache=json.load(open("cache.json")) if os.path.exists("cache.json") else {}
def chk(r):
    k=r.lower()
    if k in cache: return k,cache[k]
    p=subprocess.run(["gh","api",f"repos/{r}","--jq","[.full_name,.stargazers_count,.pushed_at,.archived,.fork,.description]"],capture_output=True,text=True,encoding="utf-8")
    if p.returncode: v=None
    else: v=json.loads(p.stdout)
    return k,v
def run(cands):
    cands=sorted({c.strip() for c in cands if c.strip() and c.lower() not in listed},key=str.lower)
    with cf.ThreadPoolExecutor(8) as ex:
        for k,v in ex.map(chk,cands): cache[k]=v
    json.dump(cache,open("cache.json","w"))
    cut=(datetime.datetime.now(datetime.timezone.utc)-datetime.timedelta(days=365)).isoformat()
    out=[]
    for c in cands:
        v=cache[c.lower()]
        if v and v[1]>=1000 and v[2]>=cut and not v[3] and not v[4]: out.append(v)
    return out
if __name__=="__main__":
    c=[]
    for f in sys.argv[1:]:
        c+=open(f).read().split()
    res=run(c)
    json.dump(res,open("passed_"+os.path.basename(sys.argv[1])+".json","w"))
    print(len(res))
    for v in sorted(res,key=lambda x:-x[1]): print(v[0],v[1],(v[5] or "")[:70])
