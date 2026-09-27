#!/usr/bin/env python3
"""Build the GitHub Pages site in docs/ from README.md.

Static, no-framework site (works on plain GitHub Pages):
  - docs/index.html          home: intro, search, the stack map (layers by tier)
  - docs/<slug>.html        one page per README ## section
  - docs/assets/style.css   theme
  - docs/assets/app.js      search, in-page filter and sort
  - docs/data.json          search index (name, url, desc, stars, section)

Star counts come from site-data/stars.json when present.
Idempotent: run `python scripts/build_site.py` from the repo root.
"""
import html
import json
import pathlib
import re

from site_assets import CSS, JS

ROOT = pathlib.Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
DOCS = ROOT / "docs"
ASSETS = DOCS / "assets"
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


def fmt_stars(n) -> str:
    if not n:
        return ""
    if n >= 1000:
        v = n / 1000
        return f"{v:.1f}k".replace(".0k", "k")
    return str(n)


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


def chrome(title: str, body: str, sections, page_desc: str = "",
           page_path: str = "index.html") -> str:
    desc = esc(page_desc or TAGLINE)
    full_title = f"{esc(title)} — Awesome AI Agent Stack"
    page_url = SITE_URL + page_path
    total = sum(s["count"] for s in sections)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{full_title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#f2f4f7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#10151c" media="(prefers-color-scheme: dark)">
<link rel="canonical" href="{page_url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Awesome AI Agent Stack">
<meta property="og:title" content="{full_title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{page_url}">
<meta property="og:image" content="{SITE_URL}og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{full_title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{SITE_URL}og-image.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="apple-touch-icon" href="favicon.svg">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="wrap top-inner">
  <a class="logo" href="index.html"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="3" width="16" height="3.4" rx="1"/><rect x="2" y="8.3" width="16" height="3.4" rx="1"/><rect x="2" y="13.6" width="16" height="3.4" rx="1"/></svg>AI Agent Stack</a>
  <div class="search" data-search role="search">
    <input type="search" placeholder="Search {total:,} tools" aria-label="Search all tools" autocomplete="off">
    <kbd>/</kbd>
    <div class="results" role="listbox"></div>
  </div>
  <nav class="top-links">
    <a href="{EDIT_URL}">Suggest a tool</a>
    <a class="gh" href="{REPO_URL}">Star on GitHub</a>
  </nav>
</div></header>
{body}
<footer class="foot"><div class="wrap">
  <p>Generated from the <a href="{REPO_URL}#readme">README</a>. Released under CC0-1.0. Found a dead link or a missing tool? <a href="contributing.html">Here is how to contribute.</a></p>
</div></footer>
<script src="assets/app.js"></script>
</body>
</html>
"""


def stack_map(sections) -> str:
    bands = []
    for ti, (tier, _) in enumerate(TIERS):
        layers = [s for s in sections if s["tier"] == ti and s["slug"] not in NOT_IN_MAP]
        if not layers:
            continue
        items = "".join(
            f'<li><a href="{s["slug"]}.html">{esc(s["title"])}'
            + (f'<span>{s["count"]}</span>' if s["count"] else "") + "</a></li>"
            for s in layers)
        count = sum(s["count"] for s in layers)
        bands.append(
            f'<section class="band t{ti}" id="tier-{ti}">'
            f'<h2>{esc(tier)}<small>{count:,} tools</small></h2>'
            f'<ul>{items}</ul></section>')
    return "".join(bands)


def home_page(sections, total_entries, total_github) -> str:
    body = f"""
<main id="main">
<div class="wrap intro">
  <h1>The AI agent stack, layer by layer.</h1>
  <p class="lede">{esc(TAGLINE)}</p>
  <p class="facts">{total_entries:,} tools across {sum(1 for s in sections if s["count"] and s["slug"] not in NOT_IN_MAP)} layers. The first entries in each layer are hand-picked; the rest are screened for being public, maintained and not archived.</p>
  <div class="search search-lg" data-search role="search">
    <input type="search" placeholder="Try memory, mcp server, evals, whisper" aria-label="Search all tools" autocomplete="off">
    <div class="results" role="listbox"></div>
  </div>
  <p class="start">New here? Begin with the <a href="starter-stacks.html">starter stacks</a>, three combinations that work out of the box.</p>
</div>
<div class="wrap stack">{stack_map(sections)}</div>
</main>"""
    return chrome("The AI agent stack, layer by layer", body, sections)


def sidebar(sections, current: str) -> str:
    out = []
    for ti, (tier, _) in enumerate(TIERS):
        layers = [s for s in sections if s["tier"] == ti and s["slug"] not in NOT_IN_MAP]
        if not layers:
            continue
        links = "".join(
            f'<a href="{s["slug"]}.html"{" aria-current=page" if s["slug"] == current else ""}>'
            f'{esc(s["title"])}</a>' for s in layers)
        out.append(f'<div class="side-tier t{ti}"><h3>{esc(tier)}</h3>{links}</div>')
    return ('<details class="side" data-side><summary>All layers</summary>'
            f'<nav aria-label="Layers">{"".join(out)}</nav></details>')


def entry_row(e) -> str:
    stars = (f'<span class="stars" title="{e["stars"]:,} GitHub stars">'
             f'★ {fmt_stars(e["stars"])}</span>' if e["stars"] else "")
    avatar = (f'<img src="https://avatars.githubusercontent.com/{esc(e["owner"])}?s=48" '
              f'alt="" width="24" height="24" loading="lazy">' if e["owner"]
              else f'<span class="noavatar" aria-hidden="true">{esc(e["name"][:1].upper())}</span>')
    desc = f'<p>{md_inline(e["desc"])}</p>' if e["desc"] else ""
    return (f'<li id="e-{e["i"]}" data-i="{e["i"]}" data-s="{e["stars"]}" '
            f'data-q="{esc((e["name"] + " " + e["desc"]).lower())}">{avatar}'
            f'<div><a href="{esc(e["url"])}" rel="noopener">{esc(e["name"])}</a>{desc}</div>'
            f'{stars}</li>')


def section_page(s, sections) -> str:
    parts, toc = [], []
    for bi, b in enumerate(s["blocks"]):
        if b[0] == "p":
            parts.append(f'<p class="prose">{md_inline(b[1])}</p>')
        elif b[0] == "table":
            head, *rows = b[1]
            th = "".join(f"<th>{md_inline(c)}</th>" for c in head)
            tr = "".join("<tr>" + "".join(
                f'<{"th scope=row" if ci == 0 else "td"}>{md_inline(c)}</{"th" if ci == 0 else "td"}>'
                for ci, c in enumerate(r)) + "</tr>" for r in rows)
            parts.append(f'<div class="table"><table><thead><tr>{th}</tr></thead>'
                         f'<tbody>{tr}</tbody></table></div>')
        else:
            title = b[1] or "Picks"
            gid = f"g-{bi}"
            note = ('<p class="note">Screened, not hand-tested: public, maintained in the '
                    'last 18 months, not archived.</p>' if title == "More" else "")
            toc.append(f'<a href="#{gid}">{esc(title)} <span>{len(b[2])}</span></a>')
            parts.append(
                f'<section class="group" id="{gid}"><h2>{esc(title)}'
                f'<span class="n">{len(b[2])}</span></h2>{note}'
                f'<ol class="entries">{"".join(entry_row(e) for e in b[2])}</ol></section>')

    tools = ""
    if s["count"]:
        tools = f"""<div class="tools" data-tools>
    <input type="search" placeholder="Filter this layer" aria-label="Filter tools in this layer" data-filter>
    <div class="sort" role="group" aria-label="Sort">
      <button type="button" data-sort="i" aria-pressed="true">List order</button>
      <button type="button" data-sort="s" aria-pressed="false">Most stars</button>
    </div>
    <p class="empty" hidden>Nothing in this layer matches. Try the search at the top to look across every layer.</p>
  </div>"""
    groups_nav = (f'<nav class="groups" aria-label="On this page">{"".join(toc)}</nav>'
                  if len(toc) > 1 else "")
    tier = TIERS[s["tier"]][0]
    body = f"""
<div class="wrap page">
  {sidebar(sections, s["slug"])}
  <main id="main" class="content t{s["tier"]}">
    <p class="crumb"><a href="index.html#tier-{s["tier"]}">{esc(tier)}</a></p>
    <h1>{esc(s["title"])}</h1>
    {f'<p class="lede">{md_inline(s["tagline"])}</p>' if s["tagline"] else ""}
    {groups_nav}
    {tools}
    {"".join(parts)}
  </main>
</div>"""
    return chrome(s["title"], body, sections, s["tagline"], f"{s['slug']}.html")


FAVICON_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="#16202e"/>
<rect x="12" y="13" width="40" height="9" rx="2.5" fill="#7fd0c8"/>
<rect x="12" y="27.5" width="40" height="9" rx="2.5" fill="#4fa3a5"/>
<rect x="12" y="42" width="40" height="9" rx="2.5" fill="#2f6f85"/>
</svg>
"""


def not_found_page(sections, total) -> str:
    body = f"""
<main id="main"><div class="wrap intro">
  <h1>That page isn't in the stack.</h1>
  <p class="lede">The link may be old, or the layer may have been renamed. Search the {total:,} tools above, or <a href="index.html">go back to the map</a>.</p>
</div></main>"""
    return chrome("Page not found", body, sections)


def main() -> None:
    text = README.read_text(encoding="utf-8")
    stars = {}
    if STARS_FILE.exists():
        stars = {k.lower(): v for k, v in
                 json.loads(STARS_FILE.read_text(encoding="utf-8")).items()}

    sections, search_index = [], []
    for title, body in parse_sections(text):
        slug = slugify(title)
        tagline, blocks = parse_body(body, stars)
        entries = [e for b in blocks if b[0] == "group" for e in b[2]]
        for i, e in enumerate(entries):
            e["i"] = i
            search_index.append({"i": i, "n": e["name"], "u": e["url"],
                                 "d": e["desc"][:160], "s": e["stars"],
                                 "sec": slug, "st": title})
        sections.append({"title": title, "slug": slug, "tier": tier_of(slug),
                         "tagline": tagline, "blocks": blocks, "count": len(entries)})

    total_entries = len(search_index)
    total_github = sum(1 for e in search_index if "/github.com/" in e["u"])

    ASSETS.mkdir(parents=True, exist_ok=True)
    (ASSETS / "style.css").write_text(CSS.strip() + "\n", encoding="utf-8")
    (ASSETS / "app.js").write_text(JS.strip() + "\n", encoding="utf-8")
    (DOCS / "data.json").write_text(json.dumps(search_index, separators=(",", ":")),
                                    encoding="utf-8")
    (DOCS / "index.html").write_text(
        home_page(sections, total_entries, total_github), encoding="utf-8")
    for s in sections:
        (DOCS / f"{s['slug']}.html").write_text(section_page(s, sections), encoding="utf-8")

    # public-facing extras
    (DOCS / "favicon.svg").write_text(FAVICON_SVG, encoding="utf-8")
    (DOCS / "404.html").write_text(not_found_page(sections, total_entries), encoding="utf-8")
    (DOCS / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\nSitemap: {SITE_URL}sitemap.xml\n", encoding="utf-8")
    urls = ["index.html"] + [f"{s['slug']}.html" for s in sections]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"  <url><loc>{SITE_URL}{u}</loc></url>" for u in urls]
    sm.append("</urlset>")
    (DOCS / "sitemap.xml").write_text("\n".join(sm) + "\n", encoding="utf-8")

    print(f"built {len(sections)} pages | {total_entries:,} entries "
          f"| {total_github:,} github links")


if __name__ == "__main__":
    main()
