import type { ReactNode } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { layerPath, type Hit } from "../data";
import { Avatar, Stars } from "./ui";

/** Bordered list of repositories, GitHub style. Rows animate when sorting or filtering. */
export function RepoList({ children }: { children: ReactNode }) {
  return (
    <motion.ol layout className="overflow-hidden rounded-md border border-line bg-surface">
      <AnimatePresence initial={false} mode="popLayout">{children}</AnimatePresence>
    </motion.ol>
  );
}

function RepoName({ name }: { name: string }) {
  const slash = name.indexOf("/");
  if (slash < 0) return <>{name}</>;
  return <><span className="font-normal">{name.slice(0, slash + 1)}</span>{name.slice(slash + 1)}</>;
}

export function RepoRow({ hit, rank, showCategory, anchor }: {
  hit: Hit; rank?: number; showCategory?: boolean; anchor?: boolean;
}) {
  const { e, sec, picked } = hit;
  return (
    <motion.li
      layout="position"
      id={anchor ? `e-${e.i}` : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="flex scroll-mt-36 gap-3 border-t border-line px-4 py-3 first:border-t-0 hover:bg-raised"
    >
      {rank !== undefined && (
        <span className="w-7 shrink-0 pt-1.5 text-right text-sm font-semibold tabular-nums text-muted">{rank}</span>
      )}
      <Avatar owner={e.o} name={e.n} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <a href={e.u} className="font-semibold break-all text-accent hover:underline"><RepoName name={e.n} /></a>
          {picked && (
            <span className="rounded-full border border-success/50 px-2 py-px text-xs font-medium text-success">Hand-picked</span>
          )}
          {showCategory && (
            <Link to={layerPath(sec.slug)}
              className="rounded-full border border-line px-2 py-px text-xs text-muted hover:border-accent hover:text-accent">
              {sec.title}
            </Link>
          )}
        </div>
        {e.h && <p className="md mt-1 text-sm text-muted" dangerouslySetInnerHTML={{ __html: e.h }} />}
      </div>
      <Stars n={e.s} className="pt-1" />
    </motion.li>
  );
}
