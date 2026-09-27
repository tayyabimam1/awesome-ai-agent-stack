import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { CornerDownLeft, Layers, Search } from "lucide-react";
import { allEntries, layerPath, search, useData } from "../data";
import { Avatar, Stars } from "./ui";

const PaletteContext = createContext<() => void>(() => {});
export const useOpenPalette = () => useContext(PaletteContext);

type Item =
  | { kind: "layer"; key: string; title: string; sub: string; to: string }
  | { kind: "tool"; key: string; title: string; sub: string; to: string; owner: string; stars: number };

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <PaletteContext.Provider value={() => setOpen(true)}>
      {children}
      <AnimatePresence>{open && <Palette onClose={() => setOpen(false)} />}</AnimatePresence>
    </PaletteContext.Provider>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const data = useData();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const hits = useMemo(() => (data ? allEntries(data) : []), [data]);

  const items: Item[] = useMemo(() => {
    if (!data) return [];
    const lq = q.trim().toLowerCase();
    const layers = data.sections
      .filter((s) => s.count && (!lq || s.title.toLowerCase().includes(lq)))
      .slice(0, lq ? 4 : 8)
      .map((s): Item => ({ kind: "layer", key: "l" + s.slug, title: s.title, sub: `${s.count} tools`, to: layerPath(s.slug) }));
    const tools = search(hits, q, 30).map(({ e, sec }): Item => ({
      kind: "tool", key: sec.slug + e.i, title: e.n, sub: `${e.d || sec.title}`,
      to: `${layerPath(sec.slug)}#e-${e.i}`, owner: e.o, stars: e.s,
    }));
    return [...layers, ...tools];
  }, [data, hits, q]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (item?: Item) => {
    if (!item) return;
    onClose();
    navigate(item.to);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog" aria-modal="true" aria-label="Search tools and layers"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -6 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-5 text-muted" aria-hidden />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              else if (e.key === "Enter") { e.preventDefault(); go(items[active]); }
              else if (e.key === "Escape") onClose();
            }}
            placeholder={data ? `Search ${data.total.toLocaleString()} tools and ${data.sections.length} layers` : "Loading…"}
            aria-label="Search"
            className="h-14 w-full bg-transparent text-lg text-ink outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-line px-1.5 text-xs text-muted">Esc</kbd>
        </div>
        <ul ref={listRef} role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
          {items.length === 0 && (
            <li className="px-3 py-8 text-center text-muted">
              {q.trim().length < 2 ? "Type at least two letters." : `No tool matches “${q}”. Try a shorter word, or what the tool does.`}
            </li>
          )}
          {items.map((it, idx) => (
            <li key={it.key} data-idx={idx} role="option" aria-selected={idx === active}>
              <button
                type="button"
                onMouseMove={() => setActive(idx)}
                onClick={() => go(it)}
                className="relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left"
              >
                {idx === active && (
                  <motion.span layoutId="palette-active" className="absolute inset-0 rounded-lg bg-accent/12"
                    transition={{ type: "spring", stiffness: 600, damping: 40 }} />
                )}
                <span className="relative">
                  {it.kind === "tool" ? <Avatar owner={it.owner} name={it.title} />
                    : <span className="grid size-8 place-items-center rounded-md bg-accent text-white"><Layers className="size-4" /></span>}
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink">{it.title}</span>
                  <span className="block truncate text-sm text-muted">{it.sub}</span>
                </span>
                {it.kind === "tool" && <Stars n={it.stars} className="relative" />}
                <CornerDownLeft className={clsx("relative size-4 text-muted", idx !== active && "invisible")} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
