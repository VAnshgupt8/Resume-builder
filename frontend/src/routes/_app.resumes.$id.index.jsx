import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Eye, Save, Plus, Trash2, Check,
  User, FileText, GraduationCap, Briefcase, FolderKanban, Sparkles,
  Globe, Award, Trophy, BookOpen, Languages, Heart, UserPlus,
} from "lucide-react";
import { useResumes } from "@/context/ResumeContext.jsx";
import { renderTemplate } from "@/components/templates/index.jsx";
import { computeAtsScore } from "@/utils/atsScore.js";

export const Route = createFileRoute("/_app/resumes/$id/")({
  component: ResumeEditor,
});

const STEPS = [
  { key: "personal", label: "Personal", icon: User },
  { key: "summary", label: "Summary", icon: FileText },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "skills", label: "Skills", icon: Sparkles },
  { key: "extras", label: "Extras", icon: Award },
];

function ResumeEditor() {
  const { id } = useParams({ from: "/_app/resumes/$id/" });
  const { getResume, updateResume } = useResumes();
  const navigate = useNavigate();
  const resume = getResume(id);
  const [step, setStep] = useState(0);
  const [data, setData] = useState(resume);
  const lastSaved = useRef(Date.now());
  const dataRef = useRef(data);

  useEffect(() => { if (resume && (!data || data.id !== resume.id)) setData(resume); }, [resume?.id]); // eslint-disable-line
  useEffect(() => { dataRef.current = data; }, [data]);

  // Autosave every 10s
  useEffect(() => {
    const t = setInterval(() => {
      if (dataRef.current) {
        updateResume(id, dataRef.current);
        lastSaved.current = Date.now();
      }
    }, 10000);
    return () => clearInterval(t);
  }, [id, updateResume]);

  // Save on unmount
  useEffect(() => () => { if (dataRef.current) updateResume(id, dataRef.current); }, []); // eslint-disable-line

  if (!resume || !data) {
    return (
      <div className="max-w-md mx-auto p-10 text-center">
        <p className="text-muted-foreground mb-4">Résumé not found.</p>
        <Link to="/resumes" className="text-gold hover:underline">Back to résumés</Link>
      </div>
    );
  }

  const set = (patch) => setData((d) => ({ ...d, ...patch }));
  const setPersonal = (patch) => setData((d) => ({ ...d, personal: { ...d.personal, ...patch } }));

  const saveDraft = () => {
    updateResume(id, { ...data, status: "draft" });
    toast.success("Draft saved");
  };
  const publish = () => {
    updateResume(id, { ...data, status: "published" });
    toast.success("Résumé published");
  };

  const goPreview = () => {
    updateResume(id, data);
    navigate({ to: "/resumes/$id/preview", params: { id } });
  };

  const score = computeAtsScore(data);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
      {/* Left: form */}
      <div className="flex-1 lg:flex-[5] overflow-y-auto border-r border-border">
        <div className="max-w-2xl mx-auto p-6 lg:p-10">
          <div className="flex items-center justify-between mb-2">
            <Link to="/resumes" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> All résumés
            </Link>
            <span className="text-xs text-muted-foreground">
              ATS <span className="text-gold font-medium">{score}%</span>
            </span>
          </div>

          <input
            value={data.title}
            onChange={(e) => set({ title: e.target.value })}
            className="w-full font-display text-3xl bg-transparent outline-none border-b border-transparent focus:border-gold py-2 mb-6"
          />

          {/* Step indicator */}
          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = i === step;
              const done = i < step;
              return (
                <button
                  key={s.key}
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                    active ? "bg-gold text-ink" : done ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {done ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={STEPS[step].key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {STEPS[step].key === "personal" && <PersonalStep value={data.personal} onChange={setPersonal} />}
              {STEPS[step].key === "summary" && <SummaryStep summary={data.summary} objective={data.objective} onChange={(v) => set(v)} />}
              {STEPS[step].key === "experience" && <ListStep value={data.experience} onChange={(v) => set({ experience: v })} kind="experience" />}
              {STEPS[step].key === "education" && <ListStep value={data.education} onChange={(v) => set({ education: v })} kind="education" />}
              {STEPS[step].key === "projects" && <ListStep value={data.projects} onChange={(v) => set({ projects: v })} kind="projects" />}
              {STEPS[step].key === "skills" && <SkillsStep value={data.skills} onChange={(v) => set({ skills: v })} />}
              {STEPS[step].key === "extras" && <ExtrasStep data={data} onChange={set} />}
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <div className="flex items-center gap-2">
              <button onClick={saveDraft} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-muted">
                <Save className="w-4 h-4" /> Save draft
              </button>
              {step < STEPS.length - 1 ? (
                <button onClick={() => setStep((s) => s + 1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-ink font-medium hover:opacity-90">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={publish} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold text-ink font-medium hover:opacity-90">
                  Publish <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right: live preview */}
      <div className="hidden lg:flex flex-[4] bg-muted/30 overflow-y-auto p-6 flex-col">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">Live preview</p>
          <button onClick={goPreview} className="text-sm inline-flex items-center gap-1.5 text-gold hover:underline">
            <Eye className="w-4 h-4" /> Full preview
          </button>
        </div>
        <div className="flex-1 flex items-start justify-center">
          <div style={{ transform: "scale(0.55)", transformOrigin: "top center" }} className="shadow-2xl">
            {renderTemplate(data.template, { resume: data })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Steps ---------- */

function Input({ label, type = "text", ...rest }) {
  return (
    <label className="block">
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        type={type}
        {...rest}
        className="mt-1 w-full h-10 px-3 rounded-md bg-card border border-border outline-none focus:border-gold text-sm"
      />
    </label>
  );
}

function Textarea({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-sm text-muted-foreground">{label}</span>
      <textarea
        {...rest}
        className="mt-1 w-full px-3 py-2 rounded-md bg-card border border-border outline-none focus:border-gold text-sm min-h-[100px] resize-y"
      />
    </label>
  );
}

function PersonalStep({ value, onChange }) {
  const onPhoto = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) { toast.error("Max 2MB"); return; }
    const reader = new FileReader();
    reader.onload = () => onChange({ photo: reader.result });
    reader.readAsDataURL(f);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-muted overflow-hidden border border-border flex items-center justify-center">
          {value.photo ? <img src={value.photo} alt="" className="w-full h-full object-cover" /> : <User className="w-6 h-6 text-muted-foreground" />}
        </div>
        <div>
          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-sm cursor-pointer hover:bg-muted">
            Upload photo
            <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
          </label>
          {value.photo && (
            <button onClick={() => onChange({ photo: "" })} className="ml-2 text-xs text-destructive">Remove</button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full name" value={value.fullName} onChange={(e) => onChange({ fullName: e.target.value })} />
        <Input label="Role / Title" value={value.role} onChange={(e) => onChange({ role: e.target.value })} />
        <Input label="Email" type="email" value={value.email} onChange={(e) => onChange({ email: e.target.value })} />
        <Input label="Phone" value={value.phone} onChange={(e) => onChange({ phone: e.target.value })} />
        <Input label="Location" value={value.location} onChange={(e) => onChange({ location: e.target.value })} />
        <Input label="Website" value={value.website} onChange={(e) => onChange({ website: e.target.value })} />
        <Input label="LinkedIn" value={value.linkedin} onChange={(e) => onChange({ linkedin: e.target.value })} />
      </div>
    </div>
  );
}

function SummaryStep({ summary, objective, onChange }) {
  return (
    <div className="space-y-5">
      <Textarea label="Professional summary" value={summary} onChange={(e) => onChange({ summary: e.target.value })} placeholder="2–4 sentences about your expertise and impact." />
      <Textarea label="Career objective (optional)" value={objective} onChange={(e) => onChange({ objective: e.target.value })} placeholder="A short statement on what you're looking for." />
      <button
        onClick={() => onChange({ summary: aiSummary() })}
        className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-gold/50 text-gold hover:bg-gold/10"
      >
        <Sparkles className="w-4 h-4" /> Generate with AI
      </button>
    </div>
  );
}

function aiSummary() {
  const a = ["Results-driven", "Detail-oriented", "Strategic", "Collaborative", "Innovative"];
  const b = ["product designer", "software engineer", "marketing leader", "operations manager", "data analyst"];
  const c = ["8+ years of experience", "a track record of shipping", "deep expertise"];
  return `${a[Math.floor(Math.random()*a.length)]} ${b[Math.floor(Math.random()*b.length)]} with ${c[Math.floor(Math.random()*c.length)]} across high-growth teams. Skilled at translating ambiguous goals into measurable outcomes, mentoring teams, and shipping work that matters.`;
}

function ListStep({ value = [], onChange, kind }) {
  const add = () => {
    const base =
      kind === "experience" ? { id: crypto.randomUUID(), role: "", company: "", location: "", startDate: "", endDate: "", bullets: [""] } :
      kind === "education" ? { id: crypto.randomUUID(), degree: "", school: "", location: "", startDate: "", endDate: "", details: "" } :
      { id: crypto.randomUUID(), name: "", tech: "", link: "", description: "" };
    onChange([...value, base]);
  };
  const upd = (i, patch) => onChange(value.map((x, idx) => idx === i ? { ...x, ...patch } : x));
  const del = (i) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      {value.map((item, i) => (
        <div key={item.id} className="p-4 rounded-lg border border-border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium capitalize">{kind} #{i + 1}</p>
            <button onClick={() => del(i)} className="text-xs text-destructive inline-flex items-center gap-1">
              <Trash2 className="w-3 h-3" /> Remove
            </button>
          </div>

          {kind === "experience" && (
            <>
              <div className="grid md:grid-cols-2 gap-3">
                <Input label="Role" value={item.role} onChange={(e) => upd(i, { role: e.target.value })} />
                <Input label="Company" value={item.company} onChange={(e) => upd(i, { company: e.target.value })} />
                <Input label="Location" value={item.location} onChange={(e) => upd(i, { location: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Start" value={item.startDate} onChange={(e) => upd(i, { startDate: e.target.value })} placeholder="Jan 2022" />
                  <Input label="End" value={item.endDate} onChange={(e) => upd(i, { endDate: e.target.value })} placeholder="Present" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bullet points</p>
                {(item.bullets || []).map((b, bi) => (
                  <div key={bi} className="flex gap-2 mb-2">
                    <input
                      value={b}
                      onChange={(e) => { const next = [...item.bullets]; next[bi] = e.target.value; upd(i, { bullets: next }); }}
                      placeholder="Shipped X resulting in Y%"
                      className="flex-1 h-10 px-3 rounded-md bg-background border border-border outline-none focus:border-gold text-sm"
                    />
                    <button onClick={() => upd(i, { bullets: item.bullets.filter((_, x) => x !== bi) })} className="px-2 text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={() => upd(i, { bullets: [...(item.bullets || []), ""] })} className="text-xs text-gold inline-flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add bullet
                </button>
              </div>
            </>
          )}

          {kind === "education" && (
            <div className="grid md:grid-cols-2 gap-3">
              <Input label="Degree" value={item.degree} onChange={(e) => upd(i, { degree: e.target.value })} />
              <Input label="School" value={item.school} onChange={(e) => upd(i, { school: e.target.value })} />
              <Input label="Location" value={item.location} onChange={(e) => upd(i, { location: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Start" value={item.startDate} onChange={(e) => upd(i, { startDate: e.target.value })} />
                <Input label="End" value={item.endDate} onChange={(e) => upd(i, { endDate: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Textarea label="Details (optional)" value={item.details} onChange={(e) => upd(i, { details: e.target.value })} />
              </div>
            </div>
          )}

          {kind === "projects" && (
            <div className="grid md:grid-cols-2 gap-3">
              <Input label="Project name" value={item.name} onChange={(e) => upd(i, { name: e.target.value })} />
              <Input label="Tech stack" value={item.tech} onChange={(e) => upd(i, { tech: e.target.value })} />
              <Input label="Link" value={item.link} onChange={(e) => upd(i, { link: e.target.value })} />
              <div className="md:col-span-2">
                <Textarea label="Description" value={item.description} onChange={(e) => upd(i, { description: e.target.value })} />
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={add} className="w-full py-3 rounded-lg border border-dashed border-border hover:border-gold/50 hover:text-gold text-sm inline-flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" /> Add {kind.replace(/s$/, "")}
      </button>
    </div>
  );
}

function SkillsStep({ value, onChange }) {
  const [input, setInput] = useState("");
  const add = () => {
    const trimmed = input.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInput("");
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="Add a skill and press Enter"
          className="flex-1 h-10 px-3 rounded-md bg-card border border-border outline-none focus:border-gold text-sm"
        />
        <button onClick={add} className="px-4 rounded-md bg-gold text-ink text-sm font-medium">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((s, i) => (
          <span key={i} className="px-3 py-1 rounded-full bg-muted text-sm inline-flex items-center gap-2">
            {s}
            <button onClick={() => onChange(value.filter((_, x) => x !== i))} className="text-muted-foreground hover:text-destructive">×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

function CSVStep({ label, value, onChange, placeholder }) {
  return (
    <Textarea
      label={`${label} (one per line)`}
      value={(value || []).join("\n")}
      onChange={(e) => onChange(e.target.value.split("\n").map((x) => x.trim()).filter(Boolean))}
      placeholder={placeholder}
    />
  );
}

function ExtrasStep({ data, onChange }) {
  return (
    <div className="space-y-5">
      <CSVStep label="Achievements" value={data.achievements} onChange={(v) => onChange({ achievements: v })} placeholder="Increased revenue by 30%" />
      <CSVStep label="Awards" value={data.awards} onChange={(v) => onChange({ awards: v })} placeholder="Employee of the Year — 2023" />
      <CSVStep label="Trainings" value={data.trainings} onChange={(v) => onChange({ trainings: v })} />
      <CSVStep label="Interests" value={data.interests} onChange={(v) => onChange({ interests: v })} placeholder="Cycling, jazz" />
      <CSVStep label="Hobbies" value={data.hobbies} onChange={(v) => onChange({ hobbies: v })} />
    </div>
  );
}
