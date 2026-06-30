import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowLeft, Download, Printer, Share2, Copy, ZoomIn, ZoomOut, Smartphone, Monitor,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useResumes } from "@/context/ResumeContext.jsx";
import { renderTemplate } from "@/components/templates/index.jsx";

export const Route = createFileRoute("/_app/resumes/$id/preview")({
  component: ResumePreviewPage,
});

function ResumePreviewPage() {
  const { id } = useParams({ from: "/_app/resumes/$id/preview" });
  const { getResume, logActivity } = useResumes();
  const resume = getResume(id);
  const [zoom, setZoom] = useState(0.85);
  const [device, setDevice] = useState("desktop");
  const ref = useRef(null);

  if (!resume) {
    return (
      <div className="p-10 text-center">
        <p className="text-muted-foreground mb-4">Résumé not found.</p>
        <Link to="/resumes" className="text-gold hover:underline">Back to résumés</Link>
      </div>
    );
  }

  const downloadPDF = async () => {
    if (!ref.current) return;
    const t = toast.loading("Preparing PDF…");
    try {
      const canvas = await html2canvas(ref.current, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
      const img = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgH = (canvas.height * pdfW) / canvas.width;
      let heightLeft = imgH;
      let position = 0;
      pdf.addImage(img, "JPEG", 0, position, pdfW, imgH);
      heightLeft -= pdfH;
      while (heightLeft > 0) {
        position = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(img, "JPEG", 0, position, pdfW, imgH);
        heightLeft -= pdfH;
      }
      pdf.save(`${(resume.title || "resume").replace(/\s+/g, "-")}.pdf`);
      logActivity({ type: "download", label: `Downloaded "${resume.title}"` });
      toast.success("PDF downloaded", { id: t });
    } catch (e) {
      console.error(e);
      toast.error("Could not export PDF", { id: t });
    }
  };

  const printResume = () => window.print();

  const shareLink = `${window.location.origin}/resumes/${id}/preview`;
  const copyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    toast.success("Link copied");
  };
  const shareNative = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: resume.title, url: shareLink }); } catch {}
    } else copyLink();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="border-b border-border bg-background sticky top-0 z-20 print:hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 flex items-center gap-3">
          <Link to="/resumes/$id" params={{ id }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to editor
          </Link>
          <div className="hidden md:block ml-4 text-sm truncate max-w-xs">{resume.title}</div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 border border-border rounded-md p-0.5">
              <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))} className="p-1.5 hover:bg-muted rounded"><ZoomOut className="w-4 h-4" /></button>
              <span className="px-2 text-xs tabular-nums w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))} className="p-1.5 hover:bg-muted rounded"><ZoomIn className="w-4 h-4" /></button>
            </div>
            <div className="hidden md:flex items-center gap-1 border border-border rounded-md p-0.5">
              <button onClick={() => setDevice("desktop")} className={`p-1.5 rounded ${device === "desktop" ? "bg-muted" : ""}`}><Monitor className="w-4 h-4" /></button>
              <button onClick={() => setDevice("mobile")} className={`p-1.5 rounded ${device === "mobile" ? "bg-muted" : ""}`}><Smartphone className="w-4 h-4" /></button>
            </div>
            <button onClick={copyLink} className="hidden sm:inline-flex items-center gap-1.5 px-3 h-9 text-sm border border-border rounded-md hover:bg-muted">
              <Copy className="w-4 h-4" /> Copy link
            </button>
            <button onClick={shareNative} className="hidden sm:inline-flex items-center gap-1.5 px-3 h-9 text-sm border border-border rounded-md hover:bg-muted">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button onClick={printResume} className="inline-flex items-center gap-1.5 px-3 h-9 text-sm border border-border rounded-md hover:bg-muted">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={downloadPDF} className="inline-flex items-center gap-1.5 px-3 h-9 text-sm rounded-md bg-gold text-ink font-medium hover:opacity-90">
              <Download className="w-4 h-4" /> PDF
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-10 overflow-x-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            maxWidth: device === "mobile" ? 420 : undefined,
            margin: "0 auto",
          }}
          className="shadow-2xl"
        >
          {renderTemplate(resume.template, { resume, ref })}
        </motion.div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .resume-paper { box-shadow: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
