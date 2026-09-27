import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { ChevronDown, Search, X } from "lucide-react";
import { layerPath, tierBorder, useData, type Block, type Data, type Entry, type Section } from "../data";
import { Avatar, BlurText, SlidingTabs, SpotlightCard, Stars } from "./ui";

type Sort = "list" | "stars";

export function LayerRoute() {
  const data = useData();
  const { page = "" } = useParams();
  if (!data) return <div className="mx-auto max-w-7xl px-6 py-24 text-muted">Loading…</div>;
  const section = data.sections.find((s) => s.slug === page.replace(/\.html$/, ""));
  document.title = `${section ? section.title : "Page not found"} — Awesome AI Agent Stack`;
  return section ? <Layer data={data} section={section} /> : <NotFound />;
}

export function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <h1 className="text-5xl font-extrabold tracking-tight">That page isn't in the stack.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        The link may be old, or the layer may have been renamed. <Link className="text-accent underline" to="/">Go back to the map</Link>, or press Ctrl K to search every tool.
      </p>
    </section>
  );
}

function Layer({ data, section }: { data: Data; section: Section }) {
  const { hash } = useLocation();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("list");
  const groups = useMemo(
    () => section.blocks.filter((b): b is Extract<Block, { type: "group" }> => b.type === "group"),
    [section],
  );

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
  }, [hash, section.slug]);

  const lq = q.trim().toLowerCase();
  const shown = useMemo(
    () => groups.map((g) => {
      let es = lq ? g.entries.filter((e) => (e.n + " " + e.d).toLowerCase().includes(lq)) : g.entries;
      if (sort === "stars") es = [...es].sort((a, b) => b.s - a.s || a.i - b.i);
      return { title: g.title, total: g.entries.length, entries: es };
    }),
    [groups, lq, sort],
  );
  const visible = shown.reduce((a, g) => a + g.entries.length, 0);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-8 pb-24 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12">
      <Sidebar data={data} current={section.slug} />
      <div className="min-w-0">
        <Link to={`/#tier-${section.tier}`}
          className={clsx("inline-block border-l-4 pl-2 text-sm text-muted hover:text-ink", tierBorder[section.tier])}>
          {data.tiers[section.tier]}
        </Link>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
          <BlurText key={section.slug} text={section.title} />
        </h1>
        {section.tagline && (
          <p className="md mt-4 max-w-2xl text-lg text-muted" dangerouslySetInnerHTML={{ __html: section.tagline }} />
        )}
        {groups.length > 1 && (
          <nav aria-label="On this page" className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
            {groups.map((g, gi) => (
              <a key={gi} href={`#g-${gi}`} className="text-accent hover:underline">
                {g.title || "Picks"} <span className="text-muted">{g.entries.length}</span>
              </a>
            ))}
          </nav>
        )}

        {section.count > 0 && (
          <div className="sticky top-16 z-30 -mx-1 mt-6 flex flex-wrap items-center gap-3 bg-bg/85 px-1 py-3 backdrop-blur-xl">
            <label className="relative flex min-w-[220px] flex-1 items-center sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 size-4 text-muted" aria-hidden />
              <span className="sr-only">Filter tools in this layer</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Filter ${section.count} tools`}
                className="h-10 w-full rounded-lg border border-line bg-surface pr-9 pl-9 text-ink outline-none transition-shadow placeholder:text-muted focus:border-accent focus:ring-3 focus:ring-accent/20" />
              {q && (
                <button type="button" onClick={() => setQ("")} aria-label="Clear filter" className="absolute right-2 rounded p-1 text-muted hover:text-ink">
                  <X className="size-4" />
                </button>
              )}
            </label>
            <SlidingTabs id="sort" label="Sort" value={sort} onChange={setSort}
              options={[{ value: "list", label: "List order" }, { value: "stars", label: "Most stars" }]} />
            <span className="text-sm text-muted tabular-nums" aria-live="polite">
              {lq ? `${visible} of ${section.count} match` : `${section.count} tools`}
            </span>
          </div>
        )}

        {lq && visible === 0 && (
          <p className="mt-10 text-muted">
            Nothing in this layer matches “{q}”. Press Ctrl K to search every layer.
          </p>
        )}

        {(() => {
          let gi = -1;
          return section.blocks.map((b, bi) => {
            if (b.type === "p") return <p key={bi} className="md mt-6 max-w-2xl" dangerouslySetInnerHTML={{ __html: b.html }} />;
            if (b.type === "table") return <Table key={bi} rows={b.rows} />;
            gi += 1;
            const g = shown[gi];
            if (!g.entries.length) return null;
            return (
              <section key={bi} id={`g-${gi}`} className="mt-10 scroll-mt-36">
                <h2 className="flex items-baseline gap-3 text-2xl font-bold tracking-tight">
                  {g.title || "Picks"}
                  <span className="text-base font-normal text-muted tabular-nums">{g.total}</span>
                </h2>
                {g.title === "More" && (
                  <p className="mt-1 text-sm text-muted">Screened, not hand-tested: public, maintained in the last 18 months, not archived.</p>
                )}
                <motion.ul layout className="mt-4 grid gap-3 xl:grid-cols-2">
                  <AnimatePresence initial={false} mode="popLayout">
                    {g.entries.map((e) => <EntryCard key={e.i} e={e} />)}
                  </AnimatePresence>
                </motion.ul>
              </section>
            );
          });
        })()}
      </div>
    </div>
  );
}

function EntryCard({ e }: { e: Entry }) {
  return (
    <motion.li
      layout="position"
      id={`e-${e.i}`}
      className="scroll-mt-40 rounded-xl"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
    >
      <SpotlightCard className="h-full">
        <div className="flex gap-3 p-4">
          <Avatar owner={e.o} name={e.n} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-3">
              <a href={e.u} className="min-w-0 flex-1 font-semibold break-words text-ink after:absolute after:inset-0 hover:text-accent">
                {e.n}
              </a>
              <Stars n={e.s} />
            </div>
            {e.h && <p className="md relative mt-1 text-[15px] leading-snug text-muted" dangerouslySetInnerHTML={{ __html: e.h }} />}
          </div>
        </div>
      </SpotlightCard>
    </motion.li>
  );
}

function Table({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="md w-full border-collapse text-left">
        <thead>
          <tr>{head.map((c, i) => <th key={i} className="bg-raised px-4 py-3 font-bold" dangerouslySetInnerHTML={{ __html: c }} />)}</tr>
        </thead>
        <tbody>
          {body.map((r, ri) => (
            <motion.tr key={ri} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: ri * 0.03 }} className="border-t border-line hover:bg-raised">
              {r.map((c, ci) => ci === 0
                ? <th key={ci} scope="row" className="px-4 py-3 font-semibold whitespace-nowrap" dangerouslySetInnerHTML={{ __html: c }} />
                : <td key={ci} className="px-4 py-3 text-muted" dangerouslySetInnerHTML={{ __html: c }} />)}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Sidebar({ data, current }: { data: Data; current: string }) {
  const [open, setOpen] = useState(false);
  const tiers = data.tiers
    .map((name, ti) => ({ name, ti, layers: data.sections.filter((s) => s.tier === ti && s.inMap) }))
    .filter((t) => t.layers.length);
  const list = (
    <nav aria-label="Layers" className="space-y-5 text-[15px]">
      {tiers.map((t) => (
        <div key={t.ti} className={clsx("border-l-4 pl-3", tierBorder[t.ti])}>
          <h3 className="mb-1.5 text-sm font-semibold text-muted">{t.name}</h3>
          {t.layers.map((s) => (
            <Link key={s.slug} to={layerPath(s.slug)} aria-current={s.slug === current ? "page" : undefined}
              className={clsx("relative block rounded-md px-2 py-1 leading-snug",
                s.slug === current ? "font-semibold text-ink" : "text-muted hover:text-ink")}>
              {s.slug === current && (
                <motion.span layoutId="side-active" className="absolute inset-0 rounded-md bg-accent/12"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }} />
              )}
              <span className="relative">{s.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
  return (
    <aside>
      <div className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 pb-6 lg:block">{list}</div>
      <div className="rounded-xl border border-line bg-surface lg:hidden">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
          className="flex w-full items-center justify-between px-4 py-3 font-semibold">
          All layers
          <motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown className="size-5" /></motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4">{list}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
