# Reddit posts, ready to paste

**Before you post:**
- Build some history first. Spend 1–2 weeks commenting helpfully in each subreddit, with no links. A new account with only self-promotion gets removed.
- Read each subreddit's sidebar rules and pick the right flair. Rules change, and some subreddits only allow promotion in a weekly thread.
- Post in **one subreddit per day at most**. Each post below is already rewritten for its audience; don't paste the same text twice.
- Don't put the link in the title. The value goes in the post, and the link comes at the end.
- Reply to every comment in the first 2 hours. Thank critics, and turn their feedback into fixes.
- Say you made it ("I maintain this list"). Hiding it gets you banned.
- Post these by hand, not through Muse or a scheduler.

Star counts are as of 28 Sep 2026. Update them if you post much later.

---

## 1. r/AI_Agents: the broad post (post first)

**Flair:** Resource (or whatever the sidebar says for projects)

**Title:** I mapped ~3,000 open-source tools for building AI agents into 29 layers. A few things surprised me.

**Body:**

I got tired of 40 open tabs every time I needed a memory layer or an MCP server, so I started keeping a list. It grew to 2,990 tools in 29 categories, and I sorted everything by GitHub stars to see where the community's attention actually goes.

Things that surprised me:

1. **Skills and context engineering (3.8M combined stars) beat coding agents themselves (3.5M).** What you put in front of the agent (skills, CLAUDE.md/AGENTS.md files, methodology) gets more attention than which agent you use.
2. **Model gateways are the most crowded category: 189 tools.** Everyone is building a router or a proxy. Only 12 of them made my hand-picked shortlist.
3. **Memory is still unsolved.** The top memory projects are split between code knowledge graphs (graphify, codegraph) and general memory layers (mem0, MemPalace). Nobody has won.
4. **Popularity is uneven.** 866 of the tools have 10k+ stars, but more than 1,000 have under 1k. Stars measure attention, not quality, which is why the top of each category is hand-picked and marked separately.

I organised it as a stack: how you build (coding agents, skills), what you build with (frameworks, memory, RAG, MCP), what agents act on (sandboxes, browsers, documents), where tokens come from (gateways, free APIs, local inference), and how you ship (evals, observability, deployment).

There's a searchable website where every category can be sorted by stars: https://tayyabimam1.github.io/awesome-ai-agent-stack/

Full disclosure: I maintain it. It's free, open source (CC BY 4.0), and generated from one README, so adding a tool is just a PR.

**What would you add, and which category do you think is ranked wrong?**

---

## 2. r/LLMDevs: technical angle

