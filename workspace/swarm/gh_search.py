#!/usr/bin/env python3
"""Local discovery: GitHub repository search for AI keywords, split by star range so no query is capped at 1,000.

  GH_TOKEN=... python gh_search.py OUT.jsonl       (resumable: finished keywords are skipped)
Every hit already carries the facts the bar needs: stars, last push, archived, fork.
"""
import datetime, json, os, sys, time, urllib.error, urllib.parse, urllib.request
from pathlib import Path

CUTOFF = (datetime.date.today() - datetime.timedelta(days=365)).isoformat()
KEYWORDS = """ai llm llms agent agents agentic gpt chatgpt claude mcp rag openai gemini llama ollama deepseek qwen mistral
anthropic copilot chatbot multimodal diffusion comfyui whisper tts speech voice ocr embedding embeddings vector
prompt prompts transformer transformers neural inference lora langchain llamaindex huggingface pytorch tensorflow
nlp genai aigc generative autonomous codex cursor robotics mlops onnx quantization guardrails interpretability
"language model" "machine learning" "deep learning" "stable diffusion" "text-to-speech" "speech recognition"
"computer vision" "image generation" "video generation" "text-to-image" "fine-tuning" "knowledge graph"
"semantic search" "reinforcement learning" "natural language" "code generation" "coding assistant"
"voice assistant" "object detection" "gaussian splatting" "model serving" "structured output"
"browser automation" "workflow automation" "web scraping" "vision language" "foundation model" "neural network"
"data labeling" "synthetic data" "vector database" "document parsing" "ai assistant" "ai tools" "awesome ai"
dataset benchmark segmentation nerf gpu vlm sft rlhf jailbreak "red teaming" tokenizer "speech synthesis"
"face recognition" "pose estimation" "image editing" "super resolution" "music generation" "3d generation"
"time series" "recommendation" "self-hosted ai" "local ai" "ai agent" "multi-agent" "claude code" "model context protocol"
skills n8n dify "low-code ai" "ai workflow" "ai search" "deep research" "ai coding" "vibe coding" "computer use"
"gui agent" "ai gateway" "llm proxy" "llm router" "free api" "prompt engineering" "context engineering" "ai memory"
"evaluation" "observability" "llmops" "ai safety" "alignment" "notebook" "jupyter" "data science" "autoencoder"
"text generation" "translation" "summarization" "question answering" "information extraction" "sentiment"
""".split("\n")
import shlex
KEYWORDS = [k for line in KEYWORDS for k in shlex.split(line)]
TOKEN = os.environ["GH_TOKEN"]


def get(q, page):
    url = "https://api.github.com/search/repositories?" + urllib.parse.urlencode(
        {"q": q, "per_page": 100, "page": page, "sort": "stars", "order": "desc"})
    req = urllib.request.Request(url, headers={"Authorization": "Bearer " + TOKEN, "User-Agent": "list-audit",
                                               "Accept": "application/vnd.github+json"})
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                time.sleep(2.1)   # search API: 30 requests a minute
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            wait = int(e.headers.get("Retry-After") or 0) or 30 * (attempt + 1)
            print(f"  http {e.code}, waiting {wait}s", flush=True); time.sleep(wait)
        except Exception as e:  # noqa: BLE001
            print("  retry:", repr(e)[:80], flush=True); time.sleep(10)
    return {"total_count": 0, "items": []}


def search(kw, lo, hi, emit):
    """All repos for kw with lo <= stars <= hi (hi None = no cap); halves the range while it holds over 1,000."""
    stars = f"stars:>={lo}" if hi is None else f"stars:{lo}..{hi}"
    kq = f'"{kw}"' if " " in kw or "-" in kw else kw
    q = f"{kq} {stars} pushed:>={CUTOFF} archived:false fork:false"
    d = get(q, 1)
    total = d.get("total_count", 0)
    if total > 1000 and (hi is None or hi > lo):
        mid = lo * 3 if hi is None else (lo + hi) // 2
        if hi is None:
            search(kw, lo, mid, emit); search(kw, mid + 1, None, emit)
        else:
            search(kw, lo, mid, emit); search(kw, mid + 1, hi, emit)
        return
    page = 1
    while True:
        for it in d.get("items", []):
            emit(it)
        if page * 100 >= min(total, 1000) or not d.get("items"):
            break
        page += 1
        d = get(q, page)


def main():
    out = Path(sys.argv[1])
    marks = out.with_suffix(".done")
    done = set(marks.read_text(encoding="utf-8").splitlines()) if marks.exists() else set()
    f = out.open("a", encoding="utf-8")
    for i, kw in enumerate(KEYWORDS, 1):
        if kw in done:
            continue
        n = [0]

        def emit(it):
            n[0] += 1
            f.write(json.dumps({"repo": it["full_name"], "stars": it["stargazers_count"], "pushed": it["pushed_at"][:10],
                                "archived": it["archived"], "fork": it["fork"], "description": it.get("description") or "",
                                "topics": it.get("topics") or [], "language": it.get("language") or "", "kw": kw},
                               ensure_ascii=False) + "\n")
        search(kw, 1000, None, emit)
        f.flush()
        with marks.open("a", encoding="utf-8") as m:
            m.write(kw + "\n")
        print(f"{time.strftime('%H:%M:%S')} [{i}/{len(KEYWORDS)}] {kw}: {n[0]} repos", flush=True)
    print("DONE", flush=True)


if __name__ == "__main__":
    main()
