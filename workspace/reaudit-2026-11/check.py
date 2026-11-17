#!/usr/bin/env python3
"""GitHub facts for a list of repos, for the 2026-11 re-audit.

  python check.py IN.json OUT.json
    IN:  ["owner/repo", ...]
    OUT: {"owner/repo": {"name", "stars", "pushed", "archived", "fork", "desc", "topics", "lang"} | {"dead": true}}

GraphQL in batches of 40 (fetch_meta from scripts/audit/run.py). Every repo GraphQL
returns null for is re-checked over REST, so a failed batch can't make live repos look
dead; only a REST 404/451 marks a repo dead. REST also follows renames.
"""
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

from run import fetch_meta, gh_token  # copy of scripts/audit/run.py beside this file


def from_graphql(m):
    return {"name": m["nameWithOwner"], "stars": m["stargazerCount"], "pushed": m["pushedAt"] or "",
            "archived": m["isArchived"], "fork": m["isFork"], "desc": m["description"] or "",
            "topics": [n["topic"]["name"] for n in m["repositoryTopics"]["nodes"]],
            "lang": (m["primaryLanguage"] or {}).get("name", "")}


def from_rest(repo, token):
    req = urllib.request.Request(f"https://api.github.com/repos/{repo}",
                                 headers={"Authorization": f"Bearer {token}", "User-Agent": "awesome-ai-agent-stack-audit"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            d = json.load(r)
    except urllib.error.HTTPError as e:
        if e.code in (404, 451):  # deleted, private, or DMCA-blocked
            return {"dead": True}
        raise  # 403 rate limit etc.: fail loudly, rerun
    return {"name": d["full_name"], "stars": d["stargazers_count"], "pushed": d["pushed_at"] or "",
            "archived": d["archived"], "fork": d["fork"], "desc": d.get("description") or "",
            "topics": d.get("topics") or [], "lang": d.get("language") or ""}


def main():
    src, dst = Path(sys.argv[1]), Path(sys.argv[2])
    repos = json.loads(src.read_text(encoding="utf-8"))
    tok = gh_token()
    meta = fetch_meta(repos, tok)
    out = {r: (from_graphql(meta[r.lower()]) if meta.get(r.lower()) else from_rest(r, tok)) for r in repos}
    dst.write_text(json.dumps(out, ensure_ascii=False, indent=0), encoding="utf-8")
    dead = sum(1 for v in out.values() if v.get("dead"))
    print(f"{src.name}: {len(out)}/{len(repos)} repos checked, {dead} dead -> {dst}")


if __name__ == "__main__":
    main()
