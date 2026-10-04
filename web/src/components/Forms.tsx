import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, X } from "lucide-react";
import { allEntries, useData } from "../data";
import { buttonClass } from "./ui";

// The site is static, so a form can't store anything itself. Each form checks the
// input here, then opens a pre-filled GitHub issue (see .github/ISSUE_TEMPLATE)
// for the visitor to confirm. Field names match the template ids.
type Kind = "suggest" | "dead";
const FormContext = createContext<(k: Kind) => void>(() => {});
export const useOpenForm = () => useContext(FormContext);

export function FormProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<Kind | null>(null);
  return (
    <FormContext.Provider value={setKind}>
      {children}
      <AnimatePresence>{kind && <FormDialog kind={kind} onClose={() => setKind(null)} />}</AnimatePresence>
    </FormContext.Provider>
  );
}

const field = "h-10 w-full rounded-lg border border-line bg-bg px-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/25";
const REPO_RE = /^https?:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/i;

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-500">{error}</span> : hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

function FormDialog({ kind, onClose }: { kind: Kind; onClose: () => void }) {
  const data = useData();
  const [v, setV] = useState({ repo: "", category: "", description: "", tool: "", problem: "", notes: "" });
  const [tried, setTried] = useState(false);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((o) => ({ ...o, [k]: e.target.value }));

  const listed = useMemo(() => new Map(data ? allEntries(data).map((h) => [h.e.u.toLowerCase().replace(/\/$/, ""), h.sec.title]) : []), [data]);
  const names = useMemo(() => [...new Set(data ? allEntries(data).map((h) => h.e.n) : [])], [data]);
  const categories = data?.sections.filter((s) => s.count).map((s) => s.title) ?? [];

  const m = v.repo.trim().match(REPO_RE);
  const already = m && listed.get(`https://github.com/${m[1]}/${m[2]}`.toLowerCase());
  const errors: Record<string, string> = kind === "suggest" ? {
    ...(!m && { repo: "Enter a GitHub repository URL, like https://github.com/owner/repo." }),
    ...(already && { repo: `Already listed in ${already}.` }),
    ...(!v.category && { category: "Pick a category." }),
    ...(v.description.trim().length < 10 && { description: "Say in a few words what it does." }),
    ...(v.description.length > 120 && { description: "Keep it under about 100 characters." }),
  } : {
    ...(!v.tool.trim() && { tool: "Which entry?" }),
    ...(!v.problem && { problem: "Pick what's wrong." }),
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (Object.keys(errors).length || !data) return;
    const q = new URLSearchParams(kind === "suggest"
      ? { template: "suggest-tool.yml", title: `Add ${m![1]}/${m![2]}`, repo: v.repo.trim(), category: v.category, description: v.description.trim(), notes: v.notes }
      : { template: "dead-link.yml", title: `Dead link: ${v.tool.trim()}`, tool: v.tool.trim(), problem: v.problem, notes: v.notes });
    window.open(`${data.repo}/issues/new?${q}`, "_blank", "noopener");
    onClose();
  };
  const err = (k: string) => (tried ? errors[k] : undefined);

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-[8vh] backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}>
      <motion.form role="dialog" aria-modal="true" aria-labelledby="form-title" noValidate onSubmit={submit}
        className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 id="form-title" className="text-lg font-semibold">{kind === "suggest" ? "Suggest a tool" : "Report a dead link"}</h2>
            <p className="mt-1 text-sm text-muted">
              {kind === "suggest"
                ? "Entries need to be public, maintained in the last 12 months, and have 1,000+ stars."
                : "Broken, archived, renamed or abandoned? Tell us which one."}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1 text-muted hover:bg-raised hover:text-ink">
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {kind === "suggest" ? <>
            <Field label="GitHub repository" error={err("repo")}>
              <input autoFocus className={field} value={v.repo} onChange={set("repo")} placeholder="https://github.com/owner/repo" inputMode="url" />
            </Field>
            <Field label="Category" error={err("category")}>
              <select className={field} value={v.category} onChange={set("category")}>
                <option value="">Choose a category</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="One-line description" hint={`${v.description.length}/100 · what it does, ending in a period`} error={err("description")}>
              <input className={field} value={v.description} onChange={set("description")} maxLength={140} placeholder="Terminal coding agent that works with any model." />
            </Field>
          </> : <>
            <Field label="Entry" hint="Start typing to pick from the list." error={err("tool")}>
              <input autoFocus className={field} value={v.tool} onChange={set("tool")} list="tool-names" placeholder="owner/repo" />
              <datalist id="tool-names">{names.map((n) => <option key={n} value={n} />)}</datalist>
            </Field>
            <Field label="What's wrong" error={err("problem")}>
              <select className={field} value={v.problem} onChange={set("problem")}>
                <option value="">Choose one</option>
                {["Link is broken (404)", "Repository is archived", "Repository moved or was renamed", "No longer maintained", "Wrong description or category"].map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
          </>}
          <Field label={kind === "suggest" ? "Why it belongs (optional)" : "Details (optional)"}>
            <textarea className={field + " h-24 resize-y py-2"} value={v.notes} onChange={set("notes")}
              placeholder={kind === "suggest" ? "How you have used it, or what makes it stand out." : "The new URL if it moved, or anything else useful."} />
          </Field>
        </div>

        <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-muted sm:flex-1">Opens a pre-filled GitHub issue to confirm. Needs a GitHub account.</p>
          <button type="submit" className={buttonClass("primary")}>Continue on GitHub <ExternalLink className="size-4" aria-hidden /></button>
        </div>
      </motion.form>
    </motion.div>
  );
}
