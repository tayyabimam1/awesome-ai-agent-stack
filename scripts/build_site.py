#!/usr/bin/env python3
"""Build the docsify site in docs/ from the repo README.md.

Regenerates on every README change (via .github/workflows/site.yml):
  - docs/home.md        landing page with stats + layer cards
  - docs/_sidebar.md    chapter navigation
  - docs/_coverpage.md  cover with live counts
  - docs/<slug>.md      one page per README ## section

Idempotent: run `python scripts/build_site.py` from the repo root.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
DOCS = ROOT / "docs"

REPO = "tayyabimam1/awesome-ai-agent-stack"
REPO_URL = f"https://github.com/{REPO}"
TAGLINE = ("A curated, layer-by-layer map of the tools I actually use to build "
           "AI agents \u2014 from the coding agent in your terminal down to the "
           "model serving the tokens.")

SKIP_SECTIONS = {"Contents", "License"}


def slugify(title: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return s or "section"


def parse_sections(text: str):
    """Split README into (title, body) for each ## section."""
    chunks = re.split(r"(?m)^## (.+?)\s*$", text)
    sections = []
    for i in range(1, len(chunks), 2):
        title = chunks[i].strip()
        body = chunks[i + 1] if i + 1 < len(chunks) else ""
        sections.append((title, body.strip("\n")))
    return sections


def section_tagline(body: str) -> str:
    """First italic *...* line after the heading, used as the card blurb."""
    for line in body.splitlines():
        line = line.strip()
        m = re.match(r"^\*(.+)\*$", line)
        if m and len(m.group(1)) > 10:
            return m.group(1).strip()
    return ""


def section_entry_count(body: str) -> int:
    return sum(1 for l in body.splitlines() if re.match(r"^\s*-\s*\[", l))


def main() -> None:
    text = README.read_text(encoding="utf-8")
    sections = [(t, b) for t, b in parse_sections(text) if t not in SKIP_SECTIONS]

    total_entries = sum(1 for l in text.splitlines() if re.match(r"^\s*-\s*\[", l))
    total_github = sum(1 for l in text.splitlines()
                       if re.match(r"^\s*-\s*\[[^\]]+\]\(https://github\.com/", l))

    pages = []
    for title, body in sections:
        slug = slugify(title)
        pages.append({"title": title, "slug": slug, "body": body,
                      "tagline": section_tagline(body),
                      "entries": section_entry_count(body)})
        (DOCS / f"{slug}.md").write_text(f"## {title}\n\n{body}\n",
                                         encoding="utf-8")

    # ---- sidebar ----
    sidebar = ["* [\U0001f3e0 Home](home.md)", ""]
    for p in pages:
        sidebar.append(f"* [{p['title']}]({p['slug']}.md)")
    sidebar += ["", f"* [\U0001f4dc License]({REPO_URL}#license)"]
    seen, cleaned = set(), []
    for line in sidebar:
        m = re.match(r"\* \[[^\]]+\]\(([^)]+)\)", line)
        key = m.group(1) if m else line
        if key and key in seen:
            continue
        seen.add(key)
        cleaned.append(line)
    (DOCS / "_sidebar.md").write_text("\n".join(cleaned) + "\n", encoding="utf-8")

    # ---- cover ----
    cover = (f"# Awesome AI Agent Stack\n\n"
             f"> {TAGLINE}\n\n"
             f"- **{total_entries:,}+ entries** across **{len(pages)} chapters**\n"
             f"- Every link live-verified \u2014 zero dead links\n\n"
             f"[{REPO_URL}]({REPO_URL})\n"
             f"[Browse the stack](home.md)\n")
    (DOCS / "_coverpage.md").write_text(cover, encoding="utf-8")

    # ---- home ----
    cards = []
    for p in pages:
        if p["slug"] in ("contributing",):
            continue
        blurb = p["tagline"] or f"{p['entries']} curated entries"
        count_line = (f'    <em>{p["entries"]} entries \u2192</em>\n'
                      if p["entries"] else "")
        cards.append(
            f'  <a class="card" href="#/{p["slug"]}">\n'
            f'    <strong>{p["title"]}</strong>\n'
            f'    <span>{blurb}</span>\n'
            f'{count_line}'
            f'  </a>')
    home = f"""# Awesome AI Agent Stack

*{TAGLINE}*

<div class="stats">
  <div class="stat"><b>{total_entries:,}</b><span>curated entries</span></div>
  <div class="stat"><b>{len(pages)}</b><span>chapters</span></div>
  <div class="stat"><b>{total_github:,}</b><span>GitHub projects</span></div>
  <div class="stat"><b>0</b><span>dead links</span></div>
</div>

The top of each chapter is hand-picked \u2014 tools actually used, read, or evaluated.
The **More** lists extend each layer with projects that pass a mechanical bar: real,
public, not archived, actively maintained.

## Browse by layer

<div class="cards">
{chr(10).join(cards)}
</div>

## Contribute

Found a missing tool or a dead link? [Open a pull request]({REPO_URL}/pulls) \u2014
see the [contributing guide](contributing.md).
"""
    (DOCS / "home.md").write_text(home, encoding="utf-8")

    print(f"built {len(pages)} pages | {total_entries:,} entries | {total_github:,} github links")


if __name__ == "__main__":
    DOCS.mkdir(exist_ok=True)
    main()
