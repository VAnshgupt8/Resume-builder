import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FilePlus2, FileText, Search, MoreVertical, Copy, Trash2, Edit, Eye, Download,
} from "lucide-react";
import { useResumes } from "@/context/ResumeContext.jsx";
import { computeAtsScore } from "@/utils/atsScore.js";
import EmptyState from "@/components/EmptyState.jsx";

export const Route = createFileRoute("/_app/resumes/")({
  component: ResumesList,
});

const PAGE_SIZE = 9;

function ResumesList() {
  const { resumes, deleteResume, duplicateResume } = useResumes();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("updated");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = resumes.filter((r) => r.title.toLowerCase().includes(q.toLowerCase()));
    if (sort === "updated") list.sort((a, b) => b.updatedAt - a.updatedAt);
    if (sort === "created") list.sort((a, b) => b.createdAt - a.createdAt);
    if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [resumes, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl">My résumés</h1>
          <p className="text-muted-foreground mt-1">{resumes.length} total</p>
        </div>
        <Link to="/resumes/new" className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-gold text-ink font-medium hover:opacity-90 self-start md:self-auto">
          <FilePlus2 className="w-4 h-4" /> New résumé
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Search résumés…"
            className="w-full h-10 pl-9 pr-3 rounded-md bg-card border border-border text-sm outline-none focus:border-gold"
          />
        </div>
        <select
          value={sort} onChange={(e) => setSort(e.target.value)}
          className="h-10 px-3 rounded-md bg-card border border-border text-sm outline-none focus:border-gold"
        >
          <option value="updated">Recently updated</option>
          <option value="created">Recently created</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={q ? "No matches" : "No résumés yet"}
          description={q ? "Try a different search." : "Create your first résumé to get started."}
          action={!q && (
            <Link to="/resumes/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-ink font-medium">
              <FilePlus2 className="w-4 h-4" /> Create résumé
            </Link>
          )}
        />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageItems.map((r, i) => (
              <ResumeCard
                key={r.id}
                resume={r}
                index={i}
                onDelete={() => {
                  if (confirm(`Delete "${r.title}"? This can't be undone.`)) {
                    deleteResume(r.id);
                    toast.success("Résumé deleted");
                  }
                }}
                onDuplicate={() => {
                  const copy = duplicateResume(r.id);
                  if (copy) toast.success("Duplicated");
                }}
                onPreview={() => navigate({ to: "/resumes/$id/preview", params: { id: r.id } })}
                onEdit={() => navigate({ to: "/resumes/$id", params: { id: r.id } })}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-md text-sm ${page === i + 1 ? "bg-gold text-ink" : "border border-border hover:bg-muted"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ResumeCard({ resume, index, onDelete, onDuplicate, onPreview, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const score = computeAtsScore(resume);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-gold/40 transition-colors"
    >
      <div className="aspect-[4/5] bg-paper text-ink p-5 relative overflow-hidden">
        <div className="border-b border-ink/10 pb-2 mb-2">
          <p className="font-display text-lg truncate">{resume.personal?.fullName || "Unnamed"}</p>
          <p className="text-[10px] uppercase tracking-widest text-ink/50 truncate">{resume.personal?.role || resume.template}</p>
        </div>
        <div className="space-y-1.5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-1.5 bg-ink/10 rounded" style={{ width: `${60 + (i * 7) % 40}%` }} />
          ))}
        </div>
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-ink/80 text-paper text-[10px] uppercase tracking-wider">
          {resume.status}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <h3 className="font-medium truncate">{resume.title}</h3>
            <p className="text-xs text-muted-foreground capitalize">{resume.template}</p>
          </div>
          <div className="relative">
            <button onClick={() => setMenuOpen((o) => !o)} className="p-1.5 -mr-1 rounded hover:bg-muted">
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-1 w-44 rounded-md border border-border bg-popover shadow-lg z-40 py-1">
                  <MenuItem icon={Edit} onClick={() => { setMenuOpen(false); onEdit(); }}>Edit</MenuItem>
                  <MenuItem icon={Eye} onClick={() => { setMenuOpen(false); onPreview(); }}>Preview</MenuItem>
                  <MenuItem icon={Copy} onClick={() => { setMenuOpen(false); onDuplicate(); }}>Duplicate</MenuItem>
                  <div className="h-px bg-border my-1" />
                  <MenuItem icon={Trash2} danger onClick={() => { setMenuOpen(false); onDelete(); }}>Delete</MenuItem>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>ATS {score}%</span>
          <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}

function MenuItem({ icon: Icon, children, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted ${danger ? "text-destructive" : ""}`}
    >
      <Icon className="w-4 h-4" /> {children}
    </button>
  );
}
