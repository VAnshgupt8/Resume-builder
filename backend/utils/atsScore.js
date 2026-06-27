    const calculateATSScore = (resume) => {

  let score = 0;

  // Personal Details
  if (
    resume.personal?.fullName &&
    resume.personal?.email &&
    resume.personal?.phone
  ) {
    score += 15;
  }

  // Summary
  if (
    resume.summary &&
    resume.summary.length > 50
  ) {
    score += 15;
  }

  // Skills
  if (
    resume.skills &&
    resume.skills.length >= 5
  ) {
    score += 20;
  }

  // Education
  if (
    resume.education &&
    resume.education.length > 0
  ) {
    score += 15;
  }

  // Experience
  if (
    resume.experience &&
    resume.experience.length > 0
  ) {
    score += 15;
  }

  // Projects
  if (
    resume.projects &&
    resume.projects.length >= 2
  ) {
    score += 20;
  }

  return Math.min(score, 100);
};

module.exports = calculateATSScore;