---
title: The coding agent landscape in 2026 - 10 harnesses ranked by GitHub stars
published: false
description: From Claude Code and Codex to OpenCode and Gemini CLI, the most-starred coding agents and what sets each apart.
tags: ai, agents, programming, opensource
cover_image: https://tayyabimam1.github.io/awesome-ai-agent-stack/og-image.png
---

<!-- Star counts as of 28 Sep 2026. -->

The coding agent, the thing that actually writes and runs code for you, is where most developers first meet AI agents. I track **145 coding agents and harnesses**. Here are the ten with the most GitHub stars, and what makes each different.

## The ten most-starred

1. **openclaw/openclaw (390.6k ★):** a cross-platform agent that operates the whole operating system, not just the editor.
2. **NousResearch/hermes-agent (249.3k ★):** a self-improving, general-purpose agent with a large skills ecosystem.
3. **deepseek-ai/deepseek-harness (237.2k ★):** a plugin-first agent harness from DeepSeek.
4. **anomalyco/opencode (210.3k ★):** open-source and provider-agnostic, with a polished terminal UI. A strong choice if you want to switch models freely.
5. **Significant-Gravitas/AutoGPT (187.6k ★):** the project that started the autonomous-agent wave, now a platform for building agents.
6. **anthropics/claude-code (148.3k ★):** Anthropic's terminal coding agent, the reference harness much of the skills ecosystem is built around.
7. **farion1231/cc-switch (137.3k ★):** not an agent itself but a desktop switcher for Claude Code, Codex, OpenCode and others. Its popularity shows how many people use several agents at once.
8. **openai/codex (126.7k ★):** OpenAI's lightweight terminal coding agent.
9. **earendil-works/pi (109.6k ★):** an agent toolkit with a unified LLM API, agent loop, terminal UI and coding-agent CLI.
10. **google-gemini/gemini-cli (107.2k ★):** Gemini in the terminal, with a generous free tier. The easiest way to start at no cost.

## Three patterns in the ranking

**1. The terminal won.** Most of the top ten live in the terminal rather than an IDE plugin. Terminal agents are easier to script, combine and run in CI.

**2. People run more than one agent.** A switcher (cc-switch) being in the top ten says a lot: developers pick different agents for different jobs, or different price points.

**3. The agent matters less than its context.** In the same map, the skills, plugins and context-engineering category has more combined stars (3.8M) than coding agents themselves (3.5M). Once you've picked an agent, the bigger gains come from skills, project instruction files (CLAUDE.md, AGENTS.md) and a clear workflow.

## How to choose

- **Starting out, no budget:** Gemini CLI or OpenCode with a free model tier.
- **Serious daily work:** Claude Code or Codex. Pick the model family you already use.
- **Want to switch models freely:** OpenCode, or a harness like pi with a unified model API.
- **Then invest in context:** add a small set of skills and a project instruction file before trying yet another agent.

The full list of 145 coding agents, with the orchestration layers and session managers built on top of them, is on [the coding agents page of awesome-ai-agent-stack](https://tayyabimam1.github.io/awesome-ai-agent-stack/coding-agents-harnesses.html).

**Which coding agent do you use, and what made you stay?**
