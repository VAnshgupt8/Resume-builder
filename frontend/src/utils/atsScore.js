// Lightweight heuristic ATS score (0-100). No external calls — runs locally.
export function computeAtsScore(resume) {
  if (!resume) return 0;
  let score = 0;
  const { personal = {}, summary, experience = [], education = [], skills = [], projects = [] } = resume;
  if (personal.fullName) score += 8;
  if (personal.email && /@/.test(personal.email)) score += 8;
  if (personal.phone) score += 6;
  if (personal.location) score += 4;
  if (personal.linkedin) score += 4;
  if (summary && summary.length > 60) score += 14;
  if (experience.length >= 1) score += 12;
  if (experience.length >= 2) score += 6;
  if (experience.some((e) => (e.bullets || []).length >= 2)) score += 6;
  if (education.length >= 1) score += 10;
  if (skills.length >= 5) score += 10;
  if (skills.length >= 10) score += 4;
  if (projects.length >= 1) score += 6;
  if ((summary || "").split(/\s+/).length > 40) score += 2;
  return Math.min(100, score);
}

export function atsSuggestions(resume) {
  const tips = [];
  if (!resume) return tips;
  const { personal = {}, summary, experience = [], skills = [] } = resume;
  if (!personal.fullName) tips.push("Add your full name.");
  if (!personal.email) tips.push("Add a contact email.");
  if (!personal.phone) tips.push("Add a phone number.");
  if (!summary || summary.length < 60) tips.push("Write a professional summary (60+ characters).");
  if (experience.length === 0) tips.push("Add at least one work experience entry.");
  if (experience.some((e) => !(e.bullets || []).length)) tips.push("Add bullet points to your experience to highlight impact.");
  if (skills.length < 5) tips.push("List at least 5 skills.");
  return tips;
}
