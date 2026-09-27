import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import clsx from "clsx";
import { ChevronDown, Search, X } from "lucide-react";
import { allEntries, fmtBig, layerPath, topRepos, useData, type Data, type Hit } from "../data";
import { RepoList, RepoRow } from "./RepoList";
import { Avatar, Counter, SpotlightCard, Stars } from "./ui";

const PAGE = 25;

export function Home() {
  const data = useData();
  useEffect(() => { document.title = "Awesome AI Agent Stack — top AI agent repositories, ranked by stars"; }, []);
  if (!data) return <div className="px-8 py-16 text-muted">Loading…</div>;
  return <HomeContent data={data} />;
}

type Category = { slug: string; title: string; count: number; stars: number; top: Hit[] };

function HomeContent({ data }: { data: Data }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [shown, setShown] = useState(PAGE);

  const hits = useMemo(() => allEntries(data), [data]);
  const top = useMemo(() => topRepos(data), [data]);
  const categories: Category[] = useMemo(() => data.sections
    .filter((s) => s.inMap && s.count)
    .map((s) => {
      const mine = hits.filter((h) => h.sec.slug === s.slug && h.e.s > 0).sort((a, b) => b.e.s - a.e.s);
      return { slug: s.slug, title: s.title, count: s.count, stars: mine.reduce((a, h) => a + h.e.s, 0), top: mine.slice(0, 3) };
    })
    .sort((a, b) => b.stars - a.stars), [data, hits]);

  // Ranked list: all repos by stars, narrowed by category and the search box.
  const lq = q.trim().toLowerCase();
  const list = useMemo(() => {
    let pool: Hit[] = cat === "all" ? top : hits.filter((h) => h.sec.slug === cat).sort((a, b) => b.e.s - a.e.s);
    if (lq) {
      const seen = new Set<string>();
      pool = (cat === "all" ? hits : pool)
        .filter((h) => (h.e.n + " " + h.e.d).toLowerCase().includes(lq))
        .filter((h) => !seen.has(h.e.u.toLowerCase()) && !!seen.add(h.e.u.toLowerCase()))
        .sort((a, b) => Number(!a.e.n.toLowerCase().includes(lq)) - Number(!b.e.n.toLowerCase().includes(lq)) || b.e.s - a.e.s);
    }
    return pool;
  }, [top, hits, cat, lq]);
  useEffect(() => setShown(PAGE), [cat, lq]);

  const stars = top.reduce((a, h) => a + h.e.s, 0);
  const catTitle = categories.find((c) => c.slug === cat)?.title;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <section className="relative overflow-hidden rounded-lg border border-line bg-raised px-6 py-8 sm:px-10 sm:py-10">
        <GridBackdrop />
        <div className="relative">
          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Awesome AI Agent Stack
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
            className="mt-3 max-w-2xl text-lg text-muted">
            The tools for building AI agents, from the coding agent in your terminal down to the model serving the tokens. Every repository is ranked by its GitHub stars.
          </motion.p>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
            {[
              { n: data.total, label: "tools", f: (n: number) => n.toLocaleString() },
              { n: categories.length, label: "categories", f: String },
              { n: stars, label: "combined GitHub stars", f: fmtBig },
            ].map((s) => (
              <div key={s.label}>
                <dd className="text-3xl font-semibold"><Counter value={s.n} format={s.f} /></dd>
                <dt className="text-sm text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
          <label className="relative mt-7 flex max-w-2xl items-center">
            <Search className="pointer-events-none absolute left-4 size-5 text-muted" aria-hidden />
            <span className="sr-only">Search repositories</span>
            <input
              data-page-search
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setQ("")}
              placeholder="Search repositories, for example memory, mcp or evals"
              className="h-12 w-full rounded-md border border-line bg-bg pr-20 pl-12 text-base text-ink shadow-sm outline-none transition-shadow placeholder:text-muted focus:border-accent focus:ring-3 focus:ring-accent/25"
            />
            {q ? (
              <button type="button" onClick={() => setQ("")} aria-label="Clear search"
                className="absolute right-3 rounded p-1 text-muted hover:text-ink"><X className="size-4" /></button>
            ) : (
              <kbd className="absolute right-3 hidden rounded border border-line px-1.5 text-xs text-muted sm:block">/</kbd>
            )}
          </label>
        </div>
      </section>

      <section aria-labelledby="top-title" className="mt-10">
        <h2 id="top-title" className="text-xl font-semibold">
          {lq ? `Results for “${q.trim()}”` : cat === "all" ? "Top repositories" : `Top in ${catTitle}`}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {lq ? `${list.length.toLocaleString()} ${list.length === 1 ? "match" : "matches"}${cat === "all" ? "" : ` in ${catTitle}`}, most stars first.`
            : "Ranked by GitHub stars. Pick a category to narrow the list."}
        </p>

        <CategoryChips categories={categories} value={cat} onChange={setCat} total={data.total} />

        {list.length === 0 ? (
          <div className="mt-4 rounded-md border border-dashed border-line px-6 py-10 text-center text-muted">
            No repository matches “{q.trim()}”{cat !== "all" && ` in ${catTitle}`}.{" "}
            {cat !== "all" && <button type="button" className="text-accent hover:underline" onClick={() => setCat("all")}>Search all categories</button>}
          </div>
        ) : (
          <div className="mt-4">
            <RepoList>
              {list.slice(0, shown).map((h, i) => (
                <RepoRow key={h.e.u + h.sec.slug} hit={h} rank={i + 1} showCategory={cat === "all"} />
              ))}
            </RepoList>
          </div>
        )}
        {shown < list.length && (
          <motion.button type="button" whileTap={{ scale: 0.98 }} onClick={() => setShown((n) => n + PAGE)}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-line bg-raised py-2 text-sm font-medium text-ink hover:bg-bg">
            Show {Math.min(PAGE, list.length - shown)} more of {list.length.toLocaleString()} <ChevronDown className="size-4" aria-hidden />
          </motion.button>
        )}
      </section>

      {!lq && cat === "all" && <CategoryLeaders categories={categories} />}
    </div>
  );
}

/** Faint dotted grid behind the intro, fading out to the right. */
function GridBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 text-line [mask-image:linear-gradient(to_left,black,transparent_70%)]">
      <svg className="absolute inset-0 size-full">
        <defs>
          <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

/** Scrollable row of category filters; the selection pill slides between them. */
function CategoryChips({ categories, value, onChange, total }: {
  categories: Category[]; value: string; onChange: (v: string) => void; total: number;
}) {
  const chips = [{ slug: "all", title: "All categories", count: total }, ...categories];
  return (
    <div role="group" aria-label="Filter by category"
      className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
      {chips.map((c) => {
        const active = c.slug === value;
        return (
          <button key={c.slug} type="button" aria-pressed={active} onClick={() => onChange(c.slug)}
            className={clsx("relative shrink-0 rounded-full border px-3 py-1 text-sm whitespace-nowrap transition-colors",
              active ? "border-accent text-white" : "border-line text-muted hover:border-accent/60 hover:text-ink")}>
            {active && (
              <motion.span layoutId="chip-active" className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 500, damping: 38 }} />
            )}
            <span className="relative">{c.title}</span>
            <span className={clsx("relative ml-1.5 text-xs tabular-nums", active ? "text-white/80" : "text-muted")}>{c.count}</span>
          </button>
        );
      })}
    </div>
  );
}

