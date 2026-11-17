"""Build the categorization pool from every discovery source. Run from anywhere: pool.py [extra-names.txt]"""
import collections, glob, io, json, re, sys
from pathlib import Path
SW = Path(__file__).resolve().parent
ROOT = Path(r"D:\awsome AI stack github")
rd = lambda p: io.open(p, encoding="utf-8").read()
listed = {m.lower() for m in re.findall(r"^- \[[^\]]*\]\(https://github\.com/([^/\s)]+/[^/\s)#]+?)/?\)", rd(ROOT / "awesome-ai-agent-stack/README.md"), re.M)}
rejected = {m.lower() for m in re.findall(r"^- (\S+/\S+) \(", rd(ROOT / "phase2/excluded.md"), re.M)}
done = {}
for f in glob.glob(str(ROOT / "reaudit-2026-11/cat/out-*.json")):
    for o in json.loads(rd(f)):
        if isinstance(o, dict) and o.get("repo"):
            done[o["repo"].lower()] = o
facts = {}
for line in io.open(SW / "data/gh_search.jsonl", encoding="utf-8"):
    r = json.loads(line)
    facts.setdefault(r["repo"].lower(), r)
for c in json.loads(rd(ROOT / "phase2/candidates.json")):   # earlier pool; facts may be stale, re-vetted before apply
    facts.setdefault(c["repo"].lower(), {**c, "kw": "phase2"})
for f in sys.argv[1:]:                                       # vetted extras (SearXNG, scrapes) as JSONL facts
    for line in io.open(f, encoding="utf-8"):
        r = json.loads(line); facts.setdefault(r["repo"].lower(), r)
c = collections.Counter()
todo = []
for k, r in facts.items():
    why = ("listed" if k in listed else "phase2-rejected" if k in rejected else "already-categorized" if k in done
           else "under-1000" if r.get("stars", 0) < 1000 else "archived-or-fork" if r.get("archived") or r.get("fork") else "")
    c[why or "todo"] += 1
    if not why:
        todo.append({"repo": r["repo"], "description": (r.get("description") or "")[:400], "topics": (r.get("topics") or [])[:12],
                     "language": r.get("language") or "", "stars": r.get("stars", 0)})
todo.sort(key=lambda r: -r["stars"])
json.dump(facts, io.open(SW / "data/facts.json", "w", encoding="utf-8"), ensure_ascii=False)
print("unique candidates:", len(facts), dict(c))
for i in range(5):                                           # interleave by stars so every machine gets a fair mix
    json.dump(todo[i::5], io.open(SW / f"data/cat-in-{i+1}.json", "w", encoding="utf-8"), ensure_ascii=False)
print("to categorize:", len(todo), "-> 5 files of ~", len(todo[0::5]))
