import { useState } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import clsx from "clsx";
import { Home, Search } from "lucide-react";
import { layerPath, useData } from "../data";

/** Every category, grouped by where it sits in the stack. Shown on every page. */
export function CategoryNav({ onNavigate }: { onNavigate?: () => void }) {
  const data = useData();
  const { pathname } = useLocation();
  const [q, setQ] = useState("");
  if (!data) return null;

  const lq = q.trim().toLowerCase();
  const current = pathname.replace(/^\//, "").replace(/\.html$/, "");
  const isHome = current === "" || current === "index";
  const tiers = data.tiers
    .map((name, ti) => ({
      name,
      layers: data.sections.filter((s) => s.tier === ti && s.inMap && s.blocks.length &&
        (!lq || s.title.toLowerCase().includes(lq))),
    }))
    .filter((t) => t.layers.length);

  const item = (to: string, label: React.ReactNode, active: boolean, count?: number) => (
    <Link key={to} to={to} onClick={onNavigate} aria-current={active ? "page" : undefined}
      className={clsx("relative flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
        active ? "font-semibold text-ink" : "text-muted hover:bg-raised hover:text-ink")}>
      {active && (
        <motion.span layoutId="nav-active" className="absolute inset-0 rounded-md bg-raised"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}>
          <span className="absolute top-1.5 bottom-1.5 left-[-8px] w-1 rounded-full bg-accent" />
        </motion.span>
      )}
      <span className="relative min-w-0 flex-1 leading-snug">{label}</span>
      {count !== undefined && count > 0 && (
        <span className="relative rounded-full bg-raised px-1.5 text-xs tabular-nums text-muted">{count}</span>
      )}
    </Link>
  );

  return (
    <nav aria-label="Categories" className="pb-8">
      <label className="relative mb-3 flex items-center">
        <Search className="pointer-events-none absolute left-2.5 size-3.5 text-muted" aria-hidden />
        <span className="sr-only">Filter categories</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter categories"
          className="h-8 w-full rounded-md border border-line bg-bg pr-2 pl-8 text-sm text-ink outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/25" />
      </label>
      {!lq && item("/", <span className="flex items-center gap-2"><Home className="size-4" aria-hidden />Home</span>, isHome)}
      {tiers.map((t) => (
        <div key={t.name} className="mt-4">
          <h3 className="px-2 pb-1 text-xs font-semibold text-muted">{t.name}</h3>
          {t.layers.map((s) => item(layerPath(s.slug), s.title, s.slug === current, s.count))}
        </div>
      ))}
      {lq && !tiers.length && <p className="px-2 text-sm text-muted">No category matches “{q}”.</p>}
    </nav>
  );
}
