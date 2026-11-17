# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-10-21

## Product Overview
**One-liner:** A map of 3,300+ open-source AI agent tools, sorted by layer of the stack and ranked by GitHub stars.
**What it does:** Awesome AI Agent Stack is a curated GitHub list plus a searchable website. It organises open-source AI tooling into 29 categories, from the coding agent in your terminal down to the model serving the tokens, and ranks each category by stars. Every entry passes a mechanical bar (1,000+ stars for new additions, pushed in the last 12 months, not archived) and is re-audited by scripts and LLM judges.
**Product category:** "Awesome list" / AI tools directory (how people search: "awesome ai agents", "best MCP servers", "open source AI agent frameworks", "AI agent tools list").
**Product type:** Free, open-source curated list (GitHub repo, CC BY 4.0) with a static website (GitHub Pages).
**Business model:** None. Free. Success is measured in GitHub stars, site visitors and contributors.

## Target Audience
**Target companies:** Individual developers, AI engineers and small teams building with LLMs and agents; secondarily tool authors who want visibility.
**Decision-makers:** The developer themselves (no buying committee).
**Primary use case:** "Which open-source tool should I use for X in my agent stack?" (memory, MCP server, RAG, evals, local inference…).
**Jobs to be done:**
- Find the best-known open-source option for a layer of an agent system without hours of searching.
- See what exists in a fast-moving space (MCP servers, coding agents, skills) and what is popular now.
- Bookmark one reliable reference instead of many stale lists.
**Use cases:**
- Choosing a vector DB, memory layer or agent framework for a new project.
- Discovering MCP servers and Claude Code / Codex skills and plugins.
- Learning-path reading for people new to AI engineering.

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| AI engineer building agents | Picking solid, maintained tools fast | Too many repos, many dead or hype | Ranked, maintained, layer-by-layer map |
| Coding-agent power user (Claude Code, Codex, Cursor) | Skills, plugins, MCP servers, harnesses | Scattered across dozens of lists | One place for the agent-tooling ecosystem |
| Open-source tool author | Visibility and stars | Hard to get discovered | Listed and ranked next to the big names |

## Problems & Pain Points
**Core problem:** The AI tooling space moves weekly; finding the right, maintained open-source tool for one layer takes hours.
**Why alternatives fall short:**
- Most awesome lists are unranked, stale, or mix dead repos with live ones.
- Directory sites (There's An AI For That etc.) are SaaS-heavy, not open-source/developer-focused.
- GitHub search and trending show popularity, not what layer a tool fits.
**What it costs them:** Hours of research per decision; adopting tools that get abandoned.
**Emotional tension:** Fear of missing the "obvious" tool everyone else uses; fatigue from hype.

## Competitive Landscape
**Direct:** Other awesome lists (e2b-dev/awesome-ai-agents, punkpeye/awesome-mcp-servers, Shubhamsaboo/awesome-llm-apps, hesreallyhim/awesome-claude-code) — narrower (one niche), mostly unranked, uneven maintenance.
**Secondary:** AI tool directories and aggregators (LibHunt, OSS Insight, trendshift.io) — not organised as a stack; mix SaaS; no curation bar.
**Indirect:** Asking ChatGPT/Claude, X/Reddit threads, newsletters — fast but unreliable, quickly outdated.

## Differentiation
**Key differentiators:**
- Organised as a **stack** (29 layers), not an alphabetical dump.
- **Ranked by stars** on a searchable website, with sub-groups per category.
- **Audited**: dead, archived and stale repos are removed; checked against the GitHub API and by two independent LLM judges.
- Breadth: covers coding agents, skills, MCP, RAG, memory, local models, voice, vision and more in one place.
**How we do it differently:** Scripts collect and vet; humans curate the rules; the site rebuilds from the README on every change.
**Why that's better:** One trustworthy map instead of ten partial lists.
**Why customers choose us:** Fast to scan, trustworthy freshness, covers the whole stack.

## Objections
| Objection | Response |
|-----------|----------|
| "Isn't this just another awesome list?" | It's ranked, audited and organised by layer, with a searchable site; dead repos are pruned. |
| "3,000+ tools is too many to be curated." | Every entry passes a mechanical bar and LLM-judge audit; categories are ranked so the best are at the top. |
| "AI-generated slop?" | Entries are verified against the GitHub API; rules are public; humans review disagreements. |

**Anti-persona:** People looking for SaaS AI apps for non-developers (marketing tools, consumer chat apps).

## Switching Dynamics
**Push:** Stale lists, dead links, hours lost comparing tools.
**Pull:** One ranked, current map of the whole stack.
**Habit:** Bookmarked niche lists, asking an LLM, scrolling X.
**Anxiety:** "Will this list also go stale?" (answer: automated audits and weekly additions).

## Customer Language
**How they describe the problem:** *(gap — collect verbatim from Reddit/X comments; none recorded yet)*
**How they describe us:** *(gap)*
**Words to use:** stack, layer, ranked by stars, open-source, maintained, map
**Words to avoid:** "ultimate", "best ever", "revolutionary", "AI-powered"
**Glossary:**
| Term | Meaning |
|------|---------|
| Layer / category | One of the 29 sections of the stack |
| The bar | 1,000+ stars (new additions), pushed in 12 months, not archived |

## Brand Voice
| Attribute | Means | Doesn't mean | Example line |
|-----------|-------|--------------|--------------|
| Plain | Short, concrete sentences | Dumbed down | "3,300+ tools across 29 categories, ranked by GitHub stars." |
| Builder-to-builder | Written by someone who builds with these tools | Corporate | "Start at the top with the agent that writes your code and work down to where the tokens come from." |
| Honest | Numbers we can back up | Hype | "Every link is re-checked against the GitHub API." |

**Tone by context:**
- Launch: concrete numbers, one insight, no superlatives.
- Social: "top 5 in a category" with the authors tagged.
**Terms we own:** "the AI agent stack", "layer by layer"
**Never use (and why):** "AI-powered" (meaningless), star-begging without value.

## Proof Points
**Metrics:** 3,313 tools, 29 categories, ~43M combined GitHub stars across listed repos; 31 stars, 7 forks; 208 unique visitors in the last 14 days (Reddit is ~85 of them).
**Customers:** *(gap)*
**Testimonials:** *(gap)*
**Value themes:**
| Theme | Proof |
|-------|-------|
| Breadth | 3,300+ tools now; Phase 2 adds ~3,670 vetted tools (about 6,900 total) |
| Freshness | Weekly trending finder, re-audits, dead/stale repos pruned |

## Goals
**Business goal:** Become the go-to open-source map of AI agent tooling; near-term 100 stars, then 1,000.
**Conversion action:** Star the GitHub repo (secondary: visit the site, suggest a tool).
**Current metrics:** 31 stars; ~200 unique visitors per 2 weeks; ~15% visitor-to-star conversion.

## Learnings
*Decisions and tested lessons. Newest first. Keep it to about 20 active entries.*
| Date | Learning | Evidence | Applies to | Status |
|------|----------|----------|------------|--------|
| 2026-10-21 | Automated Reddit posting (via Muse) gets posts and the account flagged; post by hand only. | Multiple posts flagged, account flagged (Oct 2026) | Reddit, social | active |
| 2026-10-21 | Reddit is the only channel that has sent meaningful traffic so far. | ~114 of ~208 uniques in 14 days from reddit referrers | Channel mix | watch |

## Changelog
*Newest first. One line per revision: what changed and why.*
- v1 (2026-10-21) — Initial context, auto-drafted from the repo, site and traffic data.
