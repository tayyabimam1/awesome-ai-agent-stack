import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { allEntries, fmtBig, layerPath, topRepos, useData, type Data, type Hit } from "../data";
import { Avatar, Counter, SpotlightCard, Stars } from "./ui";

export function Home() {
  const data = useData();
  useEffect(() => { document.title = "Awesome AI Agent Stack — top AI agent repositories, ranked by stars"; }, []);
  if (!data) return <div className="px-8 py-16 text-muted">Loading…</div>;
  return <HomeContent data={data} />;
}

/** The README HTML as plain text, with entities like &#x27; decoded. */
const plainText = (html: string) => new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";

type Category = {
  slug: string; title: string; tagline: string; tier: number;
  count: number; stars: number; top: Hit[];
};

function HomeContent({ data }: { data: Data }) {
  const hits = useMemo(() => allEntries(data), [data]);
  const top = useMemo(() => topRepos(data), [data]);

  const categories: Category[] = useMemo(() => data.sections
    .filter((s) => s.inMap && s.blocks.length)
    .map((s) => {
      const mine = hits.filter((h) => h.sec.slug === s.slug && h.e.s > 0).sort((a, b) => b.e.s - a.e.s);
      return {
        slug: s.slug, title: s.title, tagline: plainText(s.tagline), tier: s.tier,
        count: s.count, stars: mine.reduce((a, h) => a + h.e.s, 0), top: mine.slice(0, 3),
      };
    }), [data, hits]);

  const tiers = data.tiers
    .map((name, ti) => ({ name, cats: categories.filter((c) => c.tier === ti) }))
    .filter((t) => t.cats.length);
  const stars = top.reduce((a, h) => a + h.e.s, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <header className="max-w-3xl">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Awesome AI Agent Stack
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
          className="mt-4 text-lg text-muted">
          A curated map of the tools for building AI agents, sorted into categories and ranked by GitHub stars. Pick a category below or from the sidebar, or search every tool from the bar at the top.
        </motion.p>
        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
          {[
            { n: data.total, label: "tools", f: (n: number) => n.toLocaleString() },
            { n: categories.filter((c) => c.count).length, label: "categories", f: String },
            { n: stars, label: "combined GitHub stars", f: fmtBig },
          ].map((s) => (
            <div key={s.label}>
              <dd className="text-3xl font-semibold"><Counter value={s.n} format={s.f} /></dd>
              <dt className="text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </header>



      {tiers.map((t) => (
        <section key={t.name} className="mt-12 first-of-type:mt-10" aria-labelledby={`tier-${t.name}`}>
          <h2 id={`tier-${t.name}`} className="border-b border-line pb-2 text-lg font-semibold">{t.name}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {t.cats.map((c, i) => <CategoryCard key={c.slug} c={c} i={i} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function CategoryCard({ c, i }: { c: Category; i: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -3 }}
      viewport={{ once: true, margin: "-20px" }} transition={{ delay: (i % 3) * 0.05, duration: 0.3 }}>
      <SpotlightCard className="h-full">
        <Link to={layerPath(c.slug)} className="flex h-full flex-col p-5">
          <span className="flex items-start gap-2">
            <span className="flex-1 text-base font-semibold text-ink group-hover:text-accent">{c.title}</span>
            <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
          </span>
          {c.tagline && <span className="mt-1.5 line-clamp-2 text-sm text-muted">{c.tagline}</span>}
          {c.top.length > 0 && (
            <span className="mt-4 flex flex-col gap-2">
              {c.top.map((h) => (
                <span key={h.e.u} className="flex items-center gap-2 text-sm">
                  <Avatar owner={h.e.o} name={h.e.n} />
                  <span className="min-w-0 flex-1 truncate text-ink">{h.e.n}</span>
                  <Stars n={h.e.s} className="text-xs" />
                </span>
              ))}
            </span>
          )}
          <span className="mt-auto flex gap-4 pt-4 text-xs text-muted">
            {c.count > 0 ? <>
              <span><b className="font-semibold text-ink">{c.count}</b> tools</span>
              <span><b className="font-semibold text-ink">{fmtBig(c.stars)}</b> stars</span>
            </> : <span>Recommended combinations</span>}
          </span>
        </Link>
      </SpotlightCard>
    </motion.div>
  );
}
