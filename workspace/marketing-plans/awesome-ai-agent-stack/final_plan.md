# Marketing plan: Awesome AI Agent Stack

*v1 · 2026-10-21 · Built with the marketingskills library (product-marketing, marketing-plan, launch, programmatic-seo, ai-seo, directory-submissions, co-marketing, community-marketing, social, marketing-loops). Context: `.agents/product-marketing.md`.*

## 1. Executive summary

**Where we are:** 31 stars, about 208 unique visitors per 2 weeks, about 15% of visitors star. Reddit has sent most of the traffic so far, and the Reddit account is currently flagged. The list has 3,313 tools; Phase 2 (3,671 vetted additions, about 6,900 total) is ready but unreleased.

**Three big bets**
1. **Make Phase 2 the launch moment.** "6,900 open-source AI tools, every one checked against the GitHub API and two LLM judges" is a story. Release it once, then launch it across borrowed channels in one week (§4, §9).
2. **Turn the dataset into search and AI-answer traffic.** We own proprietary, structured data (tool, layer, stars, activity). Programmatic pages ("best open-source MCP servers", "LlamaIndex alternatives") plus `llms.txt` make the site the page Google and ChatGPT cite. This is the compounding asset (§4).
3. **Turn every listed project into a distributor.** 6,900 maintainers are the referral loop: a "Featured in" badge, tagged social posts, and a weekly "new this week" digest that they reshare (§7).

**90-day priorities:** release Phase 2 → ship tool pages + `llms.txt` → launch week → weekly digest loop.
**Goal:** 100 stars in 30 days and 1,000 in 12 months, with no reliance on any single channel.

## 2. Strategic frame

- **Category claim:** "The AI agent stack, mapped": the layer-by-layer reference for open-source AI tooling. Not "another awesome list".
- **ICP:** developers and AI engineers choosing tools for an agent system; coding-agent power users looking for skills, plugins and MCP servers; tool authors who want visibility.
- **Model:** free and open source (CC BY 4.0). The conversion is a GitHub star; secondary conversions are site visits, suggestions and contributions.
- **Market-quality gate:** the problem ("which tool for this layer?") is **medium size × high frequency**: developers hit it every new project and every week the space changes. That favours compounding search and loop assets over one-off spikes.
- **Voice non-negotiables:** plain, builder-to-builder, honest numbers. Never "ultimate", "revolutionary" or "AI-powered". No star-begging without giving value first.

## 3. Current state (scored from materials)

| Area | Score /5 | Notes |
|---|---|---|
| Product quality | 4 | Large, audited, ranked list; modern site with search |
| Positioning | 3 | Clear one-liner; no verbatim customer language yet |
| Owned channels | 2 | Site and repo only; no RSS, no newsletter, no digest |
| Rented channels | 1 | Reddit flagged; no X, Bluesky or LinkedIn presence yet |
| Borrowed channels | 1 | No newsletters, podcasts or roundups yet |
| SEO | 2 | Per-category pages, sitemap and JSON-LD; no per-tool pages; Search Console not verified |
| AI-search visibility | 1 | No `llms.txt`; unknown citation status |
| Referral | 1 | No badge or maintainer loop |
| Measurement | 2 | GitHub traffic only (14 days); no site analytics |
| Automation | 4 | Trending finder, audits, gateway judges, Postiz deployed on Instabox |

**Done already (worth acknowledging):** site redesign and SEO, 4 draft articles and 9 Reddit drafts in `content-kit/`, Phase 2 pipeline, audit pipeline, Postiz deployed.
**Stuck:** Reddit account flagged; content kit numbers are stale (2,990 tools, Starter Stacks); Postiz sleeps when Instabox pauses after 30 minutes idle.

## 4. Acquisition

**Owned (build first, everything points here)**
- **Site + README.** Release Phase 2 with per-category files (the README is near GitHub's ~500 KB display limit).
- **Programmatic SEO (programmatic-seo: Curation + Directory + Profiles + Comparisons playbooks).**
  - 29 category pages exist. Add **one page per tool** (`/tool/owner-repo.html`): what it does, layer, stars, last push, and "alternatives" (same sub-group, ranked). About 6,900 pages of unique data, built from `data.json` at build time.
  - Add sub-group pages ("best open-source MCP gateways") where a sub-group has 10+ tools.
  - Quality rule: every page carries data the visitor can't get from the GitHub page alone (rank, layer, alternatives). Noindex anything thin.
- **AI search (ai-seo).** Add `llms.txt` and `llms-full.txt` (the whole stack as markdown), keep category pages extractable (a definition sentence and a ranked table at the top), and check monthly whether ChatGPT, Perplexity and Claude cite the site for "best open-source MCP servers" and "AI agent frameworks list".
- **Weekly RSS feed** of new additions (cheap, owned, and readers and aggregators pick it up).

**Rented (pick two, drive traffic back to owned)**
- **X**, personal account: "top 5 in a layer" threads tagging maintainers; one per week by hand.
- **Bluesky**, project account: the automated weekly digest via Postiz (the only fully automated channel).
- **Reddit:** by hand only, after the flag clears; one subreddit per day; lead with an insight.
- **LinkedIn**, optional: one "what I learned building this" post per 2 weeks.

**Borrowed**
- **Hacker News:** one normal post of the data article ("What 6,900 open-source AI agent tools tell us"), 8 to 10am US Eastern.
- **Newsletters:** TLDR AI, Console.dev, The Rundown (its tool directory), Ben's Bites. Pitch the data angle, not the list.
- **Directories (directory-submissions):** DevHunt (developer tools), Indie Hackers, AlternativeTo, and AI directories that include open source (AIStage, Good AI Tools). Product Hunt only with the 3-week prep, after Phase 2.
- **Other awesome lists:** PRs to add the list to related lists (lists-of-lists, MCP lists, LLM lists). Backlinks last for years.
- **`sindresorhus/awesome`:** long shot. The 6,900-entry size and bot-assisted curation clash with its "best, not everything" rule.

## 5. Activation (visitor → star)

- Star button visible on every page (done); add a one-line "why star" hint ("get the weekly additions in your GitHub feed").
- README: keep the first screen to the value line, website link and three standout categories. Move long text below.
- Every rented post links to a specific category page, not the home page (higher intent, better conversion).
- Track: star conversion = new stars ÷ unique visitors (now ~15%; target 15–20%).

## 6. Retention (come back)

- **Weekly "new this week" GitHub release** (watchers get notified) plus the RSS feed plus the Bluesky digest, all generated from the same diff.
- **"Recently added" section on the site home** (freshness signal for humans and crawlers).
- Later: a free newsletter (Buttondown or similar) once there are 200+ stars.

## 7. Referral (users bring users)

- **Maintainer badge (co-marketing):** "Featured in Awesome AI Agent Stack". Offer the badge snippet on each tool page. Don't open issues on listed repos (that's spam on GitHub); invite maintainers through the social posts that tag them.
- **Tag authors** in every "top 5" thread; their reshares are the biggest free amplifier.
- **Contributors:** the on-site suggest form and issue templates are already live. Thank contributors in release notes.

