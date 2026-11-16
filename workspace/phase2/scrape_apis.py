"""OSS Insight collections/trends and GitHub Explore collections -> sources/*.json (names only)."""
import base64, json, re, subprocess, time, urllib.request
AI = re.compile(r"ai|ml|machine|learn|llm|gpt|agent|chat|bot|nlp|vision|speech|voice|model|neural|deep|data|vector|mcp|copilot|diffusion|rag|prompt", re.I)
def get(u):
    time.sleep(1)
    try: return json.load(urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0", "Accept": "application/json"}), timeout=60))
    except Exception as e: print("  skip", u, e); return {}
rows = lambda d: (d.get("data") or {}).get("rows") or d.get("rows") or []
# OSS Insight
repos, cols = set(), []
for c in rows(get("https://api.ossinsight.io/v1/collections")):
    name = c.get("name", "")
    if AI.search(name):
        cols.append(name)
        for r in rows(get(f"https://api.ossinsight.io/v1/collections/{c['id']}/ranking_by_stars/?period=past_28_days")) or rows(get(f"https://api.ossinsight.io/v1/collections/{c['id']}/repos/")):
            n = r.get("repo_name") or r.get("full_name")
            if n: repos.add(n)
for period in ("past_month", "past_3_months"):
    for lang in ("All", "Python", "TypeScript", "Go", "Rust", "JavaScript"):
        for r in rows(get(f"https://api.ossinsight.io/v1/trends/repos/?period={period}&language={lang}")):
            if AI.search(" ".join(str(r.get(k, "")) for k in ("repo_name", "description", "collection_names"))):
                repos.add(r["repo_name"])
json.dump({"collections_read": cols, "repos": sorted(repos, key=str.lower)}, open("sources/ossinsight.json", "w"), indent=0)
print("ossinsight: collections", len(cols), "repos", len(repos))
# GitHub Explore
tree = json.loads(subprocess.run(["gh", "api", "repos/github/explore/git/trees/main?recursive=1"], capture_output=True, text=True, encoding="utf-8").stdout)
paths = [t["path"] for t in tree.get("tree", []) if re.fullmatch(r"(collections|topics)/[^/]+/index\.md", t["path"])]
ex, read = set(), []
for p in paths:
    if not AI.search(p.split("/")[1]): continue
    d = json.loads(subprocess.run(["gh", "api", f"repos/github/explore/contents/{p}"], capture_output=True, text=True, encoding="utf-8").stdout or "{}")
    txt = base64.b64decode(d.get("content", "")).decode("utf-8", "replace")
    items = re.findall(r"^\s*-\s*([\w.-]+/[\w.-]+)\s*$", txt, re.M)
    if items: read.append(p); ex.update(items)
json.dump({"collections_read": read, "repos": sorted(ex, key=str.lower)}, open("sources/github-explore.json", "w"), indent=0)
print("github explore: files", len(read), "repos", len(ex))
