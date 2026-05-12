import { Link, useRouterState } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function Navbar() {
  const { role, logout } = useAuth();
  const path = useRouterState({ select: s => s.location.pathname });

  const link = (to: string, label: string) => (
    <Link to={to} className={`px-3 py-2 text-sm rounded-md transition-colors ${path === to ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}>{label}</Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur bg-background/80">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground shadow-card">
            <ShieldCheck className="size-4" />
          </div>
          <span className="font-semibold tracking-tight">TrustHire <span className="text-gradient">AI</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {link("/", "Home")}
          {link("/about", "About")}
          {link("/contact", "Contact")}
          {role === "admin" && link("/admin/dashboard", "Admin Dashboard")}
          {role === "recruiter" && link("/recruiter/dashboard", "Recruiter Dashboard")}
          {role === "user" && link("/dashboard", "Dashboard")}
        </nav>
        <div className="flex items-center gap-2">
          {!role ? (
            <>
              <Link to="/login" className="px-4 py-2 text-sm rounded-md hover:bg-muted">Sign in</Link>
              <Link to="/register" className="px-4 py-2 text-sm rounded-md bg-gradient-brand text-primary-foreground shadow-card hover:opacity-95">Get started</Link>
            </>
          ) : (
            <button onClick={logout} className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted">Sign out</button>
          )}
        </div>
      </div>
    </header>
  );
}
