#!/usr/bin/env python3
"""Find trending AI repos that aren't in README.md yet.

Collects repo names from trendshift.io and github.com/trending (both allow it in
robots.txt; one request a second), drops anything already listed, then checks
each candidate with the GitHub GraphQL API against the list's bar: 1,000+ stars,
not archived, not a fork, pushed in the last 12 months, and AI-related by its
description or topics. Prints a Markdown checklist; it never edits the README,
because what goes in is a curation call.

    python scripts/find_trending.py > candidates.md     # needs `gh` logged in (or GH_TOKEN)
"""
import datetime
import json
import re
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

README = Path(__file__).resolve().parent.parent / "README.md"
UA = {"User-Agent": "Mozilla/5.0 (compatible; awesome-ai-agent-stack trending finder)"}
LANGS = ["", "python", "typescript", "javascript", "rust", "go", "jupyter-notebook", "c++", "swift"]
NOT_REPOS = {"features", "topics", "trending", "sponsors", "login", "orgs", "apps",
             "marketplace", "settings", "collections", "about"}
AI = re.compile(r"\b(ai|llms?|agents?|agentic|gpt|claude|codex|gemini|mcp|rag|models?|inference|"
                r"machine[- ]learning|deep[- ]learning|neural|diffusion|transformers?|speech|tts|"
                r"embeddings?|copilot|prompts?|skills?|chatbot|vision|multimodal)\b", re.I)


def get(url: str) -> str:
    time.sleep(1)
    try:
        return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read().decode("utf-8", "replace")
    except Exception as e:  # one dead page shouldn't stop the run
        print(f"skip {url}: {e}", file=sys.stderr)
        return ""


def collect() -> dict[str, set[str]]:
    found: dict[str, set[str]] = {}

    def add(src: str, names: list[str]) -> None:
        for n in names:
            n = n.strip("/").rstrip(".")
            if n.count("/") == 1 and n.split("/")[0].lower() not in NOT_REPOS:
                found.setdefault(n, set()).add(src)

    topics = sorted(set(re.findall(r'href="/topics/([\w-]+)"', get("https://trendshift.io/topics"))))
    for page in ["/", "/weekly", "/monthly", "/yearly", "/github-trending-repositories", *[f"/topics/{t}" for t in topics]]:
        add("trendshift" + page, re.findall(r"github\.com/([\w.-]+/[\w.-]+)", get("https://trendshift.io" + page)))
    for lang in LANGS:
        for since in ["daily", "weekly", "monthly"]:
            html = get(f"https://github.com/trending/{lang}?since={since}")
            add(f"github-trending/{lang or 'all'}/{since}",
                re.findall(r'<h2 class="h3 lh-condensed">\s*<a[^>]*href="/([\w.-]+/[\w.-]+)"', html))
    return found


def check(names: list[str]) -> list[dict]:
    repos = []
    for i in range(0, len(names), 40):
        chunk = names[i:i + 40]
        query = "query{" + "".join(
            f'r{j}:repository(owner:{json.dumps(n.split("/")[0])},name:{json.dumps(n.split("/")[1])})'
            "{nameWithOwner description stargazerCount isArchived isFork pushedAt "
            "repositoryTopics(first:15){nodes{topic{name}}}}"
            for j, n in enumerate(chunk)) + "}"
        out = subprocess.run(["gh", "api", "graphql", "-f", f"query={query}"],
                             capture_output=True, text=True, encoding="utf-8")
        data = (json.loads(out.stdout or "{}").get("data") or {})
        repos += [d for d in data.values() if d]
    return repos


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")  # stars and non-ASCII descriptions on Windows
    listed = {m.lower() for m in re.findall(r"\(https?://github\.com/([\w.-]+/[\w.-]+?)/?\)",
                                            README.read_text(encoding="utf-8"))}
    found = collect()
    fresh = [n for n in found if n.lower() not in listed]
    cutoff = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=365)).isoformat()
    keep = []
    for d in check(fresh):
        topics = [t["topic"]["name"] for t in d["repositoryTopics"]["nodes"]]
        text = f'{d["description"] or ""} {" ".join(topics)}'
        if (d["nameWithOwner"].lower() not in listed and d["stargazerCount"] >= 1000 and not d["isArchived"]
                and not d["isFork"] and d["pushedAt"] >= cutoff and AI.search(text)):
            keep.append(d)
    keep.sort(key=lambda d: -d["stargazerCount"])

    today = datetime.date.today().isoformat()
    print(f"Trending AI repos not in the README yet, found {today} on trendshift.io and GitHub Trending.")
    print(f"{len(found)} trending repos seen, {len(fresh)} not listed, **{len(keep)}** pass the bar "
          "(1,000+ stars, maintained, not archived, AI-related). Tick the ones worth adding.\n")
    for d in keep:
        desc = (d["description"] or "").replace("|", "/").strip()
        print(f'- [ ] [{d["nameWithOwner"]}](https://github.com/{d["nameWithOwner"]}) '
              f'· {d["stargazerCount"]:,}★ · {desc[:140]}')


if __name__ == "__main__":
    main()
