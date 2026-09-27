import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import clsx from "clsx";
import { ArrowUp, Moon, Plus, Search, Star, Sun } from "lucide-react";
import { useData } from "../data";
import { useOpenPalette } from "./CommandPalette";
import { Magnetic } from "./ui";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5 font-bold text-ink">
      <span aria-hidden className="flex w-5 flex-col gap-[3px]">
        {["bg-t6", "bg-t3", "bg-t0"].map((c, i) => (
          <span key={c} className={clsx("h-1 rounded-sm transition-transform duration-300 group-hover:translate-x-(--shift)", c)}
            style={{ ["--shift" as string]: `${(i - 1) * 3}px` }} />
        ))}
      </span>
      <span className="whitespace-nowrap">AI Agent Stack</span>
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
      className="grid size-9 place-items-center overflow-hidden rounded-lg border border-line text-muted hover:text-ink">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={dark ? "moon" : "sun"} initial={{ y: 14, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }} exit={{ y: -14, rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
          {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function Header() {
  const data = useData();
  const openPalette = useOpenPalette();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  return (
    <header className={clsx("sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
      scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo />
        <button type="button" onClick={openPalette}
          className="ml-2 flex h-9 flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition-colors hover:border-accent/60 hover:text-ink sm:max-w-sm">
          <Search className="size-4" aria-hidden />
          <span className="truncate">{data ? `Search ${data.total.toLocaleString()} tools` : "Search tools"}</span>
          <kbd className="ml-auto hidden rounded border border-line px-1.5 text-xs sm:block">Ctrl K</kbd>
        </button>
        <nav className="ml-auto flex items-center gap-2">
          {data && (
            <a href={data.edit} className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted hover:text-ink md:flex">
              <Plus className="size-4" aria-hidden /> Suggest a tool
            </a>
          )}
          <ThemeToggle />
          {data && (
            <Magnetic href={data.repo}
              className="hidden items-center gap-2 rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-bg sm:flex">
              <Star className="size-4" aria-hidden /> Star on GitHub
            </Magnetic>
          )}
        </nav>
      </div>
      <motion.div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-0.5 origin-left spectrum" style={{ scaleX: progress }} />
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
          initial={{ opacity: 0, scale: 0.6, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }}
          className="fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-lg">
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function Layout() {
  const data = useData();
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>
      <Header />
      <motion.main id="main" key={pathname} className="flex-1"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <Outlet />
      </motion.main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
          <p>Generated from the {data ? <a className="text-accent underline" href={data.repo + "#readme"}>README</a> : "README"}. Released under CC0-1.0.</p>
          <p className="sm:ml-auto">Found a dead link or a missing tool? <Link className="text-accent underline" to="/contributing.html">Here is how to contribute.</Link></p>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
