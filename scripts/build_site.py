#!/usr/bin/env python3
"""Build the GitHub Pages site in docs/ from README.md.

Static, no-framework site (works on plain GitHub Pages):
  - docs/index.html          home: hero, stats, search, layer cards
  - docs/<slug>.html        one page per README ## section
  - docs/assets/style.css   theme
  - docs/assets/app.js      instant search
  - docs/data.json          search index (name, url, desc, stars, section)

Star counts come from site-data/stars.json when present.
Idempotent: run `python scripts/build_site.py` from the repo root.
"""
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
DOCS = ROOT / "docs"
ASSETS = DOCS / "assets"
STARS_FILE = ROOT / "site-data" / "stars.json"

REPO = "tayyabimam1/awesome-ai-agent-stack"
REPO_URL = f"https://github.com/{REPO}"
SITE_URL = f"https://{REPO.split('/')[0]}.github.io/{REPO.split('/')[1]}/"
TAGLINE = ("A curated, layer-by-layer map of the tools I actually use to build "
           "AI agents \u2014 from the coding agent in your terminal down to the "
           "model serving the tokens.")

SKIP_SECTIONS = {"Contents", "License"}

ICON_KEYWORDS = [
    ("starter", "\U0001f680"), ("coding", "\u2328\ufe0f"), ("skill", "\U0001f9e9"),
    ("framework", "\U0001f3d7\ufe0f"), ("memory", "\U0001f9e0"), ("rag", "\U0001f50d"),
    ("retrieval", "\U0001f50d"), ("mcp", "\U0001f50c"), ("tool integration", "\U0001f50c"),
    ("sandbox", "\U0001f4e6"), ("browser", "\U0001f310"), ("document", "\U0001f4c4"),
    ("ingestion", "\U0001f4c4"), ("workflow", "\u2699\ufe0f"), ("automation", "\u2699\ufe0f"),
    ("gateway", "\U0001f310"), ("routing", "\U0001f310"), ("free", "\U0001f381"),
    ("local", "\U0001f4bb"), ("inference", "\U0001f4bb"), ("hardware", "\U0001f4bb"),
    ("eval", "\U0001f4ca"), ("observability", "\U0001f4ca"), ("production", "\U0001f680"),
    ("reference", "\U0001f3db\ufe0f"), ("ui", "\U0001f3a8"), ("application layer", "\U0001f3a8"),
    ("learning", "\U0001f4da"), ("voice", "\U0001f399\ufe0f"), ("speech", "\U0001f399\ufe0f"),
    ("audio", "\U0001f3a7"), ("vision", "\U0001f441\ufe0f"), ("multimodal", "\U0001f441\ufe0f"),
    ("image", "\U0001f3ac"), ("video", "\U0001f3ac"), ("creative", "\U0001f3a8"),
    ("computer use", "\U0001f5b1\ufe0f"), ("gui", "\U0001f5b1\ufe0f"),
    ("guardrail", "\U0001f6e1\ufe0f"), ("safety", "\U0001f6e1\ufe0f"),
    ("structured", "\U0001f9f1"), ("chat", "\U0001f4ac"), ("deploy", "\u2601\ufe0f"),
    ("serving", "\u2601\ufe0f"), ("mlops", "\u2601\ufe0f"), ("data", "\U0001f5c2\ufe0f"),
    ("dataset", "\U0001f5c2\ufe0f"), ("domain", "\U0001f3e6"), ("finance", "\U0001f3e6"),
    ("health", "\U0001f3e5"), ("assistant", "\U0001f916"), ("copilot", "\U0001f916"),
    ("interpretability", "\U0001f52c"), ("alignment", "\U0001f52c"),
    ("research", "\U0001f52c"), ("developer tools", "\U0001f6e0\ufe0f"),
    ("utilities", "\U0001f6e0\ufe0f"), ("other", "\U0001f4d1"), ("contribut", "\U0001f91d"),
]


