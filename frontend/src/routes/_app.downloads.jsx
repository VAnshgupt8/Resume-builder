import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { useResumes } from "@/context/ResumeContext.jsx";
import EmptyState from "@/components/EmptyState.jsx";

export const Route = createFileRoute("/_app/downloads")({
  component: Downloads,
});

function Downloads() {
  const { resumes } = useResumes();
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl">Downloads</h1>
        <p className="text-muted-foreground mt-1">Export any résumé as PDF from its preview page.</p>
      </div>

      {resumes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No résumés to download"
          description="Create a résumé first, then come back here."
          action={<Link to="/resumes/new" className="px-4 py-2 rounded-md bg-gold text-ink text-sm font-medium">Create résumé</Link>}
        />
      ) : (
        <div className="space-y-2">
          {resumes.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div className="min-w-0">
                <p className="font-medium truncate">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.template} · {new Date(r.updatedAt).toLocaleString()}</p>
              </div>
              <Link
                to="/resumes/$id/preview" params={{ id: r.id }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gold text-ink text-sm font-medium hover:opacity-90"
              >
                <Download className="w-4 h-4" /> Open & download
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