**Title:** The MCP and memory tools developers star most, ranked (plus what I'd actually use)

**Body:**

I've been ranking agent tooling by GitHub stars across 29 categories. Here are two categories this sub asks about all the time.

**MCP servers and tool integration (137 tools)**, top by stars:
- punkpeye/awesome-mcp-servers (95.6k): the directory everyone uses to find servers
- modelcontextprotocol/servers (90.6k): the reference servers
- HKUDS/CLI-Anything (50.7k): wraps any software as a CLI an agent can drive
- microsoft/playwright-mcp (37.6k): browser automation over MCP using accessibility snapshots
- github/github-mcp-server (33.2k): the official GitHub server
- ComposioHQ/composio (30.3k): 250+ integrations with auth handled for you

**Memory (117 tools)**, hand-picked only:
- Graphify-Labs/graphify (121.7k): codebase + docs + PDFs into a queryable graph
- thedotmack/claude-mem (94.8k): cross-session memory for Claude Code and other agents
- colbymchenry/codegraph (72.2k): pre-indexed code graph that stays in sync
- mem0ai/mem0 (66k): drop-in memory layer for agents and apps
- MemPalace/mempalace (59.3k): benchmark-focused open-source memory

My take: for coding agents, a code-graph tool plus claude-mem covers most needs. For product agents, start with mem0 and only move to something heavier when you can measure the gap.

Every category is sortable by stars on the site: https://tayyabimam1.github.io/awesome-ai-agent-stack/mcp-servers-tool-integration.html. I maintain it; it's free and open source.

What are you using for agent memory in production?

---

## 3. r/LocalLLaMA: local-first angle only

**Flair:** Resources

**Title:** Local inference, gateways and free tiers: the most-starred tools, ranked (134 in the local category alone)

**Body:**

I maintain a map of AI agent tooling and pulled out the parts relevant here. Ranked by GitHub stars, hand-picked entries only:

**Local models and inference**
- ollama (181.8k): run models locally with one command
- huggingface/transformers (166.7k): the model library
- open-webui (153.3k): self-hosted chat UI for Ollama and OpenAI-compatible backends
- llama.cpp (129.6k): CPU/GPU inference; the engine under most local tooling
- vLLM (92.8k): high-throughput serving with paged attention
- unsloth (76.8k): fast, memory-efficient fine-tuning
- LlamaFactory (75.1k): unified fine-tuning for 100+ LLMs and VLMs
- LocalAI (49.3k): run LLMs, vision, voice and image models on any hardware, no GPU required

There are also sections for model gateways (189 tools, the most crowded category) and hardware fit.

The list: https://tayyabimam1.github.io/awesome-ai-agent-stack/local-models-inference-hardware.html. Disclosure: I made it; it's free and open source.

What's missing? I'm especially looking for serving tools that handle multi-GPU on consumer cards well.

---

## 4. r/LangChain

**Title:** Every agent framework competing with (or built on) LangChain, ranked by stars

**Body:**

I track 163 agent frameworks and orchestration tools. The top of the list by GitHub stars:

- langgenius/dify (157.3k): visual builder for agentic workflows and RAG pipelines
- langflow-ai/langflow (155.3k): drag-and-drop builder for LangChain flows
- langchain-ai/langchain (147.1k): still the integration ecosystem everyone builds on
- TauricResearch/TradingAgents (108.8k): multi-agent trading framework; a good study in role-specialised agents
- bytedance/deer-flow (83k): long-horizon "SuperAgent" harness that researches, codes and creates
- FoundationAgents/MetaGPT (70.6k): multi-agent "software company"

Two of the top three are visual builders on top of or around LangChain. Low-code isn't a side-show; it's where most of the attention is.

Full ranking (163 tools), sortable: https://tayyabimam1.github.io/awesome-ai-agent-stack/agent-frameworks-orchestration.html. I maintain it; free and open source.

For those running LangGraph in production: what made you pick it over the visual builders?

---

## 5. r/ClaudeAI

**Flair:** check the sidebar for the project/resource flair

**Title:** I ranked 157 Claude Code skills, plugins and context-engineering tools by stars

**Body:**

The biggest surprise from ranking ~3,000 agent tools: the **skills, plugins and context-engineering** category has more combined GitHub stars (3.8M) than coding agents themselves (3.5M). People care more about what goes in front of Claude than which harness runs it.

This category covers skill frameworks and methodology, single-file behaviour-shaping skills, and plugin and skill directories. There's also a Coding Agents section (145 tools) with Claude Code, Codex, OpenCode, Gemini CLI and the orchestration layers on top of them.

Browse it sorted by stars: https://tayyabimam1.github.io/awesome-ai-agent-stack/skills-plugins-context-engineering.html. I maintain it; it's free and open source, and new skills are a PR away.

Which skill changed how you use Claude Code the most?

---

## 6. r/AgentsOfAI

**Flair:** I Made This 🤖

**Title:** I made a searchable map of 2,990 agent tools, ranked by GitHub stars

**Body:**

What it is: 29 categories covering the whole agent stack, from coding agents and skills through frameworks, memory, RAG and MCP to gateways, local inference, evals and deployment.

What makes it different from other lists:
- Every category can be sorted by GitHub stars.
- The top of each category is hand-picked (556 entries), separate from the wider screened list.
- There's a search across everything (press `/`).
- A "Starter Stacks" page gives three ready combinations for free, production and enterprise builds.

Site: https://tayyabimam1.github.io/awesome-ai-agent-stack/
Repo: https://github.com/tayyabimam1/awesome-ai-agent-stack

Feedback welcome, especially on categories that feel wrong.

---

## 7. r/opensource

**Title:** An open-source (CC BY 4.0) map of the AI agent ecosystem, generated from a single README

**Body:**

I built a curated list of 2,990 AI agent tools and wanted it to be easy to maintain in the open, so the whole website is generated from one Markdown README:

- A Python script parses the README into JSON.
- A small React app renders it: categories, search, sorting by stars.
- A GitHub Action rebuilds and publishes to GitHub Pages on every merge.

That means a contribution is just a one-line PR to README.md. No website knowledge needed.

Site: https://tayyabimam1.github.io/awesome-ai-agent-stack/
Repo: https://github.com/tayyabimam1/awesome-ai-agent-stack

Happy to answer questions about the setup, or take suggestions on how to make contributing easier.

---

## 8. r/coolgithubprojects

**Title:** awesome-ai-agent-stack: 2,990 AI agent tools in 29 categories, ranked by stars, with a searchable site

**Body:**

https://github.com/tayyabimam1/awesome-ai-agent-stack

A curated, layer-by-layer map of AI agent tooling: coding agents, skills, frameworks, memory, RAG, MCP servers, sandboxes, gateways, local inference, evals and deployment. The website (https://tayyabimam1.github.io/awesome-ai-agent-stack/) lets you search everything and sort any category by GitHub stars.

---

## 9. r/SideProject

**Title:** My side project: a map of 2,990 AI agent tools, because I kept losing track

**Body:**

The problem: every week there's a new agent framework, memory layer or MCP server, and I kept losing track of what does what.

What I built: a curated list, sorted into 29 layers of the agent stack and ranked by GitHub stars, plus a website to search and browse it.

- Built with: a Python script (README → JSON), React + Vite + Tailwind, and GitHub Actions + GitHub Pages. No servers, no cost.
- What I learned: the hard part isn't collecting links, it's saying no. Stars aren't quality, so the top of each category is hand-picked and marked separately.

https://tayyabimam1.github.io/awesome-ai-agent-stack/

What would make you come back to a site like this?
