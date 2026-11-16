# Promotion Strategy: Awesome AI Agent Stack

- **Repo:** https://github.com/tayyabimam1/awesome-ai-agent-stack
- **Website:** https://tayyabimam1.github.io/awesome-ai-agent-stack/
- **Numbers to quote:** 2,990 tools · 29 categories · 41.6M combined GitHub stars

> **Ready-to-post content is in the `content-kit/` folder.** Start with `content-kit/00-plan.md`, a week-by-week calendar that links to every post, article and Muse prompt.

---

## Before you post anything

- [ ] **Upload the social preview picture to GitHub.** GitHub has no API for this, so it has to be done by hand. Go to repo **Settings → General → Social preview → Edit → Upload an image** and choose `.github/social-preview.png` (1280×640). After that, repo links on X, LinkedIn and Reddit show this card.
- [x] Website preview picture (`og-image.png`, 1200×630) updated to the new design.
- [x] README has the website badge, a screenshot, links and a star request.
- [x] Repo website link and 20 topics are set (20 is GitHub's maximum).

---

## ⚠️ Hacker News: do not use "Show HN"

Show HN is only for things people can try. **Lists and other reading material are off-topic there** ([HN rules](https://news.ycombinator.com/showhn.html)).

Submit a **normal post** (title plus link, without "Show HN"). It works best with a strong article, for example *"What 2,990 AI agent tools tell us about the stack"*. Never ask friends to upvote.

---

## The biggest opportunity: the main awesome list (from 18 October)

Being listed on [sindresorhus/awesome](https://github.com/sindresorhus/awesome) brings steady traffic for years.

| Rule | Status |
|---|---|
| List is at least 30 days old | First commit was 18 Sep, so you can submit from **18 Oct 2026** |
| No License section or license badge in the README | ✅ Fixed |
| Contents must not list Contributing or License | ✅ Fixed |
| Content license (CC0, CC BY and so on), not MIT | ✅ CC BY 4.0 |
| `awesome` and `awesome-list` topics | ✅ |
| Repo name `awesome-…`, default branch `main` | ✅ |
| Passes `awesome-lint` | ❌ **106 errors left:** 64 table formatting, 16 duplicate links, 15 broken references, 9 capitalisation, 4 bold lines used as headings, 2 unclosed quotes |
| "Curations of the best, not everything" | ⚠️ Risk: 2,990 entries with screened "More" lists. Emphasise the hand-picked top of each category. |
| Not AI-generated | ⚠️ Risk: the list must be your own curation |
| Review 4 other open pull requests first | To do on submission day |

**Pull request title:** `Add AI Agent Stack` (the title must not contain the word "Awesome")

**Entry format**, added at the bottom of the right category:
```
- [AI Agent Stack](https://github.com/tayyabimam1/awesome-ai-agent-stack#readme) - Tools for building, running and shipping AI agents.
```

After opening the pull request, comment the single word `unicorn`. The rules require it, to prove you read them.

---

## Reddit

**The unwritten rule:** at most about **1 in 10** of your posts and comments should promote your own work. Brand-new accounts that only post links get removed. Spend 1–2 weeks answering questions first.

| Subreddit | What to post | Notes |
|---|---|---|
| r/AI_Agents | "I mapped 2,990 agent tools by layer; here's what surprised me" | Largest agent subreddit; allows self-promotion |
| r/AgentsOfAI | Same, with the **I Made This** flair | Made for showing projects |
| r/LLMDevs | "The MCP servers and memory tools with the most stars" | Developer audience; stay technical |
| r/LocalLLaMA | Only the local models, gateways and free APIs angle | Strict: value first, no link in the title |
| r/LangChain | "Every framework that competes with or extends LangChain" | Technical framing |
| r/ClaudeAI, r/ChatGPTCoding | Coding agents and skills categories | Rules not verified; read the sidebar first |
| r/opensource, r/coolgithubprojects, r/SideProject | The website itself | Built for sharing projects; confirm rules first |

**How to post on Reddit:**
- Post in **one subreddit per day at most**, and rewrite the post for each community.
- Lead with an insight or lesson. The link supports the post; it isn't the post.
- Reply to every comment in the first 2 hours.
- Post these **by hand**, not through Muse or a scheduling tool.

---

## Blogs and other platforms

| Platform | Content | How often |
|---|---|---|
| **dev.to** | One article per category: *"The 10 most-starred MCP servers, and what each does"*. 29 categories means 29 articles. | Weekly |
| **Hashnode** | Same articles, cross-posted | Weekly |
| **Medium** | Republish a week later, with the canonical link set to dev.to | Weekly |
| **daily.dev** | Submit each new article | Weekly |
| **LinkedIn** | A personal-story post, with the link in the first comment | Weekly |
| **X / Threads** | A "top 5 in a category" thread tagging the project authors | 2× per week |
| **Hacker News** | One normal post with the strongest article | Once |

**Article ideas**, starting with the most popular categories:
1. The 10 most-starred MCP servers, and what each is for
2. Memory for AI agents: every open-source option, ranked
3. Coding agents compared: from Claude Code to OpenCode
4. RAG in 2026: vector databases, rerankers and frameworks by stars
5. The free AI agent stack: build with $0 (from Starter Stacks)
6. Local LLMs: the inference and serving tools that matter
7. How to evaluate agents: tracing and evals tools, ranked

---

## Four-week plan

| Week | Tasks |
|---|---|
| **1** | Upload the social preview. Answer questions on 2 subreddits every day, with no links. Publish article #1 (MCP servers) on dev.to. |
| **2** | Post on r/AI_Agents, then r/LLMDevs 3 days later. First LinkedIn post and X thread. Article #2 (memory). |
| **3** | r/LocalLLaMA post (local-models angle). Hacker News post (normal, not Show HN). Pull requests adding the list to related awesome lists. |
| **4 (18 Oct)** | Fix `awesome-lint`, then submit to sindresorhus/awesome. Continue one article and one LinkedIn post per week. |

---

## Using Muse (Meta's AI agent)

**What Muse can do here:**
- Draft articles, threads and posts.
- Make images with **Muse Image**.
- Read your Facebook, Instagram and Threads accounts, which are connected automatically.
- Publish or schedule to X, LinkedIn and other platforms once you add a scheduling tool such as **Postiz** as a connector. Scheduling is only documented through such a tool.

**What to do yourself:**
- Reddit posts. Each needs a human, subreddit-specific rewrite.
- Check every number Muse writes: star counts and descriptions must match the website.
- Anything submitted to the main awesome list. AI-generated content is rejected there.

### Prompts to paste into Muse

**1. Article**
> Write a dev.to article titled "The 10 most-starred MCP servers in 2026, and what each is for". Use this data: [paste the top 10 rows from https://tayyabimam1.github.io/awesome-ai-agent-stack/mcp-servers-tool-integration.html]. For each server: one sentence on what it does and who should use it. End with a link to that page. Plain, practical tone, no hype, no emojis in headings.

**2. X thread**
> Turn this article into a 6-post X thread. Post 1 is a hook with a number. Tag each project's GitHub owner. The last post links to https://tayyabimam1.github.io/awesome-ai-agent-stack/.

**3. LinkedIn post**
> Write a LinkedIn post (under 200 words) in first person: I kept losing track of AI agent tools, so I built a map of 2,990 of them in 29 categories, ranked by GitHub stars. Mention the Starter Stacks page as the place for beginners. Say the link is in the first comment. No hashtag spam; at most 3 hashtags.

**4. Image**
> Create a 1200×630 image with a dark GitHub-style background (#0d1117). Title: "Top 10 MCP servers by GitHub stars". Numbered list of the 10 names in white, with star counts in gold (#d29922). Small footer: tayyabimam1.github.io/awesome-ai-agent-stack

---

## Don't

- Post the same text everywhere on the same day. Spam filters and moderators notice.
- Buy stars or join star-exchange groups. GitHub removes fake stars.
- Ask friends to upvote on Hacker News or Reddit. That gets posts penalised.
- Argue in comments. Thank people, and turn criticism into an issue or a fix.

---

## Sources

- [Meta: Introducing Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)
- [TechCrunch: Everything new coming to Meta's AI agent Muse](https://techcrunch.com/2026/09/23/everything-new-coming-to-metas-ai-agent-muse/)
- [Postiz: Scheduling social posts from Muse](https://postiz.com/blog/meta-muse-ai-connectors-schedule-social-media-posts)
- [PostFast: Meta Muse for social media managers](https://postfa.st/blog/meta-muse-ai-social-media-managers)
- [Meta: Introducing Muse Image](https://about.fb.com/news/2026/07/introducing-muse-image-meta-ai/)
- [Hacker News: Show HN guidelines](https://news.ycombinator.com/showhn.html)
- [Syften: Hacker News posting guide](https://syften.com/blog/hacker-news-marketing/)
- [Intoru: r/LocalLLaMA self-promotion rules](https://intoru.ai/subreddits/localllama)
- [LaunchWake: r/LocalLLaMA](https://www.launchwake.com/channels/r-localllama)
- [RedditMaster: Best subreddits for AI agents](https://www.redditmaster.com/best-subreddits/for-ai-agents)
- [The Hive Index: AI agents subreddits](https://thehiveindex.com/topics/ai-agents/platform/reddit/)
- [sindresorhus/awesome pull request requirements](https://github.com/sindresorhus/awesome/blob/main/pull_request_template.md)
