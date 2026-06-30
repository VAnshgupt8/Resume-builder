import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { Sparkles, Loader2, Copy } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/ai")({
  component: AIAssistant,
});

const PRESETS = [
  { id: "summary", label: "Generate Professional Summary", placeholder: "Paste your role + experience…" },
  { id: "objective", label: "Rewrite Objective", placeholder: "Paste your current objective…" },
  { id: "improve", label: "Improve Resume Section", placeholder: "Paste any resume section…" },
  { id: "skills", label: "Improve Skills", placeholder: "Paste your skills, comma-separated…" },
  { id: "projects", label: "Improve Project Description", placeholder: "Paste a project description…" },
  { id: "experience", label: "Improve Experience Bullet", placeholder: "Paste an experience bullet…" },
  { id: "achievements", label: "Generate Achievements", placeholder: "Paste your role and outcomes…" },
  { id: "grammar", label: "Improve Grammar", placeholder: "Paste text to clean up…" },
  { id: "ats", label: "Improve ATS Score (rewrite for keywords)", placeholder: "Paste your bullet or summary…" },
];

function mockAI(preset, input) {
  const base = (input || "").trim();
  const verbs = ["Led", "Designed", "Shipped", "Improved", "Architected", "Drove", "Orchestrated"];
  const v = verbs[Math.floor(Math.random() * verbs.length)];
  if (!base) return "Add some context above so AI has something to work with.";
  switch (preset) {
    case "summary":
      return `Seasoned professional with proven impact across cross-functional teams. ${base.slice(0, 80)} — known for translating ambiguous goals into measurable outcomes and shipping work that scales.`;
    case "objective":
      return `To contribute deep expertise toward a mission-driven team where I can ${base.split(" ").slice(0, 8).join(" ")} and drive measurable results from day one.`;
    case "grammar":
      return base.replace(/\s+/g, " ").replace(/\bi\b/g, "I").replace(/(^|\.\s+)([a-z])/g, (_, p, c) => p + c.toUpperCase());
    case "ats":
      return `${v} ${base.toLowerCase()} — increasing throughput by 32% and improving stakeholder satisfaction (NPS +18).`;
    default:
      return `${v} ${base.split(" ").slice(0, 14).join(" ")} — resulting in a measurable lift across the team and product.`;
  }
}

function AIAssistant() {
  const [preset, setPreset] = useState(PRESETS[0].id);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true); setOutput("");
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    setOutput(mockAI(preset, input));
    setBusy(false);
  };
  const copy = async () => { await navigator.clipboard.writeText(output); toast.success("Copied"); };

  const current = PRESETS.find((p) => p.id === preset);

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-gold" /> AI Assistant
        </h1>
        <p className="text-muted-foreground mt-1">Tighten your writing, generate summaries, and rewrite for ATS keywords.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mb-6">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPreset(p.id)}
            className={`p-3 text-sm text-left rounded-lg border transition-colors ${preset === p.id ? "border-gold bg-gold/10 text-foreground" : "border-border hover:border-gold/40"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={current.placeholder}
          className="w-full min-h-[160px] p-4 rounded-lg bg-card border border-border outline-none focus:border-gold text-sm resize-y"
        />
        <button
          onClick={run}
          disabled={busy || !input.trim()}
          className="inline-flex items-center gap-2 px-5 h-11 rounded-md bg-gold text-ink font-medium hover:opacity-90 disabled:opacity-50"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Generate
        </button>

        {(output || busy) && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">AI suggestion</p>
              {output && (
                <button onClick={copy} className="text-xs inline-flex items-center gap-1 text-gold hover:underline">
                  <Copy className="w-3 h-3" /> Copy
                </button>
              )}
            </div>
            {busy ? (
              <div className="space-y-2">
                <div className="h-3 rounded shimmer w-3/4" />
                <div className="h-3 rounded shimmer w-full" />
                <div className="h-3 rounded shimmer w-2/3" />
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{output}</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
