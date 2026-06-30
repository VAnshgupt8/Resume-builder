import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  FilePlus2, FileText, LayoutTemplate, ShieldCheck, Sparkles, Clock, TrendingUp,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import { useResumes } from "@/context/ResumeContext.jsx";
import { computeAtsScore } from "@/utils/atsScore.js";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const { user } = useAuth();
  const { resumes, activity } = useResumes();

  const latest = useMemo(() => [...resumes].sort((a, b) => b.updatedAt - a.updatedAt)[0], [resumes]);
  const avgAts = useMemo(() => {
    if (!resumes.length) return 0;
    return Math.round(resumes.reduce((s, r) => s + computeAtsScore(r), 0) / resumes.length);
  }, [resumes]);

  const templateCounts = useMemo(() => {
    const map = {};
    for (const r of resumes) map[r.template] = (map[r.template] || 0) + 1;
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [resumes]);

  const weeklyStats = useMemo(() => {
    const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const now = new Date();
    const buckets = days.map((d, i) => {
      const dayDate = new Date(now);
      dayDate.setDate(now.getDate() - (6 - i));
      dayDate.setHours(0, 0, 0, 0);
      const next = new Date(dayDate); next.setDate(dayDate.getDate() + 1);
      const count = resumes.filter((r) => r.updatedAt >= dayDate.getTime() && r.updatedAt < next.getTime()).length;
      return { day: d, edits: count };
    });
    return buckets;
  }, [resumes]);

  const goldColors = ["var(--color-gold)", "var(--color-gold-soft)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm text-muted-foreground">{greeting()},</p>
        <h1 className="font-display text-4xl md:text-5xl">{user?.username}.</h1>
        <p className="text-muted-foreground mt-1">Here's where you left off.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Resumes" value={resumes.length} icon={FileText} />
        <StatCard label="Avg ATS Score" value={`${avgAts}%`} icon={ShieldCheck} accent />
        <StatCard label="Templates Used" value={templateCounts.length} icon={LayoutTemplate} />
        <StatCard label="Last Edit" value={latest ? new Date(latest.updatedAt).toLocaleDateString() : "—"} icon={Clock} />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-display text-2xl mb-4">Quick actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickAction to="/resumes/new" icon={FilePlus2} label="Create Resume" desc="Start from scratch" />
          <QuickAction to="/templates" icon={LayoutTemplate} label="Browse Templates" desc="Pick a style" />
          <QuickAction to="/ats" icon={ShieldCheck} label="ATS Checker" desc="Score your resume" />
          <QuickAction to="/ai" icon={Sparkles} label="AI Assistant" desc="Polish your copy" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Latest resume */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl">Latest résumé</h2>
            <Link to="/resumes" className="text-sm text-gold hover:underline">View all</Link>
          </div>
          {latest ? (
            <Link
              to="/resumes/$id"
              params={{ id: latest.id }}
              className="block p-5 rounded-lg border border-border hover:border-gold/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-xl truncate">{latest.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {latest.template} · updated {new Date(latest.updatedAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-display text-gold">{computeAtsScore(latest)}%</div>
                  <div className="text-xs text-muted-foreground">ATS</div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="text-center py-10 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground mb-3">You haven't created a résumé yet.</p>
              <Link to="/resumes/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-ink text-sm font-medium">
                <FilePlus2 className="w-4 h-4" /> Create your first
              </Link>
            </div>
          )}

          {/* Edits chart */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gold" /> Edits this week
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats}>
                  <XAxis dataKey="day" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: "var(--color-muted)" }}
                    contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="edits" fill="var(--color-gold)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity + templates */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl mb-4">Recent activity</h2>
            {activity.length === 0 ? (
              <p className="text-sm text-muted-foreground">No activity yet.</p>
            ) : (
              <ul className="space-y-3">
                {activity.slice(0, 6).map((a) => (
                  <li key={a.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gold mt-1.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="truncate">{a.label}</p>
                      <p className="text-xs text-muted-foreground">{new Date(a.at).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl mb-4">Templates used</h2>
            {templateCounts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Create a résumé to see this.</p>
            ) : (
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={templateCounts} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={2}>
                      {templateCounts.map((_, i) => <Cell key={i} fill={goldColors[i % goldColors.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-xl border ${accent ? "border-gold/40 bg-gold/5" : "border-border bg-card"}`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className={`w-4 h-4 ${accent ? "text-gold" : "text-muted-foreground"}`} />
      </div>
      <p className="font-display text-3xl">{value}</p>
    </motion.div>
  );
}

function QuickAction({ to, icon: Icon, label, desc }) {
  return (
    <Link
      to={to}
      className="group p-4 rounded-lg border border-border hover:border-gold/50 bg-card transition-colors flex items-start gap-3"
    >
      <div className="w-10 h-10 rounded-md bg-muted group-hover:bg-gold/10 flex items-center justify-center shrink-0 transition-colors">
        <Icon className="w-4 h-4 text-gold" />
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
}