## 8. Revenue

Not a goal. Open decision: GitHub Sponsors later, if it doesn't compromise the list's neutrality. No paid placements, ever; that would break trust.

## 9. 90-day roadmap (owner: Tayyab; automation: Claude + GitHub Actions)

| Weeks | Focus | Moves | AARRR |
|---|---|---|---|
| 1–2 | Unblock | Release Phase 2 (per-category files); refresh content kit numbers; Postiz keep-awake job; verify Google Search Console + submit sitemap; set up the X and Bluesky accounts | Acq/Act |
| 3–4 | Foundation | Ship tool pages + `llms.txt` + RSS; badge snippet; weekly digest pipeline (draft issue → approve → Postiz → Bluesky) | Acq/Ret/Ref |
| 5–8 | Velocity | Launch week: data article on dev.to + HN; X thread per day for 5 days; newsletter pitches; DevHunt + directories; awesome-list PRs; Reddit by hand if the flag has cleared | Acq |
| 9–12 | Compound | Weekly digest loop running; one article per category per week (29 weeks of content); monthly AI-citation check; double down on the best two referrers | All |

## 10. 12-month outlook

- **Q1:** 100 → 300 stars; tool pages indexed; first newsletter mentions.
- **Q2:** 300 → 600; ranking for "best open-source [layer]" terms; cited by at least one AI engine for a category query.
- **Q3–Q4:** 600 → 1,000+; contributors adding tools; consider the main awesome list and a Product Hunt launch with a proper prep cycle.
- Budget stays about $0. The only cost is a small always-on VPS for Postiz if Instabox's idle pause can't be worked around.

## 11. Marketing operations stack

| Stage | Skills | Tools |
|---|---|---|
| Acquisition | launch, programmatic-seo, ai-seo, schema, directory-submissions, social, content-strategy | Vite site build, GitHub Pages, Google Search Console, Postiz (X, Bluesky) |
| Activation | copywriting, cro | Site star CTA, README |
| Retention | marketing-loops, emails (later) | GitHub Releases, RSS, Postiz digest |
| Referral | co-marketing, community-marketing, referrals | Badge snippet, tagged threads |
| Data | — | `find_trending.py`, audit `run.py`, Phase 2 scripts, FreeLLMAPI gateway |

## 12. Tactical idea bank (selected)

| Idea | Status |
|---|---|
| Programmatic tool + alternatives pages | Now |
| `llms.txt` / AI citation checks | Now |
| Weekly digest loop (release + RSS + Bluesky) | Now |
| Maintainer badge | Now |
| Data article + HN | Launch week |
| Newsletter pitches, DevHunt, directories, awesome-list PRs | Launch week |
| Product Hunt | Q3+ (needs 3-week prep) |
| Own newsletter | Q2 (after 200 stars) |
| YouTube walkthrough of the stack | Q3+ |
| Paid ads, giveaways, cold email | Skip: wrong fit for a free developer list |
| Automated Reddit posting | Skip permanently (learning logged) |

## 13. Measurement, decisions, appendix

- **North star:** new GitHub stars per week.
- **Leading indicators:** unique visitors (GitHub traffic + site analytics), referrer mix, star conversion, Search Console impressions for category and tool pages, AI-citation checks, digest reshares.
- **Weekly review (15 minutes):** stars, visitors, top referrers; one keep / kill / double-down call.

**Open decisions**
1. Reddit account status: suspended (don't post from another account) or only filtered?
2. Handles: personal on X and LinkedIn, project on Bluesky?
3. Postiz hosting: keep on Instabox with a keep-awake job, or move to a VPS?
4. Release timing for Phase 2 (it gates the launch week).
5. Site analytics: add a privacy-friendly counter (GoatCounter or Umami)?

**Appendix:** `.agents/product-marketing.md` (context), `content-kit/` (drafts to refresh), `phase2/` (release data), `.claude/skills/` (marketing skills).
