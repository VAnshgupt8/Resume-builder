import { useState, useEffect, useCallback } from "react";
const THEME_KEY = "continuum_theme";
function getSystemTheme() {
    if (typeof window === "undefined")
        return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
    if (typeof document === "undefined")
        return;
    const resolved = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.classList.toggle("dark", resolved === "dark");
}
export function useTheme() {
    const [theme, setThemeState] = useState(() => {
        if (typeof window === "undefined")
            return "light";
        return localStorage.getItem(THEME_KEY) || "light";
    });
    const setTheme = useCallback((t) => {
        setThemeState(t);
        localStorage.setItem(THEME_KEY, t);
        applyTheme(t);
    }, []);
    useEffect(() => {
        applyTheme(theme);
        if (theme === "system") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = () => applyTheme("system");
            mq.addEventListener("change", handler);
            return () => mq.removeEventListener("change", handler);
        }
    }, [theme]);
    const resolved = theme === "system" ? getSystemTheme() : theme;
    return { theme, resolved, setTheme };
}
