import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext.jsx";
import { useSettings } from "@/context/SettingsContext.jsx";
import { Moon, Sun, LogOut, User, Menu } from "lucide-react";

export default function Navbar({ onMenu }) {
  const { user, logout } = useAuth();
  const { settings, toggleTheme } = useSettings();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="h-full px-4 lg:px-6 flex items-center gap-3">
        <button
          onClick={onMenu}
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/dashboard" className="lg:hidden font-display text-xl">Lumen</Link>

        <div className="hidden md:flex items-center gap-1 ml-2 text-sm">
          <Link to="/dashboard" className="px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground" activeProps={{ className: "px-3 py-1.5 rounded-md bg-muted text-foreground" }}>Dashboard</Link>
          <Link to="/templates" className="px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground" activeProps={{ className: "px-3 py-1.5 rounded-md bg-muted text-foreground" }}>Templates</Link>
          <Link to="/resumes" className="px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground" activeProps={{ className: "px-3 py-1.5 rounded-md bg-muted text-foreground" }}>My Resumes</Link>
          <Link to="/ai" className="px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground" activeProps={{ className: "px-3 py-1.5 rounded-md bg-muted text-foreground" }}>AI Assistant</Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {settings.theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-muted"
            >
              <div className="w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-ink text-xs font-semibold">
                {user?.username?.[0]?.toUpperCase() || "L"}
              </div>
              <span className="text-sm hidden sm:block">{user?.username}</span>
            </button>
            {open && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card shadow-lg z-50 py-1">
                  <button
                    onClick={() => { setOpen(false); navigate({ to: "/profile" }); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted text-left"
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button
                    onClick={() => { setOpen(false); navigate({ to: "/settings" }); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted text-left"
                  >
                    <User className="w-4 h-4" /> Settings
                  </button>
                  <div className="h-px bg-border my-1" />
                  <button
                    onClick={() => { setOpen(false); logout(); navigate({ to: "/login" }); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted text-destructive text-left"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
