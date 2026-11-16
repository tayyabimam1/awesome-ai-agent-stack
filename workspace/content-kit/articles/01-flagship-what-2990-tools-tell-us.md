---
title: I mapped 2,990 open-source AI agent tools. Here's what the stack looks like.
published: false
description: Ranking the AI agent ecosystem by GitHub stars across 29 layers, and what the numbers say about where builders spend their attention.
tags: ai, agents, opensource, llm
cover_image: https://tayyabimam1.github.io/awesome-ai-agent-stack/og-image.png
---

<!--
Where to publish: dev.to first (flagship). Hashnode and Medium a week later with the canonical URL pointing to dev.to.
Hacker News: submit the dev.to URL as a normal post (NOT "Show HN"; lists and articles aren't allowed there).
Star counts are as of 28 Sep 2026.
-->

Every week brings a new agent framework, a new memory layer, a new MCP server. I kept losing track, so I started a list. It's now **2,990 tools in 29 categories**. When I ranked everything by GitHub stars, the numbers told a story about where builders actually spend their attention.

This post covers what I found. The full map is searchable at [awesome-ai-agent-stack](https://tayyabimam1.github.io/awesome-ai-agent-stack/).

## The agent stack, in five layers

I organise the tools as a stack, because that's how you actually assemble an agent system:

1. **How you build:** coding agents and the skills and context you feed them
2. **What you build with:** frameworks, memory, RAG, MCP and tool integration
3. **What agents act on:** sandboxes, browsers, documents, workflows
4. **Where tokens come from:** model gateways, free API tiers, local inference
5. **How you ship:** evaluation, observability, deployment, UIs

Each layer has several categories, and each category is a mix of hand-picked tools (556 in total) and a wider list screened by a mechanical bar: public, not archived, pushed in the last 18 months.

## Finding 1: context beats the agent

The category with the most combined stars in the "how you build" layer isn't coding agents. It's **skills, plugins and context engineering: 3.8M stars**, against **3.5M for coding agents**.

That matches what many teams have learned the hard way: the harness matters less than what you put in front of it. Skill files, CLAUDE.md and AGENTS.md conventions, and spec-driven methodology all change output quality more than switching from one agent to another.

**If you're choosing where to invest time, invest in context first.**

## Finding 2: everyone is building a gateway

The most crowded category is **model gateways and routing: 189 tools.** That's more than agent frameworks (163) or coding agents (145).

It makes sense: a gateway is the first thing a team builds once it uses more than one model provider. But it also means most of these projects will never reach maturity. Only 12 of the 189 made my hand-picked shortlist.

**If you need a gateway, pick one of the established ones rather than the newest.**

## Finding 3: memory is wide open

In memory and persistent context (117 tools), the top of the ranking is split between two different ideas:

- **Code knowledge graphs:** Graphify-Labs/graphify (121.7k stars) turns a codebase plus its docs into a queryable graph; colbymchenry/codegraph (72.2k) keeps a pre-indexed code graph in sync.
- **General memory layers:** thedotmack/claude-mem (94.8k) for cross-session memory in coding agents; mem0ai/mem0 (66k) as a drop-in memory layer for apps; MemPalace/mempalace (59.3k) focused on benchmarks.

No approach has won. **Treat memory as an experiment you measure, not an architecture decision you make once.**

## Finding 4: stars are attention, not quality

866 tools in the list have more than 10,000 stars. More than 1,000 have fewer than 1,000. Some excellent tools sit in that long tail, and some heavily-starred ones are popular because they went viral once.

That's why every category separates **hand-picked** entries from the screened list, and why the site lets you switch between "Most stars" and the curated order. Use stars to find what people are paying attention to, and the hand-picked marks to find what I'd actually recommend.

## The leaders, layer by layer

A few categories, top by stars:

- **Coding agents:** openclaw/openclaw (390.6k), NousResearch/hermes-agent (249.3k), anomalyco/opencode (210.3k), anthropics/claude-code (148.3k), openai/codex (126.7k)
- **Agent frameworks:** langgenius/dify (157.3k), langflow-ai/langflow (155.3k), langchain-ai/langchain (147.1k)
- **MCP:** punkpeye/awesome-mcp-servers (95.6k), modelcontextprotocol/servers (90.6k), microsoft/playwright-mcp (37.6k)
- **RAG:** infiniflow/ragflow (91.3k), upstash/context7 (62.5k), milvus-io/milvus (46.3k)
- **Local inference:** ollama/ollama (181.8k), ggml-org/llama.cpp (129.6k), vllm-project/vllm (92.8k)
- **Evals and observability:** langfuse/langfuse (35.1k), mlflow/mlflow (28.1k), promptfoo/promptfoo (25.5k)

## If you're starting today

Don't pick from 2,990 tools. The **Starter Stacks** page has three combinations that work together out of the box:

- **Free / learning:** Gemini CLI or OpenCode, LangGraph, free model tiers, Ollama, Chroma, Langfuse
- **Production Python:** Claude Code, LangGraph or PydanticAI, LiteLLM, vLLM, Qdrant or pgvector, Langfuse or LangSmith
- **Enterprise Azure:** Claude Code, Azure AI Foundry, Azure OpenAI, Azure AI Search, Azure Monitor

[See the full starter stacks](https://tayyabimam1.github.io/awesome-ai-agent-stack/starter-stacks.html).

## Contribute

The whole site is generated from one README, so adding a tool is a one-line pull request. If something is missing or ranked wrong, [open a PR](https://github.com/tayyabimam1/awesome-ai-agent-stack) or tell me in the comments.

**Which layer of your agent stack took you the longest to choose?**
