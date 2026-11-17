"""Merge swarm results into README.md and site-data/stars.json.

  python merge.py [--apply]        (run from the repo root; without --apply it only prints counts)

A repo is added only when:
  - GitHub check passed (1,000+ stars, pushed in the last 12 months, not archived, not a fork),
  - two separate judge runs both keep it, with high or medium confidence, in the same category,
  - the sub-group exists in that README section and the description is a plain 10-110 character line.
Additions go to the end of their sub-group, highest stars first.
"""
import collections, glob, io, json, re, sys
from pathlib import Path

D = Path(__file__).resolve().parent / "data"
ENTRY_RE = re.compile(r"^\s*-\s*\[([^\]]+)\]\(([^)]+)\)\s*-?\s*(.*)$")
LISTED_RE = re.compile(r"^- \[[^\]]*\]\(https://github\.com/([^/\s)]+/[^/\s)#]+?)/?\)")
SKIP = {"Contents", "Contributing", "License"}


# The scraped pool is general open source, and the judges let plain dev tools through (util-linux, an Emacs
# string library). So a repo must also show an AI signal in its own name, description or topics.
AI_RE = re.compile(r"(?i)(?<![a-z])(ai|a\.i\.|llms?|agents?|agentic|gpt\w*|chatgpt|mcp|rag|claude|openai|anthropic|gemini|"
                   r"copilot|chatbots?|machine[- ]learning|deep[- ]learning|ml|mlops|llmops|neural|transformers?|diffusion|"
                   r"speech|tts|asr|voice|ocr|embeddings?|vector (db|database|search|store)|prompts?|inference|"
                   r"language models?|foundation models?|computer[- ]vision|generative|genai|aigc|llama\w*|ollama|deepseek|"
                   r"qwen|mistral|whisper|langchain|llamaindex|langgraph|hugging ?face|pytorch|tensorflow|fine[- ]?tun\w*|"
                   r"lora|nlp|natural language|multimodal|vlm|reinforcement learning|autonomous|codex|comfyui|"
                   r"text[- ]to[- ](image|speech|video|sql)|image generation|video generation|semantic search|"
                   r"knowledge graph|retrieval|dataset|benchmarks?|robot\w*|self[- ]driving|recommender|"
                   r"object detection|segmentation|face recognition|pose estimation|gaussian splatting|nerf)(?![a-z])")


def jl(pattern):
    """repo(lower) -> last judgment in the matching JSONL files."""
    out = {}
    for f in sorted(glob.glob(str(D / pattern))):
        for line in io.open(f, encoding="utf-8"):
            try:
                o = json.loads(line)
                if o.get("repo") and o.get("category"):
                    out[o["repo"].lower()] = o
            except ValueError:
                pass
    return out


