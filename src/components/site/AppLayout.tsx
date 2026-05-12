import { Bell, ChevronsUpDown, ShieldCheck, Settings, LogOut, Loader2 } from "lucide-react";
import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import { useAuth, type Role } from "@/lib/auth";
import { Navbar } from "./Navbar";
import {
  LayoutDashboard, Briefcase, FileText, ScanLine, BadgeCheck, MessageSquare,
  Users, BarChart3, Building2, Flag
} from "lucide-react";
import { type ReactNode, useState, useEffect } from "react";
import { apiFetchNotifications, apiMarkNotificationRead } from "@/lib/api";
import { FloatingAssistant } from "./FloatingAssistant";
import { toast } from "sonner";

type Item = { to: string; label: string; icon: ReactNode };

const userNav: Item[] = [
  { to: "/dashboard", label: "Overview", icon: <LayoutDashboard className="size-4" /> },
  { to: "/jobs", label: "Jobs", icon: <Briefcase className="size-4" /> },
  { to: "/applications", label: "Applications", icon: <FileText className="size-4" /> },
  { to: "/resume-analysis", label: "Resume ATS", icon: <ScanLine className="size-4" /> },
  { to: "/certificate-check", label: "Certificates", icon: <BadgeCheck className="size-4" /> },
  { to: "/chatbot", label: "AI Assistant", icon: <MessageSquare className="size-4" /> },
];
const recruiterNav: Item[] = [
  { to: "/recruiter/dashboard", label: "Overview", icon: <LayoutDashboard className="size-4" /> },
  { to: "/recruiter/jobs", label: "Jobs & Internships", icon: <Briefcase className="size-4" /> },
  { to: "/recruiter/applicants", label: "Applicants", icon: <Users className="size-4" /> },
  { to: "/recruiter/analytics", label: "Analytics", icon: <BarChart3 className="size-4" /> },
];
const adminNav: Item[] = [
  { to: "/admin/dashboard", label: "Overview", icon: <LayoutDashboard className="size-4" /> },
  { to: "/admin/recruiters", label: "Recruiters", icon: <Building2 className="size-4" /> },
  { to: "/admin/jobs", label: "Jobs Moderation", icon: <Briefcase className="size-4" /> },
  { to: "/admin/reports", label: "Reports", icon: <Flag className="size-4" /> },
  { to: "/admin/analytics", label: "Analytics", icon: <BarChart3 className="size-4" /> },
];

export function AppLayout() {
  const { role, name, email, logout } = useAuth();
  const path = useRouterState({ select: s => s.location.pathname });
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = () => {
    apiFetchNotifications()
      .then(setNotifs)
      .catch(() => {});
  };

  const handleMarkRead = async (id: string) => {
    try {
      await apiMarkNotificationRead(id);
      setNotifs(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {}
  };

  const effectiveRole: Role = role ?? "user";
  const nav = effectiveRole === "admin" ? adminNav : effectiveRole === "recruiter" ? recruiterNav : userNav;
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
          <div className="rounded-xl border border-border bg-card p-3 shadow-card sticky top-20">
            <div className="px-2 pb-3 border-b border-border mb-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Signed in as</div>
              <div className="text-sm font-semibold truncate mt-1">{name || "User"}</div>
              <div className="text-[11px] text-muted-foreground truncate">{email}</div>
            </div>
            <nav className="space-y-1">
              {nav.map(item => {
                const active = path === item.to;
                return (
                  <Link key={item.to} to={item.to} className={`flex items-center gap-2 px-2.5 py-2 text-sm rounded-md transition-colors ${active ? "bg-primary text-primary-foreground font-medium shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                    {item.icon}{item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 pt-4 border-t border-border">
              <button onClick={logout} className="flex items-center gap-2 px-2.5 py-2 text-sm rounded-md text-destructive hover:bg-destructive/10 w-full transition-colors">
                <LogOut className="size-4" /> Sign Out
              </button>
            </div>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-9 xl:col-span-10 space-y-6 min-h-[calc(100vh-120px)]">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border">
              {effectiveRole === "admin" ? "Admin Console" : effectiveRole === "recruiter" ? "Recruiter Workspace" : "Candidate Dashboard"}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button onClick={() => setNotifOpen(o => !o)} className="relative size-10 rounded-full border border-border bg-card grid place-items-center hover:bg-muted transition-all">
                  <Bell className="size-4" />
                  {unreadCount > 0 && <span className="absolute top-2 right-2 size-2.5 rounded-full bg-destructive border-2 border-card animate-pulse" />}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-border bg-card shadow-elevated z-50 overflow-hidden animate-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                      <span className="text-sm font-semibold">Notifications</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{unreadCount} New</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y divide-border">
                      {notifs.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground text-xs">No notifications yet.</div>
                      ) : (
                        notifs.map(n => (
                          <div key={n._id} onClick={() => handleMarkRead(n._id)} className={`px-4 py-4 text-sm hover:bg-muted/50 cursor-pointer transition-colors ${n.read ? 'opacity-60' : 'bg-primary/5'}`}>
                            <div className="flex items-start gap-3">
                              <span className={`mt-1.5 size-2 rounded-full shrink-0 ${n.type === "error" ? "bg-destructive" : n.type === "success" ? "bg-success" : "bg-primary"}`} />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-xs leading-none">{n.title}</div>
                                <div className="text-muted-foreground text-[11px] mt-1.5 leading-relaxed">{n.message}</div>
                                <div className="text-[9px] text-muted-foreground/50 mt-2">{new Date(n.createdAt).toLocaleString()}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button className="size-10 rounded-full border border-border bg-card grid place-items-center hover:bg-muted">
                <Settings className="size-4" />
              </button>
            </div>
          </div>
          <div className="pb-20">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Persistent Global Assistant */}
      <FloatingAssistant />
    </div>
  );
}