def icon_for(title: str) -> str:
    t = title.lower()
    for kw, icon in ICON_KEYWORDS:
        if kw in t:
            return icon
    return "\u25c6"


def slugify(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-") or "section"


def fmt_stars(n) -> str:
    if not n:
        return ""
    if n >= 1000:
        v = n / 1000
        return f"{v:.1f}k".replace(".0k", "k")
    return str(n)


def parse_sections(text: str):
    chunks = re.split(r"(?m)^## (.+?)\s*$", text)
    out = []
    for i in range(1, len(chunks), 2):
        title = chunks[i].strip()
        body = chunks[i + 1] if i + 1 < len(chunks) else ""
        if title not in SKIP_SECTIONS:
            out.append((title, body.strip("\n")))
    return out


def parse_entries(body: str, stars: dict):
    entries = []
    for line in body.splitlines():
        m = re.match(r"^\s*-\s*\[([^\]]+)\]\(([^)]+)\)\s*-?\s*(.*)$", line)
        if not m:
            continue
        name, url, desc = m.group(1).strip(), m.group(2).strip(), m.group(3).strip()
        if url.startswith("#"):
            continue  # TOC-style anchor link, not a tool
        star_count = 0
        gm = re.match(r"https?://github\.com/([^/]+/[^/#?]+)", url)
        if gm:
            star_count = stars.get(gm.group(1).rstrip("/").lower(), 0) or 0
        entries.append({"name": name, "url": url, "desc": desc, "stars": star_count})
    return entries


def tagline_of(body: str) -> str:
    for line in body.splitlines():
        line = line.strip()
        m = re.match(r"^\*(.+)\*$", line)
        if m and len(m.group(1)) > 10:
            return m.group(1).strip()
    return ""

import html as _html  # noqa: F401  (re-exported for clarity)
from site_assets import CSS, JS


def esc(s: str) -> str:
    return _html.escape(s or "", quote=True)


def chrome(title: str, body: str, page_desc: str = "") -> str:
    desc = esc(page_desc or TAGLINE)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)} \u2014 Awesome AI Agent Stack</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>\U0001f916</text></svg>">
</head>
<body>
<nav class="nav"><div class="wrap nav-inner">
  <a class="logo" href="index.html"><b>\u25b2</b> AI Agent Stack</a>
  <div class="nav-links">
    <a href="index.html#layers">Layers</a>
    <a href="starter-stacks.html">Starter Stacks</a>
    <a href="contributing.html">Contribute</a>
  </div>
  <div class="nav-search" data-search>
    <input type="text" placeholder="Search 3,000+ tools\u2026  ( / )" autocomplete="off">
    <div class="results"></div>
  </div>
</div></nav>
{body}
<footer class="footer"><div class="wrap">
  <a href="{REPO_URL}">GitHub</a>
  <a href="contributing.html">Contributing</a>
  <a href="{REPO_URL}#license">CC0-1.0 license</a>
  <span class="right">Generated from the README \u2014 every link verified.</span>
</div></footer>
<script src="assets/app.js"></script>
</body>
</html>
"""


def home_page(sections, total_entries, total_github) -> str:
    cards = []
    for s in sections:
        if s["slug"] == "contributing":
            continue
        blurb = esc(s["tagline"]) or f"{len(s['entries'])} curated entries"
        count = (f'<span class="count">{len(s["entries"])} entries \u2192</span>'
                 if s["entries"] else "")
        cards.append(
            f'<a class="card" href="{s["slug"]}.html">'
            f'<div class="icon">{s["icon"]}</div>'
            f"<h3>{esc(s['title'])}</h3><p>{blurb}</p>{count}</a>")
    body = f"""
<header class="hero"><div class="wrap">
  <span class="pill"><span class="dot"></span>{total_entries:,}+ tools \u00b7 {len(sections)} chapters \u00b7 0 dead links</span>
  <h1>Every tool for building<br><span class="grad">AI agents.</span> One map.</h1>
  <p class="sub">{esc(TAGLINE)}</p>
  <div class="hero-search" data-search>
    <input type="text" placeholder="Try \u201cmemory\u201d, \u201cmcp server\u201d, \u201ceval\u201d\u2026" autocomplete="off">
    <div class="results"></div>
  </div>
