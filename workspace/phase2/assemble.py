#!/usr/bin/env python3
"""Phase 2, stages B and C: chunk candidates for the classifier agents, pick what the
judge reviews, and assemble the results into ready-to-paste files.

  python phase2/assemble.py split [SIZE]   candidates.json -> chunks/chunk-NN.json
  python phase2/assemble.py review         classified/*.json -> review/review-NN.json (for the judge)
  python phase2/assemble.py build          classified/ + judged/ -> README-additions.md, stars-additions.json,
                                           excluded.md, needs-a-look.md, review-summary.md
The classifier's call stands unless the judge reviewed it; when the two disagree the
repo goes to needs-a-look.md instead of either list.
"""
import collections
import json
import random
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
FIELDS = ("repo", "stars", "description", "topics", "language")


def load_dir(d):
    out = []
    for f in sorted((HERE / d).glob("*.json")):
        try:
            out += json.loads(f.read_text(encoding="utf-8"))
        except ValueError:
            print(f"!! {f.name} is not valid JSON", file=sys.stderr)
    return out


def split(size=150):
    """Chunk candidates not already in an earlier chunk, so later waves only add new ones."""
    cands = json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))
    d = HERE / "chunks"; d.mkdir(exist_ok=True)
    done = {r["repo"].lower() for f in d.glob("*.json") for r in json.loads(f.read_text(encoding="utf-8"))}
    todo = [c for c in cands if c["repo"].lower() not in done]
    start = len(list(d.glob("*.json")))
    n = start
    for i in range(0, len(todo), size):
        n += 1
        rows = [{k: c[k] for k in FIELDS} for c in todo[i:i + size]]
        (d / f"chunk-{n:03d}.json").write_text(json.dumps(rows, ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"{len(todo)} new candidates -> chunks {start + 1}..{n} (size {size}) in phase2/chunks/")


def review(size=150):
    cls = load_dir("classified")
    facts = {c["repo"].lower(): c for c in json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))}
    groups = collections.Counter((c.get("section"), c.get("group")) for c in cls if c.get("verdict") == "keep")
    tax = (HERE / "taxonomy.md").read_text(encoding="utf-8")
    pick = [c for c in cls if c.get("verdict") != "keep" or c.get("confidence") != "high"
            or (c.get("group") and c["group"] not in tax)]
    keeps = [c for c in cls if c not in pick]
    pick += random.Random(7).sample(keeps, len(keeps) // 10)
    d = HERE / "review"; d.mkdir(exist_ok=True)
    for f in d.glob("*.json"): f.unlink()
    rows = [{**{k: facts.get(c["repo"].lower(), {}).get(k) for k in FIELDS}, "classifier": c} for c in pick]
    for n, i in enumerate(range(0, len(rows), size), 1):
        (d / f"review-{n:02d}.json").write_text(json.dumps(rows[i:i + size], ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"{len(cls)} classified; judge reviews {len(pick)} (rejects, non-high confidence, new groups, 10% of keeps) "
          f"in {(len(rows) + size - 1) // size} files")


def build():
    cls = {c["repo"].lower(): c for c in load_dir("classified") if isinstance(c, dict) and c.get("repo")}
    jd = {j["repo"].lower(): j for j in load_dir("judged") if isinstance(j, dict) and j.get("repo")}
    gw_file = HERE / "gateway" / "gateway.json"
    if gw_file.exists():   # gateway: classifier where Claude didn't classify, judge where it did
        for g in json.loads(gw_file.read_text(encoding="utf-8")):
            k = g["repo"].lower()
            if k not in cls:
                cls[k] = g
            elif k not in jd:
                jd[k] = g
    facts = {c["repo"].lower(): c for c in json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))}
    keep, rej, look = [], [], []
    for k, c in cls.items():
        j = jd.get(k)
        if j and j.get("verdict") != c.get("verdict"):
            look.append((c, j)); continue
        final = {**c, **{f: j[f] for f in ("section", "group", "description") if j and j.get(f)}}
        (keep if final.get("verdict") == "keep" else rej).append(final)
    sections = set(re.findall(r"^## (.+)$", (HERE / "taxonomy.md").read_text(encoding="utf-8"), re.M))
    bad = [c for c in keep if c.get("section") not in sections or not (c.get("description") or "").strip()]
    keep = [c for c in keep if c not in bad]
    look += [(c, {"verdict": "keep", "reason": f"unknown section '{c.get('section')}' or no description"}) for c in bad]
    by = collections.defaultdict(lambda: collections.defaultdict(list))
    for c in keep:
        by[c["section"]][c.get("group") or "Other"].append(c)
    md = ["# Phase 2 additions (local, not published)", "",
          f"{len(keep)} repos, each 1,000+ stars, maintained in the last 12 months, classified by an agent and spot-checked by a judge.", ""]
    for sec in sorted(by):
        md += [f"## {sec}", ""]
        for grp in sorted(by[sec], key=lambda g: -len(by[sec][g])):
            md += [f"**{grp}**", ""]
            for c in sorted(by[sec][grp], key=lambda c: -facts.get(c["repo"].lower(), {}).get("stars", 0)):
                md.append(f"- [{c['repo']}](https://github.com/{c['repo']}) - {c['description'].strip()}")
            md.append("")
    (HERE / "README-additions.md").write_text("\n".join(md), encoding="utf-8")
    (HERE / "stars-additions.json").write_text(json.dumps(
        {c["repo"]: facts.get(c["repo"].lower(), {}).get("stars", 0) for c in keep}, ensure_ascii=False), encoding="utf-8")
    (HERE / "excluded.md").write_text("# Rejected candidates\n\n" + "\n".join(
        f"- {c['repo']} ({facts.get(c['repo'].lower(), {}).get('stars', '?')}★): {c.get('reason', '')}" for c in rej) + "\n", encoding="utf-8")
    (HERE / "needs-a-look.md").write_text("# Classifier and judge disagree\n\n" + "\n".join(
        f"- [{c['repo']}](https://github.com/{c['repo']}) — classifier: {c.get('verdict')} ({c.get('reason', '')}); "
        f"judge: {j.get('verdict')} ({j.get('reason', '')})" for c, j in look) + "\n", encoding="utf-8")
    secs = collections.Counter(c["section"] for c in keep)
    summ = ["# Phase 2 summary", "", f"- Candidates classified: {len(cls)}", f"- Kept: {len(keep)}",
            f"- Rejected: {len(rej)}", f"- Classifier and judge disagree: {len(look)}",
            f"- Judge agreement on reviewed items: {sum(1 for k, j in jd.items() if k in cls and j.get('verdict') == cls[k].get('verdict'))}/{len(jd)}",
            "", "| section | new repos |", "|---|---|"] + [f"| {s} | {n} |" for s, n in secs.most_common()]
    (HERE / "review-summary.md").write_text("\n".join(summ) + "\n", encoding="utf-8")
    print("\n".join(summ))


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "build"
    {"split": lambda: split(int(sys.argv[2]) if len(sys.argv) > 2 else 150), "review": review, "build": build}[cmd]()
