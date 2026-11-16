#!/usr/bin/env python3
"""Phase 2, stage A: collect and vet candidate repos for the AI agent stack (local only).

Sources
  1. GitHub search: ~70 AI topics plus keyword searches, split by star range so
     no query hits the 1,000-result cap.
  2. Other AI awesome lists: every github.com link in their READMEs.
  3. Jina Reader (r.jina.ai, free, no key): JavaScript-rendered directories
     such as mcp.so and glama.ai that plain HTTP can't read.
Every candidate is checked against the list's bar: 1,000+ stars, not archived,
not a fork, pushed in the last 12 months, not already listed, not removed by
the 2026-10-16 audit. Writes candidates.json; never touches the repo.

  python phase2/collect.py            # needs a logged-in `gh` (or GH_TOKEN)
"""
import datetime
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent / "awesome-ai-agent-stack"
sys.path.insert(0, str(REPO / "scripts" / "audit"))
from run import fetch_meta, gh_token, parse  # noqa: E402  (reuse the audit's parser and GraphQL batcher)

CUTOFF = (datetime.date.today() - datetime.timedelta(days=365)).isoformat()
TOPICS = """ai-agents ai-agent agents agentic-ai autonomous-agents multi-agent multi-agent-systems agent-framework
llm llms large-language-models llm-agent llm-agents llm-inference llm-serving llmops llm-framework llm-tools
mcp mcp-server mcp-servers model-context-protocol mcp-client claude claude-code claude-ai anthropic openai codex
gemini gpt chatgpt ollama local-llm llama deepseek qwen rag retrieval-augmented-generation vector-database
embeddings semantic-search knowledge-graph memory ai-memory langchain llamaindex langgraph prompt-engineering
context-engineering ai-coding coding-agent code-generation copilot ai-assistant chatbot generative-ai genai
ai-tools text-to-speech speech-recognition speech-to-text voice-assistant tts asr computer-vision vision-language-model
multimodal stable-diffusion diffusion-models image-generation video-generation comfyui ai-art browser-automation
web-agent computer-use gui-agent ai-browser web-scraping-ai document-parsing ocr pdf-parser fine-tuning lora
reinforcement-learning-from-human-feedback inference quantization mlops ai-safety guardrails llm-evaluation
evaluation observability ai-workflow workflow-automation no-code-ai ai-search deep-research""".split()
KEYWORDS = ['"mcp server"', '"ai agent"', '"llm"', '"agentic"', '"claude code"', '"rag"', '"coding agent"']
AWESOME_LISTS = """punkpeye/awesome-mcp-servers wong2/awesome-mcp-servers appcypher/awesome-mcp-servers e2b-dev/awesome-ai-agents
kyrolabs/awesome-agents Shubhamsaboo/awesome-llm-apps hesreallyhim/awesome-claude-code steven2358/awesome-generative-ai
Hannibal046/Awesome-LLM tensorchord/Awesome-LLMOps kyrolabs/awesome-langchain jim-schwoebel/awesome_ai_agents
filipecalegario/awesome-vibe-coding ai-for-developers/awesome-ai-coding-tools rafska/awesome-local-llm
VoltAgent/awesome-agent-skills travisvn/awesome-claude-skills ComposioHQ/awesome-claude-skills
punkpeye/awesome-mcp-clients yzfly/Awesome-AGI-Agents mahseema/awesome-ai-tools ikaijua/Awesome-AITools
philfung/awesome-computer-use Agent-Tools/awesome-autonomous-web ottosulin/awesome-ai-security""".split()
JS_PAGES = ["https://mcp.so/explore", "https://glama.ai/mcp/servers", "https://smithery.ai/",
                   "https://www.pulsemcp.com/servers", "https://trendshift.io/topics/ai-agent",
                   "https://trendshift.io/topics/ai-coding", "https://trendshift.io/topics/local-llm",
                   "https://huggingface.co/spaces"]
NOT_REPOS = {"features", "topics", "trending", "sponsors", "login", "orgs", "apps", "marketplace", "settings",
             "collections", "about", "search", "explore", "notifications", "pricing", "enterprise", "readme"}
GH_LINK = re.compile(r"github\.com/([A-Za-z0-9][\w.-]*)/([\w.-]+)")


def log(*a):
    print(*a, file=sys.stderr, flush=True)


def gh_json(*args):
    for attempt in range(4):
        r = subprocess.run(["gh", "api", *args], capture_output=True, text=True, encoding="utf-8")
        if r.returncode == 0:
            return json.loads(r.stdout or "{}")
        if "rate limit" in (r.stderr + r.stdout).lower():
            log("  search rate limit; waiting 60s"); time.sleep(60)
        else:
            time.sleep(2 ** attempt)
    return {}


def search(q: str) -> list[dict]:
    """All results of one search query (max 1,000), 100 per page, ~2s apart (30 searches/min limit)."""
    out = []
    for page in range(1, 11):
        time.sleep(2.1)
        d = gh_json("-X", "GET", "search/repositories", "-f", f"q={q}", "-f", "per_page=100", "-f", f"page={page}")
        items = d.get("items") or []
        out += items
        if len(items) < 100 or len(out) >= d.get("total_count", 0):
            break
    return out


