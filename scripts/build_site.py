#!/usr/bin/env python3
"""Turn README.md into the data the React site in web/ renders.

Writes into web/public/ (Vite copies it to docs/ on build):
  - data.json     tiers, sections, groups and entries (descriptions as safe HTML)
  - sitemap.xml, robots.txt

Star counts come from site-data/stars.json when present.
Run from anywhere: `python scripts/build_site.py`, then `npm run build` in web/.
"""
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
PUBLIC = ROOT / "web" / "public"
STARS_FILE = ROOT / "site-data" / "stars.json"

REPO = "tayyabimam1/awesome-ai-agent-stack"
REPO_URL = f"https://github.com/{REPO}"
EDIT_URL = f"{REPO_URL}/edit/main/README.md"
SITE_URL = f"https://{REPO.split('/')[0]}.github.io/{REPO.split('/')[1]}/"
TAGLINE = ("A curated, layer-by-layer map of the tools I actually use to build "
           "AI agents — from the coding agent in your terminal down to the "
           "model serving the tokens.")

SKIP_SECTIONS = {"Contents", "License"}

# The stack map. Sections not listed here land in the last tier, so a new
# README section always shows up somewhere.
TIERS = [
    ("How you build", ["starter-stacks", "coding-agents-harnesses",
                       "skills-plugins-context-engineering", "learning-path",
                       "developer-tools-utilities"]),
    ("What you build with", ["agent-frameworks-orchestration", "memory-persistent-context",
                             "rag-retrieval", "mcp-servers-tool-integration",
                             "structured-output-guardrails-safety"]),
    ("What agents act on", ["sandboxes-browsers-computer-use", "computer-use-gui-agents",
                            "document-processing-data-ingestion", "workflow-automation",
                            "voice-speech-audio", "vision-multimodal",
                            "image-video-creative-generation", "data-datasets-synthetic-data"]),
    ("Where tokens come from", ["model-gateways-routing", "free-llm-apis-free-tiers",
                                "local-models-inference-hardware"]),
    ("How you ship", ["evaluation-observability-code-review",
                      "production-architectures-reference-systems",
                      "deployment-serving-mlops", "ui-application-layer",
                      "chat-uis-application-layer"]),
    ("Ready-made agents", ["assistants-copilots-personal-agents",
                           "domain-agents-finance-healthcare-research-more"]),
    ("Further reading", []),
]
NOT_IN_MAP = {"contributing"}

ENTRY_RE = re.compile(r"^\s*-\s*\[([^\]]+)\]\(([^)]+)\)\s*-?\s*(.*)$")
GITHUB_RE = re.compile(r"https?://github\.com/([^/]+)/([^/#?]+)")


def slugify(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-") or "section"


def esc(s: str) -> str:
    return html.escape(s or "", quote=True)


def md_inline(s: str) -> str:
    """Escape, then render the inline markdown the README uses."""
    s = esc(s)
    s = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", lambda m: '<a href="%s">%s</a>' % (
        m.group(2) if re.match(r"https?:|#", m.group(2))
        else f"{REPO_URL}/blob/main/{m.group(2)}", m.group(1)), s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)\*(?!\w)", r"<em>\1</em>", s)
    return re.sub(r"`([^`]+)`", r"<code>\1</code>", s)


def parse_sections(text: str):
    chunks = re.split(r"(?m)^## (.+?)\s*$", text)
    out = []
    for i in range(1, len(chunks), 2):
        title = chunks[i].strip()
        body = chunks[i + 1] if i + 1 < len(chunks) else ""
        if title not in SKIP_SECTIONS:
            out.append((title, body.strip("\n")))
    return out


