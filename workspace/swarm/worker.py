#!/usr/bin/env python3
"""Swarm worker for the Awesome AI Agent Stack expansion. Stdlib only; runs on a cloud box.

  worker.py categorize IN.json OUT.jsonl [--agents 5]   one verdict per repo, following CATEGORIZE.md
  worker.py discover   TASKS.json OUT.jsonl [--agents 5] LLM writes search queries, local SearXNG runs them

Env (never written to disk): FREELLMAPI_URL, FREELLMAPI_KEY; optional OMNIROUTE_URL, OMNIROUTE_KEY
(used when the first gateway keeps failing); LLM_MODEL (default "auto"); SEARX (default http://127.0.0.1:8888).
Both modes append to OUT.jsonl and skip what is already there, so a rerun resumes.
"""
import argparse, json, os, re, sys, threading, time, urllib.error, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
MODEL = os.environ.get("LLM_MODEL", "auto")
SEARX = os.environ.get("SEARX", "http://127.0.0.1:8888")
_ORDER = ("OMNIROUTE", "FREELLMAPI") if os.environ.get("LLM_FIRST", "").lower() == "omniroute" else ("FREELLMAPI", "OMNIROUTE")
_ONLY = os.environ.get("LLM_ONLY", "").upper()   # blind judge: pin to one endpoint, no fallback
GATEWAYS = [(os.environ[n + "_URL"].rstrip("/"), os.environ[n + "_KEY"], os.environ.get(n + "_MODEL", MODEL)) for n in _ORDER
            if os.environ.get(n + "_URL") and os.environ.get(n + "_KEY") and (not _ONLY or n.startswith(_ONLY))]
LOCK = threading.Lock()
STATS = {"calls": 0, "fail": 0, "fallback": 0}
REPO_RE = re.compile(r"github\.com/([A-Za-z0-9][A-Za-z0-9-]{0,38})/([A-Za-z0-9._-]{1,100})")
NOT_OWNERS = {"topics", "search", "features", "orgs", "sponsors", "collections", "marketplace", "apps", "about",
              "login", "site", "settings", "explore", "trending", "blog", "pricing", "enterprise", "users", "contact"}


def http(url, body=None, headers=None, timeout=120):
    req = urllib.request.Request(url, data=json.dumps(body).encode() if body is not None else None,
                                 headers={"User-Agent": "Mozilla/5.0 (swarm-worker)", "Content-Type": "application/json",
                                          **(headers or {})})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")


