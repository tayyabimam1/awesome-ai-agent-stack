#!/usr/bin/env python3
"""2026-11 re-audit of the Awesome AI Agent Stack: plan the removals and Phase 2 swaps, then apply them.

  python apply.py plan          results/*.json -> removals.json, eligible.json, cat/in-NN.json (for the categorizer)
  python apply.py apply         README.md: remove what the rule hits, add one Phase 2 repo per removal
  python apply.py apply --all   README.md: remove what the rule hits, add every usable Phase 2 repo

Remove a listed repo when it is dead, or has under 1,000 stars and no push since CUTOFF.
A Phase 2 repo is usable when it is alive, not archived or a fork, has 1,000+ stars, was
pushed since CUTOFF, is not listed yet, and came back from the categorizer on-theme with
medium or high confidence. Highest stars first. Both apply modes also write
site-data/stars.json and report-<mode>.md, and are safe to rerun on a newer README.
"""
import collections
import json
import math
import re
import sys
from pathlib import Path

from run import ENTRY_RE, GITHUB_RE, SKIP_SECTIONS, parse  # copy of scripts/audit/run.py beside this file

HERE = Path(__file__).resolve().parent
REPO = HERE.parent / "awesome-ai-agent-stack"
CUTOFF = "2026-05-02"   # six months before the audit on 2026-11-02
STALE = "2025-11-02"    # the README's own 12-month bar, only reported
BUFFER = 1.5            # picks sent to the categorizer per slot; some come back OFF_THEME or low confidence
CHUNK = 60
BOLD = re.compile(r"\*\*(.+)\*\*")


def load(name):
    return json.loads((HERE / name).read_text(encoding="utf-8"))


def save(name, data):
    (HERE / name).write_text(json.dumps(data, ensure_ascii=False, indent=0), encoding="utf-8")


def results(prefix):
    out = {}
    for f in sorted((HERE / "results").glob(f"{prefix}-*.json")):
        out.update(json.loads(f.read_text(encoding="utf-8")))
    return out


def hit(v):
    """The removal rule."""
    return v.get("dead") or (v["stars"] < 1000 and v["pushed"] < CUTOFF)


