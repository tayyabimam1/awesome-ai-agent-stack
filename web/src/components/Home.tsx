import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import clsx from "clsx";
import { Search } from "lucide-react";
import { allEntries, layerPath, tierClass, useData, type Data } from "../data";
import { useOpenPalette } from "./CommandPalette";
import { Avatar, BlurText, Counter, SpotlightCard, Stars } from "./ui";

export function Home() {
  const data = useData();
  const openPalette = useOpenPalette();
  document.title = "The AI agent stack, layer by layer — Awesome AI Agent Stack";
  const layers = data ? data.sections.filter((s) => s.inMap && s.count).length : 0;

  return (
    <>
      <section className="relative isolate mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
        <Aurora />
        <h1 className="max-w-4xl text-5xl leading-[1.02] font-extrabold tracking-[-0.035em] text-ink sm:text-7xl">
          <BlurText text="The AI agent stack, layer by layer." />
        </h1>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">
            Every tool worth knowing for building AI agents, from the coding agent in your terminal down to the model serving the tokens.
          </p>
          <p className="mt-3 max-w-2xl text-muted">
            {data ? <><Counter value={data.total} className="font-semibold text-ink" /> tools across{" "}
              <Counter value={layers} className="font-semibold text-ink" /> layers.</> : "Loading the stack…"}{" "}
            The first entries in each layer are hand-picked; the rest are screened for being public, maintained and not archived.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <motion.button type="button" onClick={openPalette} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
              className="flex h-14 w-full max-w-xl items-center gap-3 rounded-xl border border-line bg-surface px-5 text-left text-lg text-muted shadow-sm transition-colors hover:border-accent/60">
              <Search className="size-5 text-accent" aria-hidden />
              Try memory, mcp server, evals, whisper
              <kbd className="ml-auto hidden rounded border border-line px-1.5 text-xs sm:block">/</kbd>
            </motion.button>
            <Link to="/starter-stacks.html" className="rounded-xl px-4 py-3 font-semibold text-accent hover:underline">
              New here? Start with a starter stack
            </Link>
          </div>
        </motion.div>
      </section>

      {data && <StackMap data={data} />}
      {data && <MostStarred data={data} />}
    </>
  );
}

/** Slow-drifting colour fields in the stack's own spectrum, behind the hero. */
function Aurora() {
  const blobs = [
    { c: "bg-t1", cls: "top-0 left-[-6rem] size-[26rem]", x: [0, 60, 0], y: [0, 30, 0], d: 18 },
    { c: "bg-t3", cls: "top-10 right-[-4rem] size-[24rem]", x: [0, -50, 0], y: [0, 40, 0], d: 22 },
    { c: "bg-t6", cls: "top-56 left-1/3 size-[20rem]", x: [0, 40, -30, 0], y: [0, -20, 0], d: 26 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute -top-16 bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
      {blobs.map((b) => (
        <motion.div key={b.c} className={clsx("absolute rounded-full opacity-25 blur-3xl dark:opacity-30", b.c, b.cls)}
          animate={{ x: b.x, y: b.y }} transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/** The signature moment: tiers drop in from above and settle into a stack. */
function StackMap({ data }: { data: Data }) {
  const tiers = data.tiers
    .map((name, ti) => ({ name, ti, layers: data.sections.filter((s) => s.tier === ti && s.inMap && s.blocks.length) }))
    .filter((t) => t.layers.length);

  return (
    <section aria-labelledby="map-title" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <h2 id="map-title" className="sr-only">The stack</h2>
      <div className="flex flex-col gap-1">
        {tiers.map((t, idx) => (
          <motion.div
            key={t.name}
            id={`tier-${t.ti}`}
            initial={{ opacity: 0, y: -36, scaleX: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: idx * 0.08, type: "spring", stiffness: 260, damping: 26 }}
            className={clsx("grid scroll-mt-24 gap-4 p-6 sm:p-8 md:grid-cols-[16rem_1fr] md:gap-8", tierClass[t.ti],
              idx === 0 && "rounded-t-2xl", idx === tiers.length - 1 && "rounded-b-2xl")}
          >
            <div>
              <h3 className="text-2xl font-bold tracking-tight">{t.name}</h3>
              <p className="mt-1 text-sm opacity-75">
                {t.layers.reduce((a, s) => a + s.count, 0).toLocaleString()} tools in {t.layers.length} {t.layers.length === 1 ? "layer" : "layers"}
              </p>
            </div>
            <LayerChips layers={t.layers} group={t.ti} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/** Chips share one highlight that glides to whichever is hovered (Animate UI motion highlight). */
function LayerChips({ layers, group }: { layers: Data["sections"]; group: number }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <ul className="flex flex-wrap content-start gap-2" onMouseLeave={() => setHovered(null)}>
      {layers.map((s) => (
        <li key={s.slug} className="relative">
          <Link
            to={layerPath(s.slug)}
            onMouseEnter={() => setHovered(s.slug)}
            onFocus={() => setHovered(s.slug)}
            className="relative flex items-baseline gap-2 rounded-lg border border-current/25 px-3.5 py-2 font-medium"
          >
            {hovered === s.slug && (
              <motion.span layoutId={`chip-${group}`} aria-hidden className="absolute inset-0 rounded-lg bg-current/15"
                transition={{ type: "spring", stiffness: 500, damping: 35 }} />
            )}
            <span className="relative">{s.title}</span>
            {s.count > 0 && <span className="relative text-xs tabular-nums opacity-70">{s.count}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MostStarred({ data }: { data: Data }) {
  const top = useMemo(() => {
    const seen = new Set<string>();
    return allEntries(data)
      .sort((a, b) => b.e.s - a.e.s)
      .filter(({ e }) => !seen.has(e.u) && seen.add(e.u))
      .slice(0, 9);
  }, [data]);

  return (
    <section aria-labelledby="top-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <h2 id="top-title" className="text-3xl font-bold tracking-tight">Most-starred in the stack</h2>
      <p className="mt-2 text-muted">The projects with the biggest communities, whichever layer they sit in.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {top.map(({ e, sec }, i) => (
          <motion.div key={e.u} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06, duration: 0.45 }}>
            <SpotlightCard className="h-full">
              <a href={e.u} className="flex h-full flex-col gap-3 p-5">
                <span className="flex items-center gap-3">
                  <Avatar owner={e.o} name={e.n} />
                  <span className="min-w-0 flex-1 truncate font-semibold text-ink">{e.n}</span>
                  <Stars n={e.s} />
                </span>
                <span className="line-clamp-2 text-sm text-muted">{e.d.replace(/[*`]/g, "")}</span>
                <span className="mt-auto text-xs text-muted">{sec.title}</span>
              </a>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
