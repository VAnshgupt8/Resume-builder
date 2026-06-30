import { forwardRef } from "react";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

// Editorial (default) template — premium, ATS-friendly
const EditorialTemplate = forwardRef(function EditorialTemplate({ resume }, ref) {
  const { personal = {}, summary, objective, experience = [], education = [],
    skills = [], projects = [], certifications = [], languages = [],
    achievements = [], awards = [], internships = [], trainings = [],
    interests = [], hobbies = [], references = [], customSections = [] } = resume || {};

  return (
    <div ref={ref} className="resume-paper bg-white text-neutral-900 mx-auto" style={{ width: "210mm", minHeight: "297mm", padding: "16mm 14mm", fontFamily: "'Fira Sans', system-ui, sans-serif", fontSize: "10.5pt", lineHeight: 1.5 }}>
      {/* Header */}
      <header className="border-b-2 border-neutral-900 pb-4 mb-5">
        <div className="flex items-start gap-5">
          {personal.photo && (
            <img src={personal.photo} alt="" className="w-20 h-20 rounded-full object-cover border border-neutral-300 shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "26pt", lineHeight: 1.1, marginBottom: 4 }}>
              {personal.fullName || "Your Name"}
            </h1>
            {personal.role && (
              <p style={{ fontSize: "10pt", letterSpacing: "0.18em", textTransform: "uppercase", color: "#525252" }}>
                {personal.role}
              </p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[9pt] text-neutral-700">
              {personal.email && <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3" /> {personal.email}</span>}
              {personal.phone && <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> {personal.phone}</span>}
              {personal.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {personal.location}</span>}
              {personal.website && <span className="inline-flex items-center gap-1"><Globe className="w-3 h-3" /> {personal.website}</span>}
              {personal.linkedin && <span className="inline-flex items-center gap-1"><Linkedin className="w-3 h-3" /> {personal.linkedin}</span>}
            </div>
          </div>
        </div>
      </header>

      <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Main column */}
        <div>
          {(summary || objective) && (
            <Section title={summary ? "Professional Summary" : "Career Objective"}>
              <p>{summary || objective}</p>
            </Section>
          )}

          {experience.length > 0 && (
            <Section title="Experience">
              {experience.map((e) => (
                <Entry key={e.id} title={e.role} subtitle={e.company} meta={`${e.startDate || ""}${e.endDate ? ` — ${e.endDate}` : (e.startDate ? " — Present" : "")}`} location={e.location}>
                  {(e.bullets || []).length > 0 && (
                    <ul className="list-disc pl-4 mt-1 space-y-0.5">
                      {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </Entry>
              ))}
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects">
              {projects.map((p) => (
                <Entry key={p.id} title={p.name} subtitle={p.tech} meta={p.link}>
                  {p.description && <p className="mt-0.5">{p.description}</p>}
                </Entry>
              ))}
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Education">
              {education.map((ed) => (
                <Entry key={ed.id} title={ed.degree} subtitle={ed.school} meta={`${ed.startDate || ""}${ed.endDate ? ` — ${ed.endDate}` : ""}`} location={ed.location}>
                  {ed.details && <p className="mt-0.5">{ed.details}</p>}
                </Entry>
              ))}
            </Section>
          )}

          {internships.length > 0 && (
            <Section title="Internships">
              {internships.map((it) => (
                <Entry key={it.id} title={it.role} subtitle={it.company} meta={`${it.startDate || ""}${it.endDate ? ` — ${it.endDate}` : ""}`}>
                  {it.description && <p className="mt-0.5">{it.description}</p>}
                </Entry>
              ))}
            </Section>
          )}

          {customSections.map((cs) => (
            <Section key={cs.id} title={cs.title || "Custom"}>
              <p style={{ whiteSpace: "pre-wrap" }}>{cs.content}</p>
            </Section>
          ))}
        </div>

        {/* Side column */}
        <div>
          {skills.length > 0 && (
            <Section title="Skills">
              <div className="flex flex-wrap gap-1">
                {skills.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 border border-neutral-300 rounded-sm text-[9pt]">{s}</span>
                ))}
              </div>
            </Section>
          )}

          {languages.length > 0 && (
            <Section title="Languages">
              <ul className="space-y-0.5">
                {languages.map((l, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{l.name}</span>
                    {l.level && <span className="text-neutral-600">{l.level}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {certifications.length > 0 && (
            <Section title="Certifications">
              <ul className="space-y-1">
                {certifications.map((c) => (
                  <li key={c.id}>
                    <p className="font-medium">{c.name}</p>
                    {c.issuer && <p className="text-neutral-600 text-[9pt]">{c.issuer}{c.date ? ` · ${c.date}` : ""}</p>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {achievements.length > 0 && (
            <Section title="Achievements">
              <ul className="list-disc pl-4 space-y-0.5">{achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
            </Section>
          )}
          {awards.length > 0 && (
            <Section title="Awards">
              <ul className="list-disc pl-4 space-y-0.5">{awards.map((a, i) => <li key={i}>{a}</li>)}</ul>
            </Section>
          )}
          {trainings.length > 0 && (
            <Section title="Trainings">
              <ul className="list-disc pl-4 space-y-0.5">{trainings.map((a, i) => <li key={i}>{a}</li>)}</ul>
            </Section>
          )}
          {interests.length > 0 && (
            <Section title="Interests">
              <p>{interests.join(", ")}</p>
            </Section>
          )}
          {hobbies.length > 0 && (
            <Section title="Hobbies">
              <p>{hobbies.join(", ")}</p>
            </Section>
          )}
          {references.length > 0 && (
            <Section title="References">
              <ul className="space-y-1">
                {references.map((r) => (
                  <li key={r.id}>
                    <p className="font-medium">{r.name}</p>
                    {r.title && <p className="text-neutral-600 text-[9pt]">{r.title}</p>}
                    {r.contact && <p className="text-neutral-600 text-[9pt]">{r.contact}</p>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
});

function Section({ title, children }) {
  return (
    <section className="mb-5 break-inside-avoid">
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "13pt", borderBottom: "1px solid #d4d4d4", paddingBottom: 3, marginBottom: 6 }}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function Entry({ title, subtitle, meta, location, children }) {
  return (
    <div className="mb-3 break-inside-avoid">
      <div className="flex justify-between gap-3 flex-wrap">
        <div>
          {title && <p className="font-semibold">{title}</p>}
          {subtitle && <p className="text-neutral-700">{subtitle}{location ? ` · ${location}` : ""}</p>}
        </div>
        {meta && <p className="text-neutral-600 text-[9pt]">{meta}</p>}
      </div>
      {children}
    </div>
  );
}

export default EditorialTemplate;