def plan():
    listed = {e["repo"].lower() for e in parse((REPO / "README.md").read_text(encoding="utf-8"))}
    facts = results("readme")
    assert listed == {k.lower() for k in facts}, "results don't cover the README"
    rm = {k: v for k, v in facts.items() if hit(v)}
    seen, ok = set(listed), []
    for k, v in results("p2").items():
        if v.get("dead") or v["archived"] or v["fork"] or v["stars"] < 1000 or v["pushed"] < CUTOFF:
            continue
        if k.lower() in seen or v["name"].lower() in seen:  # listed since Phase 2, or renamed onto a listed repo
            continue
        seen.add(v["name"].lower())
        ok.append({"repo": v["name"], "description": v["desc"], "topics": v["topics"],
                   "language": v["lang"], "stars": v["stars"]})
    ok.sort(key=lambda c: -c["stars"])
    save("removals.json", rm)
    save("eligible.json", ok)
    picks = ok[:math.ceil(len(rm) * BUFFER)]
    d = HERE / "cat"
    d.mkdir(exist_ok=True)
    for f in d.glob("in-*.json"):
        f.unlink()
    for n, i in enumerate(range(0, len(picks), CHUNK), 1):
        (d / f"in-{n:02d}.json").write_text(json.dumps(picks[i:i + CHUNK], ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"remove {len(rm)} of {len(listed)} ({sum(1 for v in rm.values() if v.get('dead'))} dead); "
          f"{len(ok)} eligible Phase 2 repos; top {len(picks)} sent to the categorizer in "
          f"{math.ceil(len(picks) / CHUNK)} files")


def pick_additions(picks, outs, groups, slots):
    """Usable picks in star order; all of them when slots is None."""
    adds, skipped = [], collections.Counter()
    for c in picks:
        o = outs.get(c["repo"].lower()) or {}
        m = ENTRY_RE.match(o.get("line", ""))
        desc = m.group(3).strip() if m else ""
        why = ("no categorizer output" if not o else
               "OFF_THEME" if o.get("category") == "OFF_THEME" else
               "low confidence" if o.get("confidence") not in ("high", "medium") else
               "unknown category or sub-group" if o.get("group") not in groups.get(o.get("category"), ()) else
               "bad description" if not 10 <= len(desc) <= 110 else "")
        if why:
            skipped[why] += 1
            continue
        if not desc.endswith("."):
            desc += "."
        adds.append({**c, "section": o["category"], "group": o["group"],
                     "line": f"- [{c['repo']}](https://github.com/{c['repo']}) - {desc}"})
    if slots is not None:
        assert len(adds) >= slots, f"only {len(adds)} usable picks for {slots} slots; categorize more"
        adds = adds[:slots]
    return adds, skipped


def edit(lines, rm, adds):
    """Drop removed repos' lines, append additions to the end of their sub-group, drop emptied sub-groups."""
    last, drop, sec, grp = {}, set(), None, ""
    for i, line in enumerate(lines):
        if line.startswith("## "):
            t = line[3:].strip()
            sec, grp = (None if t in SKIP_SECTIONS else t), ""
        elif sec is None:
            continue
        elif BOLD.fullmatch(line.strip()):
            grp = line.strip()[2:-2].strip()
        elif (m := ENTRY_RE.match(line)) and (g := GITHUB_RE.match(m.group(2))):
            last[(sec, grp)] = i
            if f"{g.group(1)}/{g.group(2)}".lower() in rm:
                drop.add(i)
    at = collections.defaultdict(list)
    for a in adds:
        at[last[(a["section"], a["group"])]].append(a["line"])
    out = []
    for i, line in enumerate(lines):
        if i not in drop:
            out.append(line)
        out += at.get(i, [])
    res, sec, i = [], None, 0
    while i < len(out):
        line = out[i]
        if line.startswith("## "):
            t = line[3:].strip()
            sec = None if t in SKIP_SECTIONS else t
        elif sec and BOLD.fullmatch(line.strip()):
            j = i + 1
            while j < len(out) and not out[j].strip():
                j += 1
            if j == len(out) or out[j].startswith("## ") or BOLD.fullmatch(out[j].strip()):
                i = j  # sub-group left empty: drop its header and the blank lines after it
                continue
        res.append(line)
        i += 1
    return res, len(drop)


def apply(all_mode):
    path = REPO / "README.md"
    raw = path.read_bytes()
    nl = "\r\n" if b"\r\n" in raw else "\n"
    text = raw.decode("utf-8")
    before = parse(text)
    listed = {e["repo"].lower() for e in before}
    facts = results("readme")
    removals = {k: v for k, v in facts.items() if hit(v) and k.lower() in listed}
    rm = {k.lower() for k in removals}
    groups = collections.defaultdict(set)
    for e in before:
        groups[e["section"]].add(e["group"])
    picks = [c for f in sorted((HERE / "cat").glob("in-*.json")) for c in json.loads(f.read_text(encoding="utf-8"))
             if c["repo"].lower() not in listed]
    outs = {o["repo"].lower(): o for f in sorted((HERE / "cat").glob("out-*.json"))
            for o in json.loads(f.read_text(encoding="utf-8")) if isinstance(o, dict) and o.get("repo")}
    adds, skipped = pick_additions(picks, outs, groups, None if all_mode else len(rm))
    res, dropped = edit(text.splitlines(), rm, adds)
    path.write_bytes((nl.join(res) + (nl if text.endswith("\n") else "")).encode("utf-8"))

    after_entries = parse(path.read_bytes().decode("utf-8"))
    after = {e["repo"].lower(): (e["section"], e["group"]) for e in after_entries}
    assert not rm & after.keys(), "a removed repo is still listed"
    assert all(after.get(a["repo"].lower()) == (a["section"], a["group"]) for a in adds), "an addition is misplaced"
    assert len(after) == len(listed) - len(rm) + len(adds), "unexpected repo count"

    sp = REPO / "site-data" / "stars.json"
    old = {k.lower(): v for k, v in json.loads(sp.read_text(encoding="utf-8")).items()}
    fresh = {k.lower(): v["stars"] for k, v in facts.items() if not v.get("dead")}
    fresh.update({a["repo"].lower(): a["stars"] for a in adds})
    stars = {}
    for e in after_entries:  # every listed repo, keyed as linked; fresh count, else the old one
        k = e["repo"].lower()
        if e["repo"] not in stars and (k in fresh or k in old):
            stars[e["repo"]] = fresh.get(k, old.get(k))
    sp.write_bytes(json.dumps(stars, ensure_ascii=False).encode("utf-8"))

    kept = {k: v for k, v in facts.items() if k.lower() in after}
    flagged = [(k, v) for k, v in kept.items() if v["archived"] or v["pushed"] < STALE]
    renamed = [(k, v["name"]) for k, v in kept.items() if v["name"].lower() != k.lower()]
    md = ["# Re-audit 2026-11-02" + (" (all usable Phase 2 repos)" if all_mode else ""), "",
          f"Rule: remove a listed repo when it is dead, or has under 1,000 stars and no push since {CUTOFF}. "
          + ("Then add every usable Phase 2 repo." if all_mode else "Replace each with the highest-starred usable Phase 2 repo."), "",
          f"- Removed: {len(rm)} repos ({dropped} README lines), {sum(1 for v in removals.values() if v.get('dead'))} of them dead links",
          f"- Added from Phase 2: {len(adds)}", f"- Listed repos: {len(listed)} before, {len(after)} after",
          f"- Star counts written: {len(stars)}", "",
          "## Removed", "", "| repo | stars | last push | why |", "|---|---|---|---|"]
    md += [f"| {k} | | | dead link (404) |" if v.get("dead") else
           f"| {k} | {v['stars']} | {v['pushed'][:10]} | under 1,000 stars, inactive 6 months |"
           for k, v in sorted(removals.items(), key=lambda kv: kv[1].get("pushed", ""))]
    md += ["", "## Added from Phase 2", "", "| repo | stars | section | sub-group |", "|---|---|---|---|"]
    md += [f"| {a['repo']} | {a['stars']} | {a['section']} | {a['group']} |" for a in adds]
    md += ["", "## Picks not used", ""] + [f"- {k}: {n}" for k, n in skipped.most_common()]
    md += ["", "## Kept but outside the README's own bar (archived, or no push in 12 months)", ""]
    md += [f"- {k} ({v['stars']} stars, last push {v['pushed'][:10]}{', archived' if v['archived'] else ''})" for k, v in flagged]
    md += ["", "## Kept, linked under an old name (GitHub redirects)", ""] + [f"- {k} -> {n}" for k, n in renamed]
    (HERE / f"report-{'all' if all_mode else 'swap'}.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    print("\n".join(md[4:9]))
    print("added per section:", dict(collections.Counter(a["section"] for a in adds).most_common()))
    print("picks not used:", dict(skipped))


if __name__ == "__main__":
    if sys.argv[1] == "plan":
        plan()
    else:
        apply("--all" in sys.argv)
