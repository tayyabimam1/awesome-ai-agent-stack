import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import { allEntries, fmtBig, useData, type Data, type Hit, type Section } from "../data";
import { RepoList, RepoRow } from "./RepoList";
import { SlidingTabs } from "./ui";

type Sort = "stars" | "curated";

export function LayerRoute() {
  const data = useData();
  const { page = "" } = useParams();
  if (!data) return <div className="px-8 py-16 text-muted">Loading…</div>;
  const section = data.sections.find((s) => s.slug === page.replace(/\.html$/, ""));
  document.title = `${section ? section.title : "Page not found"} — Awesome AI Agent Stack`;
  return section ? <Layer key={section.slug} data={data} section={section} /> : <NotFound />;
}

export function NotFound() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-8">
      <h1 className="text-3xl font-semibold">That page isn't in the stack.</h1>
      <p className="mt-3 max-w-xl text-muted">
        The link may be old, or the category may have been renamed. Pick a category from the list, <Link className="text-accent hover:underline" to="/">see the top repositories</Link>, or press Ctrl K to search every tool.
      </p>
    </section>
  );
}

function Layer({ data, section }: { data: Data; section: Section }) {
  const { hash } = useLocation();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("stars");

  const hits = useMemo(() => allEntries(data).filter((h) => h.sec.slug === section.slug), [data, section]);
  const stars = hits.reduce((a, h) => a + h.e.s, 0);

  // Arriving from search: clear the filter, scroll to the entry and flash it.
  useEffect(() => {
    if (!hash.startsWith("#e-")) return;
    setQ("");
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      el.classList.remove("flash");
      void el.offsetWidth;
      el.classList.add("flash");
    }, 350);
    return () => clearTimeout(t);
  }, [hash]);

  const lq = q.trim().toLowerCase();
  const match = (h: Hit) => !lq || (h.e.n + " " + h.e.d).toLowerCase().includes(lq);
  const ranked = useMemo(
    () => hits.filter(match).sort((a, b) => b.e.s - a.e.s || a.e.i - b.e.i),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hits, lq],
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <p className="text-sm text-muted">
        <Link to="/" className="hover:text-accent">Home</Link> / {data.tiers[section.tier]}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{section.title}</h1>
      {section.tagline && (
        <p className="md mt-2 max-w-2xl text-lg text-muted" dangerouslySetInnerHTML={{ __html: section.tagline }} />
      )}
      {section.count > 0 && (
        <p className="mt-3 text-sm text-muted">
          <span className="font-semibold text-ink">{section.count}</span> tools,{" "}
          <span className="font-semibold text-ink">{fmtBig(stars)}</span> combined stars
        </p>
      )}

      {section.count > 0 && (
        <div className="sticky top-14 z-30 -mx-1 mt-5 flex flex-wrap items-center gap-3 border-b border-line bg-bg/90 px-1 py-3 backdrop-blur-md">
          <label className="relative flex min-w-[220px] flex-1 items-center sm:max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 size-4 text-muted" aria-hidden />
            <span className="sr-only">Filter tools in this category</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Filter ${section.count} tools`}
              className="h-8 w-full rounded-md border border-line bg-bg pr-8 pl-8 text-sm text-ink outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/25" />
            {q && (
              <button type="button" onClick={() => setQ("")} aria-label="Clear filter" className="absolute right-1.5 rounded p-1 text-muted hover:text-ink">
                <X className="size-3.5" />
              </button>
            )}
          </label>
          <SlidingTabs id="sort" label="Order" value={sort} onChange={setSort}
            options={[{ value: "stars", label: "Most stars" }, { value: "curated", label: "Curated order" }]} />
          <span className="ml-auto text-sm text-muted tabular-nums" aria-live="polite">
            {lq ? `${ranked.length} of ${section.count} match` : `${section.count} tools`}
          </span>
        </div>
      )}

      {lq && ranked.length === 0 && (
        <p className="mt-8 text-muted">Nothing in this category matches “{q}”. Press Ctrl K to search every category.</p>
      )}

      {sort === "stars" && ranked.length > 0 && (
        <div className="mt-5">
          <RepoList>{ranked.map((h, i) => <RepoRow key={h.e.i} hit={h} rank={i + 1} anchor />)}</RepoList>
        </div>
      )}

      {(sort === "curated" || section.count === 0) && <Curated section={section} hits={hits} match={match} />}
    </div>
  );
}

/** The README's own order: prose, tables and each sub-group as written. */
function Curated({ section, hits, match }: { section: Section; hits: Hit[]; match: (h: Hit) => boolean }) {
  let gi = -1;
  return (
    <>
      {section.blocks.map((b, bi) => {
        if (b.type === "p") return <p key={bi} className="md mt-6 max-w-2xl" dangerouslySetInnerHTML={{ __html: b.html }} />;
        if (b.type === "table") return <Table key={bi} rows={b.rows} />;
        gi += 1;
        const rows = b.entries.map((e) => hits.find((h) => h.e.i === e.i)!).filter(match);
        if (!rows.length) return null;
        return (
          <section key={bi} className="mt-8">
            <h2 className="flex items-baseline gap-2 text-lg font-semibold">
              {b.title}
              <span className="rounded-full bg-raised px-2 text-xs font-medium text-muted">{b.entries.length}</span>
            </h2>
            <div className="mt-3">
              <RepoList>{rows.map((h) => <RepoRow key={h.e.i} hit={h} anchor={gi >= 0} />)}</RepoList>
            </div>
          </section>
        );
      })}
    </>
  );
}

function Table({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <div className="mt-6 overflow-x-auto rounded-md border border-line">
      <table className="md w-full border-collapse text-left text-sm">
        <thead>
          <tr>{head.map((c, i) => <th key={i} className="bg-raised px-4 py-2.5 font-semibold" dangerouslySetInnerHTML={{ __html: c }} />)}</tr>
        </thead>
        <tbody>
          {body.map((r, ri) => (
            <motion.tr key={ri} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: ri * 0.03 }} className="border-t border-line hover:bg-raised">
              {r.map((c, ci) => ci === 0
                ? <th key={ci} scope="row" className="px-4 py-2.5 font-semibold whitespace-nowrap" dangerouslySetInnerHTML={{ __html: c }} />
                : <td key={ci} className="px-4 py-2.5 text-muted" dangerouslySetInnerHTML={{ __html: c }} />)}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