</div></header>
<main class="wrap">
  <div class="stats">
    <div class="stat"><b>{total_entries:,}</b><span>curated entries</span></div>
    <div class="stat"><b>{len(sections)}</b><span>chapters</span></div>
    <div class="stat"><b>{total_github:,}</b><span>GitHub projects</span></div>
    <div class="stat"><b>0</b><span>dead links</span></div>
  </div>
  <div class="sec-title" id="layers">
    <h2>Browse by layer</h2>
    <p>Hand-picked leaders at the top of each chapter, extended by mechanically screened lists \u2014 public, unarchived, actively maintained.</p>
  </div>
  <div class="cards">
    {"".join(cards)}
  </div>
</main>"""
    return chrome("Home", body)


def section_page(s) -> str:
    rows = []
    for i, e in enumerate(s["entries"]):
        star = (f'<span class="t-stars">\u2605 {fmt_stars(e["stars"])}</span>'
                if e["stars"] else "")
        desc = f'<span class="t-desc">{esc(e["desc"])}</span>' if e["desc"] else ""
        rows.append(
            f'<a class="tool" id="e-{i}" href="{esc(e["url"])}" target="_blank" rel="noopener">'
            f'<span class="tool-row"><span class="t-name">{esc(e["name"])}</span>'
            f"{star}{desc}</span></a>")
    body = f"""
<main class="wrap">
  <div class="page-head">
    <div class="crumb"><a href="index.html">Home</a> / Layers</div>
    <h1><span class="icon">{s["icon"]}</span>{esc(s["title"])}</h1>
    {f'<p class="tag">{esc(s["tagline"])}</p>' if s["tagline"] else ""}
    <div class="meta">{len(s["entries"])} entries \u00b7 hand-picked leaders first, then the wider screened list</div>
  </div>
  <div class="tools">
    {"".join(rows) if rows else '<div class="tool"><span class="t-desc">No entries yet.</span></div>'}
  </div>
</main>"""
    return chrome(s["title"], body, s["tagline"])


def main() -> None:
    text = README.read_text(encoding="utf-8")
    stars = {}
    if STARS_FILE.exists():
        stars = {k.lower(): v for k, v in
                 json.loads(STARS_FILE.read_text(encoding="utf-8")).items()}

    sections = []
    search_index = []
    gid = 0
    for title, body in parse_sections(text):
        entries = parse_entries(body, stars)
        sec = {"title": title, "slug": slugify(title), "icon": icon_for(title),
               "tagline": tagline_of(body), "entries": entries}
        sections.append(sec)
        for e in entries:
            search_index.append({"i": gid, "n": e["name"], "u": e["url"],
                                 "d": e["desc"][:160], "s": e["stars"],
                                 "sec": sec["slug"], "st": title})
            gid += 1

    total_entries = len(search_index)
    total_github = sum(1 for e in search_index if "/github.com/" in e["u"])

    ASSETS.mkdir(parents=True, exist_ok=True)
    (ASSETS / "style.css").write_text(CSS.strip() + "\n", encoding="utf-8")
    (ASSETS / "app.js").write_text(JS.strip() + "\n", encoding="utf-8")
    (DOCS / "data.json").write_text(json.dumps(search_index,
                                                separators=(",", ":")),
                                     encoding="utf-8")
    (DOCS / "index.html").write_text(
        home_page(sections, total_entries, total_github), encoding="utf-8")
    for s in sections:
        (DOCS / f"{s['slug']}.html").write_text(section_page(s), encoding="utf-8")

    print(f"built {len(sections)} pages | {total_entries:,} entries "
          f"| {total_github:,} github links")


if __name__ == "__main__":
    main()
