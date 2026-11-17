#!/usr/bin/env python3
"""Phase 2: vet the repo names the scout agents wrote to phase2/sources/*.json and merge
the ones that pass the bar into candidates.json (same checks as collect.py)."""
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import collect  # noqa: E402  (reuses its bar, README parser and GraphQL batcher)


def main():
    readme = (collect.REPO / "README.md").read_text(encoding="utf-8")
    listed = {e["repo"].lower() for e in collect.parse(readme)}
    rf = HERE.parent / "audit-results" / "removed-lines.json"
    removed = {r.lower() for r, _ in json.loads(rf.read_text())} if rf.exists() else set()
    cands = json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))
    have = {c["repo"].lower(): c for c in cands}
    names = {}
    for f in sorted((HERE / "sources").glob("*.json")):
        for n in json.loads(f.read_text(encoding="utf-8")).get("repos", []):
            if n.count("/") == 1:
                names.setdefault(n.lower(), (n, set()))[1].add(f"scout:{f.stem}")
    new = [n for k, (n, _) in names.items() if k not in have and k not in listed and k not in removed]
    print(f"scouts found {len(names)} unique names; {len(new)} not already candidates/listed", file=sys.stderr)
    meta = collect.fetch_meta(new, collect.gh_token()) if new else {}
    added = 0
    for k, g in meta.items():
        if not g:
            continue
        repo = g["nameWithOwner"]
        if repo.lower() in listed or repo.lower() in removed or repo.lower() in have:
            continue
        rec = {"repo": repo, "stars": g["stargazerCount"], "pushed": (g["pushedAt"] or "")[:10],
               "archived": g["isArchived"], "fork": g["isFork"], "description": g.get("description") or "",
               "topics": [t["topic"]["name"] for t in g["repositoryTopics"]["nodes"]],
               "language": (g.get("primaryLanguage") or {}).get("name", ""),
               "sources": sorted(names.get(k, ("", set()))[1])}
        if rec["stars"] >= 1000 and not rec["archived"] and not rec["fork"] and rec["pushed"] >= collect.CUTOFF:
            cands.append(rec); have[repo.lower()] = rec; added += 1
    for k, (n, srcs) in names.items():   # credit scouts for candidates the collector already had
        if k in have:
            have[k]["sources"] = sorted(set(have[k].get("sources", [])) | srcs)
    cands.sort(key=lambda r: -r["stars"])
    (HERE / "candidates.json").write_text(json.dumps(cands, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"added {added} new candidates from scouts; total candidates {len(cands)}", file=sys.stderr)


if __name__ == "__main__":
    main()
