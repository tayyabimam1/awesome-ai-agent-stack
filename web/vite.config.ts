import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const BASE = "/awesome-ai-agent-stack/";
const SITE = "https://tayyabimam1.github.io" + BASE;
const NAME = "Awesome AI Agent Stack";
const OUT = path.resolve(import.meta.dirname, "dist");

const text = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const esc = (s: string) => text(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const json = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");

type Entry = { n: string; u: string; d: string; s: number };
type Group = { type: "group"; title: string; entries: Entry[] };
type Section = { title: string; slug: string; tagline: string; count: number; inMap: boolean; blocks: { type: string }[] };

// GitHub Pages has no SPA rewrites: write one HTML file per category with its own
// title, description, social tags and JSON-LD, plus the category's tools as plain
// HTML inside #root so crawlers and no-JS readers get the content. React replaces it.
function perPageHtml(): Plugin {
  return {
    name: "per-page-html",
    apply: "build",
    closeBundle() {
      const data = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, "public/data.json"), "utf8"));
      const sections: Section[] = data.sections;
      const groups = (s: Section) => s.blocks.filter((b): b is Group => b.type === "group");
      const entries = (s: Section) => groups(s).flatMap((g) => g.entries);
      const index = fs.readFileSync(path.join(OUT, "index.html"), "utf8");

      const page = (o: { title: string; desc: string; file: string; ld: object[]; body: string }) => {
        const url = SITE + (o.file === "index.html" ? "" : o.file);
        return index
          .replace(/<title>[^<]*<\/title>/, `<title>${esc(o.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(o.desc)}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(o.title)}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(o.desc)}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(o.title)}`)
          .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(o.desc)}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
          .replace("</head>", o.ld.map((l) => `<script type="application/ld+json">${json(l)}</script>`).join("") + "</head>")
          .replace("<!--prerender-->", `<div class="prerender">${o.body}</div>`);
      };
      const li = (e: Entry) => `<li><a href="${esc(e.u)}">${esc(e.n)}</a> - ${esc(e.d)}</li>`;
      const website = { "@type": "WebSite", name: NAME, url: SITE,
        potentialAction: { "@type": "SearchAction", target: `${SITE}?q={search_term_string}`, "query-input": "required name=search_term_string" } };

      // Home
      const cats = sections.filter((s) => s.inMap && s.count);
      const top = cats.flatMap(entries).filter((e) => e.s).sort((a, b) => b.s - a.s)
        .filter((e, i, a) => a.findIndex((x) => x.u === e.u) === i).slice(0, 30);
      fs.writeFileSync(path.join(OUT, "index.html"), page({
        title: `${NAME}: ${Math.floor(data.total / 1000).toLocaleString()},000+ open-source AI agent tools, ranked by stars`,
        desc: `A curated map of ${data.total.toLocaleString()} open-source tools for building AI agents: coding agents, agent frameworks, MCP servers, RAG, memory, local models and more, sorted by category and ranked by GitHub stars.`,
        file: "index.html",
        ld: [{ "@context": "https://schema.org", ...website },
          { "@context": "https://schema.org", "@type": "ItemList", name: "Categories",
            itemListElement: cats.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: `${SITE}${s.slug}.html` })) }],
        body: `<h1>${NAME}</h1><p>${esc(data.tagline)}</p><h2>Categories</h2><ul>${cats.map((s) =>
          `<li><a href="${BASE}${s.slug}.html">${esc(s.title)}</a> (${s.count} tools) - ${esc(s.tagline)}</li>`).join("")}</ul>` +
          `<h2>Most-starred tools</h2><ol>${top.map(li).join("")}</ol>`,
      }));

      // One page per category
      for (const s of sections) {
        const all = entries(s).slice().sort((a, b) => b.s - a.s);
        const named = all.slice(0, 3).map((e) => e.n.split("/").pop()).join(", ");
        const desc = s.count
          ? `${text(s.tagline) || data.tagline} ${s.count} open-source tools ranked by GitHub stars, including ${named}.`
          : text(s.tagline) || data.tagline;
        fs.writeFileSync(path.join(OUT, `${s.slug}.html`), page({
          title: s.count ? `${s.title}: ${s.count} open-source tools ranked by stars | ${NAME}` : `${s.title} | ${NAME}`,
          desc, file: `${s.slug}.html`,
          ld: [{ "@context": "https://schema.org", "@type": "CollectionPage", name: s.title, url: `${SITE}${s.slug}.html`,
            description: desc, isPartOf: website,
            breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: NAME, item: SITE },
              { "@type": "ListItem", position: 2, name: s.title, item: `${SITE}${s.slug}.html` }] },
            mainEntity: { "@type": "ItemList", numberOfItems: s.count, itemListElement: all.slice(0, 50).map((e, i) => ({
              "@type": "ListItem", position: i + 1, item: { "@type": "SoftwareSourceCode", name: e.n, codeRepository: e.u, description: text(e.d) } })) } }],
          body: `<p><a href="${BASE}">${NAME}</a></p><h1>${esc(s.title)}</h1><p>${esc(s.tagline)}</p>` +
            groups(s).map((g) => `${g.title ? `<h2>${esc(g.title)}</h2>` : ""}<ul>${g.entries.map(li).join("")}</ul>`).join(""),
        }));
      }
      fs.writeFileSync(path.join(OUT, "404.html"), page({
        title: `Page not found | ${NAME}`, desc: data.tagline, file: "404.html", ld: [],
        body: `<h1>Page not found</h1><p><a href="${BASE}">Go to ${NAME}</a></p>`,
      }).replace('content="index, follow, max-image-preview:large"', 'content="noindex"'));
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), perPageHtml()],
  build: { outDir: OUT, emptyOutDir: true },
});
