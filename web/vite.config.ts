import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const BASE = "/awesome-ai-agent-stack/";
const SITE = "https://tayyabimam1.github.io" + BASE;
const OUT = path.resolve(import.meta.dirname, "../docs");

const attr = (s: string) =>
  s.replace(/<[^>]+>/g, "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// GitHub Pages has no SPA rewrites: write one HTML file per layer (same URLs as
// before, with its own title and description) plus a 404 that boots the app.
function perPageHtml(): Plugin {
  return {
    name: "per-page-html",
    apply: "build",
    closeBundle() {
      const data = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, "public/data.json"), "utf8"));
      const index = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
      const page = (title: string, desc: string, file: string) =>
        index
          .replace(/<title>[^<]*<\/title>/, `<title>${attr(title)} — Awesome AI Agent Stack</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${attr(desc)}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${attr(title)}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${SITE}${file === "index.html" ? "" : file}`);
      for (const s of data.sections) {
        fs.writeFileSync(path.join(OUT, `${s.slug}.html`), page(s.title, s.tagline || data.tagline, `${s.slug}.html`));
      }
      fs.writeFileSync(path.join(OUT, "404.html"), page("Page not found", data.tagline, "404.html"));
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), perPageHtml()],
  build: { outDir: OUT, emptyOutDir: true },
});
