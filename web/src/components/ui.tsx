import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion,
} from "motion/react";
import clsx from "clsx";
import { Star } from "lucide-react";
import { fmtStars } from "../data";

/** Number that counts up the first time it scrolls into view. */
export function Counter({ value, className, format = (n: number) => n.toLocaleString() }: {
  value: number; className?: string; format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return setShown(value);
    const c = animate(0, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);
  return <span ref={ref} className={clsx("tabular-nums", className)}>{format(shown)}</span>;
}

/** Card with a soft light that follows the pointer (hover.dev spotlight). */
export function SpotlightCard({ children, className, ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const bg = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)`;
  return (
    <div
      {...rest}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => { x.set(-400); y.set(-400); }}
      className={clsx("group relative overflow-hidden rounded-md border border-line bg-surface transition-colors hover:border-accent/60", className)}
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
    <div role="group" aria-label={label} className="flex rounded-md border border-line bg-raised p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx("relative rounded-[5px] px-3 py-1 text-sm font-medium transition-colors",
            value === o.value ? "text-ink" : "text-muted hover:text-ink")}
        >
          {value === o.value && (
            <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-[5px] border border-line bg-bg shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 38 }} />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

export function Avatar({ owner, name }: { owner: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!owner || failed)
    return (
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-md bg-raised border border-line text-sm font-bold text-muted">
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
      className="size-8 shrink-0 rounded-md border border-line bg-raised"
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
