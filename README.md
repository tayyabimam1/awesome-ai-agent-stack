<h1 align="center">Awesome AI Agent Stack</h1>

<p align="center">
  <a href="https://awesome.re"><img src="https://awesome.re/badge.svg" alt="Awesome"></a>
  <a href="https://github.com/tayyabimam1/awesome-ai-agent-stack/stargazers"><img src="https://img.shields.io/github/stars/tayyabimam1/awesome-ai-agent-stack?style=flat" alt="Stars"></a>
  <a href="https://github.com/tayyabimam1/awesome-ai-agent-stack/commits/main"><img src="https://img.shields.io/github/last-commit/tayyabimam1/awesome-ai-agent-stack?style=flat" alt="Last commit"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-CC0-lightgrey?style=flat" alt="CC0"></a>
</p>

<p align="center"><em>A curated, layer-by-layer map of the tools I actually use to build AI agents — from the coding agent in your terminal down to the model serving the tokens.</em></p>

**560+ entries across 30 layers.** The top of each section is my own picks — tools I have used, read, or evaluated. The **More** lists extend each layer with projects that pass a mechanical bar: actively maintained (pushed in the last 12 months), not archived, 1,500+ stars, and cross-referenced from other reputable lists. Organized as a **stack** so you can find the right tool for each layer of an agent system.

```
┌──────────────────────────────────────────────────────────────┐
│  Coding Agents & Harnesses  →  Skills & Context Engineering  │  ← how you build
├──────────────────────────────────────────────────────────────┤
│  Agent Frameworks  →  Memory  →  RAG  →  MCP / Tools         │  ← what you build with
├──────────────────────────────────────────────────────────────┤
│  Sandboxes & Browsers  →  Document Ingestion  →  Workflows   │  ← what agents act on
├──────────────────────────────────────────────────────────────┤
│  Gateways & Routing  →  Free LLM APIs  →  Local Inference    │  ← where tokens come from
├──────────────────────────────────────────────────────────────┤
│  Evaluation, Observability & Review  →  Reference Systems    │  ← how you ship
└──────────────────────────────────────────────────────────────┘
```

## Contents

