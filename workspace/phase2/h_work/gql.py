import subprocess,json,sys,re,os,datetime
sys.stdout.reconfigure(encoding="utf-8")
cache=json.load(open("cache.json")) if os.path.exists("cache.json") else {}
def batch(repos):
    q="{"+" ".join(f'r{i}: repository(owner:"{r.split("/")[0]}",name:"{r.split("/")[1]}"){{nameWithOwner stargazerCount pushedAt isArchived isFork description}}' for i,r in enumerate(repos))+"}"
    p=subprocess.run(["gh","api","graphql","-f","query="+q],capture_output=True,text=True,encoding="utf-8")
    try: d=json.loads(p.stdout)["data"]
    except Exception: 
        d=json.loads(p.stdout).get("data") or {}
    for i,r in enumerate(repos):
        x=d.get(f"r{i}")
        cache[r.lower()]=[x["nameWithOwner"],x["stargazerCount"],x["pushedAt"],x["isArchived"],x["isFork"],x["description"]] if x else None
def run(files):
    c=set()
    for f in files: c|=set(open(f,encoding="utf-8").read().split())
    c=[x for x in c if re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+",x) and x.split("/")[0].lower() not in("topics","sponsors","orgs","features","marketplace","apps")]
    todo=[x for x in c if x.lower() not in cache]
    for i in range(0,len(todo),40): batch(todo[i:i+40])
    json.dump(cache,open("cache.json","w"))
    return c
if __name__=="__main__":
    c=run(sys.argv[1:]); print(len(c))
