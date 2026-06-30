import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Check, Lock } from "lucide-react";
import { TEMPLATES } from "@/components/templates/index.jsx";
import { useResumes } from "@/context/ResumeContext.jsx";

export const Route = createFileRoute("/_app/templates")({
  component: TemplatesPage,
});

function TemplatesPage() {
  const { createResume } = useResumes();
  const navigate = useNavigate();

  const useTemplate = (t) => {
    if (t.comingSoon) { toast("That template lands in the next slice."); return; }
    const r = createResume({ template: t.id, title: `Untitled (${t.name})` });
    navigate({ to: "/resumes/$id", params: { id: r.id } });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl">Templates</h1>
        <p className="text-muted-foreground mt-1">Premium, ATS-friendly layouts. Pick one to start.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEMPLATES.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-xl border border-border bg-card overflow-hidden ${t.comingSoon ? "opacity-60" : "hover:border-gold/50"} transition-colors`}
          >
            <div className="aspect-[4/5] bg-paper text-ink p-6 relative">
              {t.comingSoon && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/40 backdrop-blur-sm text-paper">
                  <Lock className="w-6 h-6 mb-2" />
                  <p className="text-sm">Coming soon</p>
                </div>
              )}
              <div className="border-b border-ink/15 pb-3 mb-3">
                <p className="font-display text-2xl">Eleanor Whitfield</p>
                <p className="text-[10px] uppercase tracking-widest text-ink/60">{t.category}</p>
              </div>
              <div className="space-y-1.5">
                {[...Array(10)].map((_, i) => <div key={i} className="h-1.5 bg-ink/10 rounded" style={{ width: `${55 + (i * 11) % 45}%` }} />)}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-xl">{t.name}</h3>
                {t.ats && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold">
                    <Check className="w-3 h-3" /> ATS
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{t.description}</p>
              <button
                onClick={() => useTemplate(t)}
                disabled={t.comingSoon}
                className="w-full h-10 rounded-md bg-gold text-ink text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.comingSoon ? "Coming soon" : "Use this template"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
