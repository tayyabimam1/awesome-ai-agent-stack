# Awesome AI Agent Stack

*A curated, layer-by-layer map of the tools I actually use to build AI agents — from the coding agent in your terminal down to the model serving the tokens.*

<div class="stats">
  <div class="stat"><b>3,022</b><span>curated entries</span></div>
  <div class="stat"><b>31</b><span>chapters</span></div>
  <div class="stat"><b>2,985</b><span>GitHub projects</span></div>
  <div class="stat"><b>0</b><span>dead links</span></div>
</div>

The top of each chapter is hand-picked — tools actually used, read, or evaluated.
The **More** lists extend each layer with projects that pass a mechanical bar: real,
public, not archived, actively maintained.

## Browse by layer

<div class="cards">
  <a class="card" href="#/starter-stacks">
    <strong>Starter Stacks</strong>
    <span>Three opinionated combinations that work together out of the box. Start here if you don't want to choose.</span>
  </a>
  <a class="card" href="#/coding-agents-harnesses">
    <strong>Coding Agents & Harnesses</strong>
    <span>The agent that writes the code. Pick one, learn it deeply.</span>
    <em>145 entries →</em>
  </a>
  <a class="card" href="#/skills-plugins-context-engineering">
    <strong>Skills, Plugins & Context Engineering</strong>
    <span>What you put in front of the agent matters more than which agent. Skills, CLAUDE.md files, methodology.</span>
    <em>157 entries →</em>
  </a>
  <a class="card" href="#/agent-frameworks-orchestration">
    <strong>Agent Frameworks & Orchestration</strong>
    <span>Build your own agents and multi-agent systems.</span>
    <em>163 entries →</em>
  </a>
  <a class="card" href="#/memory-persistent-context">
    <strong>Memory & Persistent Context</strong>
    <span>Agents forget between sessions unless you give them somewhere to remember.</span>
    <em>117 entries →</em>
  </a>
  <a class="card" href="#/rag-retrieval">
    <strong>RAG & Retrieval</strong>
    <span>*Vector databases*</span>
    <em>126 entries →</em>
  </a>
  <a class="card" href="#/mcp-servers-tool-integration">
    <strong>MCP Servers & Tool Integration</strong>
    <span>The Model Context Protocol is the USB-C of agent tooling.</span>
    <em>137 entries →</em>
  </a>
  <a class="card" href="#/sandboxes-browsers-computer-use">
    <strong>Sandboxes, Browsers & Computer Use</strong>
    <span>*Sandboxes*</span>
    <em>100 entries →</em>
  </a>
  <a class="card" href="#/document-processing-data-ingestion">
    <strong>Document Processing & Data Ingestion</strong>
    <span>Getting real-world files into a form agents can use.</span>
    <em>95 entries →</em>
  </a>
  <a class="card" href="#/workflow-automation">
    <strong>Workflow Automation</strong>
    <span>No-code and code-first automation with AI steps — the glue between your agents and everything else.</span>
    <em>101 entries →</em>
  </a>
  <a class="card" href="#/model-gateways-routing">
    <strong>Model Gateways & Routing</strong>
    <span>One endpoint, many providers, automatic fallback.</span>
    <em>189 entries →</em>
  </a>
  <a class="card" href="#/free-llm-apis-free-tiers">
    <strong>Free LLM APIs & Free Tiers</strong>
    <span>Build and learn without a credit card.</span>
    <em>97 entries →</em>
  </a>
  <a class="card" href="#/local-models-inference-hardware">
    <strong>Local Models, Inference & Hardware</strong>
    <span>*Training & fine-tuning*</span>
    <em>134 entries →</em>
  </a>
  <a class="card" href="#/evaluation-observability-code-review">
    <strong>Evaluation, Observability & Code Review</strong>
    <span>*Tracing & observability*</span>
    <em>153 entries →</em>
  </a>
  <a class="card" href="#/production-architectures-reference-systems">
    <strong>Production Architectures & Reference Systems</strong>
    <span>Complete, opinionated systems worth reading end to end.</span>
    <em>61 entries →</em>
  </a>
  <a class="card" href="#/ui-application-layer">
    <strong>UI & Application Layer</strong>
    <span>Frontends, chat components, and app frameworks for putting agents in front of users.</span>
    <em>84 entries →</em>
  </a>
  <a class="card" href="#/learning-path">
    <strong>Learning Path</strong>
    <span>Ordered roughly from beginner to advanced.</span>
    <em>99 entries →</em>
  </a>
  <a class="card" href="#/voice-speech-audio">
    <strong>Voice, Speech & Audio</strong>
    <span>Speech-to-text, text-to-speech and voice agents.</span>
    <em>103 entries →</em>
  </a>
  <a class="card" href="#/vision-multimodal">
    <strong>Vision & Multimodal</strong>
    <span>Image/video understanding and vision-language models.</span>
    <em>93 entries →</em>
  </a>
  <a class="card" href="#/image-video-creative-generation">
    <strong>Image, Video & Creative Generation</strong>
    <span>Diffusion, image and video generation tooling.</span>
    <em>108 entries →</em>
  </a>
  <a class="card" href="#/computer-use-gui-agents">
    <strong>Computer Use & GUI Agents</strong>
    <span>Agents that operate desktops, phones and apps.</span>
    <em>113 entries →</em>
  </a>
  <a class="card" href="#/structured-output-guardrails-safety">
    <strong>Structured Output, Guardrails & Safety</strong>
    <span>Validation, constrained decoding, jailbreak and injection defense.</span>
    <em>58 entries →</em>
  </a>
  <a class="card" href="#/chat-uis-application-layer">
    <strong>Chat UIs & Application Layer</strong>
    <span>Front-ends, chat interfaces and app scaffolds.</span>
    <em>61 entries →</em>
  </a>
  <a class="card" href="#/deployment-serving-mlops">
    <strong>Deployment, Serving & MLOps</strong>
    <span>Ship and operate models and agents in production.</span>
    <em>129 entries →</em>
  </a>
  <a class="card" href="#/data-datasets-synthetic-data">
    <strong>Data, Datasets & Synthetic Data</strong>
    <span>Data curation, labeling, synthetic generation and datasets.</span>
    <em>68 entries →</em>
  </a>
  <a class="card" href="#/domain-agents-finance-healthcare-research-more">
    <strong>Domain Agents: Finance, Healthcare, Research & More</strong>
    <span>Vertical agents and assistants for specific industries.</span>
    <em>60 entries →</em>
  </a>
  <a class="card" href="#/assistants-copilots-personal-agents">
    <strong>Assistants, Copilots & Personal Agents</strong>
    <span>General-purpose assistants you run yourself.</span>
    <em>53 entries →</em>
  </a>
  <a class="card" href="#/interpretability-alignment-research">
    <strong>Interpretability, Alignment & Research</strong>
    <span>Understanding and steering model behaviour.</span>
    <em>58 entries →</em>
  </a>
  <a class="card" href="#/developer-tools-utilities">
    <strong>Developer Tools & Utilities</strong>
    <span>Useful things that don't fit a layer.</span>
    <em>69 entries →</em>
  </a>
  <a class="card" href="#/other-awesome-lists">
    <strong>Other Awesome Lists</strong>
    <span>Sibling lists worth mining when you need to go deeper on a niche.</span>
    <em>59 entries →</em>
  </a>
</div>

## Contribute

Found a missing tool or a dead link? [Open a pull request](https://github.com/tayyabimam1/awesome-ai-agent-stack/pulls) —
see the [contributing guide](contributing.md).
