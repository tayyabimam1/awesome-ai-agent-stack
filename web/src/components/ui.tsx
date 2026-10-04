import { useEffect, useId, useRef, useState, type ReactNode } from "react";
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

/** Magic UI MagicCard: a border that lights up under the pointer, plus a soft fill. */
export function MagicCard({ children, className, ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const border = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, var(--accent), var(--line) 100%)`;
  const fill = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 8%, transparent), transparent 100%)`;
  return (
    <div
      {...rest}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => { x.set(-300); y.set(-300); }}
      className={clsx("group relative rounded-xl", className)}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: border }} />
      <div aria-hidden className="pointer-events-none absolute inset-px rounded-[11px] bg-surface" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-px rounded-[11px]" style={{ background: fill }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/** Magic UI Marquee: children scroll sideways forever; pauses on hover. */
export function Marquee({ children, reverse, className, repeat = 2 }: {
  children: ReactNode; reverse?: boolean; className?: string; repeat?: number;
}) {
  return (
    <div className={clsx("group flex gap-(--gap) overflow-hidden [--duration:60s] [--gap:0.75rem]", className)}>
      {Array.from({ length: repeat }, (_, i) => (
        <div key={i} aria-hidden={i > 0 || undefined}
          className={clsx("flex shrink-0 animate-marquee justify-around gap-(--gap) group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]")}>
          {children}
        </div>
      ))}
    </div>
  );
}

/** Magic UI BorderBeam: a short light that travels around the parent's border. */
export function BorderBeam({ size = 90, duration = 7 }: { size?: number; duration?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]">
      <motion.div
        className="absolute aspect-square bg-linear-to-l from-accent via-star to-transparent"
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${size}px)` }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
    </div>
  );
}

/** Magic UI AnimatedShinyText: a highlight that sweeps across muted text. */
export function ShinyText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span style={{ ["--shiny-width" as string]: "90px" }}
      className={clsx("animate-shiny-text bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat text-muted",
        "bg-linear-to-r from-transparent via-ink/80 via-50% to-transparent", className)}>
      {children}
    </span>
  );
}

/** Magic UI BlurFade: fades in from a slight blur, on mount or when scrolled into view. */
export function BlurFade({ children, className, delay = 0, inView = false }: {
  children: ReactNode; className?: string; delay?: number; inView?: boolean;
}) {
  const hidden = { opacity: 0, y: 6, filter: "blur(6px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  return inView
    ? <motion.div className={className} initial={hidden} whileInView={shown} viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: 0.04 + delay, duration: 0.45, ease: "easeOut" }}>{children}</motion.div>
    : <motion.div className={className} initial={hidden} animate={shown}
        transition={{ delay: 0.04 + delay, duration: 0.45, ease: "easeOut" }}>{children}</motion.div>;
}

/** Magic UI DotPattern (static): an SVG dot grid, faded out towards the edges. */
export function DotPattern({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg aria-hidden className={clsx("pointer-events-none absolute inset-0 size-full fill-(--dot)", className)}>
      <defs>
        <pattern id={id} width={18} height={18} patternUnits="userSpaceOnUse">
          <circle cx={1} cy={1} r={1} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** shadcn/ui Button, trimmed to the two variants the site uses. */
export function buttonClass(variant: "primary" | "outline" = "primary", className?: string) {
  return clsx(
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] active:scale-[0.98]",
    variant === "primary"
      ? "bg-ink text-bg hover:bg-ink/90"
      : "border border-line bg-surface text-ink hover:border-muted/60 hover:bg-raised",
    className,
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
