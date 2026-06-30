import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

const DEFAULTS = {
  theme: "dark",
  language: "en",
  notifications: true,
  autoSave: true,
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lumen_settings");
      if (stored) setSettings({ ...DEFAULTS, ...JSON.parse(stored) });
      const theme = localStorage.getItem("lumen_theme") || "dark";
      setSettings((s) => ({ ...s, theme }));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("lumen_settings", JSON.stringify(settings));
    localStorage.setItem("lumen_theme", settings.theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(settings.theme);
  }, [settings, hydrated]);

  const update = (patch) => setSettings((s) => ({ ...s, ...patch }));
  const toggleTheme = () => update({ theme: settings.theme === "dark" ? "light" : "dark" });

  return (
    <SettingsContext.Provider value={{ settings, update, toggleTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be inside SettingsProvider");
  return ctx;
};