- [Starter Stacks](#starter-stacks)
- [Coding Agents & Harnesses](#coding-agents--harnesses)
- [Skills, Plugins & Context Engineering](#skills-plugins--context-engineering)
- [Agent Frameworks & Orchestration](#agent-frameworks--orchestration)
- [Memory & Persistent Context](#memory--persistent-context)
- [RAG & Retrieval](#rag--retrieval)
- [MCP Servers & Tool Integration](#mcp-servers--tool-integration)
- [Sandboxes, Browsers & Computer Use](#sandboxes-browsers--computer-use)
- [Document Processing & Data Ingestion](#document-processing--data-ingestion)
- [Workflow Automation](#workflow-automation)
- [Model Gateways & Routing](#model-gateways--routing)
- [Free LLM APIs & Free Tiers](#free-llm-apis--free-tiers)
- [Local Models, Inference & Hardware](#local-models-inference--hardware)
- [Evaluation, Observability & Code Review](#evaluation-observability--code-review)
- [Production Architectures & Reference Systems](#production-architectures--reference-systems)
- [UI & Application Layer](#ui--application-layer)
- [Learning Path](#learning-path)
- [Voice, Speech & Audio](#voice-speech--audio)
- [Vision & Multimodal](#vision--multimodal)
- [Image, Video & Creative Generation](#image-video--creative-generation)
- [Computer Use & GUI Agents](#computer-use--gui-agents)
- [Structured Output, Guardrails & Safety](#structured-output-guardrails--safety)
- [Chat UIs & Application Layer](#chat-uis--application-layer)
- [Deployment, Serving & MLOps](#deployment-serving--mlops)
- [Data, Datasets & Synthetic Data](#data-datasets--synthetic-data)
- [Domain Agents: Finance, Healthcare, Research & More](#domain-agents-finance-healthcare-research--more)
- [Assistants, Copilots & Personal Agents](#assistants-copilots--personal-agents)
- [Interpretability, Alignment & Research](#interpretability-alignment--research)
- [Developer Tools & Utilities](#developer-tools--utilities)
- [Other Awesome Lists](#other-awesome-lists)
- [Contributing](#contributing)

## Starter Stacks

*Three opinionated combinations that work together out of the box. Start here if you don't want to choose.*

| | Free / learning | Production Python | Enterprise Azure |
|---|---|---|---|
| **Coding agent** | Gemini CLI or OpenCode | Claude Code | Claude Code |
| **Skills** | superpowers + ponytail | superpowers + agent-skills | anthropics/skills |
| **Framework** | LangGraph | LangGraph or PydanticAI | Azure AI Foundry + agent-framework |
| **Models** | Free tiers via freellmapi / OmniRoute | Claude / GPT via LiteLLM | Azure OpenAI |
| **Local models** | Ollama | vLLM | — |
| **Memory** | claude-mem | mem0 | Cosmos DB + mem0 |
| **RAG / vectors** | Chroma | Qdrant or pgvector | Azure AI Search |
| **Ingestion** | markitdown | Docling | Document Intelligence |
| **Tools** | FastMCP servers | FastMCP + Composio | MCP Toolbox + Logic Apps |
| **Sandbox / browser** | browser-use | E2B + Playwright | CubeSandbox |
| **Observability** | Langfuse (self-hosted) | Langfuse or LangSmith | Azure Monitor + Foundry tracing |
| **Evals** | promptfoo | DeepEval + Ragas | Foundry evaluations |
| **UI** | Chainlit | FastAPI + Vercel AI SDK | Copilot Studio |

## Coding Agents & Harnesses

*The agent that writes the code. Pick one, learn it deeply.*

- [anthropics/claude-code](https://github.com/anthropics/claude-code) - Anthropic's terminal coding agent; the reference harness most of this list is built around.
- [openai/codex](https://github.com/openai/codex) - OpenAI's lightweight terminal coding agent.
- [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) - Gemini in the terminal with a generous free tier.
- [anomalyco/opencode](https://github.com/anomalyco/opencode) - Open-source, provider-agnostic coding agent with a polished TUI.
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) - Autonomous software-development agent platform with sandboxed execution.
- [aaif-goose/goose](https://github.com/aaif-goose/goose) - Extensible open-source agent that installs, runs and tests code with any LLM.
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) - Self-improving general-purpose agent with a large skills ecosystem.
- [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) - Plugin-first agent harness from DeepSeek.
- [openclaw/openclaw](https://github.com/openclaw/openclaw) - Cross-platform agent that operates the OS, not just the editor.
- [Gitlawb/openclaude](https://github.com/Gitlawb/openclaude) - Open Claude Code-compatible harness that runs on any provider.
- [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) - Delegate review or tasks from Claude Code to Codex.
- [cline/cline](https://github.com/cline/cline) - Autonomous coding agent inside VS Code with human-in-the-loop approvals.
- [Aider-AI/aider](https://github.com/Aider-AI/aider) - Pair-programming in the terminal with git-native edits; the original open coding agent.
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) - The project that started the autonomous-agent wave; now a platform for building agents.

**Multi-agent orchestration on top of coding agents**

- [stablyai/orca](https://github.com/stablyai/orca) - Agentic Development Environment for running fleets of parallel coding agents.
- [Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) - Teams-first multi-agent orchestration layer for Claude Code.
- [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent) - Graph-based multi-agent workflows triggered from a single prompt.
- [coleam00/remote-agentic-coding-system](https://github.com/coleam00/remote-agentic-coding-system) - Run coding agents remotely with a persistent workspace.

**Account, session & proxy managers**

- [farion1231/cc-switch](https://github.com/farion1231/cc-switch) - Desktop switcher for Claude Code, Codex, OpenCode and friends.
- [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) - Route Claude Code requests across models and providers.
- [heyhuynhgiabuu/proxypal](https://github.com/heyhuynhgiabuu/proxypal) - Expose your chat subscriptions as local OpenAI-compatible endpoints.
- [badrisnarayanan/antigravity-claude-proxy](https://github.com/badrisnarayanan/antigravity-claude-proxy) - Proxy Antigravity-provided Claude/Gemini models to any client.
- [NoeFabris/opencode-antigravity-auth](https://github.com/NoeFabris/opencode-antigravity-auth) - OAuth bridge so OpenCode can use Antigravity rate limits.

**More**

- [earendil-works/pi](https://github.com/earendil-works/pi) - AI agent toolkit: unified LLM API, agent loop, TUI, coding agent CLI.
- [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) - Bash is all you need - A nano claude code–like 「agent harness」, built from 0 to 1.
- [continuedev/continue](https://github.com/continuedev/continue) - Open-source coding agent.
- [intitni/CopilotForXcode](https://github.com/intitni/CopilotForXcode) - The first GitHub Copilot, Codeium and ChatGPT Xcode Source Editor Extension.

- [Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode) - Open-source agentic coding platform for VS Code and JetBrains; the Roo Code successor.
- [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) - Alibaba's open-source terminal coding agent with MCP support.
- [TabbyML/tabby](https://github.com/TabbyML/tabby) - Self-hosted AI coding assistant with autocomplete, chat, and RAG.
## Skills, Plugins & Context Engineering

*What you put in front of the agent matters more than which agent. Skills, CLAUDE.md files, methodology.*

**Skill frameworks & methodology**

- [obra/superpowers](https://github.com/obra/superpowers) - Agentic skills framework and development methodology (brainstorm → plan → TDD → review).
- [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) - Official plugins for non-coding knowledge work.
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) - Production-grade engineering skills from Addy Osmani.
- [garrytan/gstack](https://github.com/garrytan/gstack) - Garry Tan's opinionated Claude Code toolset.
- [affaan-m/ECC](https://github.com/affaan-m/ECC) - Harness performance-optimization system: skills, instincts, evals.
- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) - Meta-prompting, context engineering and spec-driven workflow.
- [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master) - AI task-management system that drops into Cursor, Claude Code or Lovable.
- [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) - File-based persistent planning for long-running agent tasks.
- [HKUDS/OpenSpace](https://github.com/HKUDS/OpenSpace) - Skill-management layer for agents.
- [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) - Local, agent-first control plane for skill catalogs.
- [jeremylongshore/tons-of-skills-marketplace](https://github.com/jeremylongshore/tons-of-skills-marketplace) - Model-agnostic skills marketplace with a canonical layout.
- [skainguyen1412/antigravity-superpowers](https://github.com/skainguyen1412/antigravity-superpowers) - Superpowers workflows ported to Antigravity.

**Behavior-shaping skills (single-file, high leverage)**

- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) - A single `CLAUDE.md` distilled from Karpathy's guidance.
- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) - Makes the agent think like the laziest senior dev: YAGNI, stdlib first, shortest diff.
- [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) - Cut ~65% of output tokens by making the agent talk terse.
- [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) - Stops the agent burying the answer; answer-first output.
- [coleam00/context-engineering-intro](https://github.com/coleam00/context-engineering-intro) - Practical introduction to context engineering.
- [KhazP/vibe-coding-prompt-template](https://github.com/KhazP/vibe-coding-prompt-template) - Templates for PRDs, tech designs and MVP workflows.

**Plugin & skill directories**

- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) - The canonical Claude Code resource list.
- [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Curated Claude Skills.
- [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) - 380+ skills, agents and plugins.
- [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) - Tutorials, guides and skill directories.
- [quemsah/awesome-claude-plugins](https://github.com/quemsah/awesome-claude-plugins) - Plugin adoption metrics across GitHub.
- [awesome-opencode/awesome-opencode](https://github.com/awesome-opencode/awesome-opencode) - Plugins, themes and agents for OpenCode.
- [0xNyk/awesome-hermes-agent](https://github.com/0xNyk/awesome-hermes-agent) - Skills, plugins and memory providers for Hermes.
- [ai-boost/awesome-harness-engineering](https://github.com/ai-boost/awesome-harness-engineering) - Tools, patterns and evals for agent harnesses.
- [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - From vibe coding to agentic engineering.
- [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) - Leaked system prompts of Cursor, Devin, Claude Code and others; study how the pros prompt.
- [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) - Extracted system prompts from Anthropic, OpenAI and Google products.

**More**

- [f/prompts.chat](https://github.com/f/prompts.chat) - F.k.a. Awesome ChatGPT Prompts. Share, discover, and collect prompts from the community. Free and open source — self-host for your….
- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) - Guides, papers, lessons, notebooks and resources for prompt engineering, context engineering, RAG, and AI Agents.
- [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) - Turn any AI agent into an AI Scientist. The #1 Agent Skills library for science, used by 190,000+ scientists worldwide. 165 ready-to-use….
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel's official collection of agent skills.
- [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) - Compress tool outputs, logs, files, and RAG chunks before they reach the LLM. 20% fewer tokens for coding agents, 60-95% fewer tokens….
- [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) - Spec-driven development (SDD) for AI coding assistants.
- [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) - Breakthrough Method for Agile Ai Driven Development.
- [github/spec-kit](https://github.com/github/spec-kit) - Toolkit to help you get started with Spec-Driven Development.
- [danielmiessler/Fabric](https://github.com/danielmiessler/Fabric) - Fabric is an open-source framework for augmenting humans using AI. It provides a modular system for solving specific problems using a….

- [wshobson/agents](https://github.com/wshobson/agents) - Multi-harness plugin and skill marketplace for Claude Code, Codex, Cursor, OpenCode, and Copilot.
- [anthropics/skills](https://github.com/anthropics/skills) - Anthropic's official Agent Skills repo; the reference implementation of the Agent Skills standard.
- [yamadashy/repomix](https://github.com/yamadashy/repomix) - Packs an entire repository into one AI-friendly file for LLM context.
## Agent Frameworks & Orchestration

*Build your own agents and multi-agent systems.*

**Core frameworks**

- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) - Graph-based stateful agent orchestration; the default for production Python agents.
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) - The original LLM application framework and integration ecosystem.
- [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) - Type-safe agent framework from the Pydantic team; great for structured outputs.
- [openai/openai-agents-python](https://github.com/openai/openai-agents-python) - OpenAI's lightweight multi-agent SDK with handoffs and guardrails.
- [google/adk-python](https://github.com/google/adk-python) - Google's Agent Development Kit for Gemini and beyond.
- [anthropics/anthropic-sdk-python](https://github.com/anthropics/anthropic-sdk-python) - Official Claude SDK; tool use, streaming and the Agent SDK.
- [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) - Role-playing multi-agent crews with tasks and processes.
- [microsoft/autogen](https://github.com/microsoft/autogen) - Conversational multi-agent framework from Microsoft Research.
- [huggingface/smolagents](https://github.com/huggingface/smolagents) - Minimal agents that write code as actions.
- [run-llama/llama_index](https://github.com/run-llama/llama_index) - Data framework for connecting LLMs to your data; strong agentic RAG.
- [deepset-ai/haystack](https://github.com/deepset-ai/haystack) - Production-oriented pipelines for RAG and agents.
- [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) - Program, don't prompt: optimize prompts and weights declaratively.

**Structured output & guardrails**

- [567-labs/instructor](https://github.com/567-labs/instructor) - Structured outputs from any LLM via Pydantic models.
- [dottxt-ai/outlines](https://github.com/dottxt-ai/outlines) - Constrained generation: guarantee JSON, regex or grammar-valid output.
- [guardrails-ai/guardrails](https://github.com/guardrails-ai/guardrails) - Input/output validators for LLM applications.
- [NVIDIA/NeMo-Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) - Programmable rails for conversational systems.

**Visual & low-code builders**

- [langgenius/dify](https://github.com/langgenius/dify) - Visual builder for agentic workflows and RAG pipelines with a rich tool ecosystem.
- [microsoft/agent-framework](https://github.com/microsoft/agent-framework) - Microsoft's framework for building, orchestrating and deploying agents.
- [agentscope-ai/agentscope](https://github.com/agentscope-ai/agentscope) - Build agents you can see, understand and trust.
- [aurelio-labs/semantic-router](https://github.com/aurelio-labs/semantic-router) - Superfast semantic decision-making for routing between agents and tools.
- [FareedKhan-dev/langgraph-101](https://github.com/FareedKhan-dev/langgraph-101) - LangGraph fundamentals in notebooks.
- [FareedKhan-dev/all-agentic-architectures](https://github.com/FareedKhan-dev/all-agentic-architectures) - 35 runnable agentic architectures (Reflexion, LATS, GraphRAG, MemGPT…) with a benchmark leaderboard.
- [andrewyng/openworker](https://github.com/andrewyng/openworker) - Andrew Ng's open agentic-worker framework.
- [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) - Multi-agent LLM financial-trading framework; a good study in role-specialized agents.
- [microsoft/Agents-for-python](https://github.com/microsoft/Agents-for-python) - Microsoft 365 Agents SDK for Python.
- [langflow-ai/langflow](https://github.com/langflow-ai/langflow) - Drag-and-drop builder for LangChain flows and agents.
- [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) - Low-code UI for building LLM flows and agents.

**Durable execution & background agents**

- [temporalio/temporal](https://github.com/temporalio/temporal) - Durable workflow engine; the right way to run long-lived agents that must survive crashes.
- [inngest/inngest](https://github.com/inngest/inngest) - Event-driven durable functions with first-class AI step support.

**Azure AI Foundry**

- [Azure-Samples/get-started-with-ai-agents](https://github.com/Azure-Samples/get-started-with-ai-agents) - Deploy an agent web app with Azure AI Foundry.
- [jonathanscholtes/azure-ai-foundry-agentic-workshop](https://github.com/jonathanscholtes/azure-ai-foundry-agentic-workshop) - Hands-on Foundry agent workshop.
- [Azure-Samples/app-service-agentic-langgraph-foundry-python](https://github.com/Azure-Samples/app-service-agentic-langgraph-foundry-python) - LangGraph + Foundry agents on App Service.
- [MSFT-Innovation-Hub-India/LangGraph-Foundry-HostedAgent-TravelAgent](https://github.com/MSFT-Innovation-Hub-India/LangGraph-Foundry-HostedAgent-TravelAgent) - Multi-agent customer support as a hosted Foundry agent.
- [scholarly360/From-Zero-to-Microsoft-Foundry-Creating-Agents-Via-AI-Projects-Library](https://github.com/scholarly360/From-Zero-to-Microsoft-Foundry-Creating-Agents-Via-AI-Projects-Library) - Agents via the Azure AI Projects SDK.

**More**

- [bytedance/deer-flow](https://github.com/bytedance/deer-flow) - An open-source long-horizon SuperAgent harness that researches, codes, and creates. With the help of sandboxes, memories, tools, skill,….
- [agno-agi/agno](https://github.com/agno-agi/agno) - Build, run, and manage agent platforms.
- [OpenBMB/ChatDev](https://github.com/OpenBMB/ChatDev) - ChatDev 2.0: Dev All through LLM-powered Multi-Agent Collaboration.
- [conductor-oss/conductor](https://github.com/conductor-oss/conductor) - Conductor is an event driven agentic workflow engine providing durable and highly resilient execution engine for applications and AI Agents.
- [langchain-ai/deepagents](https://github.com/langchain-ai/deepagents) - The batteries-included agent harness.
- [charmbracelet/crush](https://github.com/charmbracelet/crush) - Glamourous agentic coding for all.
- [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) - Get 10X more out of Claude Code, Codex or any coding agent.
- [virattt/dexter](https://github.com/virattt/dexter) - An autonomous agent for deep financial research.
- [FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) - The Multi-Agent Framework: First AI Software Company, Towards Natural Language Programming.
- [mastra-ai/mastra](https://github.com/mastra-ai/mastra) - Mastra is the modern TypeScript framework for AI-powered applications and agents.
- [paperclipai/paperclip](https://github.com/paperclipai/paperclip) - The open-source app everyone uses to manage agents at work.

- [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk) - AWS's official open-source agent SDK for Python and TypeScript, any model or cloud.
- [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) - Microsoft's SDK for building LLM agents into .NET, Python, and Java apps.
- [genkit-ai/genkit](https://github.com/genkit-ai/genkit) - Google's open-source framework for agentic apps in JS, Go, Python, and Dart.
- [elizaOS/eliza](https://github.com/elizaOS/eliza) - TypeScript framework for autonomous agents across chat, social, and on-chain integrations.
## Memory & Persistent Context

*Agents forget between sessions unless you give them somewhere to remember.*

- [mem0ai/mem0](https://github.com/mem0ai/mem0) - Drop-in memory layer for agents and apps.
- [letta-ai/letta](https://github.com/letta-ai/letta) - Stateful agents with self-editing memory (formerly MemGPT).
- [getzep/graphiti](https://github.com/getzep/graphiti) - Temporal knowledge graphs for agent memory.
- [topoteretes/cognee](https://github.com/topoteretes/cognee) - Memory built from knowledge graphs plus vector search.
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) - Persistent cross-session context for Claude Code and other agents.
- [rohitg00/agentmemory](https://github.com/rohitg00/agentmemory) - Persistent memory for coding agents, benchmarked on real workloads.
- [andrewyng/context-hub](https://github.com/andrewyng/context-hub) - Shared context hub for agents.
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) - Turn a codebase plus its docs, schemas and PDFs into a queryable graph.
- [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) - Interactive knowledge graphs from any code.
- [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) - Local-first code-intelligence graph so agents read only what matters.
- [TeleAI-UAGI/Awesome-Agent-Memory](https://github.com/TeleAI-UAGI/Awesome-Agent-Memory) - Systems, benchmarks and papers on agent memory.

**More**

- [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) - Pre-indexed code knowledge graph, auto syncs on code changes, for Claude Code, Codex, Gemini, Cursor, OpenCode, AntiGravity, Kiro,….
- [volcengine/OpenViking](https://github.com/volcengine/OpenViking) - Self-evolving Context Database for AI Agents. Unify Agent Memory, Knowledge RAG and Skills.
- [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory) - Memory and context engine + app that is extremely fast, scalable, and can be run fully locally. The Memory API for the AI era.
- [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) - TencentDB Agent Memory is a team-level memory hub for AI Agents — turning conversations, docs, and code into four reusable memory assets….
- [MemTensor/MemOS](https://github.com/MemTensor/MemOS) - Self-evolving memory OS for LLM & AI Agents: ultra-persistent memory, hybrid-retrieval, and cross-task skill reuse, with 35.24% token….
- [deepseek-ai/Engram](https://github.com/deepseek-ai/Engram) - Conditional Memory via Scalable Lookup: A New Axis of Sparsity for Large Language Models.
- [CaviraOSS/LongMemory](https://github.com/CaviraOSS/LongMemory) - Local persistent memory store for LLM applications including claude desktop, github copilot, codex, antigravity, etc.
- [OSU-NLP-Group/HippoRAG](https://github.com/OSU-NLP-Group/HippoRAG) - [NeurIPS'24] HippoRAG is a novel RAG framework inspired by human long-term memory that enables LLMs to continuously integrate knowledge….
- [memodb-io/memobase](https://github.com/memodb-io/memobase) - User Profile-Based Long-Term Memory for AI Chatbot Applications.
- [griptape-ai/griptape](https://github.com/griptape-ai/griptape) - Modular Python framework for AI agents and workflows with chain-of-thought reasoning, tools, and memory.
- [MemPalace/mempalace](https://github.com/MemPalace/mempalace) - The best-benchmarked open-source AI memory system. And it's free.
- [getzep/zep](https://github.com/getzep/zep) - Zep | Examples, Integrations, & More.

- [MemMachine/MemMachine](https://github.com/MemMachine/MemMachine) - Open-source long-term memory layer for AI agents with MCP server support.
## RAG & Retrieval

**Vector databases**

- [chroma-core/chroma](https://github.com/chroma-core/chroma) - Embedded, zero-config vector store; the right default for prototypes.
- [qdrant/qdrant](https://github.com/qdrant/qdrant) - Rust vector database with filtering and hybrid search; production-ready.
- [pgvector/pgvector](https://github.com/pgvector/pgvector) - Vector similarity search inside Postgres; skip a new database if you already run Postgres.
- [lancedb/lancedb](https://github.com/lancedb/lancedb) - Serverless, file-based vector database on Lance columnar format.
- [milvus-io/milvus](https://github.com/milvus-io/milvus) - Distributed vector database for billion-scale workloads.
- [weaviate/weaviate](https://github.com/weaviate/weaviate) - Vector database with built-in vectorizers and hybrid search.

**Embeddings, rerankers & search**

- [UKPLab/sentence-transformers](https://github.com/UKPLab/sentence-transformers) - Standard library for embedding models and cross-encoder rerankers.
- [FlagOpen/FlagEmbedding](https://github.com/FlagOpen/FlagEmbedding) - BGE embeddings and rerankers; strong open baselines.
- [AnswerDotAI/RAGatouille](https://github.com/AnswerDotAI/RAGatouille) - ColBERT late-interaction retrieval made easy.
- [xhluca/bm25s](https://github.com/xhluca/bm25s) - Fast BM25 in Python for the lexical half of hybrid search.

**RAG frameworks & techniques**

- [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) - Simple, fast graph-based RAG.
- [microsoft/graphrag](https://github.com/microsoft/graphrag) - Microsoft's graph-based RAG for global questions over corpora.
- [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything) - All-in-one multimodal RAG framework.
- [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) - Advanced RAG techniques, each with runnable code.
- [Shubhamsaboo/all-rag-techniques](https://github.com/Shubhamsaboo/all-rag-techniques) - Every RAG technique, implemented simply.
- [pguso/rag-from-scratch](https://github.com/pguso/rag-from-scratch) - Build RAG from scratch with local models, no black boxes.
- [jamwithai/production-agentic-rag-course](https://github.com/jamwithai/production-agentic-rag-course) - Production agentic RAG course.
- [upstash/context7](https://github.com/upstash/context7) - Up-to-date library documentation served to LLMs and editors.

**More**

- [pathwaycom/pathway](https://github.com/pathwaycom/pathway) - Python ETL framework for stream processing, real-time analytics, LLM pipelines, and RAG.
- [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) - A lightning-fast search engine API bringing AI-powered hybrid search to your sites and applications.
- [pathwaycom/llm-app](https://github.com/pathwaycom/llm-app) - Ready-to-run cloud templates for RAG, AI pipelines, and enterprise search with live data. Docker-friendly.Always in sync with….
- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) - DeepTutor: Lifelong Personalized Tutoring. https://deeptutor.info/.
- [The-Vibe-Company/quivr](https://github.com/The-Vibe-Company/quivr) - Opiniated RAG for integrating GenAI in your apps Focus on your product rather than the RAG. Easy integration in existing products with….
- [onyx-dot-app/onyx](https://github.com/onyx-dot-app/onyx) - Open Source AI Platform - AI Chat with advanced features that works with every LLM.
- [stanford-oval/storm](https://github.com/stanford-oval/storm) - An LLM-powered knowledge curation system that researches a topic and generates a full-length report with citations.
- [huggingface/sentence-transformers](https://github.com/huggingface/sentence-transformers) - State-of-the-Art Embeddings, Retrieval, and Reranking.
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) - RAGFlow is a leading open-source Retrieval-Augmented Generation (RAG) engine that fuses cutting-edge RAG with Agent capabilities to….
- [zylon-ai/private-gpt](https://github.com/zylon-ai/private-gpt) - Complete API layer for private AI applications on local models: RAG, skills, tools, MCP, text-to-sql, and more. Works with any….
- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) - PageIndex: Document Index for Vectorless, Reasoning-based RAG.
- [marqo-ai/marqo](https://github.com/marqo-ai/marqo) - Ecommerce Search and Discovery - marqo.ai.

- [vespa-engine/vespa](https://github.com/vespa-engine/vespa) - Large-scale AI search platform for hybrid text and vector retrieval at internet scale.
- [typesense/typesense](https://github.com/typesense/typesense) - Fast typo-tolerant search engine with vector and hybrid search plus built-in RAG.
## MCP Servers & Tool Integration

*The Model Context Protocol is the USB-C of agent tooling.*

**Protocol & SDKs**

- [modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol) - The MCP specification.
- [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) - Official Python SDK.
- [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) - Official TypeScript SDK.
- [jlowin/fastmcp](https://github.com/jlowin/fastmcp) - The fast, Pythonic way to build MCP servers and clients.
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) - Official reference servers (filesystem, git, fetch, memory…).
- [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector) - Visual debugger for MCP servers.
- [ComposioHQ/composio](https://github.com/ComposioHQ/composio) - 250+ pre-built tool integrations with auth handled for you.

**Servers & directories**

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) - The definitive MCP server directory.
- [github/github-mcp-server](https://github.com/github/github-mcp-server) - Official GitHub MCP server.
- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) - Browser automation over MCP using accessibility snapshots.
- [microsoft/mcp-for-beginners](https://github.com/microsoft/mcp-for-beginners) - Curriculum on MCP fundamentals.
- [googleapis/mcp-toolbox](https://github.com/googleapis/mcp-toolbox) - MCP Toolbox for Databases.
- [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp) - Build n8n workflows from Claude, Cursor or Windsurf.
- [21st-dev/magic-mcp](https://github.com/21st-dev/magic-mcp) - v0-style UI component generation inside your editor.
- [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) - Stock-market data over MCP.
- [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) - Make any software agent-native by wrapping it as a CLI.
- [iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI) - Office suite built for agents to read, edit and automate documents.
- [cporter202/agentic-ai-apis](https://github.com/cporter202/agentic-ai-apis) - 2,000+ production APIs across agents, models and MCP servers.
- [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API for building messaging agents.

**More**

- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) - Ultra-lightweight, open-source, self-hosted personal AI agent framework in Python with WebUI, tools, memory, MCP, multi-agent workflows,….
- [labring/FastGPT](https://github.com/labring/FastGPT) - FastGPT is a knowledge-based platform built on the LLMs, offers a comprehensive suite of out-of-the-box capabilities such as data….
- [a2aproject/A2A](https://github.com/a2aproject/A2A) - Agent2Agent (A2A) is an open protocol enabling communication and interoperability between opaque agentic applications.
- [ShishirPatil/gorilla](https://github.com/ShishirPatil/gorilla) - Gorilla: Training and Evaluating LLMs for Function Calls (Tool Calls).

- [modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry) - Official community registry for MCP servers.
- [stripe/ai](https://github.com/stripe/ai) - Official Stripe SDKs, remote MCP server, and agent skills for billing-powered agents.
- [exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server) - Official Exa MCP server for web search, crawling, and research tools.
## Sandboxes, Browsers & Computer Use

**Sandboxes**

- [e2b-dev/E2B](https://github.com/e2b-dev/E2B) - Secure cloud sandboxes for running agent-generated code.
- [daytonaio/daytona](https://github.com/daytonaio/daytona) - Infrastructure for running AI-generated code in isolated environments.
- [TencentCloud/CubeSandbox](https://github.com/TencentCloud/CubeSandbox) - Instant, concurrent, secure sandboxes for agents.

**Browsers & computer use**

- [browser-use/browser-use](https://github.com/browser-use/browser-use) - Let agents drive a real browser.
- [microsoft/playwright](https://github.com/microsoft/playwright) - The browser automation library everything else wraps.
- [browserbase/stagehand](https://github.com/browserbase/stagehand) - Natural-language browser automation built on Playwright.
- [anthropics/anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts) - Includes the reference computer-use demo.
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) - Crawl and scrape any site into LLM-ready Markdown.
- [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) - Open-source LLM-friendly crawler.
- [h4ckf0r0day/obscura](https://github.com/h4ckf0r0day/obscura) - Headless browser purpose-built for agents and scraping.
- [scrapy/scrapy](https://github.com/scrapy/scrapy) - The battle-tested Python crawling framework.
- [cporter202/scraping-apis-for-devs](https://github.com/cporter202/scraping-apis-for-devs) - Scraping APIs for developers.
- [AhmadIbrahiim/Website-downloader](https://github.com/AhmadIbrahiim/Website-downloader) - Pull the complete source of any website.

**More**

- [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) - An adaptive Web Scraping framework that handles everything from a single request to a full-scale crawl! Don't be shy, join here:….
- [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) - Chrome DevTools for coding agents.
- [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) - Browser automation CLI for AI agents.
- [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) - Python scraper based on AI.
- [apify/crawlee](https://github.com/apify/crawlee) - Crawlee—A web scraping and browser automation library for Node.js to build reliable crawlers. In JavaScript and TypeScript. Extract data….
- [browser-use/browser-harness](https://github.com/browser-use/browser-harness) - Browser Harness | Self-healing harness that enables LLMs to complete any task.
- [opensandbox-group/OpenSandbox](https://github.com/opensandbox-group/OpenSandbox) - Secure, Fast, and Extensible Sandbox runtime for AI agents.

- [vercel/sandbox](https://github.com/vercel/sandbox) - Official Vercel SDK and CLI for ephemeral Firecracker sandboxes that run agent code.
- [cloudflare/sandbox-sdk](https://github.com/cloudflare/sandbox-sdk) - Official Cloudflare SDK for secure isolated containers at the edge.
- [nanobrowser/nanobrowser](https://github.com/nanobrowser/nanobrowser) - Open-source multi-agent Chrome extension for local-first AI web automation.
## Document Processing & Data Ingestion

*Getting real-world files into a form agents can use.*

- [microsoft/markitdown](https://github.com/microsoft/markitdown) - Convert Office files, PDFs and more to Markdown.
- [docling-project/docling](https://github.com/docling-project/docling) - IBM's document parser with layout-aware PDF, tables and OCR; best open option for RAG ingestion.
- [Unstructured-IO/unstructured](https://github.com/Unstructured-IO/unstructured) - Partition and chunk any document type for LLM pipelines.
- [opendatalab/MinerU](https://github.com/opendatalab/MinerU) - High-quality PDF-to-Markdown extraction, strong on scientific papers.
- [datalab-to/marker](https://github.com/datalab-to/marker) - Fast PDF to Markdown with GPU acceleration.
- [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) - Multilingual OCR toolkit.
- [firecrawl/anydoc](https://github.com/firecrawl/anydoc) - Rust converter for Word, PowerPoint, Excel, EPUB, CSV and PDF to clean Markdown.
- [gotenberg/gotenberg](https://github.com/gotenberg/gotenberg) - Docker API for converting documents to PDF.
- [google/magika](https://github.com/google/magika) - AI-powered file-type detection.
- [paperless-ngx/paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) - Self-hosted document management with OCR.
- [Azure-Samples/azure-ai-content-understanding-python](https://github.com/Azure-Samples/azure-ai-content-understanding-python) - Azure Content Understanding samples.
- [MicrosoftLearning/mslearn-ai-information-extraction](https://github.com/MicrosoftLearning/mslearn-ai-information-extraction) - Labs on AI-powered information extraction.
- [KOUISAmine/file-converter-tools](https://github.com/KOUISAmine/file-converter-tools) - Collection of file conversion utilities.

**More**

- [treeverse/dvc](https://github.com/treeverse/dvc) - Data Versioning and ML Experiments.
- [bhaskatripathi/pdfGPT](https://github.com/bhaskatripathi/pdfGPT) - PDF GPT allows you to chat with the contents of your PDF file by using GPT capabilities. The most effective open source solution to turn….
- [run-llama/llama_cloud_services](https://github.com/run-llama/llama_cloud_services) - Knowledge Agents and Management in the Cloud.
- [instill-ai/instill-core](https://github.com/instill-ai/instill-core) - Instill Core is a full-stack AI infrastructure tool for data, model and pipeline orchestration, designed to streamline every aspect of….
- [enoch3712/ExtractThinker](https://github.com/enoch3712/ExtractThinker) - ExtractThinker is a Document Intelligence library for LLMs, offering ORM-style interaction for flexible and powerful document workflows.
- [allenai/olmocr](https://github.com/allenai/olmocr) - Toolkit for linearizing PDFs for LLM datasets/training.
- [hiroi-sora/Umi-OCR](https://github.com/hiroi-sora/Umi-OCR) - OCR software, free and offline. 开源、免费的离线OCR软件。支持截屏/批量导入图片，PDF文档识别，排除水印/页眉页脚，扫描/生成二维码。内置多国语言库。.
- [naptha/tesseract.js](https://github.com/naptha/tesseract.js) - Pure Javascript OCR for more than 100 Languages.
- [ocrmypdf/OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) - OCRmyPDF adds an OCR text layer to scanned PDF files, allowing them to be searched.
- [deepseek-ai/DeepSeek-OCR](https://github.com/deepseek-ai/DeepSeek-OCR) - Contexts Optical Compression.

- [datalab-to/surya](https://github.com/datalab-to/surya) - High-accuracy open OCR model with layout, reading order, and table recognition in 90+ languages.
## Workflow Automation

- [n8n-io/n8n](https://github.com/n8n-io/n8n) - Fair-code workflow automation with native AI agent nodes.
- [activepieces/activepieces](https://github.com/activepieces/activepieces) - Open-source automation with ~400 MCP servers built in.
- [Zie619/n8n-workflows](https://github.com/Zie619/n8n-workflows) - Large searchable archive of n8n workflows.
- [wassupjay/n8n-free-templates](https://github.com/wassupjay/n8n-free-templates) - 200+ plug-and-play n8n templates with AI steps.
- [windmill-labs/windmill](https://github.com/windmill-labs/windmill) - Open-source developer platform for scripts, workflows and UIs.
- [kestra-io/kestra](https://github.com/kestra-io/kestra) - Declarative orchestration platform with AI steps.
- [automatisch/automatisch](https://github.com/automatisch/automatisch) - Open-source Zapier alternative.
- [huginn/huginn](https://github.com/huginn/huginn) - Agents that monitor and act on your behalf.

- [triggerdotdev/trigger.dev](https://github.com/triggerdotdev/trigger.dev) - Open-source platform for durable TypeScript AI agent tasks and workflows.
- [hatchet-dev/hatchet](https://github.com/hatchet-dev/hatchet) - Postgres-backed orchestration engine for durable tasks, DAGs, and AI agents.
## Model Gateways & Routing

*One endpoint, many providers, automatic fallback.*

- [BerriAI/litellm](https://github.com/BerriAI/litellm) - Call 100+ LLM APIs in OpenAI format with cost tracking and guardrails.
- [maximhq/bifrost](https://github.com/maximhq/bifrost) - Enterprise AI gateway with adaptive load balancing.
- [Portkey-AI/gateway](https://github.com/Portkey-AI/gateway) - Blazing-fast gateway with routing, caching and guardrails.
- [OpenRouterTeam/openrouter-runner](https://github.com/OpenRouterTeam/openrouter-runner) - OpenRouter's inference runner; use [openrouter.ai](https://openrouter.ai) for one key to every model.
- [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) - MIT gateway over 350+ providers with quota-aware fallback and token compression.
- [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi) - Stack 34 free-tier providers behind one `/v1` endpoint.
- [tayyabimam1/freellmapi](https://github.com/tayyabimam1/freellmapi) - My fork with additional custom-endpoint support.

**More**

- [QuantumNous/new-api](https://github.com/QuantumNous/new-api) - A unified AI model hub for aggregation & distribution. It supports cross-converting various LLMs into OpenAI-compatible,….
- [songquanpeng/one-api](https://github.com/songquanpeng/one-api) - LLM API 管理 & 分发系统，支持 OpenAI、Azure、Anthropic Claude、Google Gemini、DeepSeek、字节豆包、ChatGLM、文心一言、讯飞星火、通义千问、360 智脑、腾讯混元等主流模型，统一 API 适配，可用于 key….
- [mnfst/llm-gateway](https://github.com/mnfst/llm-gateway) - Connect Your Agents And Harnesses With Any Provider.
- [BlockRunAI/ClawRouter](https://github.com/BlockRunAI/ClawRouter) - The agent-native LLM router for autonomous agents. Every frontier model behind one wallet, <1ms local routing, USDC payments on Base &….
- [algorithmicsuperintelligence/optillm](https://github.com/algorithmicsuperintelligence/optillm) - Optimizing inference proxy for LLMs.
- [fuergaosi233/claude-code-proxy](https://github.com/fuergaosi233/claude-code-proxy) - Claude Code to OpenAI API Proxy.

## Free LLM APIs & Free Tiers

*Build and learn without a credit card.*

- [open-free-llm-api/awesome-freellm-apis](https://github.com/open-free-llm-api/awesome-freellm-apis) - 130+ free LLM APIs with one-click setup for Claude Code, Cursor and Codex.
- [mnfst/awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis) - Permanent free LLM API keys.
- [nejib1/Free-LLM](https://github.com/nejib1/Free-LLM) - Directory of free LLM APIs, synced daily.
- [zebbern/no-cost-ai](https://github.com/zebbern/no-cost-ai) - 80+ free AI services for chat, image, video and voice.
- [vava-nessa/free-coding-models](https://github.com/vava-nessa/free-coding-models) - Find, benchmark and install 170+ free coding models from the CLI.
- [public-apis/public-apis](https://github.com/public-apis/public-apis) - The classic list of free public APIs.
- [cporter202/API-mega-list](https://github.com/cporter202/API-mega-list) - Large API directory.
- [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) - SaaS/PaaS/IaaS free tiers for developers.
- [iSoumyaDey/Awesome-Web-Hosting-2026](https://github.com/iSoumyaDey/Awesome-Web-Hosting-2026) - Free-tier vs paid hosting compared.
- [DmitryScaletta/free-heroku-alternatives](https://github.com/DmitryScaletta/free-heroku-alternatives) - Free backend hosting alternatives.
- [DmitryScaletta/free-database-services](https://github.com/DmitryScaletta/free-database-services) - Free database services.
- [DigitalPlatDev/FreeDomain](https://github.com/DigitalPlatDev/FreeDomain) - Free domain registration and DNS learning.
- [AchoArnold/discount-for-student-dev](https://github.com/AchoArnold/discount-for-student-dev) - Software discounts for student developers.
- [somratpro/HuggingMes](https://github.com/somratpro/HuggingMes) - Run Hermes agent free on a Hugging Face Space.

## Local Models, Inference & Hardware

**Serving**

- [ollama/ollama](https://github.com/ollama/ollama) - Run models locally with one command; the default for development.
- [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) - CPU/GPU inference in C++; the engine behind most local tooling.
- [vllm-project/vllm](https://github.com/vllm-project/vllm) - High-throughput production serving with paged attention.
- [sgl-project/sglang](https://github.com/sgl-project/sglang) - Fast serving with structured generation and prefix caching.
- [lmstudio-ai/lms](https://github.com/lmstudio-ai/lms) - CLI for LM Studio's local model server.
- [huggingface/text-generation-inference](https://github.com/huggingface/text-generation-inference) - Hugging Face's production inference server.

**Training & fine-tuning**

- [unslothai/unsloth](https://github.com/unslothai/unsloth) - Fine-tune and run LLMs locally, fast and memory-efficient.
- [huggingface/transformers](https://github.com/huggingface/transformers) - The model library; everything starts here.
- [huggingface/peft](https://github.com/huggingface/peft) - LoRA and other parameter-efficient fine-tuning methods.
- [axolotl-ai-cloud/axolotl](https://github.com/axolotl-ai-cloud/axolotl) - Config-driven fine-tuning for many architectures.

**Hardware fit**

- [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) - One command to find which models fit your hardware.
- [signerless/llm-checker](https://github.com/signerless/llm-checker) - Scan your hardware and get exact runnable-model recommendations.
- [Tencent-Hunyuan/Hunyuan-A13B](https://github.com/Tencent-Hunyuan/Hunyuan-A13B) - Open fine-grained MoE model.
- [open-webui/open-webui](https://github.com/open-webui/open-webui) - Self-hosted chat UI for Ollama and OpenAI-compatible backends.
- [analyticalrohit/llms-from-scratch](https://github.com/analyticalrohit/llms-from-scratch) - Build a GPT-style LLM from scratch in PyTorch.

**More**

- [hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory) - Unified Efficient Fine-Tuning of 100+ LLMs & VLMs (ACL 2024).
- [deepspeedai/DeepSpeed](https://github.com/deepspeedai/DeepSpeed) - DeepSpeed is a deep learning optimization library that makes distributed training and inference easy, efficient, and effective.
- [hpcaitech/ColossalAI](https://github.com/hpcaitech/ColossalAI) - Making large AI models cheaper, faster and more accessible.
- [microsoft/BitNet](https://github.com/microsoft/BitNet) - Official inference framework for 1-bit LLMs.
- [lyogavin/airllm](https://github.com/lyogavin/airllm) - AirLLM 70B inference with single 4GB GPU.
- [Lightning-AI/pytorch-lightning](https://github.com/Lightning-AI/pytorch-lightning) - Pretrain, finetune ANY AI model of ANY size on 1 or 10,000+ GPUs with zero code changes.
- [mlc-ai/web-llm](https://github.com/mlc-ai/web-llm) - High-performance In-browser LLM Inference Engine.
- [huggingface/transformers.js](https://github.com/huggingface/transformers.js) - State-of-the-art Machine Learning for the web. Run Transformers directly in your browser, with no need for a server!.
- [bentoml/OpenLLM](https://github.com/bentoml/OpenLLM) - Run any open-source LLMs, such as DeepSeek and Llama, as OpenAI compatible API endpoint in the cloud.
- [mudler/LocalAI](https://github.com/mudler/LocalAI) - LocalAI is the open-source AI engine. Run any model - LLMs, vision, voice, image, video - on any hardware. No GPU required.
- [mozilla-ai/llamafile](https://github.com/mozilla-ai/llamafile) - Distribute and run LLMs with a single file.
- [mlc-ai/mlc-llm](https://github.com/mlc-ai/mlc-llm) - Universal LLM Deployment Engine with ML Compilation.

- [NVIDIA/TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) - NVIDIA's official optimized inference engine for LLMs on CUDA GPUs.
- [kvcache-ai/Mooncake](https://github.com/kvcache-ai/Mooncake) - KVCache-centric disaggregated LLM serving platform behind Moonshot AI's Kimi.
## Evaluation, Observability & Code Review

**Tracing & observability**

- [langfuse/langfuse](https://github.com/langfuse/langfuse) - Open-source LLM observability: traces, evals, prompt management; self-hostable.
- [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) - OpenTelemetry-based tracing and evaluation for LLM apps.
- [traceloop/openllmetry](https://github.com/traceloop/openllmetry) - OpenTelemetry instrumentation for every major LLM library.
- [langchain-ai/langsmith-sdk](https://github.com/langchain-ai/langsmith-sdk) - SDK for LangSmith tracing and datasets.

**Evaluation**

- [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) - Test prompts and agents like code; CI-friendly with red-teaming.
- [confident-ai/deepeval](https://github.com/confident-ai/deepeval) - Pytest-style unit tests for LLM outputs.
- [explodinggradients/ragas](https://github.com/explodinggradients/ragas) - Evaluation metrics for RAG pipelines.
- [openai/evals](https://github.com/openai/evals) - OpenAI's eval framework and registry.
- [EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) - Standard framework for few-shot LLM evaluation.

**Security**

- [protectai/llm-guard](https://github.com/protectai/llm-guard) - Prompt-injection, PII and toxicity scanners for inputs and outputs.
- [meta-llama/PurpleLlama](https://github.com/meta-llama/PurpleLlama) - Llama Guard and CyberSecEval for safe deployments.
- [OWASP/www-project-top-10-for-large-language-model-applications](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications) - The OWASP Top 10 for LLM apps; read before shipping an agent with tools.

**Code review**

- [alibaba/open-code-review](https://github.com/alibaba/open-code-review) - Hybrid deterministic + LLM code review, battle-tested at Alibaba scale.
- [qodo-ai/pr-agent](https://github.com/qodo-ai/pr-agent) - AI pull-request review, description and improvement suggestions.
- [Trusted-AI/AIF360](https://github.com/Trusted-AI/AIF360) - Fairness metrics and bias-mitigation algorithms.
- [jesseduffield/lazygit](https://github.com/jesseduffield/lazygit) - Terminal UI for reviewing what your agent just did to git.
- [CapSoftware/Cap](https://github.com/CapSoftware/Cap) - Open-source screen recording for demos and bug reports.

**More**

- [raga-ai-hub/RagaAI-Catalyst](https://github.com/raga-ai-hub/RagaAI-Catalyst) - Python SDK for Agent AI Observability, Monitoring and Evaluation Framework. Includes features like agent, llm and tools tracing,….
- [vibrantlabsai/ragas](https://github.com/vibrantlabsai/ragas) - Supercharge Your LLM Application Evaluations.
- [evidentlyai/evidently](https://github.com/evidentlyai/evidently) - Evidently is ​​an open-source ML and LLM observability framework. Evaluate, test, and monitor any AI-powered system or data pipeline.….
- [open-compass/opencompass](https://github.com/open-compass/opencompass) - OpenCompass is an LLM evaluation platform, supporting a wide range of models (Llama3, Mistral, InternLM2,GPT-4,LLaMa2, Qwen,GLM, Claude,….
- [mlflow/mlflow](https://github.com/mlflow/mlflow) - The open source AI engineering platform for agents, LLMs, and ML models. MLflow enables teams of all sizes to debug, evaluate, monitor,….
- [clearml/clearml](https://github.com/clearml/clearml) - ClearML - Auto-Magical CI/CD to streamline your AI workload. Experiment Management, Data Management, Pipeline, Orchestration, Scheduling….
- [wandb/wandb](https://github.com/wandb/wandb) - The AI developer platform. Use Weights & Biases to train and fine-tune models, and manage models from experimentation to production.

- [Helicone/helicone](https://github.com/Helicone/helicone) - Open-source LLM observability platform plus AI gateway with caching and cost tracking.
- [openlit/openlit](https://github.com/openlit/openlit) - OpenTelemetry-native observability and evaluation for AI and coding agents.
- [UKGovernmentBEIS/inspect_ai](https://github.com/UKGovernmentBEIS/inspect_ai) - LLM evaluation framework from the UK AI Security Institute with 200+ agentic benchmarks.
## Production Architectures & Reference Systems

*Complete, opinionated systems worth reading end to end.*

- [FareedKhan-dev/production-grade-agentic-system](https://github.com/FareedKhan-dev/production-grade-agentic-system) - The seven layers of a production agentic system.
- [NirDiamant/agents-towards-production](https://github.com/NirDiamant/agents-towards-production) - Code-first tutorials for production GenAI agents.
- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) - 100+ open-source agent, skill and RAG apps.
- [ashishpatel26/500-AI-Agents-Projects](https://github.com/ashishpatel26/500-AI-Agents-Projects) - 500 agent use cases with implementations.
- [Arindam200/awesome-ai-apps](https://github.com/Arindam200/awesome-ai-apps) - RAG, agent and workflow project showcase.
- [souvikmajumder26/Multi-Agent-Medical-Assistant](https://github.com/souvikmajumder26/Multi-Agent-Medical-Assistant) - Multi-agent medical diagnostics assistant.
- [entbappy/Build-a-Complete-Medical-Chatbot-with-LLMs-LangChain-Pinecone-Flask-AWS](https://github.com/entbappy/Build-a-Complete-Medical-Chatbot-with-LLMs-LangChain-Pinecone-Flask-AWS) - End-to-end medical RAG chatbot deployed to AWS.
- [SaqlainXoas/python-ai-deployment-guide](https://github.com/SaqlainXoas/python-ai-deployment-guide) - Production deployment of Python AI apps with FastAPI.
- [hesamsheikh/awesome-openclaw-usecases](https://github.com/hesamsheikh/awesome-openclaw-usecases) - Real-world OpenClaw use cases.
- [RUC-NLPIR/Awesome-Long-Horizon-Agents](https://github.com/RUC-NLPIR/Awesome-Long-Horizon-Agents) - Roadmap and papers for long-horizon agents.
- [NirDiamant/GenAI_Agents](https://github.com/NirDiamant/GenAI_Agents) - 50+ tutorials and implementations for Generative AI Agent techniques, from basic conversational bots to complex multi-agent systems.

- [GoogleCloudPlatform/agent-starter-pack](https://github.com/GoogleCloudPlatform/agent-starter-pack) - Production-ready agent templates for Google Cloud with CI/CD, evals, and observability.
- [google/adk-recipes](https://github.com/google/adk-recipes) - Official sample agents built with Google's Agent Development Kit.
- [vercel/chatbot](https://github.com/vercel/chatbot) - Full-featured, hackable Next.js AI chatbot template built by Vercel.
## UI & Application Layer

- [Chainlit/chainlit](https://github.com/Chainlit/chainlit) - Build conversational AI UIs in minutes.
- [streamlit/streamlit](https://github.com/streamlit/streamlit) - Fastest way to put a Python demo in front of users.
- [gradio-app/gradio](https://github.com/gradio-app/gradio) - Web UIs for ML models with a few lines of Python.
- [vercel/ai](https://github.com/vercel/ai) - Vercel AI SDK for streaming, tool-calling React/Next.js apps.
- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) - Drop in-app copilots and agent UIs into React.
- [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui) - Composable React components for chat interfaces.
- [fastapi/fastapi](https://github.com/fastapi/fastapi) - The backend most Python agents are served from.
- [Textualize/textual](https://github.com/Textualize/textual) - Build rich terminal UIs in Python.
- [DayuanJiang/next-ai-draw-io](https://github.com/DayuanJiang/next-ai-draw-io) - AI-assisted diagramming with draw.io in Next.js.
- [bradtraversy/design-resources-for-developers](https://github.com/bradtraversy/design-resources-for-developers) - Design and UI resources for developers.

## Learning Path

*Ordered roughly from beginner to advanced.*

**Foundations**

- [microsoft/AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) - 12-week AI curriculum.
- [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) - 21 lessons on building with generative AI.
- [mlabonne/llm-course](https://github.com/mlabonne/llm-course) - LLM roadmap with Colab notebooks.
- [markredito/selfstudy-roadmap-ml-ai](https://github.com/markredito/selfstudy-roadmap-ml-ai) - Self-study ML/AI roadmap.
- [aadi1011/AI-ML-Roadmap-from-scratch](https://github.com/aadi1011/AI-ML-Roadmap-from-scratch) - 0-to-100 AI/ML roadmap.
- [Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses) - CS courses with video lectures.

**Agents & AI engineering**

- [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) - 18 lessons on building agents.
- [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) - Learn it, build it, ship it.
- [patchy631/ai-engineering-hub](https://github.com/patchy631/ai-engineering-hub) - In-depth tutorials on LLMs, RAG and agents.
- [chiphuyen/aie-book](https://github.com/chiphuyen/aie-book) - Resources for Chip Huyen's *AI Engineering*.
- [HandsOnLLM/Hands-On-Large-Language-Models](https://github.com/HandsOnLLM/Hands-On-Large-Language-Models) - Code for the O'Reilly book.
- [ProjectProRepo/Agentic-AI](https://github.com/ProjectProRepo/Agentic-AI) - Agentic AI learning resources.
- [MicrosoftLearning/AI-102-AIEngineer](https://github.com/MicrosoftLearning/AI-102-AIEngineer) - Lab files for the AI-102 certification.

**Must-read essays & guides**

- [Anthropic — Building effective agents](https://www.anthropic.com/research/building-effective-agents) - Workflows vs agents, and the patterns that actually work.
- [Anthropic — Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) - Managing what goes into the context window.
- [OpenAI — A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) - Orchestration, guardrails and when to use agents.
- [Lilian Weng — LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) - The canonical survey: planning, memory, tool use.
- [12-Factor Agents](https://github.com/humanlayer/12-factor-agents) - Principles for reliable LLM applications.
- [The Prompt Report](https://arxiv.org/abs/2406.06608) - Systematic survey of prompting techniques.

**Research**

- [Hannibal046/Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM) - Curated LLM papers and resources.
- [masamasa59/ai-agent-papers](https://github.com/masamasa59/ai-agent-papers) - Agent papers, updated biweekly.
- [kyegomez/awesome-multi-agent-papers](https://github.com/kyegomez/awesome-multi-agent-papers) - Best multi-agent papers.
- [aishwaryanr/awesome-generative-ai-guide](https://github.com/aishwaryanr/awesome-generative-ai-guide) - GenAI research updates and interview prep.

**More**

- [openai/openai-cua-sample-app](https://github.com/openai/openai-cua-sample-app) - Learn how to use CUA (our Computer Using Agent) via the API on multiple computer environments.
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) - Implement a ChatGPT-like LLM in PyTorch from scratch, step by step.
- [GokuMohandas/Made-With-ML](https://github.com/GokuMohandas/Made-With-ML) - Learn how to develop, deploy and iterate on production-grade ML applications.
- [microsoft/ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) - 12 weeks, 26 lessons, 52 quizzes, classic Machine Learning for all.
- [openai/openai-cookbook](https://github.com/openai/openai-cookbook) - Examples and guides for using the OpenAI API.
- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) - Train a 64M-parameter LLM from scratch in just 2h!.
- [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) - A collection of notebooks/recipes showcasing some fun and effective ways of using Claude.
- [Mooler0410/LLMsPracticalGuide](https://github.com/Mooler0410/LLMsPracticalGuide) - A curated list of practical guide resources of LLMs (LLMs Tree, Examples, Papers).
- [karpathy/nanochat](https://github.com/karpathy/nanochat) - The best ChatGPT that $100 can buy.

## Voice, Speech & Audio

*Speech-to-text, text-to-speech and voice agents.*

- [openai/whisper](https://github.com/openai/whisper) - Robust Speech Recognition via Large-Scale Weak Supervision.
- [RVC-Boss/GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) - 1 min voice data can also be used to train a good TTS model! (few shot voice cloning).
- [jamiepine/voicebox](https://github.com/jamiepine/voicebox) - The open-source AI voice studio. Clone, dictate, create.
- [microsoft/VibeVoice](https://github.com/microsoft/VibeVoice) - Open-Source Frontier Voice AI.
- [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) - Port of OpenAI's Whisper model in C/C++.
- [2noise/ChatTTS](https://github.com/2noise/ChatTTS) - A generative speech model for daily dialogue.
- [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) - Faster Whisper transcription with CTranslate2.
- [m-bain/whisperX](https://github.com/m-bain/whisperX) - WhisperX: Automatic Speech Recognition with Word-level Timestamps (& Diarization).
- [index-tts/index-tts](https://github.com/index-tts/index-tts) - An Industrial-Level Controllable and Efficient Zero-Shot Text-To-Speech System.
- [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) - Audiocraft is a library for audio processing and generation with deep learning. It features the state-of-the-art EnCodec audio….

- [livekit/agents](https://github.com/livekit/agents) - Realtime multimodal voice-agent framework on LiveKit's WebRTC infrastructure.
- [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat) - Pipeline framework for voice and multimodal conversational AI agents.
- [fishaudio/fish-speech](https://github.com/fishaudio/fish-speech) - State-of-the-art open-source text-to-speech with rapid voice cloning.
## Vision & Multimodal

*Image/video understanding and vision-language models.*

- [roboflow/supervision](https://github.com/roboflow/supervision) - We write your reusable computer vision tools.
- [QwenLM/Qwen3-VL](https://github.com/QwenLM/Qwen3-VL) - Qwen3-VL is the multimodal large language model series developed by Qwen team, Alibaba Cloud.
- [openai/CLIP](https://github.com/openai/CLIP) - Contrastive image-text model; the backbone of most multimodal retrieval.
- [facebookresearch/segment-anything](https://github.com/facebookresearch/segment-anything) - Promptable image segmentation from Meta.
- [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) - YOLO models for detection, segmentation and tracking.
- [haotian-liu/LLaVA](https://github.com/haotian-liu/LLaVA) - Large Language-and-Vision Assistant; open GPT-4V-style model.
- [salesforce/LAVIS](https://github.com/salesforce/LAVIS) - Library for language-vision intelligence (BLIP-2 and friends).
- [open-mmlab/mmdetection](https://github.com/open-mmlab/mmdetection) - OpenMMLab detection toolbox.

- [OpenGVLab/InternVL](https://github.com/OpenGVLab/InternVL) - Open-source multimodal model family rivaling proprietary vision-language models.
## Image, Video & Creative Generation

*Diffusion, image and video generation tooling.*

- [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) - Stable Diffusion web UI.
- [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) - The most powerful and modular diffusion model GUI, api and backend with a graph/nodes interface.
- [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) - World's first open-source, agentic video production system. 12 production pipelines, 100+ tools, 700+ agent skill and….
- [apple-aiml-research/ml-stable-diffusion](https://github.com/apple-aiml-research/ml-stable-diffusion) - Stable Diffusion with Core ML on Apple Silicon.
- [showlab/Awesome-Video-Diffusion](https://github.com/showlab/Awesome-Video-Diffusion) - A curated list of recent diffusion models for video generation, editing, and various other applications.
- [huggingface/diffusers](https://github.com/huggingface/diffusers) - State-of-the-art diffusion models for image, video and audio.
- [lllyasviel/Fooocus](https://github.com/lllyasviel/Fooocus) - Focus on prompting and generating; Midjourney-style UI for SDXL.
- [black-forest-labs/flux](https://github.com/black-forest-labs/flux) - Official inference for FLUX image models.
- [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) - Open video generation.
- [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) - Creative engine for Stable Diffusion with a pro UI.
- [Stability-AI/generative-models](https://github.com/Stability-AI/generative-models) - Stability AI generative model releases.

- [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1) - Alibaba's open text/image-to-video generation and video-editing model suite.
- [Nerogar/OneTrainer](https://github.com/Nerogar/OneTrainer) - GUI and CLI toolkit for training and fine-tuning diffusion models including LoRA.
## Computer Use & GUI Agents

*Agents that operate desktops, phones and apps.*

- [Skyvern-AI/skyvern](https://github.com/Skyvern-AI/skyvern) - Automate browser based workflows with AI.
- [yuruotong1/autoMate](https://github.com/yuruotong1/autoMate) - Like Manus, Computer Use Agent(CUA) and Omniparser, we are computer-using agents.AI-driven local automation assistant that uses natural….
- [OpenAdaptAI/OpenAdapt](https://github.com/OpenAdaptAI/OpenAdapt) - Compiles a demonstrated GUI task into a program that reports VERIFIED only if an independent check agrees. pip install openadapt;….
- [openinterpreter/openinterpreter](https://github.com/openinterpreter/openinterpreter) - A coding agent for open models like Kimi K3 and GLM 5.3.
- [microsoft/OmniParser](https://github.com/microsoft/OmniParser) - A simple screen parsing tool towards pure vision based GUI agent.
- [microsoft/UFO](https://github.com/microsoft/UFO) - UI-focused agent for Windows OS interaction.
- [bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop) - Desktop app for the UI-TARS GUI agent model.
- [showlab/ShowUI](https://github.com/showlab/ShowUI) - Vision-language-action model for GUI agents.

- [trycua/cua](https://github.com/trycua/cua) - Open-source computer-use stack: drivers, cross-OS VM fleets, models, and benchmarks.
- [google-research/android_world](https://github.com/google-research/android_world) - Official Google Research Android environment and benchmark for autonomous GUI agents.
## Structured Output, Guardrails & Safety

*Validation, constrained decoding, jailbreak and injection defense.*

- [usestrix/strix](https://github.com/usestrix/strix) - Open-source AI penetration testing tool to find and fix your app’s vulnerabilities.
- [KeygraphHQ/shannon](https://github.com/KeygraphHQ/shannon) - Shannon is an AI pentester for web applications and APIs. It analyzes your source code, identifies attack vectors, and executes real….
- [NVIDIA/garak](https://github.com/NVIDIA/garak) - The LLM vulnerability scanner.
- [NVIDIA-NeMo/Guardrails](https://github.com/NVIDIA-NeMo/Guardrails) - NeMo Guardrails is an open-source toolkit for easily adding programmable guardrails to LLM-based conversational systems.
- [superagent-ai/superagent](https://github.com/superagent-ai/superagent) - Superagent protects your AI applications against prompt injections, data leaks, and harmful outputs. Embed safety directly into your app….
- [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) - AI Agent Governance Toolkit — Policy enforcement, zero-trust identity, execution sandboxing, and reliability engineering for autonomous….
- [Giskard-AI/giskard-oss](https://github.com/Giskard-AI/giskard-oss) - Open-Source Evaluation & Testing library for LLM Agents.
- [confident-ai/deepteam](https://github.com/confident-ai/deepteam) - DeepTeam is a framework to red team LLMs and AI agents.
- [microsoft/AI-Red-Teaming-Playground-Labs](https://github.com/microsoft/AI-Red-Teaming-Playground-Labs) - AI Red Teaming playground labs to run AI Red Teaming trainings including infrastructure.
- [msoedov/agentic_security](https://github.com/msoedov/agentic_security) - Agentic LLM Vulnerability Scanner / AI red teaming kit.
- [PKU-Alignment/safe-rlhf](https://github.com/PKU-Alignment/safe-rlhf) - Safe RLHF: Constrained Value Alignment via Safe Reinforcement Learning from Human Feedback.

## Chat UIs & Application Layer

*Front-ends, chat interfaces and app scaffolds.*

- [danny-avila/LibreChat](https://github.com/danny-avila/LibreChat) - Enhanced ChatGPT Clone: Features Agents, MCP, Skills, DeepSeek, Anthropic, AWS, OpenAI, Responses API, Azure, Groq, o1, GPT-5, Mistral,….
- [lobehub/lobehub](https://github.com/lobehub/lobehub) - LobeHub is your Chief Agent Operator, organizing your agents into 7×24 operations by hiring, scheduling, and reporting on your entire AI….
- [ChatGPTNextWeb/NextChat](https://github.com/ChatGPTNextWeb/NextChat) - Zero-config AI chat assistant. No API key needed — sign up and instantly chat with GPT-5, Claude 4, Gemini 2.5, DeepSeek & 100+ top….
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) - Stop renting your intelligence. Own it with AnythingLLM. Everything you need for a powerful local-first agent experience.
- [oobabooga/textgen](https://github.com/oobabooga/textgen) - Open-source desktop app for local LLMs. Text, vision, tool-calling, OpenAI/Anthropic-compatible API. 100% private.
- [janhq/jan](https://github.com/janhq/jan) - Jan is an open source alternative to ChatGPT that runs 100% offline on your computer.

- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) - Cross-platform AI desktop client with multi-provider support and MCP tools.
## Deployment, Serving & MLOps

*Ship and operate models and agents in production.*

- [marimo-team/marimo](https://github.com/marimo-team/marimo) - A reactive notebook for Python — run reproducible experiments, query with SQL, execute as a script, deploy as an app, and version with….
- [EthicalML/awesome-production-machine-learning](https://github.com/EthicalML/awesome-production-machine-learning) - A curated list of awesome open source libraries to deploy, monitor, version and scale your machine learning.
- [stackblitz-labs/bolt.diy](https://github.com/stackblitz-labs/bolt.diy) - Prompt, run, edit, and deploy full-stack web applications using any LLM you want!.
- [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) - Machine Learning Toolkit for Kubernetes.
- [DataTalksClub/mlops-zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp) - Free MLOps course from DataTalks.Club. Register here to get notified about the next cohort.
- [Netflix/metaflow](https://github.com/Netflix/metaflow) - Build, Manage and Deploy AI/ML Systems.
- [k8sgpt-ai/k8sgpt](https://github.com/k8sgpt-ai/k8sgpt) - Giving Kubernetes Superpowers to everyone.
- [feast-dev/feast](https://github.com/feast-dev/feast) - The Open Source Feature Store for AI/ML.
- [zenml-io/zenml](https://github.com/zenml-io/zenml) - ZenML : One AI Platform from Pipelines to Agents. https://zenml.io.
- [kelvins/awesome-mlops](https://github.com/kelvins/awesome-mlops) - Sunglasses: A curated list of awesome MLOps tools.
- [ray-project/ray](https://github.com/ray-project/ray) - Ray is an AI compute engine. Ray consists of a core distributed runtime and a set of AI Libraries for accelerating ML workloads.

- [skypilot-org/skypilot](https://github.com/skypilot-org/skypilot) - Multi-cloud AI compute orchestration for training and serving.
- [modal-labs/modal-client](https://github.com/modal-labs/modal-client) - Official SDKs for Modal's serverless GPU cloud platform.
## Data, Datasets & Synthetic Data

*Data curation, labeling, synthetic generation and datasets.*

- [cleanlab/cleanlab](https://github.com/cleanlab/cleanlab) - Cleanlab's open-source library is the standard data-centric AI package for data quality and machine learning with messy, real-world data….
- [doccano/doccano](https://github.com/doccano/doccano) - Open source annotation tool for machine learning practitioners.
- [mlabonne/llm-datasets](https://github.com/mlabonne/llm-datasets) - Curated list of datasets and tools for post-training.
- [huggingface/datasets](https://github.com/huggingface/datasets) - The largest hub of ready-to-use datasets for AI models with fast, easy-to-use and efficient data manipulation tools.
- [HumanSignal/label-studio](https://github.com/HumanSignal/label-studio) - Label Studio is a multi-type data labeling and annotation tool with standardized output format.
- [cvat-ai/cvat](https://github.com/cvat-ai/cvat) - Computer Vision Annotation Tool (CVAT) is a leading platform for building high-quality visual datasets for vision AI. It offers….
- [tensorflow/datasets](https://github.com/tensorflow/datasets) - TFDS is a collection of datasets ready to use with TensorFlow, Jax,.
- [sdv-dev/SDV](https://github.com/sdv-dev/SDV) - Synthetic data generation for tabular data.
- [Data-Centric-AI-Community/fg-data-synthetic](https://github.com/Data-Centric-AI-Community/fg-data-synthetic) - Synthetic data generators for tabular and time-series data.

## Domain Agents: Finance, Healthcare, Research & More

*Vertical agents and assistants for specific industries.*

- [modelscope/ms-agent](https://github.com/modelscope/ms-agent) - MS-Agent: a lightweight framework to empower agentic execution of complex tasks.
- [sinaptik-ai/pandas-ai](https://github.com/sinaptik-ai/pandas-ai) - Chat with your database or your datalake (SQL, CSV, parquet). PandasAI makes data analysis conversational using LLMs and RAG.
- [eosphoros-ai/DB-GPT](https://github.com/eosphoros-ai/DB-GPT) - Open-source agentic AI data assistant for the next generation of AI + Data products.
- [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) - An autonomous agent that conducts deep research on any data using any LLM providers.
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) - Open Data Platform for analysts, quants and AI agents.
- [microsoft/qlib](https://github.com/microsoft/qlib) - Qlib is an AI-oriented Quant investment platform that aims to use AI tech to empower Quant Research, from exploring ideas to….
- [SakanaAI/AI-Scientist](https://github.com/SakanaAI/AI-Scientist) - The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery ‍.
- [Project-MONAI/MONAI](https://github.com/Project-MONAI/MONAI) - AI Toolkit for Healthcare Imaging.
- [shibing624/MedicalGPT](https://github.com/shibing624/MedicalGPT) - MedicalGPT: Training Your Own Medical GPT Model with ChatGPT Training Pipeline. 训练医疗大模型，实现了包括增量预训练(PT)、有监督微调(SFT)、RLHF、DPO、ORPO、GRPO。.
- [jina-ai/node-DeepResearch](https://github.com/jina-ai/node-DeepResearch) - Keep searching, reading webpages, reasoning until it finds the answer (or exceeding the token budget).

## Assistants, Copilots & Personal Agents

*General-purpose assistants you run yourself.*
- [khoj-ai/khoj](https://github.com/khoj-ai/khoj) - Your AI second brain. Self-hostable. Get answers from the web or your docs. Build custom agents, schedule automations, do deep research.….
- [logancyang/obsidian-copilot](https://github.com/logancyang/obsidian-copilot) - THE Copilot in Obsidian.
- [simonw/llm](https://github.com/simonw/llm) - CLI and Python library for talking to any LLM, with plugins.
- [sigoden/aichat](https://github.com/sigoden/aichat) - All-in-one LLM CLI: shell assistant, RAG, agents.
- [TheR1D/shell_gpt](https://github.com/TheR1D/shell_gpt) - Command-line productivity tool powered by LLMs.
- [Bin-Huang/chatbox](https://github.com/Bin-Huang/chatbox) - Desktop client for many LLM APIs.
- [lencx/ChatGPT](https://github.com/lencx/ChatGPT) - ChatGPT desktop app for Mac, Windows and Linux.
- [leon-ai/leon](https://github.com/leon-ai/leon) - Open-source personal assistant you self-host.

## Interpretability, Alignment & Research

*Understanding and steering model behaviour.*

- [shap/shap](https://github.com/shap/shap) - A game theoretic approach to explain the output of any machine learning model.
- [huggingface/trl](https://github.com/huggingface/trl) - Train transformer language models with reinforcement learning.
- [MaartenGr/BERTopic](https://github.com/MaartenGr/BERTopic) - Leveraging BERT and c-TF-IDF to create easily interpretable topics.
- [TransformerLensOrg/TransformerLens](https://github.com/TransformerLensOrg/TransformerLens) - A library for mechanistic interpretability of GPT-style language models.
- [dair-ai/AI-Papers-of-the-Week](https://github.com/dair-ai/AI-Papers-of-the-Week) - Highlighting the top ML papers every week.
- [jbloomAus/SAELens](https://github.com/jbloomAus/SAELens) - Train and analyze sparse autoencoders on language models.
- [openai/transformer-debugger](https://github.com/openai/transformer-debugger) - Tool for investigating specific behaviors of small language models.
- [ndif-team/nnsight](https://github.com/ndif-team/nnsight) - Interpret and manipulate the internals of deep models.

## Developer Tools & Utilities

*Useful things that don't fit a layer.*
- [OtterMind/Chat2DB](https://github.com/OtterMind/Chat2DB) - Chat2DB is a free, cross-platform, local-first database client and SQL workspace for developers, DBAs, analysts, and data teams. Connect….
- [di-sukharev/opencommit](https://github.com/di-sukharev/opencommit) - Generate commit messages with an LLM.
- [Nutlope/aicommits](https://github.com/Nutlope/aicommits) - Write git commit messages with AI.
- [BuilderIO/gpt-crawler](https://github.com/BuilderIO/gpt-crawler) - Crawl a site to generate knowledge files for a custom GPT.
- [abi/screenshot-to-code](https://github.com/abi/screenshot-to-code) - Turn a screenshot into clean HTML/Tailwind/React.
- [zed-industries/zed](https://github.com/zed-industries/zed) - High-performance editor with built-in agentic coding.

- [astral-sh/uv](https://github.com/astral-sh/uv) - Extremely fast Python package and project manager written in Rust.
- [jdx/mise](https://github.com/jdx/mise) - Dev-tool version manager, env vars, and task runner in one binary.
## Other Awesome Lists

- [KalyanKS-NLP/llm-engineer-toolkit](https://github.com/KalyanKS-NLP/llm-engineer-toolkit) - 120+ LLM libraries by category.
- [Sumanth077/ai-engineering-toolkit](https://github.com/Sumanth077/ai-engineering-toolkit) - 100+ libraries for AI engineers.
- [ai-for-developers/awesome-ai-coding-tools](https://github.com/ai-for-developers/awesome-ai-coding-tools) - AI coding tools.
- [filipecalegario/awesome-vibe-coding](https://github.com/filipecalegario/awesome-vibe-coding) - Vibe-coding references.
- [cporter202/ai-agent-tools](https://github.com/cporter202/ai-agent-tools) - AI tools and utilities.
- [devtoolsd/awesome-cloud](https://github.com/devtoolsd/awesome-cloud) - Cloud computing resources.
- [recodehive/machine-learning-repos](https://github.com/recodehive/machine-learning-repos) - ML frameworks by language.
- [amartinson193/The-Ultimate-List-of-Free-SQL-Resources](https://github.com/amartinson193/The-Ultimate-List-of-Free-SQL-Resources) - Free SQL learning resources.
- [Axorax/awesome-free-apps](https://github.com/Axorax/awesome-free-apps) - Best free apps for PC and mobile.

**More**

- [academic/awesome-datascience](https://github.com/academic/awesome-datascience) - Memo: An awesome Data Science repository to learn and apply for real world problems.
- [lukasmasuch/best-of-ml-python](https://github.com/lukasmasuch/best-of-ml-python) - A ranked list of awesome machine learning Python libraries. Updated weekly.
- [e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) - A list of AI autonomous agents.
- [codefuse-ai/Awesome-Code-LLM](https://github.com/codefuse-ai/Awesome-Code-LLM) - [TMLR] A curated list of language modeling researches for code (and other software engineering activities), plus related datasets.
- [kyrolabs/awesome-agents](https://github.com/kyrolabs/awesome-agents) - Awesome list of AI Agents.

## Contributing

Contributions welcome — read [CONTRIBUTING.md](CONTRIBUTING.md) first. The bar: you have used it, it is maintained, and it fits a layer of the stack.

## License

[CC0 1.0](LICENSE) — public domain. Maintained by [Tayyab Imam](https://github.com/tayyabimam1).
