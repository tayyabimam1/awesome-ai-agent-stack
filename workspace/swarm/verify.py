#!/usr/bin/env python3
"""Verify repos on GitHub: stars>=1000, pushed in the last 12 months, not archived/fork. Stdlib only.
  GH_TOKEN=... python3 verify.py IN.json OUT.jsonl     (IN: list of owner/repo; resumable)"""
import datetime, json, os, sys, time, urllib.request, urllib.error
src, out = sys.argv[1], sys.argv[2]
tok = os.environ["GH_TOKEN"]
cut = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=365)).isoformat()
done = set()
if os.path.exists(out):
    done = {json.loads(l)["query"] for l in open(out, encoding="utf-8")}
todo = [r for r in json.load(open(src, encoding="utf-8")) if r not in done]
print(len(todo), "to verify,", len(done), "done", flush=True)
f = open(out, "a", encoding="utf-8")
for i in range(0, len(todo), 40):
    chunk = todo[i:i + 40]
    q = "query{" + "".join(f'r{j}:repository(owner:{json.dumps(n.split("/")[0])},name:{json.dumps(n.split("/")[1])})'
        "{nameWithOwner description stargazerCount isArchived isFork pushedAt primaryLanguage{name}}"
        for j, n in enumerate(chunk)) + "}"
    d = {}
    for attempt in range(6):
        try:
            req = urllib.request.Request("https://api.github.com/graphql", data=json.dumps({"query": q}).encode(),
                                         headers={"Authorization": "Bearer " + tok, "User-Agent": "list-verify"})
            d = json.loads(urllib.request.urlopen(req, timeout=60).read()).get("data") or {}
            break
        except Exception as e:  # noqa: BLE001
            time.sleep(10 * (attempt + 1))
    for j, n in enumerate(chunk):
        m = d.get(f"r{j}")
        row = {"query": n, "found": bool(m)}
        if m:
            row.update({"repo": m["nameWithOwner"], "stars": m["stargazerCount"], "pushed": (m["pushedAt"] or "")[:10],
                        "archived": m["isArchived"], "fork": m["isFork"], "description": m.get("description") or "",
                        "topics": [],
                        "language": (m.get("primaryLanguage") or {}).get("name", ""),
                        "pass": m["stargazerCount"] >= 1000 and not m["isArchived"] and not m["isFork"] and (m["pushedAt"] or "") >= cut})
        f.write(json.dumps(row, ensure_ascii=False) + "\n")
    f.flush()
    print(f"{time.strftime('%H:%M:%S')} {min(i + 40, len(todo))}/{len(todo)}", flush=True)
print("DONE verify", flush=True)
