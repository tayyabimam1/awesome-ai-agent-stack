#!/usr/bin/env python3
"""Phase 2: verify every candidate with the FreeLLMAPI gateway (OpenAI-compatible, model "auto").

For each candidate the gateway gives its own keep/reject, section, sub-group and
description, following CLASSIFY.md and taxonomy.md. Results go to phase2/gateway/*.json;
assemble.py treats them as the classifier where no Claude call exists and as the judge
where one does (disagreements land in needs-a-look.md).

  FREELLMAPI_URL=https://.../v1 FREELLMAPI_KEY=... python phase2/verify_gateway.py [--workers 3]
Env (never written to disk): FREELLMAPI_URL, FREELLMAPI_KEY, optional AUDIT_MODEL (default "auto"),
LLM_MAX_CALLS (default 3000). Resumable: answers are cached in phase2/gateway/cache.jsonl.
"""
import argparse
import json
import os
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "awesome-ai-agent-stack" / "scripts" / "audit"))
os.environ.setdefault("LLM_MAX_CALLS", "3000")
import run  # noqa: E402  (reuses the audit's gateway client, JSON extraction and cache)

FIELDS = ("repo", "stars", "description", "topics", "language")
SYSTEM = (HERE / "CLASSIFY.md").read_text(encoding="utf-8") + "\n\n" + (HERE / "taxonomy.md").read_text(encoding="utf-8") + """

You are given a JSON array of repos. Reply with JSON only: an array with one object per input repo, same order:
{"repo": "owner/name", "verdict": "keep|reject", "section": "", "group": "", "description": "", "reason": "max 12 words", "confidence": "high|medium|low"}"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--workers", type=int, default=3)
    ap.add_argument("--batch", type=int, default=10)
    a = ap.parse_args()
    run.llm_config()  # exits early if the env vars are missing
    model = os.environ.get("AUDIT_MODEL", "auto")
    out = HERE / "gateway"; out.mkdir(exist_ok=True)
    cache = run.Cache(out / "cache.jsonl")
    cands = json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))
    seen, todo = set(), []
    for c in cands:
        k = c["repo"].lower()
        if k not in seen and not cache.get(k):
            seen.add(k); todo.append({f: c.get(f) for f in FIELDS})
    batches = [todo[i:i + a.batch] for i in range(0, len(todo), a.batch)]
    lock, done = threading.Lock(), [0, 0]
    log = open(out / "progress.log", "a", encoding="utf-8")
    t0 = time.time()

    def ask(batch):
        got = {}
        for attempt in (1, 2):
            parsed = run.extract_json(run.chat(model, SYSTEM, json.dumps(batch, ensure_ascii=False)))
            if isinstance(parsed, list):
                got = {str(p.get("repo", "")).lower(): p for p in parsed if isinstance(p, dict)}
            if all(b["repo"].lower() in got for b in batch):
                break
            if len(batch) > 1 and attempt == 2:   # cut off or partial: split and retry
                h = len(batch) // 2
                return {**ask(batch[:h]), **ask(batch[h:])}
        return got

    def work(batch):
        got = ask(batch)
        with lock:
            for b in batch:
                r = got.get(b["repo"].lower())
                if r and r.get("verdict") in ("keep", "reject"):
                    r["repo"] = b["repo"]; cache.put(b["repo"].lower(), r); done[0] += 1
                else:
                    done[1] += 1
            n = done[0] + done[1]
            msg = f"{time.strftime('%H:%M:%S')} {n}/{len(todo)} done, {done[1]} unanswered, {run.Budget.calls} calls, {(time.time() - t0) / 60:.1f} min"
            print(msg, flush=True); log.write(msg + "\n"); log.flush()

    print(f"{len(todo)} candidates to verify ({len(cands) - len(todo)} already cached), model={model}", flush=True)
    try:
        with ThreadPoolExecutor(a.workers) as ex:
            list(ex.map(work, batches))
    finally:
        rows = list(cache.data.values())
        (out / "gateway.json").write_text(json.dumps(rows, ensure_ascii=False, indent=0), encoding="utf-8")
        print(f"wrote {len(rows)} gateway verdicts to phase2/gateway/gateway.json", flush=True)


if __name__ == "__main__":
    main()
