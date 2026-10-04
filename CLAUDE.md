# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A curated "awesome list" of AI agent tooling. **`README.md` is the source of truth.** The website is generated from it and published to GitHub Pages at https://tayyabimam1.github.io/awesome-ai-agent-stack/.

## Commands

```sh
python scripts/build_site.py      # README.md -> web/public/data.json (+ sitemap, robots); stdlib only
cd web && npm install             # once
cd web && npm run dev             # local dev server at http://localhost:5173/awesome-ai-agent-stack/
cd web && npm run build           # typecheck + build the site into web/dist/ (gitignored)
```

Run the Python step before `dev` or `build`: the generated files in `web/public/` are gitignored. There are no tests. `npm run build` runs `tsc --noEmit`, so a clean build means it typechecks.

## Architecture

Two stages: Python parses, React renders.

- `scripts/build_site.py` parses README.md into `web/public/data.json`:
  - Every `## Heading` becomes a section (a "layer"), except those in `SKIP_SECTIONS`. Its slug (`slugify(title)`) is also its page URL, `<slug>.html`.
  - An entry is any line matching `- [name](url) - description`. A bold-only line (`**Title**`) starts a new group of entries. Markdown tables and plain paragraphs are kept as blocks too.
  - Inline markdown (links, bold, italics, code) is turned into HTML by `md_inline`, which escapes first and only allows http(s)/`#` links. The React side renders that HTML with `dangerouslySetInnerHTML`. Keep all HTML generation in `md_inline`.
  - `TIERS` groups categories into tiers, which become the headings in the sidebar. A slug that isn't listed lands in the last tier, "Further reading". Add a new section's slug to the right tier.
  - Star counts come from `site-data/stars.json` (`owner/repo` -> count, looked up case-insensitively). No script in the repo updates it.
- `web/` is a Vite + React + TypeScript + Tailwind v4 + Motion app:
  - `src/data.ts` fetches `data.json` once and holds the shared types, search ranking and star ranking (`topRepos`).
  - UI pieces in `src/components/ui.tsx` are ports of Magic UI (MagicCard, Marquee, BorderBeam, AnimatedShinyText, BlurFade, DotPattern) and a trimmed shadcn Button, recoloured to the Primer tokens. Add new ones there rather than pulling in a component library.
  - `src/components/`: `Layout` (header, theme toggle, and the category sidebar: a header button opens and closes it on every page (shut by default on home, remembered in localStorage elsewhere), a drawer on mobile), `Sidebar` (the category list), `Home` (hero with search, a marquee of the most-starred repos, and the stack: one band per tier with its category cards), `Layer` (one category, ranked by stars by default or in the README's curated order, with sub-group filter chips), `RepoList` (the GitHub-style repo row), `CommandPalette` (Ctrl K or `/` searches every tool), `ui` (animated primitives).
  - The site is star-driven: rankings come from `site-data/stars.json`, so refreshing that file reorders the site.
  - Routing uses `BrowserRouter` with base `/awesome-ai-agent-stack/`. GitHub Pages has no SPA rewrites, so the `perPageHtml` plugin in `vite.config.ts` writes one `<slug>.html` per layer plus `404.html`. Each gets its own title, description, Open Graph/Twitter tags, canonical URL and JSON-LD, and the category's tools as plain HTML inside `#root` (for crawlers; React replaces it on load). `?q=` on any URL opens search with that query (the JSON-LD SearchAction target).
  - Colours are GitHub Primer values, set as CSS variables in `src/index.css` and switched by the `.dark` class. The font is Mona Sans.
- `.github/workflows/site.yml` runs the Python step and `npm run build` on every push to `main` that touches README, the script, stars.json or `web/`, then deploys `web/dist/` with `actions/deploy-pages`. Pages' source is set to "GitHub Actions"; nothing built is committed.

## README conventions (from CONTRIBUTING.md)

- Entry format: `- [owner/repo](https://github.com/owner/repo) - One-line description ending in a period.` Keep descriptions under about 100 characters. Say what the tool does. Don't add star counts, badges, or emoji.
- Every entry sits in a bold sub-group (`**Title**`) inside its section; there is no `**More**` list. Entries must pass the bar in the README intro (public, not archived, pushed in the last 12 months, 1,000+ stars for new additions).
- Entries don't need to be alphabetical; put them where they fit. A new section needs an issue first, and a matching line in the `## Contents` TOC.
