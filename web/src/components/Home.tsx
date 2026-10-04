import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Plus, Search, Star } from "lucide-react";
import { allEntries, fmtBig, layerPath, topRepos, useData, type Data, type Hit } from "../data";
import { useOpenPalette } from "./CommandPalette";
import { useOpenForm } from "./Forms";
import {
  Avatar, BlurFade, BorderBeam, buttonClass, Counter, DotPattern, MagicCard, Marquee, ShinyText, Stars,
} from "./ui";

export function Home() {
  const data = useData();
  useEffect(() => { document.title = "Awesome AI Agent Stack: 3,000+ open-source AI agent tools, ranked by stars"; }, []);
  if (!data) return <div className="px-8 py-16 text-muted">Loading…</div>;
  return <HomeContent data={data} />;
}

/** The README HTML as plain text, with entities like &#x27; decoded. */
const plainText = (html: string) => new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";

type Category = {
  slug: string; title: string; tagline: string; tier: number;
  count: number; stars: number; top: Hit[];
};

const HEADLINE = "Every open-source tool for building AI agents, mapped.";

function HomeContent({ data }: { data: Data }) {
  const openPalette = useOpenPalette();
  const openForm = useOpenForm();
  const hits = useMemo(() => allEntries(data), [data]);
  const top = useMemo(() => topRepos(data), [data]);

  const categories: Category[] = useMemo(() => data.sections
    .filter((s) => s.inMap && s.count)
    .map((s) => {
      const mine = hits.filter((h) => h.sec.slug === s.slug && h.e.s > 0).sort((a, b) => b.e.s - a.e.s);
      return {
        slug: s.slug, title: s.title, tagline: plainText(s.tagline), tier: s.tier,
        count: s.count, stars: mine.reduce((a, h) => a + h.e.s, 0), top: mine.slice(0, 3),
      };
    }), [data, hits]);

  const tiers = data.tiers
    .map((name, ti) => ({ name, cats: categories.filter((c) => c.tier === ti) }))
    .filter((t) => t.cats.length);
  const stars = top.reduce((a, h) => a + h.e.s, 0);
  const marquee = top.slice(0, 40);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-14 text-center sm:pt-24">
          <BlurFade>
            <a href={data.repo}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium transition-colors hover:border-muted/60">
              <ShinyText>Open source, rebuilt from the README on every change</ShinyText>
              <ArrowRight className="size-3 text-muted" aria-hidden />
            </a>
          </BlurFade>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {HEADLINE.split(" ").map((w, i) => (
              <motion.span key={i} className="inline-block whitespace-pre"
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: "easeOut" }}>
                {w + " "}
              </motion.span>
            ))}
          </h1>
          <BlurFade delay={0.45}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted">
              {data.total.toLocaleString()} tools in {categories.length} categories, from the coding agent in your terminal
              down to the model serving the tokens. Sorted by what they do and ranked by GitHub stars.
            </p>
          </BlurFade>

          <BlurFade delay={0.55}>
            <button type="button" onClick={openPalette}
              className="relative mx-auto mt-8 flex h-12 w-full max-w-xl items-center gap-3 rounded-xl border border-line bg-surface px-4 text-left text-muted shadow-sm transition-colors hover:border-muted/60">
              <Search className="size-5 shrink-0" aria-hidden />
              <span className="flex-1 truncate">Search {data.total.toLocaleString()} tools by name or what they do</span>
              <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-xs sm:block">Ctrl K</kbd>
              <BorderBeam />
            </button>
          </BlurFade>

          <BlurFade delay={0.65} className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="#stack" className={buttonClass("primary")}>Browse the stack <ArrowRight className="size-4" aria-hidden /></a>
            <a href={data.repo} className={buttonClass("outline")}><Star className="size-4 text-star" aria-hidden /> Star on GitHub</a>
          </BlurFade>

          <dl className="mx-auto mt-12 grid max-w-xl grid-cols-3 divide-x divide-line">
            {[
              { n: data.total, label: "tools", f: (n: number) => n.toLocaleString() },
              { n: categories.length, label: "categories", f: String },
              { n: stars, label: "GitHub stars", f: fmtBig },
            ].map((s) => (
              <div key={s.label} className="flex flex-col-reverse px-2">
                <dt className="font-mono text-xs tracking-wide text-muted uppercase">{s.label}</dt>
                <dd className="text-2xl font-semibold sm:text-3xl"><Counter value={s.n} format={s.f} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Most-starred marquee */}
      <section aria-labelledby="top-heading" className="border-b border-line py-8">
        <h2 id="top-heading" className="mb-4 text-center font-mono text-xs tracking-wide text-muted uppercase">
          Most-starred across the stack
        </h2>
        <div className="flex flex-col gap-3 mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <Marquee>{marquee.slice(0, 20).map((h) => <RepoChip key={h.e.u} h={h} />)}</Marquee>
          <Marquee reverse>{marquee.slice(20).map((h) => <RepoChip key={h.e.u} h={h} />)}</Marquee>
        </div>
      </section>

      {/* The stack: one band per tier, its categories as cards */}
      <section id="stack" aria-labelledby="stack-heading" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-8">
        <BlurFade inView className="max-w-2xl">
          <h2 id="stack-heading" className="text-3xl font-semibold tracking-tight">The stack, layer by layer</h2>
          <p className="mt-3 text-muted">
            Start at the top with the agent that writes your code and work down to where the tokens come from.
            Each category lists its tools by stars, with the curated sub-groups one click away.
          </p>
        </BlurFade>

        <div className="mt-10 flex flex-col gap-12">
          {tiers.map((t, ti) => (
            <div key={t.name} className="grid gap-5 lg:grid-cols-[13rem_1fr]">
              <BlurFade inView className="lg:sticky lg:top-24 lg:self-start">
                <p className="font-mono text-xs text-muted">{String(ti + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-lg font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {t.cats.length} {t.cats.length === 1 ? "category" : "categories"} ·{" "}
                  {t.cats.reduce((a, c) => a + c.count, 0).toLocaleString()} tools
                </p>
              </BlurFade>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {t.cats.map((c, i) => <CategoryCard key={c.slug} c={c} i={i} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contribute */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        <BlurFade inView>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-12 text-center">
            <DotPattern className="mask-[radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-tight">Missing a tool?</h2>
              <p className="mx-auto mt-2 max-w-lg text-muted">
                Suggest it here and it lands as a GitHub issue. Accepted tools go into the README and this site rebuilds itself.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => openForm("suggest")} className={buttonClass("primary")}><Plus className="size-4" aria-hidden /> Suggest a tool</button>
                <a href={data.repo + "/blob/main/CONTRIBUTING.md"} className={buttonClass("outline")}>Read the guidelines</a>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
}

function RepoChip({ h }: { h: Hit }) {
  return (
    <a href={h.e.u} className="flex items-center gap-2.5 rounded-lg border border-line bg-surface py-2 pr-3 pl-2 text-sm transition-colors hover:border-accent/60">
      <Avatar owner={h.e.o} name={h.e.n} />
      <span className="font-medium whitespace-nowrap text-ink">{h.e.n.split("/").pop()}</span>
      <Stars n={h.e.s} className="text-xs" />
    </a>
  );
}

function CategoryCard({ c, i }: { c: Category; i: number }) {
  return (
    <BlurFade inView delay={(i % 3) * 0.06} className="h-full">
      <MagicCard className="h-full transition-transform duration-300 hover:-translate-y-0.5">
        <Link to={layerPath(c.slug)} className="flex h-full flex-col p-5">
          <span className="flex items-start gap-2">
            <span className="flex-1 text-base font-semibold text-ink group-hover:text-accent">{c.title}</span>
            <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
          </span>
          {c.tagline && <span className="mt-1.5 line-clamp-2 text-sm text-muted">{c.tagline}</span>}
          {c.top.length > 0 && (
            <span className="mt-4 flex flex-col gap-2">
              {c.top.map((h) => (
                <span key={h.e.u} className="flex items-center gap-2 text-sm">
                  <Avatar owner={h.e.o} name={h.e.n} />
                  <span className="min-w-0 flex-1 truncate text-ink">{h.e.n}</span>
                  <Stars n={h.e.s} className="text-xs" />
                </span>
              ))}
            </span>
          )}
          <span className="mt-auto flex gap-4 pt-4 font-mono text-xs text-muted">
            <span><b className="font-semibold text-ink">{c.count}</b> tools</span>
            <span><b className="font-semibold text-ink">{fmtBig(c.stars)}</b> stars</span>
          </span>
        </Link>
      </MagicCard>
    </BlurFade>
  );
}
