# Old audit vs new audit

Old: 651 flagged. New: 673 flagged.

## What happened to each old status

| old status | rows | same status | other flag | now clean | not re-audited |
|---|---|---|---|---|---|
| DEAD | 31 | 31 (100%) | 0 | 0 | 0 |
| FORMAT_ISSUE | 142 | 112 (78%) | 23 | 7 | 0 |
| OFF_THEME | 437 | 64 (14%) | 50 | 323 | 0 |
| STALE | 41 | 41 (100%) | 0 | 0 | 0 |

## Flagged now but not in the old CSV: 352

| status | count |
|---|---|
| OFF_THEME | 194 |
| MOVE | 96 |
| NEEDS_HUMAN | 60 |
| STALE | 2 |

First 25:

- NousResearch/hermes-agent (MOVE): Move to Agent Frameworks & Orchestration: Described as a 'general-purpose agent' not specifically co
- ccusage/ccusage (NEEDS_HUMAN): Agent keeps; judge says move: Tool tracks token usage; better placed in Observability, not Skills.
- OneRedOak/claude-code-workflows (NEEDS_HUMAN): Agent keeps; judge says remove: Primarily documentation, not an AI tool
- hesreallyhim/awesome-claude-code (NEEDS_HUMAN): Agent keeps; judge says move: It's an awesome list, should belong in Other Awesome Lists.
- run-llama/llama_index (MOVE): Move to RAG & Retrieval: Data framework for LLMs
- superplanehq/superplane (MOVE): Move to Workflow Automation: One-shot engineering factory
- BoxcarsAI/boxcars (OFF_THEME): Not an agent framework, but a Ruby framework for building applications with LLMs.
- langgenius/dify (MOVE): Move to UI & Application Layer: Visual builder for agentic workflows and RAG pipelines, fits better 
- langflow-ai/langflow (MOVE): Move to UI & Application Layer: Drag-and-drop builder for LangChain flows and agents, fits better in
- scholarly360/From-Zero-to-Microsoft-Foundry-Creating-Agents-Via-AI-Projects-Library (MOVE): Move to Learning Path: Tutorial on creating agents
- Fei2411/DeepSeek-Bot (OFF_THEME): Duplicate entry
- getzep/zep (OFF_THEME): Lack of memory context
- Mirix-AI/MIRIX (MOVE): Move to Assistants, Copilots & Personal Agents: Personal assistant with memory
- Graphify-Labs/graphify (MOVE): Move to Skills, Plugins & Context Engineering: queryable graph
- Egonex-AI/Understand-Anything (MOVE): Move to Skills, Plugins & Context Engineering: interactive knowledge graph
- TeleAI-UAGI/Awesome-Agent-Memory (OFF_THEME): awesome list
- tikv/tikv (OFF_THEME): Not an AI or LLM tooling
- vitessio/vitess (OFF_THEME): Not an AI or LLM tooling
- cockroachdb/cockroach (OFF_THEME): Not an AI or LLM tooling
- apache/cassandra (OFF_THEME): Not an AI or LLM tooling
- searxng/searxng (NEEDS_HUMAN): Agent keeps; judge says remove: General metasearch engine unrelated to AI retrieval; should be remov
- superlinked/sie (MOVE): Move to Deployment, Serving & MLOps: Inference server
- jamwithai/production-agentic-rag-course (OFF_THEME): Course, not tooling
- intuit/infigraph (MOVE): Move to Coding Agents & Harnesses: Code intelligence engine
- punkpeye/awesome-mcp-clients (NEEDS_HUMAN): Agent keeps; judge says move: It's a curated list, better suited for Other Awesome Lists.

## Old OFF_THEME that the new audit keeps: 323

- argilla-io/argilla (Data, Datasets & Synthetic Data)
- cvat-ai/cvat (Data, Datasets & Synthetic Data)
- datachain-ai/datachain (Data, Datasets & Synthetic Data)
- huggingface/dataset-viewer (Data, Datasets & Synthetic Data)
- mlabonne/llm-datasets (Data, Datasets & Synthetic Data)
- mlcommons/croissant (Data, Datasets & Synthetic Data)
- tensorflow/datasets (Data, Datasets & Synthetic Data)
- togethercomputer/RedPajama-Data (Data, Datasets & Synthetic Data)
- voxel51/fiftyone (Data, Datasets & Synthetic Data)
- webdataset/webdataset (Data, Datasets & Synthetic Data)
- ale94lko/llm-workbench (Developer Tools & Utilities)
- andrewyng/aisuite (Developer Tools & Utilities)
- aryanjp1/costpilot (Developer Tools & Utilities)
- cluebbehusen/lmux (Developer Tools & Utilities)
- DavidAucancela/llm-observatory (Developer Tools & Utilities)
- di-sukharev/opencommit (Developer Tools & Utilities)
- eroslifestyle/token-ledger (Developer Tools & Utilities)
- google/sentencepiece (Developer Tools & Utilities)
- hegelai/prompttools (Developer Tools & Utilities)
- huggingface/tokenizers (Developer Tools & Utilities)
- hynek/stamina (Developer Tools & Utilities)
- jd/tenacity (Developer Tools & Utilities)
- lemon956/aicommit (Developer Tools & Utilities)
- mozilla-ai/any-llm (Developer Tools & Utilities)
- Nutlope/aicommits (Developer Tools & Utilities)
- openai/openai-node (Developer Tools & Utilities)
- openai/openai-python (Developer Tools & Utilities)
- openai/tiktoken (Developer Tools & Utilities)
- openmeterio/openmeter (Developer Tools & Utilities)
- PioneerSquareLabs/metergraph (Developer Tools & Utilities)
- pydantic/pydantic (Developer Tools & Utilities)
- qzhao19/auto-commit (Developer Tools & Utilities)
- sekerderya/prompt-watch (Developer Tools & Utilities)
- supernova-app/ai-playground (Developer Tools & Utilities)
- AI4Finance-Foundation/FinGPT (Domain Agents: Finance, Healthcare, Research & More)
- 0xzr/freellmpool (Free LLM APIs & Free Tiers)
- AgnesAI-Labs/AgnesAI-Models (Free LLM APIs & Free Tiers)
- Artur21101965/freegate (Free LLM APIs & Free Tiers)
- autcir/openvidia (Free LLM APIs & Free Tiers)
- CicadaRelay/free-llm-hub (Free LLM APIs & Free Tiers)
