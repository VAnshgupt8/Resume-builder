import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FilePlus2, FileText, LayoutTemplate, ShieldCheck,
  Sparkles, Download, User, Settings, FileSearch,
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resumes/new", label: "Create Resume", icon: FilePlus2 },
  { to: "/resumes", label: "My Resumes", icon: FileText },
  { to: "/templates", label: "Templates", icon: LayoutTemplate },
  { to: "/ats", label: "ATS Checker", icon: ShieldCheck },
  { to: "/ai", label: "AI Assistant", icon: Sparkles },
  { to: "/downloads", label: "Downloads", icon: Download },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md gold-gradient flex items-center justify-center">
            <FileSearch className="w-4 h-4 text-ink" />
          </div>
          <span className="font-display text-xl">Lumen</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((it) => {
          const active = path === it.to || (it.to !== "/dashboard" && path.startsWith(it.to));
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-gold rounded-r"
                />
              )}
              <Icon className="w-4 h-4 shrink-0" />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border text-xs text-muted-foreground">
        v1.0 · Editorial
      </div>
    </aside>
  );
}