function CategoryLeaders({ categories }: { categories: Category[] }) {
  return (
    <section aria-labelledby="cat-title" className="mt-14">
        <h2 id="cat-title" className="text-xl font-semibold">Leaders in every category</h2>
        <p className="mt-1 text-sm text-muted">Categories ordered by their combined stars, each with its three most-starred repositories.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {categories.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }} transition={{ delay: (i % 2) * 0.05, duration: 0.35 }}>
              <SpotlightCard className="h-full">
                <div className="p-4">
                  <div className="flex items-baseline gap-2">
                    <Link to={layerPath(c.slug)} className="font-semibold text-ink hover:text-accent hover:underline">{c.title}</Link>
                    <span className="ml-auto shrink-0 text-xs text-muted">{c.count} tools, {fmtBig(c.stars)} stars</span>
                  </div>
                  <ol className="mt-3 space-y-2">
                    {c.top.map((h) => (
                      <li key={h.e.u} className="flex items-center gap-2.5 text-sm">
                        <Avatar owner={h.e.o} name={h.e.n} />
                        <a href={h.e.u} className="min-w-0 flex-1 truncate text-accent hover:underline">{h.e.n}</a>
                        <Stars n={h.e.s} className="text-xs" />
                      </li>
                    ))}
                  </ol>
                  <Link to={layerPath(c.slug)} className="mt-3 inline-block text-sm text-muted hover:text-accent">
                    See all {c.count} in {c.title}
                  </Link>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
    </section>
  );
}
