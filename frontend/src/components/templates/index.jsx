import EditorialTemplate from "./EditorialTemplate.jsx";

export const TEMPLATES = [
  { id: "editorial", name: "Editorial", description: "Serif headings, two-column layout, premium magazine feel.", category: "Modern", ats: true },
  { id: "modern", name: "Modern", description: "Coming next slice.", category: "Modern", ats: true, comingSoon: true },
  { id: "classic", name: "Classic", description: "Coming next slice.", category: "Classic", ats: true, comingSoon: true },
  { id: "minimal", name: "Minimal", description: "Coming next slice.", category: "Minimal", ats: true, comingSoon: true },
  { id: "corporate", name: "Corporate", description: "Coming next slice.", category: "Corporate", ats: true, comingSoon: true },
  { id: "creative", name: "Creative", description: "Coming next slice.", category: "Creative", ats: false, comingSoon: true },
];

export function renderTemplate(id, props) {
  switch (id) {
    case "editorial":
    default:
      return <EditorialTemplate {...props} />;
  }
}

export { EditorialTemplate };
