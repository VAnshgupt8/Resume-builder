import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { useResumes } from "@/context/ResumeContext.jsx";
import { computeAtsScore, atsSuggestions } from "@/utils/atsScore.js";

export const Route = createFileRoute("/_app/ats")({
  component: AtsChecker,
});

const COMMON_KEYWORDS = ["leadership", "team", "strategy", "design", "product", "data", "analytics", "stakeholder", "communication", "agile", "scrum", "research", "collaboration", "growth", "metrics"];

function AtsChecker() {
  const { resumes } = useResumes();
  const [selected, setSelected] = useState(resumes[0]?.id || "");
  const [jobDesc, setJobDesc] = useState("");
  const [pasted, setPasted] = useState("");

  const resume = useMemo(() => resumes.find((r) => r.id === selected), [resumes, selected]);
  const score = useMemo(() => resume ? computeAtsScore(resume) : 0, [resume]);
  const tips = useMemo(() => resume ? atsSuggestions(resume) : [], [resume]);

  const { matched, missing } = useMemo(() => {
    if (!jobDesc) return { matched: [], missing: [] };
    const text = ((pasted || "") + " " + JSON.stringify(resume || "")).toLowerCase();
    const words = Array.from(new Set(jobDesc.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3)));
    const m = []; const ms = [];
    for (const w of words) (text.includes(w) ? m : ms).push(w);
    return { matched: m.slice(0, 20), missing: ms.slice(0, 20) };
  }, [jobDesc, pasted, resume]);

  const onUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPasted(String(reader.result || ""));
    reader.readAsText(f);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-gold" /> ATS Checker
        </h1>
        <p className="text-muted-foreground mt-1">Score your résumé and find the keywords you're missing.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-border bg-card">
          <label className="text-sm text-muted-foreground">Pick a résumé</label>
          <select
            value={selected} onChange={(e) => setSelected(e.target.value)}
            className="mt-2 w-full h-10 px-3 rounded-md bg-background border border-border text-sm outline-none focus:border-gold"
          >
            <option value="">— None —</option>
            {resumes.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
          </select>
          <p className="text-xs text-muted-foreground mt-3">…or upload a .txt résumé:</p>
          <label className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border cursor-pointer hover:bg-muted text-sm">
            <Upload className="w-4 h-4" /> Upload .txt
            <input type="file" accept=".txt" onChange={onUpload} className="hidden" />
          </label>
          {pasted && <p className="text-xs text-muted-foreground mt-2">Uploaded ({pasted.length} chars)</p>}
        </div>

        <div className="p-4 rounded-lg border border-border bg-card">
          <label className="text-sm text-muted-foreground">Paste job description (optional)</label>
          <textarea
            value={jobDesc} onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the full job description to compare keywords…"
            className="mt-2 w-full min-h-[140px] p-3 rounded-md bg-background border border-border text-sm outline-none focus:border-gold resize-y"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Score ring */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl border border-border bg-card text-center">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">ATS Score</p>
          <CircularScore value={score} />
          <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gold transition-all" style={{ width: `${score}%` }} />
          </div>
        </motion.div>

        {/* Suggestions */}
        <div className="md:col-span-2 p-6 rounded-xl border border-border bg-card">
          <h2 className="font-display text-xl mb-4">Suggestions</h2>
          {tips.length === 0 ? (
            <div className="flex items-center gap-2 text-gold">
              <CheckCircle2 className="w-5 h-5" /> Your résumé looks solid.
            </div>
          ) : (
            <ul className="space-y-2">
              {tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {jobDesc && (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Keyword matches</p>
            <div className="flex flex-wrap gap-1.5">
              {matched.length === 0 ? <span className="text-sm text-muted-foreground">No matches found.</span> : matched.map((k) => (
                <span key={k} className="px-2 py-0.5 rounded text-xs bg-gold/15 text-gold border border-gold/30">{k}</span>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Missing skills / keywords</p>
            <div className="flex flex-wrap gap-1.5">
              {missing.length === 0 ? <span className="text-sm text-muted-foreground">You're covering it all.</span> : missing.map((k) => (
                <span key={k} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">{k}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CircularScore({ value }) {
  const r = 50, c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative inline-block">
      <svg width="140" height="140" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} stroke="var(--color-muted)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="60" cy="60" r={r} stroke="var(--color-gold)" strokeWidth="10" fill="none"
          strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-4xl">{value}</span>
      </div>
    </div>
  );
}
