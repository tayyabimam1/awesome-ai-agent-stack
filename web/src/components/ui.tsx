import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useSpring,
} from "motion/react";
import clsx from "clsx";
import { Star } from "lucide-react";
import { fmtStars } from "../data";

/** Headline that assembles word by word, each word sharpening from a blur. */
export function BlurText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {w + (i < text.split(" ").length - 1 ? " " : "")}
        </motion.span>
      ))}
    </span>
  );
}

/** Number that counts up the first time it scrolls into view. */
export function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return setShown(value);
    const c = animate(0, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);
  return <span ref={ref} className={clsx("tabular-nums", className)}>{shown.toLocaleString()}</span>;
}

/** Card with a soft light that follows the pointer (hover.dev spotlight). */
export function SpotlightCard({ children, className, ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const bg = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)`;
  return (
    <div
      {...rest}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => { x.set(-400); y.set(-400); }}
      className={clsx("group relative overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/50", className)}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Segmented control whose selection pill slides between options (Animate UI tabs). */
export function SlidingTabs<T extends string>({ id, value, options, onChange, label }: {
  id: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-lg border border-line bg-surface p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx("relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            value === o.value ? "text-bg" : "text-muted hover:text-ink")}
        >
          {value === o.value && (
            <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-md bg-ink"
              transition={{ type: "spring", stiffness: 500, damping: 38 }} />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

/** Link that leans toward the pointer a little. */
export function Magnetic({ children, className, href }: { children: ReactNode; className?: string; href: string }) {
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });
  return (
    <motion.a
      href={href}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function Avatar({ owner, name }: { owner: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!owner || failed)
    return (
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-line text-sm font-bold text-muted">
        {name.slice(0, 1).toUpperCase()}
      </span>
    );
  return (
    <img
      src={`https://avatars.githubusercontent.com/${owner}?s=64`}
      alt=""
      width={32}
      height={32}
      loading="lazy"
      onError={() => setFailed(true)}
      className="size-8 shrink-0 rounded-lg bg-line"
    />
  );
}

export function Stars({ n, className }: { n: number; className?: string }) {
  if (!n) return null;
  return (
    <span title={`${n.toLocaleString()} GitHub stars`}
      className={clsx("inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold tabular-nums text-star", className)}>
      <Star className="size-3.5 fill-current" aria-hidden />
      {fmtStars(n)}
    </span>
  );
}