def chat(system, user, max_tokens=6000):
    """One completion; backs off on errors and moves to the next gateway after repeated failures."""
    for gi, (url, key, model) in enumerate(GATEWAYS):
        for attempt in range(5):
            try:
                with LOCK:
                    STATS["calls"] += 1
                d = json.loads(http(url + "/chat/completions", {
                    "model": model, "temperature": 0, "max_tokens": max_tokens,
                    "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}]},
                    {"Authorization": "Bearer " + key}, timeout=240))
                text = (d.get("choices") or [{}])[0].get("message", {}).get("content") or ""
                if text.strip():
                    return text
            except Exception as e:  # noqa: BLE001  (HTTP 429/5xx, timeouts, bad JSON: all retried)
                code = getattr(e, "code", 0)
                time.sleep(min(60, (20 if code == 429 else 4) * (attempt + 1)))
            with LOCK:
                STATS["fail"] += 1
        with LOCK:
            STATS["fallback"] += gi == 0
    return ""


def extract_json(text):
    text = re.sub(r"<think>.*?</think>", "", text, flags=re.S)
    a, b = text.find("["), text.rfind("]")
    if a < 0 or b <= a:
        return None
    try:
        return json.loads(text[a:b + 1])
    except ValueError:
        return None


def done_keys(out, field):
    if not out.exists():
        return set()
    keys = set()
    for line in out.read_text(encoding="utf-8").splitlines():
        try:
            keys.add(str(json.loads(line)[field]).lower())
        except (ValueError, KeyError):
            pass
    return keys


def run_pool(fn, items, agents, out, label):
    t0, n = time.time(), [0]
    f = out.open("a", encoding="utf-8")

    def one(item):
        rows = fn(item)
        with LOCK:
            for r in rows:
                f.write(json.dumps(r, ensure_ascii=False) + "\n")
            f.flush()
            n[0] += 1
            print(f"{time.strftime('%H:%M:%S')} {label} {n[0]}/{len(items)} batches, {len(rows)} rows, "
                  f"{STATS['calls']} calls, {STATS['fail']} failed, {(time.time() - t0) / 60:.1f} min", flush=True)

    with ThreadPoolExecutor(agents) as ex:
        list(ex.map(one, items))
    print(f"DONE {label}: {n[0]} batches, stats {STATS}", flush=True)


# ---------------------------------------------------------------- categorize ----

def categorize(a):
    system = (HERE / "CATEGORIZE.md").read_text(encoding="utf-8") + (
        "\n\nYou have no file access here: reply with the JSON array only, one object per input repo, "
        "same order, no prose and no code fences.")
    out = Path(a.out)
    seen = done_keys(out, "repo")
    todo = [c for c in json.loads(Path(a.inp).read_text(encoding="utf-8")) if c["repo"].lower() not in seen]
    batches = [todo[i:i + a.batch] for i in range(0, len(todo), a.batch)]
    print(f"{len(todo)} repos to categorize ({len(seen)} already done), {a.agents} agents", flush=True)

    def ask(batch, depth=0):
        got = {}
        parsed = extract_json(chat(system, json.dumps(batch, ensure_ascii=False)))
        if isinstance(parsed, list):
            got = {str(p.get("repo", "")).lower(): p for p in parsed if isinstance(p, dict) and p.get("category")}
        missing = [b for b in batch if b["repo"].lower() not in got]
        if missing and len(batch) > 1 and depth < 3:   # cut off or partial answer: retry the rest in halves
            h = max(1, len(missing) // 2)
            got.update(ask(missing[:h], depth + 1))
            if missing[h:]:
                got.update(ask(missing[h:], depth + 1))
        return got

    def work(batch):
        got = ask(batch)
        return [{**got[b["repo"].lower()], "repo": b["repo"]} for b in batch if b["repo"].lower() in got]

    run_pool(work, batches, a.agents, out, "categorize")


# ------------------------------------------------------------------ discover ----

QUERY_SYSTEM = """You help find open-source GitHub repositories for a curated list of AI agent tooling.
Given a category and a sub-group, write 12 short web search queries that would surface GitHub repositories
belonging to that sub-group: mix specific tool types, well-known project names, "awesome" lists, comparisons
("alternatives to X") and "open source ... github" phrasing. Vary the wording; no duplicates.
Reply with a JSON array of 12 strings only."""


def repos_in(text):
    found = set()
    for o, r in REPO_RE.findall(text or ""):
        r = re.sub(r"\.git$", "", r).rstrip(".")
        if o.lower() not in NOT_OWNERS and r and r not in (".", ".."):
            found.add(f"{o}/{r}")
    return found


PROVIDER = os.environ.get("SEARCH_PROVIDER", "searxng")   # searxng | freellm | context | multi


_ROT = [0]


def _multi_search(query):
    """Rotate Tavily / Serper / Exa / Linkup; on an error move to the next provider. Returns [{url, content}]."""
    def tavily(q):
        d = json.loads(http("https://api.tavily.com/search", {"query": q, "max_results": 20}, {"Authorization": "Bearer " + os.environ["TAVILY_KEY"]}, 60))
        return [{"url": r.get("url", ""), "content": r.get("content", "")} for r in d.get("results", [])]
    def serper(q):
        d = json.loads(http("https://google.serper.dev/search", {"q": q, "num": 20}, {"X-API-KEY": os.environ["SERPER_KEY"]}, 60))
        return [{"url": r.get("link", ""), "content": r.get("snippet", "")} for r in d.get("organic", [])]
    def exa(q):
        d = json.loads(http("https://api.exa.ai/search", {"query": q, "numResults": 20}, {"x-api-key": os.environ["EXA_KEY"]}, 60))
        return [{"url": r.get("url", ""), "content": (r.get("title") or "") + " " + (r.get("text") or "")} for r in d.get("results", [])]
    def linkup(q):
        d = json.loads(http("https://api.linkup.so/v1/search", {"q": q, "depth": "standard", "outputType": "searchResults"}, {"Authorization": "Bearer " + os.environ["LINKUP_KEY"]}, 60))
        return [{"url": r.get("url", ""), "content": r.get("content", "")} for r in d.get("results", [])]
    provs = [(n, f) for n, f, k in (("tavily", tavily, "TAVILY_KEY"), ("serper", serper, "SERPER_KEY"), ("exa", exa, "EXA_KEY"), ("linkup", linkup, "LINKUP_KEY")) if os.environ.get(k)]
    with LOCK:
        start = _ROT[0]; _ROT[0] += 1
    for j in range(len(provs)):
        name, fn = provs[(start + j) % len(provs)]
        try:
            res = fn(query)
            if res: return res
        except Exception:  # noqa: BLE001  (quota, auth or network error: try the next provider)
            continue
    return []


def searx(query, page):
    """Normalised results [{url, content}] from the chosen provider; paging only applies to SearXNG."""
    for attempt in range(6):
        try:
            if PROVIDER == "searxng":
                url = f"{SEARX}/search?" + urllib.parse.urlencode({"q": query, "format": "json", "pageno": page})
                return json.loads(http(url, timeout=40)).get("results", [])
            if page > 1:
                return []
            if PROVIDER == "multi":
                return _multi_search(query)
            if PROVIDER == "freellm":
                base, key = os.environ["FREELLMAPI_URL"].rstrip("/"), os.environ["FREELLMAPI_KEY"]
                d = json.loads(http(base + "/search", {"query": query, "max_results": 20}, {"Authorization": "Bearer " + key}, 60))
                return [{"url": r.get("url", ""), "content": r.get("content", "")} for r in d.get("results", [])]
            d = json.loads(http("https://api.context.dev/v1/web/search", {"query": query, "numResults": 50},
                                {"Authorization": "Bearer " + os.environ["CONTEXT_DEV_API_KEY"]}, 90))
            return [{"url": r.get("url", ""), "content": (r.get("description") or "") + " " + (r.get("markdown") or "")[:20000]}
                    for r in d.get("results", [])]
        except urllib.error.HTTPError as e:
            time.sleep(60 * (attempt + 1) if e.code == 429 else 3 * (attempt + 1))   # search keys cooling down: wait it out
        except Exception:  # noqa: BLE001
            time.sleep(3 * (attempt + 1))
    return []


def discover(a):
    out = Path(a.out)
    seen = done_keys(out, "task")
    tasks = [t for t in json.loads(Path(a.inp).read_text(encoding="utf-8")) if t["task"].lower() not in seen]
    lists_read = set()
    print(f"{len(tasks)} discovery tasks ({len(seen)} already done), {a.agents} agents", flush=True)

    def work(t):
        qs = extract_json(chat(QUERY_SYSTEM, f"Category: {t['category']}\nSub-group: {t['group']}" + (f"\nAngle for this round: {t['angle']}" if t.get("angle") else ""), 1200)) or []
        qs = [q for q in qs if isinstance(q, str)][:12] + [f"{t['group']} {t['category']} github", f"awesome {t['group']} github"]
        repos, results = set(), 0
        for q in qs:
            for page in (1, 2):
                res = searx(q, page)
                results += len(res)
                for r in res:
                    hit = repos_in(r.get("url", "") + " " + r.get("content", ""))
                    repos |= hit
                    for name in hit:   # an awesome list: read its README for more repos
                        if re.search(r"awesome|curated|resources|list", name, re.I) and name.lower() not in lists_read:
                            with LOCK:
                                lists_read.add(name.lower())
                            try:
                                repos |= repos_in(http(f"https://raw.githubusercontent.com/{name}/HEAD/README.md", timeout=30))
                            except Exception:  # noqa: BLE001
                                pass
                if not res:
                    break
                time.sleep(float(os.environ.get("SEARCH_PAUSE", "1")))
        if results == 0:
            return []
        return [{"task": t["task"], "queries": len(qs), "results": results, "repos": sorted(repos)}]

    run_pool(work, tasks, a.agents, out, "discover")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("mode", choices=["categorize", "discover"])
    ap.add_argument("inp"); ap.add_argument("out")
    ap.add_argument("--agents", type=int, default=5)
    ap.add_argument("--batch", type=int, default=10)
    a = ap.parse_args()
    if not GATEWAYS:
        sys.exit("Set FREELLMAPI_URL and FREELLMAPI_KEY.")
    {"categorize": categorize, "discover": discover}[a.mode](a)
