import { createFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useSettings } from "@/context/SettingsContext.jsx";
import { useResumes } from "@/context/ResumeContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, update, toggleTheme } = useSettings();
  const { resumes } = useResumes();
  const { user } = useAuth();

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ user: user?.email, resumes }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `lumen-export-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <h1 className="font-display text-4xl">Settings</h1>

      <Card title="Appearance">
        <Row label="Dark mode" description="Switch between dark and light themes.">
          <Toggle checked={settings.theme === "dark"} onChange={toggleTheme} />
        </Row>
      </Card>

      <Card title="Preferences">
        <Row label="Language" description="Currently the UI is English only.">
          <select
            value={settings.language}
            onChange={(e) => update({ language: e.target.value })}
            className="h-9 px-3 rounded-md bg-background border border-border text-sm"
          >
            <option value="en">English</option>
            <option value="es" disabled>Español (soon)</option>
            <option value="fr" disabled>Français (soon)</option>
          </select>
        </Row>
        <Row label="Notifications" description="In-app toast notifications.">
          <Toggle checked={settings.notifications} onChange={(v) => update({ notifications: v })} />
        </Row>
        <Row label="Auto-save" description="Save every 10 seconds while editing.">
          <Toggle checked={settings.autoSave} onChange={(v) => update({ autoSave: v })} />
        </Row>
      </Card>

      <Card title="Privacy & data">
        <Row label="Export data" description="Download a JSON backup of all your résumés.">
          <button onClick={exportData} className="px-3 h-9 rounded-md border border-border hover:bg-muted text-sm">Export</button>
        </Row>
      </Card>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <section className="p-6 rounded-xl border border-border bg-card">
      <h2 className="font-display text-xl mb-4">{title}</h2>
      <div className="divide-y divide-border">{children}</div>
    </section>
  );
}

function Row({ label, description, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-gold" : "bg-muted"}`}
      aria-pressed={checked}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
    </button>
  );
}
