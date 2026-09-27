# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A curated "awesome list" of AI agent tooling. **`README.md` is the source of truth.** Everything in `docs/` is generated from it and published to GitHub Pages at https://tayyabimam1.github.io/awesome-ai-agent-stack/.

## Commands

```sh
python scripts/build_site.py      # README.md -> web/public/data.json (+ sitemap, robots); stdlib only
cd web && npm install             # once
cd web && npm run dev             # local dev server at http://localhost:5173/awesome-ai-agent-stack/
cd web && npm run build           # typecheck + build the site into ../docs/
```

Run the Python step before `dev` or `build`: the generated files in `web/public/` are gitignored. There are no tests. `npm run build` runs `tsc --noEmit`, so a clean build means it typechecks.

## Architecture

Two stages: Python parses, React renders.

- `scripts/build_site.py` parses README.md into `web/public/data.json`:
  - Every `## Heading` becomes a section (a "layer"), except those in `SKIP_SECTIONS`. Its slug (`slugify(title)`) is also its page URL, `<slug>.html`.
  - An entry is any line matching `- [name](url) - description`. A bold-only line (`**Title**`) starts a new group of entries; `**More**` starts the screened list. Markdown tables and plain paragraphs are kept as blocks too (Starter Stacks is a table).
  - Inline markdown (links, bold, italics, code) is turned into HTML by `md_inline`, which escapes first and only allows http(s)/`#` links. The React side renders that HTML with `dangerouslySetInnerHTML`. Keep all HTML generation in `md_inline`.
  - `TIERS` sorts sections into the tiers of the stack map (home page and sidebar). A slug that isn't listed lands in the last tier, "Further reading". Add a new section's slug to the right tier.
  - Star counts come from `site-data/stars.json` (`owner/repo` -> count, looked up case-insensitively). No script in the repo updates it.
- `web/` is a Vite + React + TypeScript + Tailwind v4 + Motion app:
  - `src/data.ts` fetches `data.json` once and holds the shared types, search ranking and tier colours.
  - `src/components/`: `Layout` (header, theme toggle, scroll progress), `Home` (hero, stack map, most-starred), `Layer` (layer page with sidebar, filter and sort), `CommandPalette` (Ctrl K or `/` searches every tool), `ui` (animated primitives).
  - Routing uses `BrowserRouter` with base `/awesome-ai-agent-stack/`. GitHub Pages has no SPA rewrites, so the `perPageHtml` plugin in `vite.config.ts` copies `index.html` to one `<slug>.html` per layer (each with its own title and description) plus `404.html`.
  - Colours are CSS variables in `src/index.css`. `--bg`, `--ink`, etc. switch with the `.dark` class. The stack's tier colours are `t0`–`t6`, a spectrum from deep blue to amber.
- `.github/workflows/site.yml` runs the Python step and `npm run build` on every push to `main` that touches README, the script, stars.json or `web/`. It then commits `docs/` as `github-actions[bot]`. Hand edits to `docs/` get overwritten.

## README conventions (from CONTRIBUTING.md)

- Entry format: `- [owner/repo](https://github.com/owner/repo) - One-line description ending in a period.` Keep descriptions under about 100 characters. Say what the tool does. Don't add star counts, badges, or emoji.
- Each section has hand-picked entries at the top, then a `**More**` list of entries that pass a mechanical bar (public, not archived, pushed in the last 18 months).
- Entries don't need to be alphabetical; put them where they fit. A new section needs an issue first, and a matching line in the `## Contents` TOC.
