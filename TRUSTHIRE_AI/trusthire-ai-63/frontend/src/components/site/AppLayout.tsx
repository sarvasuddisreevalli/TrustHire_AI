import { Bell, ChevronsUpDown, ShieldCheck, Settings, LogOut, Loader2 } from "lucide-react";
import { Link, useRouterState, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
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
  const { role, name, email, logout, loading, token } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const path = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    // If not loading and no token, redirect to login unless on public jobs page
    if (!loading && !token && location.pathname !== "/jobs") {
      nav({ to: "/login" });
    }
  }, [loading, token, location.pathname, nav]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="text-center">
          <Loader2 className="size-10 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-sm text-muted-foreground animate-pulse">Initializing TrustLayer...</p>
        </div>
      </div>
    );
  }
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
  const navItems = effectiveRole === "admin" ? adminNav : effectiveRole === "recruiter" ? recruiterNav : userNav;
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-hero pointer-events-none opacity-50" />
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-12 gap-8 relative z-10">
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
          <div className="glass rounded-[2rem] p-4 shadow-card sticky top-28 border-white/40">
            <div className="px-4 pb-5 border-b border-border/50 mb-5 text-center">
              <div className="size-16 rounded-2xl bg-gradient-brand mx-auto mb-4 grid place-items-center text-primary-foreground text-2xl font-black shadow-card">
                {name?.[0] || "U"}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">Authenticated</div>
              <div className="text-sm font-black text-foreground truncate">{name || "User"}</div>
              <div className="text-[11px] font-medium text-muted-foreground truncate opacity-70 mt-0.5">{email}</div>
            </div>
            <nav className="space-y-1.5">
              {navItems.map((item: Item) => {
                const active = path === item.to;
                return (
                  <Link 
                    key={item.to} 
                    to={item.to} 
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-bold rounded-2xl transition-all duration-200 ${active ? "bg-gradient-brand text-primary-foreground shadow-card scale-[1.02]" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
                  >
                    <span className={active ? "text-white" : "text-primary"}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-8 pt-6 border-t border-border/50">
              <button 
                onClick={logout} 
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold rounded-2xl text-destructive hover:bg-destructive/5 w-full transition-all group"
              >
                <LogOut className="size-4 group-hover:-translate-x-1 transition-transform" /> Sign Out
              </button>
            </div>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-9 xl:col-span-10 space-y-8 min-h-[calc(100vh-140px)]">
          <header className="flex items-center justify-between">
            <div className="glass px-5 py-2 rounded-2xl border-white/40 shadow-sm flex items-center gap-3">
              <div className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-foreground/70">
                {effectiveRole === "admin" ? "Master Console" : effectiveRole === "recruiter" ? "Recruiter Workspace" : "Candidate Dashboard"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button 
                  onClick={() => setNotifOpen(o => !o)} 
                  className={`relative size-11 rounded-2xl border border-border/50 glass grid place-items-center hover:shadow-card transition-all ${notifOpen ? 'bg-primary/5 border-primary/20' : ''}`}
                >
                  <Bell className="size-5 text-foreground/70" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 -mr-1 -mt-1 size-4 rounded-full bg-destructive text-[8px] font-black text-white flex items-center justify-center border-2 border-background shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-4 w-96 glass rounded-[2rem] shadow-elevated z-50 overflow-hidden animate-in fade-in zoom-in-95 border-white/60">
                    <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-primary/5">
                      <span className="text-sm font-black text-foreground">Notifications</span>
                      <span className="text-[10px] bg-primary text-white px-3 py-1 rounded-full font-black tracking-widest uppercase">{unreadCount} New</span>
                    </div>
                    <div className="max-h-[32rem] overflow-y-auto divide-y divide-border/30">
                      {notifs.length === 0 ? (
                        <div className="p-12 text-center">
                          <Bell className="size-10 mx-auto text-muted-foreground/20 mb-4" />
                          <div className="text-xs font-bold text-muted-foreground">All caught up!</div>
                        </div>
                      ) : (
                        notifs.map(n => (
                          <div 
                            key={n._id} 
                            onClick={() => handleMarkRead(n._id)} 
                            className={`px-6 py-5 text-sm hover:bg-primary/5 cursor-pointer transition-colors ${n.read ? 'opacity-50' : 'bg-primary/[0.02]'}`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`mt-1 size-2.5 rounded-full shrink-0 shadow-sm ${n.type === "error" ? "bg-destructive" : n.type === "success" ? "bg-success" : "bg-primary"}`} />
                              <div className="flex-1 min-w-0">
                                <div className="font-black text-sm text-foreground leading-tight">{n.title}</div>
                                <div className="text-muted-foreground font-medium text-xs mt-2 leading-relaxed">{n.message}</div>
                                <div className="text-[10px] font-bold text-muted-foreground/40 mt-3 flex items-center gap-1.5 uppercase tracking-wider">
                                  <div className="size-1 rounded-full bg-muted-foreground/30" />
                                  {new Date(n.createdAt).toLocaleDateString()} · {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button className="size-11 rounded-2xl border border-border/50 glass grid place-items-center hover:shadow-card transition-all group">
                <Settings className="size-5 text-foreground/70 group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </header>

          <div className="pb-32">
            <Outlet />
          </div>
        </main>
      </div>

      <FloatingAssistant />
    </div>
  );
}

