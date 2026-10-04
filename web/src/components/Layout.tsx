import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUp, Menu, Moon, PanelLeftClose, PanelLeftOpen, Plus, Search, Star, Sun, X } from "lucide-react";
import { useData } from "../data";
import { useOpenPalette } from "./CommandPalette";
import { useOpenForm } from "./Forms";
import { CategoryNav } from "./Sidebar";
import { FlickeringGrid } from "./ui";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5 font-semibold text-ink">
      {/* the favicon's isometric stack; the layers spread apart on hover */}
      <svg aria-hidden viewBox="12 4 40 58" className="h-6 w-auto overflow-visible">
        {[["#1f6feb", "#4493f8", 44, 4], ["#238636", "#3fb950", 31, 0], ["#9e6a03", "#d29922", 18, -4]].map(([side, top, y, shift]) => (
          <g key={top} className="transition-transform duration-300 ease-out group-hover:translate-y-(--shift)"
            style={{ ["--shift" as string]: `${shift}px` }}>
            <path d={`M12 ${y} 32 ${+y + 10} 52 ${y} 52 ${+y + 4} 32 ${+y + 14} 12 ${+y + 4}Z`} fill={side as string} />
            <path d={`M32 ${+y - 10} 52 ${y} 32 ${+y + 10} 12 ${y}Z`} fill={top as string} />
          </g>
        ))}
      </svg>
      <span className="whitespace-nowrap">Awesome AI Agent Stack</span>
    </Link>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggle = () => {
    const next = !dark;
    const flip = () => {
      document.documentElement.classList.toggle("dark", next);
      setDark(next);
    };
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* private mode */ }
    const d = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (d.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) d.startViewTransition(flip);
    else flip();
  };
  return (
    <button type="button" onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-8 place-items-center overflow-hidden rounded-md border border-line text-muted hover:bg-raised hover:text-ink">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={dark ? "moon" : "sun"} initial={{ y: 12, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }} exit={{ y: -12, rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
          {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function Header({ onMenu, onToggle, collapsed }: {
  onMenu: () => void; onToggle: () => void; collapsed: boolean;
}) {
  const data = useData();
  const openPalette = useOpenPalette();
  const openForm = useOpenForm();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-raised/90 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4">
        <button type="button" onClick={onMenu} aria-label="Open categories"
          className="grid size-8 place-items-center rounded-md border border-line text-muted hover:text-ink lg:hidden">
          <Menu className="size-4" />
        </button>
        <motion.button type="button" onClick={onToggle} whileTap={{ scale: 0.9 }}
          aria-label={collapsed ? "Show categories sidebar" : "Hide categories sidebar"} aria-expanded={!collapsed}
          className="hidden size-8 place-items-center rounded-md border border-line text-muted hover:bg-bg hover:text-ink lg:grid">
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </motion.button>
        <Logo />
        <button type="button" onClick={openPalette}
          className="ml-auto flex h-8 w-full max-w-xs items-center gap-2 rounded-lg border border-line bg-bg px-2.5 text-sm text-muted hover:border-accent/60 md:ml-6 md:max-w-md">
          <Search className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{data ? `Search ${data.total.toLocaleString()} tools` : "Search tools"}</span>
          <kbd className="ml-auto hidden rounded border border-line px-1.5 font-mono text-xs sm:block">Ctrl K</kbd>
        </button>
        <nav className="flex items-center gap-2 md:ml-auto">
          <button type="button" onClick={() => openForm("suggest")}
            className="hidden items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted hover:bg-bg hover:text-ink md:flex">
            <Plus className="size-4" aria-hidden /> Suggest a tool
          </button>
          <ThemeToggle />
          {data && (
            <a href={data.repo}
              className="hidden items-center gap-1.5 rounded-md border border-line bg-bg px-3 py-1.5 text-sm font-medium text-ink hover:bg-raised sm:flex">
              <Star className="size-4 text-star" aria-hidden /> Star
            </a>
          )}
        </nav>
      </div>
      <motion.div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-accent" style={{ scaleX: progress }} />
    </header>
  );
}

function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 900));
  return (
    <AnimatePresence>
      {show && (
        <motion.button type="button" aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ y: -2 }} whileTap={{ scale: 0.92 }}
          className="fixed right-5 bottom-5 z-40 grid size-10 place-items-center rounded-full border border-line bg-surface text-ink shadow-lg">
          <ArrowUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" aria-label="Categories"
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto border-r border-line bg-bg px-4"
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}>
            <div className="flex h-14 items-center justify-between">
              <span className="font-semibold">Categories</span>
              <button type="button" onClick={onClose} aria-label="Close categories"
                className="grid size-8 place-items-center rounded-md text-muted hover:bg-raised hover:text-ink">
                <X className="size-4" />
              </button>
            </div>
            <CategoryNav onNavigate={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Layout() {
  const data = useData();
  const openForm = useOpenForm();
  const { pathname, hash } = useLocation();
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem("sidebar") === "collapsed"; } catch { return false; }
  });
  const toggle = () => setCollapsed((c) => {
    try { localStorage.setItem("sidebar", c ? "open" : "collapsed"); } catch { /* private mode */ }
    return !c;
  });
  const isHome = pathname === "/" || pathname === "/index.html";
  // Home starts with the sidebar shut; category pages remember the last choice.
  const [homeOpen, setHomeOpen] = useState(false);
  const shut = isHome ? !homeOpen : collapsed;
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);

  return (
    <div className="min-h-screen">
      {/* Site background: flickering grid, strongest at the top and fading out down the page */}
      <div aria-hidden className="fixed inset-0 -z-10 mask-[radial-gradient(ellipse_90%_70%_at_50%_0%,#000_20%,transparent_100%)]">
        <FlickeringGrid />
      </div>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>
      <Header onMenu={() => setDrawer(true)} onToggle={isHome ? () => setHomeOpen((o) => !o) : toggle} collapsed={shut} />
      <Drawer open={drawer} onClose={() => setDrawer(false)} />
      <div className="flex">
        {/* Desktop sidebar: only on category pages; slides shut and open. */}
        <AnimatePresence initial={false}>
          {!shut && (
            <motion.aside key="sidebar" className="hidden shrink-0 overflow-clip border-r border-line lg:block"
              initial={{ width: 0, opacity: 0 }} animate={{ width: 288, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}>
              <div className="sticky top-14 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto px-4 pt-4">
                <CategoryNav />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        <div className="flex min-w-0 flex-1 flex-col">
          <motion.main id="main" key={pathname} className="flex-1"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <Outlet />
          </motion.main>
          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:flex-row sm:items-start sm:px-8">
              <div className="max-w-sm">
                <Logo />
                <p className="mt-3">
                  Generated from the {data ? <a className="text-accent hover:underline" href={data.repo + "#readme"}>README</a> : "README"} on
                  GitHub and rebuilt on every change. Content released under CC BY 4.0.
                </p>
              </div>
              {data && (
                <nav aria-label="Project" className="flex flex-wrap gap-x-6 gap-y-2 sm:ml-auto">
                  <a className="hover:text-ink" href={data.repo}>GitHub</a>
                  <button type="button" className="hover:text-ink" onClick={() => openForm("suggest")}>Suggest a tool</button>
                  <button type="button" className="hover:text-ink" onClick={() => openForm("dead")}>Report a dead link</button>
                  <a className="hover:text-ink" href={data.repo + "/blob/main/CONTRIBUTING.md"}>Contributing</a>
                  <a className="hover:text-ink" href={data.repo + "/blob/main/LICENSE"}>License</a>
                </nav>
              )}
            </div>
          </footer>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
