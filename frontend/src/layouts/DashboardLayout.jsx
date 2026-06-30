import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar.jsx";
import Navbar from "@/components/Navbar.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FilePlus2, FileText, LayoutTemplate, ShieldCheck,
  Sparkles, Download, User, Settings,
} from "lucide-react";

const mobileItems = [
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

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => { setMobileOpen(false); }, [path]);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login", search: { redirect: path } });
  }, [user, loading, navigate, path]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar />

      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-50 lg:hidden flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
              <span className="font-display text-xl">Lumen</span>
              <button onClick={() => setMobileOpen(false)} className="p-2"><X className="w-4 h-4" /></button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {mobileItems.map((it) => {
                const Icon = it.icon;
                const active = path === it.to || (it.to !== "/dashboard" && path.startsWith(it.to));
                return (
                  <Link key={it.to} to={it.to} className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70"}`}>
                    <Icon className="w-4 h-4" /> {it.label}
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
