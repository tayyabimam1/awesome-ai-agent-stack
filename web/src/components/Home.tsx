import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronDown, Search } from "lucide-react";
import { allEntries, fmtBig, layerPath, topRepos, useData, type Data } from "../data";
import { useOpenPalette } from "./CommandPalette";
import { RepoList, RepoRow } from "./RepoList";
import { Avatar, Counter, SpotlightCard, Stars } from "./ui";

const PAGE = 25;

export function Home() {
  const data = useData();
  const openPalette = useOpenPalette();
  document.title = "Awesome AI Agent Stack — top AI agent repositories, ranked by stars";
  if (!data) return <div className="px-8 py-16 text-muted">Loading…</div>;
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <Intro data={data} onSearch={openPalette} />
      <TopRepos data={data} />
      <CategoryLeaders data={data} />
    </div>
  );
}

function Intro({ data, onSearch }: { data: Data; onSearch: () => void }) {
  const top = useMemo(() => topRepos(data), [data]);
  const stars = top.reduce((a, h) => a + h.e.s, 0);
  const categories = data.sections.filter((s) => s.inMap && s.count).length;
  const stats = [
    { n: data.total, label: "tools", f: (n: number) => n.toLocaleString() },
    { n: categories, label: "categories", f: String },
    { n: stars, label: "combined GitHub stars", f: fmtBig },
  ];
  return (
    <section className="border-b border-line pb-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Awesome AI Agent Stack</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        The tools for building AI agents, from the coding agent in your terminal down to the model serving the tokens. Every repository is ranked by its GitHub stars.
      </p>
      <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-1.5">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-2xl font-semibold"><Counter value={s.n} format={s.f} /></dd>
            <span aria-hidden className="text-sm text-muted">{s.label}</span>
          </div>
        ))}
      </dl>
      <button type="button" onClick={onSearch}
        className="mt-6 flex h-11 w-full max-w-xl items-center gap-3 rounded-md border border-line bg-raised px-4 text-left text-muted transition-colors hover:border-accent/60">
        <Search className="size-4" aria-hidden />
        Search repositories, for example memory, mcp or evals
        <kbd className="ml-auto hidden rounded border border-line px-1.5 text-xs sm:block">/</kbd>
      </button>
    </section>
  );
}

function TopRepos({ data }: { data: Data }) {
  const top = useMemo(() => topRepos(data), [data]);
  const [shown, setShown] = useState(PAGE);
  return (
    <section aria-labelledby="top-title" className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 id="top-title" className="text-xl font-semibold">Top repositories</h2>
          <p className="mt-1 text-sm text-muted">The most-starred projects across every category.</p>
        </div>
        <span className="text-sm text-muted">Showing {Math.min(shown, top.length)} of {top.length.toLocaleString()}</span>
      </div>
      <div className="mt-4">
        <RepoList>
          {top.slice(0, shown).map((h, i) => <RepoRow key={h.e.u} hit={h} rank={i + 1} showCategory />)}
        </RepoList>
      </div>
      {shown < top.length && (
        <motion.button type="button" whileTap={{ scale: 0.98 }} onClick={() => setShown((n) => n + PAGE)}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-line bg-raised py-2 text-sm font-medium text-ink hover:bg-bg">
          Show {Math.min(PAGE, top.length - shown)} more <ChevronDown className="size-4" aria-hidden />
        </motion.button>
      )}
    </section>
  );
}

function CategoryLeaders({ data }: { data: Data }) {
  const byCategory = useMemo(() => {
    const hits = allEntries(data);
    return data.sections
      .filter((s) => s.inMap && s.count)
      .map((s) => {
        const mine = hits.filter((h) => h.sec.slug === s.slug && h.e.s > 0).sort((a, b) => b.e.s - a.e.s);
        return { s, top: mine.slice(0, 3), stars: mine.reduce((a, h) => a + h.e.s, 0) };
      })
      .sort((a, b) => b.stars - a.stars);
  }, [data]);

  return (
    <section aria-labelledby="cat-title" className="mt-14">
      <h2 id="cat-title" className="text-xl font-semibold">Leaders in every category</h2>
      <p className="mt-1 text-sm text-muted">Categories ordered by their combined stars, each with its three most-starred repositories.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {byCategory.map(({ s, top, stars }, i) => (
          <motion.div key={s.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }} transition={{ delay: (i % 2) * 0.05, duration: 0.35 }}>
            <SpotlightCard className="h-full">
              <div className="p-4">
                <div className="flex items-baseline gap-2">
                  <Link to={layerPath(s.slug)} className="font-semibold text-ink hover:text-accent hover:underline">{s.title}</Link>
                  <span className="ml-auto shrink-0 text-xs text-muted">{s.count} tools, {fmtBig(stars)} stars</span>
                </div>
                <ol className="mt-3 space-y-2">
                  {top.map((h) => (
                    <li key={h.e.u} className="flex items-center gap-2.5 text-sm">
                      <Avatar owner={h.e.o} name={h.e.n} />
                      <a href={h.e.u} className="min-w-0 flex-1 truncate text-accent hover:underline">{h.e.n}</a>
                      <Stars n={h.e.s} className="text-xs" />
                    </li>
                  ))}
                </ol>
                <Link to={layerPath(s.slug)} className="mt-3 inline-block text-sm text-muted hover:text-accent">
                  See all {s.count} in {s.title}
                </Link>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