def search_all(base: str) -> list[dict]:
    """Split by star range when a query would pass GitHub's 1,000-result cap."""
    time.sleep(2.1)
    total = gh_json("-X", "GET", "search/repositories", "-f", f"q={base} stars:>=1000", "-f", "per_page=1").get("total_count", 0)
    if total <= 1000:
        return search(f"{base} stars:>=1000") if total else []
    return [r for lo, hi in ((1000, 1999), (2000, 3999), (4000, 9999), (10000, 10**7))
            for r in search(f"{base} stars:{lo}..{hi}")]


def links_in(text: str) -> set[str]:
    out = set()
    for owner, name in GH_LINK.findall(text):
        name = re.sub(r"\.git$", "", name.rstrip("."))
        if owner.lower() not in NOT_REPOS and name and not name.startswith("."):
            out.add(f"{owner}/{name}")
    return out


def page_links(url: str) -> set[str]:
    """GitHub repo links on a JavaScript-rendered page, via Jina Reader (free, no key;
    JINA_API_KEY raises the rate limit). Firecrawl is no longer used."""
    headers = {"X-Return-Format": "markdown", "X-With-Links-Summary": "true", "X-Timeout": "30", "User-Agent": "Mozilla/5.0"}
    if os.environ.get("JINA_API_KEY"):
        headers["Authorization"] = f"Bearer {os.environ['JINA_API_KEY']}"
    time.sleep(3)  # free tier: ~20 requests a minute
    try:
        req = urllib.request.Request("https://r.jina.ai/" + url, headers=headers)
        with urllib.request.urlopen(req, timeout=90) as r:
            return links_in(r.read().decode("utf-8", "replace"))
    except Exception as e:
        log(f"  jina failed for {url}: {e}")
        return set()


def main():
    readme = (REPO / "README.md").read_text(encoding="utf-8")
    listed = {e["repo"].lower() for e in parse(readme)}
    removed_file = HERE.parent / "audit-results" / "removed-lines.json"
    removed = {r.lower() for r, _ in json.loads(removed_file.read_text())} if removed_file.exists() else set()
    log(f"listed {len(listed)}, removed by audit {len(removed)}")

    found: dict[str, dict] = {}   # lowercase name -> {"meta": search item or None, "src": set}

    def add(name, src, meta=None):
        k = name.lower()
        rec = found.setdefault(k, {"name": name, "meta": None, "src": set()})
        rec["src"].add(src)
        if meta: rec["meta"] = meta

    filt = f"pushed:>={CUTOFF} archived:false fork:false"
    for i, t in enumerate(TOPICS):
        items = search_all(f"topic:{t} {filt}")
        for it in items: add(it["full_name"], f"topic:{t}", it)
        log(f"  [{i + 1}/{len(TOPICS)}] topic:{t} -> {len(items)}  (unique so far {len(found)})")
    for kw in KEYWORDS:
        items = search_all(f"{kw} in:name,description {filt}")
        for it in items: add(it["full_name"], f"keyword:{kw}", it)
        log(f"  keyword {kw} -> {len(items)}  (unique {len(found)})")

    for lst in AWESOME_LISTS:
        d = gh_json(f"repos/{lst}/readme")
        import base64
        text = base64.b64decode(d.get("content", "")).decode("utf-8", "replace") if d.get("content") else ""
        names = links_in(text)
        for n in names: add(n, f"list:{lst}")
        log(f"  list {lst} -> {len(names)} links")

    for url in JS_PAGES:
        names = page_links(url)
        for n in names: add(n, f"web:{url}")
        log(f"  jina {url} -> {len(names)} links")

    # vet: search hits already carry metadata; everything else goes through GraphQL
    fresh = {k: v for k, v in found.items() if k not in listed and k not in removed}
    need = [v["name"] for v in fresh.values() if not v["meta"]]
    log(f"unique {len(found)}, not yet listed {len(fresh)}, GraphQL checks needed {len(need)}")
    meta = fetch_meta(need, gh_token()) if need else {}
    out = []
    for k, v in fresh.items():
        if v["meta"]:
            m = v["meta"]
            rec = {"repo": m["full_name"], "stars": m["stargazers_count"], "pushed": m["pushed_at"][:10],
                   "archived": m["archived"], "fork": m["fork"], "description": m.get("description") or "",
                   "topics": m.get("topics") or [], "language": m.get("language") or ""}
        else:
            g = meta.get(k)
            if not g: continue
            rec = {"repo": g["nameWithOwner"], "stars": g["stargazerCount"], "pushed": (g["pushedAt"] or "")[:10],
                   "archived": g["isArchived"], "fork": g["isFork"], "description": g.get("description") or "",
                   "topics": [t["topic"]["name"] for t in g["repositoryTopics"]["nodes"]],
                   "language": (g.get("primaryLanguage") or {}).get("name", "")}
        if rec["repo"].lower() in listed or rec["repo"].lower() in removed:
            continue  # renamed repo that is already listed (or was just removed) under its new name
        if rec["stars"] >= 1000 and not rec["archived"] and not rec["fork"] and rec["pushed"] >= CUTOFF:
            rec["sources"] = sorted(v["src"])
            out.append(rec)
    out.sort(key=lambda r: -r["stars"])
    (HERE / "candidates.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    by_src = {}
    for r in out:
        for s in {s.split(":")[0] for s in r["sources"]}:
            by_src[s] = by_src.get(s, 0) + 1
    log(f"DONE: {len(out)} candidates pass the bar -> phase2/candidates.json | by source: {by_src}")


if __name__ == "__main__":
    main()
