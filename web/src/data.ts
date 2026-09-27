import { useEffect, useState } from "react";

export type Entry = { i: number; n: string; u: string; d: string; h: string; s: number; o: string };
export type Block =
  | { type: "group"; title: string; entries: Entry[] }
  | { type: "table"; rows: string[][] }
  | { type: "p"; html: string };
export type Section = {
  title: string; slug: string; tier: number; tagline: string;
  count: number; inMap: boolean; blocks: Block[];
};
export type Data = {
  repo: string; edit: string; tagline: string; total: number;
  tiers: string[]; sections: Section[];
};
export type Hit = { e: Entry; sec: Section; picked: boolean };

let cache: Data | null = null;
let pending: Promise<Data> | null = null;

/** Loads data.json once per page load; every caller shares it. */
export function useData(): Data | null {
  const [data, setData] = useState(cache);
  useEffect(() => {
    if (cache) return;
    pending ??= fetch(import.meta.env.BASE_URL + "data.json")
      .then((r) => r.json())
      .then((d: Data) => (cache = d));
    pending.then(setData);
  }, []);
  return data;
}

export function allEntries(data: Data): Hit[] {
  return data.sections.flatMap((sec) =>
    sec.blocks.flatMap((b) =>
      b.type === "group" ? b.entries.map((e) => ({ e, sec, picked: b.title !== "More" })) : [],
    ),
  );
}

/** Name matches rank above description matches, then by stars. */
export function search(hits: Hit[], q: string, limit = 20): Hit[] {
  const lq = q.trim().toLowerCase();
  if (lq.length < 2) return [];
  const ranked: [number, Hit][] = [];
  for (const h of hits) {
    if (h.e.n.toLowerCase().includes(lq)) ranked.push([0, h]);
    else if (h.e.d.toLowerCase().includes(lq)) ranked.push([1, h]);
  }
  ranked.sort((a, b) => a[0] - b[0] || b[1].e.s - a[1].e.s);
  return ranked.slice(0, limit).map((r) => r[1]);
}

export const fmtStars = (n: number) =>
  n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "k" : String(n);

export const layerPath = (slug: string) => `/${slug}.html`;

/** Every GitHub repo once (a repo can sit in several layers), most stars first. */
export function topRepos(data: Data): Hit[] {
  const seen = new Set<string>();
  return allEntries(data)
    .filter((h) => h.e.s > 0)
    .sort((a, b) => b.e.s - a.e.s)
    .filter(({ e }) => !seen.has(e.u.toLowerCase()) && !!seen.add(e.u.toLowerCase()));
}

export const fmtBig = (n: number) =>
  n >= 1e6 ? (n / 1e6).toFixed(1).replace(".0", "") + "M" : n >= 1e3 ? fmtStars(n) : String(n);
