import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useResumes } from "@/context/ResumeContext.jsx";

export const Route = createFileRoute("/_app/resumes/new")({
  component: NewResume,
});

// Module-level latch survives StrictMode double-mount.
let creating = false;

function NewResume() {
  const { createResume } = useResumes();
  const navigate = useNavigate();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current || creating) return;
    ranRef.current = true;
    creating = true;
    const r = createResume({ title: "Untitled Resume" });
    // release latch after navigation kicks in
    queueMicrotask(() => { creating = false; });
    navigate({ to: "/resumes/$id", params: { id: r.id }, replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
    </div>
  );
}
