# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A curated "awesome list" of AI agent tooling. **`README.md` is the source of truth.** Everything in `docs/` is generated from it and published to GitHub Pages at https://tayyabimam1.github.io/awesome-ai-agent-stack/.

## Commands

```sh
python scripts/build_site.py   # regenerate docs/ from README.md (run from repo root; stdlib only, no deps)
```

There are no tests, linter, or package manifest. You can build again at any time and get the same result. Check the build by reading its summary line (`built N pages | N entries | N github links`).

## Architecture

- `scripts/build_site.py` parses README.md and writes the whole static site:
  - Every `## Heading` becomes `docs/<slugify(title)>.html`, except the headings in `SKIP_SECTIONS` (`Contents`, `License`).
  - An entry is any line matching `- [name](url) - description`. Links that start with `#` (TOC anchors) are ignored.
  - A section's tagline is the first `*italic line*` in its body that is longer than 10 characters.
  - Inside a section, a bold-only line (`**Title**`) starts a new group of entries; `**More**` starts the screened list. Markdown tables and plain paragraphs are rendered too (Starter Stacks is a table).
  - `TIERS` sorts each section into a tier of the stack map on the home page and the sidebar. A slug that isn't listed lands in the last tier, "Further reading". Add a new section's slug to the right tier.
  - It also writes `index.html`, `data.json` (the search index), `404.html`, `sitemap.xml`, `robots.txt` and `favicon.svg`.
- `scripts/site_assets.py` holds the CSS and JS as Python strings. They are written to `docs/assets/style.css` and `docs/assets/app.js` (the client-side search that reads `data.json`). **Edit the assets here, never in `docs/`.**
- `site-data/stars.json` maps `owner/repo` to a star count. Lookups ignore case. No script in the repo updates this file; it is maintained outside the repo.
- `.github/workflows/site.yml` runs the build on every push to `main` that touches README, the scripts, or stars.json, then commits `docs/` as `github-actions[bot]`. Hand edits to `docs/` get overwritten.

## README conventions (from CONTRIBUTING.md)

- Entry format: `- [owner/repo](https://github.com/owner/repo) - One-line description ending in a period.` Keep descriptions under about 100 characters. Say what the tool does. Don't add star counts, badges, or emoji.
- Each section has hand-picked entries at the top, then a `**More**` list of entries that pass a mechanical bar (public, not archived, pushed in the last 18 months).
- Entries don't need to be alphabetical; put them where they fit. A new section needs an issue first, and a matching line in the `## Contents` TOC.
