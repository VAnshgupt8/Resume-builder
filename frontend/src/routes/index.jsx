import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, FileText, Wand2, Layers, Download } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext.jsx";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md gold-gradient flex items-center justify-center">
              <FileText className="w-4 h-4 text-ink" />
            </div>
            <span className="font-display text-2xl">Lumen</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#templates" className="hover:text-foreground">Templates</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
            <Link to="/register" className="text-sm px-4 py-2 rounded-md bg-gold text-ink font-medium hover:opacity-90">
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, var(--color-gold) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs text-muted-foreground mb-8"
          >
            <Sparkles className="w-3 h-3 text-gold" />
            AI-assisted, ATS-friendly
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl leading-[1.05] mb-6"
          >
            A résumé worthy of <span className="gold-text italic">your story.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Editorial-grade templates, AI that elevates your writing, and an ATS checker that
            keeps you in front of recruiters. Crafted for serious professionals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold text-ink font-medium hover:opacity-90"
            >
              Build your résumé
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border hover:bg-muted"
            >
              Browse templates
            </Link>
          </motion.div>
        </div>

        {/* Preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-4xl mx-auto mt-20 px-6"
        >
          <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="h-8 border-b border-border bg-muted/50 flex items-center px-3 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="p-10 md:p-16 bg-paper text-ink">
              <div className="border-b border-ink/10 pb-6 mb-6">
                <h2 className="font-display text-4xl mb-1">Eleanor Whitfield</h2>
                <p className="text-sm tracking-wide uppercase text-ink/60">Senior Product Designer</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-sm">
                <div>
                  <p className="uppercase text-xs tracking-widest text-ink/50 mb-2">Summary</p>
                  <p className="text-ink/80 leading-relaxed">Design leader with 8+ years shaping editorial and consumer products at scale.</p>
                </div>
                <div className="md:col-span-2">
                  <p className="uppercase text-xs tracking-widest text-ink/50 mb-2">Experience</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between">
                        <strong>Lead Designer · Aperture</strong>
                        <span className="text-ink/50">2022 — Now</span>
                      </div>
                      <p className="text-ink/70">Led the redesign of the flagship editor used by 2M+ writers.</p>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <strong>Senior Designer · Folio Co.</strong>
                        <span className="text-ink/50">2018 — 2022</span>
                      </div>
                      <p className="text-ink/70">Shipped a content system used across 12 publications.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase text-xs tracking-widest text-gold mb-3">Everything you need</p>
            <h2 className="font-display text-4xl md:text-5xl">Built for the hire you want.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Wand2, title: "AI that writes with you", body: "Generate summaries, rewrite objectives, and sharpen bullets without losing your voice." },
              { icon: ShieldCheck, title: "ATS-friendly by default", body: "Every template is parsed perfectly by applicant tracking systems. Real score, real feedback." },
              { icon: Layers, title: "Editorial templates", body: "Crafted typography and restraint. Pick from Modern, Classic, Minimal, Corporate, and more." },
              { icon: Download, title: "Pixel-perfect PDF", body: "Download crisp, print-ready PDFs. Shareable links and copy-to-clipboard built in." },
              { icon: Sparkles, title: "Live preview", body: "See changes instantly. Zoom, print preview, mobile preview — all in one place." },
              { icon: FileText, title: "Unlimited drafts", body: "Duplicate, version, autosave every 10 seconds. Never lose a word." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-lg border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center mb-4">
                  <f.icon className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-display text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Your next chapter starts with a great résumé.
          </h2>
          <p className="text-muted-foreground mb-8">It's free to start. No credit card required.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold text-ink font-medium hover:opacity-90">
            Get started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Lumen. Crafted for serious professionals.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
