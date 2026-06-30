import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const ResumeContext = createContext(null);
const KEY = (uid) => `lumen_resumes_${uid}`;

export const EMPTY_RESUME = {
  title: "Untitled Resume",
  template: "editorial",
  status: "draft",
  personal: { fullName: "", role: "", email: "", phone: "", location: "", website: "", linkedin: "", photo: "" },
  objective: "",
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: [],
  languages: [],
  certifications: [],
  achievements: [],
  awards: [],
  internships: [],
  trainings: [],
  interests: [],
  hobbies: [],
  references: [],
  customSections: [],
};

export function ResumeProvider({ children }) {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    if (!user) { setResumes([]); setActivity([]); return; }
    try {
      const raw = localStorage.getItem(KEY(user.id));
      const data = raw ? JSON.parse(raw) : { resumes: [], activity: [] };
      setResumes(data.resumes || []);
      setActivity(data.activity || []);
    } catch {
      setResumes([]); setActivity([]);
    }
  }, [user]);

  const persist = (next, nextActivity) => {
    if (!user) return;
    const finalActivity = nextActivity ?? activity;
    localStorage.setItem(KEY(user.id), JSON.stringify({ resumes: next, activity: finalActivity }));
    setResumes(next);
    if (nextActivity) setActivity(nextActivity);
  };

  const logActivity = (entry) => {
    const next = [{ id: crypto.randomUUID(), at: Date.now(), ...entry }, ...activity].slice(0, 30);
    setActivity(next);
    if (user) localStorage.setItem(KEY(user.id), JSON.stringify({ resumes, activity: next }));
  };

  const createResume = (partial = {}) => {
    const r = {
      ...EMPTY_RESUME,
      ...partial,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      atsScore: 0,
    };
    const next = [r, ...resumes];
    const act = [{ id: crypto.randomUUID(), at: Date.now(), type: "create", label: `Created "${r.title}"` }, ...activity].slice(0, 30);
    persist(next, act);
    return r;
  };

  const updateResume = (id, patch) => {
    const next = resumes.map((r) => (r.id === id ? { ...r, ...patch, updatedAt: Date.now() } : r));
    persist(next);
  };

  const deleteResume = (id) => {
    const r = resumes.find((x) => x.id === id);
    const next = resumes.filter((x) => x.id !== id);
    const act = r ? [{ id: crypto.randomUUID(), at: Date.now(), type: "delete", label: `Deleted "${r.title}"` }, ...activity].slice(0, 30) : activity;
    persist(next, act);
  };

  const duplicateResume = (id) => {
    const r = resumes.find((x) => x.id === id);
    if (!r) return null;
    const copy = { ...r, id: crypto.randomUUID(), title: `${r.title} (Copy)`, createdAt: Date.now(), updatedAt: Date.now() };
    const next = [copy, ...resumes];
    persist(next);
    return copy;
  };

  const getResume = (id) => resumes.find((r) => r.id === id) || null;

  return (
    <ResumeContext.Provider
      value={{ resumes, activity, createResume, updateResume, deleteResume, duplicateResume, getResume, logActivity }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResumes = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResumes must be inside ResumeProvider");
  return ctx;
};