def parse_body(body: str, stars: dict):
    """Split a section body into a tagline and ordered blocks.

    Blocks are ("group", title, entries), ("table", rows) or ("p", text).
    A bold-only line (**Title**) starts a new group; **More** is the screened list.
    """
    tagline, blocks, group, table = "", [], None, None
    for line in body.splitlines():
        s = line.strip()
        if table is not None and not s.startswith("|"):
            blocks.append(("table", table))
            table = None
        m = ENTRY_RE.match(line)
        if m:
            name, url, desc = (g.strip() for g in m.groups())
            if url.startswith("#"):
                continue  # TOC-style anchor link, not a tool
            if group is None:
                group = ("group", "", [])
                blocks.append(group)
            gm = GITHUB_RE.match(url)
            key = f"{gm.group(1)}/{gm.group(2)}".rstrip("/").lower() if gm else ""
            group[2].append({"name": name, "url": url, "desc": desc,
                             "stars": stars.get(key, 0) or 0,
                             "owner": gm.group(1) if gm else ""})
        elif re.fullmatch(r"\*\*(.+)\*\*", s):
            group = ("group", s[2:-2].strip(), [])
            blocks.append(group)
        elif re.fullmatch(r"\*(.+)\*", s) and not tagline and not blocks:
            tagline = s[1:-1].strip()
        elif s.startswith("|"):
            cells = [c.strip() for c in s.strip("|").split("|")]
            if all(re.fullmatch(r":?-+:?", c) for c in cells if c):
                continue  # header separator row
            table = (table or []) + [cells]
        elif s:
            blocks.append(("p", s))
    if table is not None:
        blocks.append(("table", table))
    return tagline, [b for b in blocks if b[0] != "group" or b[2]]


def tier_of(slug: str) -> int:
    for i, (_, slugs) in enumerate(TIERS):
        if slug in slugs:
            return i
    return len(TIERS) - 1


def main() -> None:
    text = README.read_text(encoding="utf-8")
    stars = {}
    if STARS_FILE.exists():
        stars = {k.lower(): v for k, v in
                 json.loads(STARS_FILE.read_text(encoding="utf-8")).items()}

    sections, total = [], 0
    for title, body in parse_sections(text):
        slug = slugify(title)
        tagline, blocks = parse_body(body, stars)
        out_blocks, i = [], 0
        for b in blocks:
            if b[0] == "p":
                out_blocks.append({"type": "p", "html": md_inline(b[1])})
            elif b[0] == "table":
                out_blocks.append({"type": "table",
                                   "rows": [[md_inline(c) for c in r] for r in b[1]]})
            else:
                entries = []
                for e in b[2]:
                    entries.append({"i": i, "n": e["name"], "u": e["url"], "d": e["desc"],
                                    "h": md_inline(e["desc"]), "s": e["stars"],
                                    "o": e["owner"]})
                    i += 1
                out_blocks.append({"type": "group", "title": b[1], "entries": entries})
        total += i
        sections.append({"title": title, "slug": slug, "tier": tier_of(slug),
                         "tagline": md_inline(tagline), "count": i,
                         "inMap": slug not in NOT_IN_MAP, "blocks": out_blocks})

    data = {"repo": REPO_URL, "edit": EDIT_URL, "tagline": TAGLINE, "total": total,
            "tiers": [t[0] for t in TIERS], "sections": sections}
    PUBLIC.mkdir(parents=True, exist_ok=True)
    # LF endings on every OS, so CI rebuilds don't rewrite every line
    write = lambda path, s: path.write_text(s, encoding="utf-8", newline="\n")  # noqa: E731
    write(PUBLIC / "data.json", json.dumps(data, separators=(",", ":")))
    write(PUBLIC / "robots.txt", f"User-agent: *\nAllow: /\nSitemap: {SITE_URL}sitemap.xml\n")
    urls = [""] + [f"{s['slug']}.html" for s in sections]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"  <url><loc>{SITE_URL}{u}</loc></url>" for u in urls]
    sm.append("</urlset>")
    write(PUBLIC / "sitemap.xml", "\n".join(sm) + "\n")
    print(f"{len(sections)} sections | {total:,} entries -> web/public/data.json")


if __name__ == "__main__":
    main()