def main():
    apply = "--apply" in sys.argv
    raw = io.open("README.md", encoding="utf-8", newline="").read()
    nl = "\r\n" if "\r\n" in raw else "\n"
    lines = raw.split(nl)

    # README structure: section -> group -> index of the last line belonging to that group's entry list
    groups, listed, sec, grp = collections.defaultdict(dict), set(), None, None
    for i, l in enumerate(lines):
        if l.startswith("## "):
            t = l[3:].strip(); sec, grp = (None if t in SKIP else t), None
        elif sec and re.fullmatch(r"\*\*[^*]+\*\*", l.strip()):
            grp = l.strip()[2:-2].strip(); groups[sec][grp] = i
        elif sec and grp and l.startswith("- ["):
            groups[sec][grp] = i
        m = LISTED_RE.match(l)
        if m:
            listed.add(m.group(1).lower())

    # facts from the GitHub checks
    facts = {}
    for pat in ("r-final-vet-out-*.jsonl", "r-verify-out-*.jsonl", "r-vet2-out-*.jsonl"):
        for f in glob.glob(str(D / pat)):
            for line in io.open(f, encoding="utf-8"):
                r = json.loads(line)
                if r.get("found"):
                    facts[r["repo"].lower()] = r; facts.setdefault(r["query"].lower(), r)

    gh = json.load(io.open(D / "facts.json", encoding="utf-8"))   # search-time facts, with topics

    # judge pairs per pool
    first = {k: v for k, v in json.load(io.open(D / "usable-map.json", encoding="utf-8")).items()}
    omni = {**jl("r-judge-b-*.jsonl"), **jl("r-judge-omni5on4.jsonl"), **jl("r-judge-omni-*.jsonl")}
    pools = [("round 1 pool", first, jl("r-judge3-*.jsonl")),
             ("first discovery batch", jl("r-judge-free-*.jsonl"), omni),
             ("second discovery batch", jl("r-judge2-a-*.jsonl"), jl("r-judge2-b-*.jsonl"))]

    def usable(o, section):
        """(group, description) when this judgment gives a valid placement and line, else None."""
        g = (o.get("group") or "").strip()
        m = ENTRY_RE.match(o.get("line") or "")
        desc = (m.group(3).strip() if m else "")
        if g not in groups.get(section, {}) or not 10 <= len(desc) <= 110:
            return None
        if re.search(r"[^\x00-\x7f]", desc) or "](" in desc:      # English, plain text only
            return None
        return g, desc if desc.endswith(".") else desc + "."

    adds, seen, report = [], set(), collections.OrderedDict()
    for name, A, B in pools:
        c = collections.Counter()
        for k in sorted(set(A) | set(B)):
            a, b = A.get(k), B.get(k)
            f = facts.get(k)
            why = ("only one judge answered" if not (a and b) else
                   "failed the GitHub check" if not (f and f.get("pass")) else
                   "already listed" if f["repo"].lower() in listed or k in listed or f["repo"].lower() in seen else
                   "both judges: off-theme" if a["category"] == "OFF_THEME" and b["category"] == "OFF_THEME" else
                   "judges split keep/reject" if "OFF_THEME" in (a["category"], b["category"]) else
                   "judges chose different categories" if a["category"] != b["category"] else
                   "unknown category" if a["category"] not in groups else
                   "low confidence" if a.get("confidence") not in ("high", "medium") or b.get("confidence") not in ("high", "medium") else
                   "no AI signal in name, description or topics" if not AI_RE.search(
                       " ".join([f["repo"].replace("-", " ").replace("_", " ").replace("/", " "), f.get("description") or "",
                                 " ".join(f.get("topics") or []), " ".join((gh.get(k) or {}).get("topics") or [])])) else "")
            if not why:
                place = usable(a, a["category"]) or usable(b, a["category"])
                if not place:
                    why = "no valid sub-group or description"
            if why:
                c[why] += 1; continue
            seen.add(f["repo"].lower()); c["ADDED"] += 1
            adds.append({"repo": f["repo"], "stars": f["stars"], "section": a["category"], "group": place[0],
                         "line": f"- [{f['repo']}](https://github.com/{f['repo']}) - {place[1]}"})
        report[name] = c

    for name, c in report.items():
        print(f"{name}: " + ", ".join(f"{k} {v}" for k, v in c.most_common()))
    per = collections.Counter(a["section"] for a in adds)
    print(f"total to add: {len(adds)} | listed now: {len(listed)} | after: {len(listed) + len(adds)}")
    print("per section:", dict(per.most_common()))
    if not apply:
        return

    by = collections.defaultdict(list)
    for a in adds:
        by[groups[a["section"]][a["group"]]].append(a)
    out = []
    for i, l in enumerate(lines):
        out.append(l)
        for a in sorted(by.get(i, []), key=lambda a: -a["stars"]):
            out.append(a["line"])
    io.open("README.md", "w", encoding="utf-8", newline="").write(nl.join(out))

    sp = Path("site-data/stars.json")
    stars = json.load(io.open(sp, encoding="utf-8"))
    for a in adds:
        stars[a["repo"]] = a["stars"]
    io.open(sp, "w", encoding="utf-8", newline="\n").write(json.dumps(stars, ensure_ascii=False))
    json.dump(adds, io.open(D / "merged-adds.json", "w", encoding="utf-8"), ensure_ascii=False)
    print("applied:", len(adds), "lines added; stars keys:", len(stars))


if __name__ == "__main__":
    main()
