---
title: Memory for AI agents - the open-source options, ranked by GitHub stars
published: false
description: Code knowledge graphs, cross-session memory and drop-in memory layers compared, with when to use each.
tags: ai, agents, llm, opensource
cover_image: https://tayyabimam1.github.io/awesome-ai-agent-stack/og-image.png
---

<!-- Star counts as of 28 Sep 2026. Only hand-picked entries are featured. -->

Agents forget everything between sessions unless you give them somewhere to remember. That's why memory is one of the busiest corners of the agent ecosystem: I track **117 memory and persistent-context tools**.

Ranked by GitHub stars, the leaders fall into three different ideas of what "memory" means. Picking the right idea matters more than picking the right tool.

## Idea 1: memory as a map of your code

For coding agents, the most useful memory is often not a conversation history but a structured understanding of the codebase.

- **Graphify-Labs/graphify (121.7k ★):** turns a codebase plus its docs, schemas and PDFs into a queryable graph.
- **Egonex-AI/Understand-Anything (84.3k ★):** builds interactive knowledge graphs from any code.
- **colbymchenry/codegraph (72.2k ★):** a pre-indexed code knowledge graph that syncs automatically on code changes, for Claude Code, Codex and Gemini.

**Choose this when:** your agent works in a large repository and keeps re-reading files to find its way.

## Idea 2: memory across sessions

The second idea is continuity: what did we decide yesterday, and what did the agent already try?

- **thedotmack/claude-mem (94.8k ★):** persistent cross-session context for Claude Code and other agents.

**Choose this when:** you run long projects with a coding agent and are tired of re-explaining context every session.

## Idea 3: a memory layer for your own agents

The third idea is infrastructure: a memory service your application's agents read and write.

- **mem0ai/mem0 (66k ★):** a drop-in memory layer for agents and apps.
- **MemPalace/mempalace (59.3k ★):** an open-source memory system focused on benchmark performance.
- **volcengine/OpenViking (38.8k ★):** a self-evolving context database that unifies agent memory, knowledge retrieval and skills.

**Choose this when:** you're building a product agent that must remember users, preferences or past tasks.

## A note on the rankings

Sort the memory category by stars and you'll also see elasticsearch, redis and etcd near the top. They're storage engines memory systems are built on, not memory systems. That's why the list marks hand-picked entries separately from the wider screened list.

## How to choose

1. **Decide which memory you need** (code map, session continuity, or application memory) before comparing tools.
2. **Start simple.** For many product agents, a well-designed summary stored in a normal database beats a complex memory system.
3. **Measure.** Build a small set of tasks that need memory, and compare with and without it. Memory that doesn't change outcomes is just cost.

See all 117 tools, sortable by stars, on [the memory page of awesome-ai-agent-stack](https://tayyabimam1.github.io/awesome-ai-agent-stack/memory-persistent-context.html).

**What does your agent need to remember that it currently forgets?**
