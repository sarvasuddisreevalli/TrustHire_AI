import { Link, useRouterState } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function Navbar() {
  const { role, logout } = useAuth();
  const path = useRouterState({ select: s => s.location.pathname });

  const link = (to: string, label: string) => (
    <Link to={to} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${path === to ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>{label}</Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto max-w-7xl glass rounded-2xl px-6 h-16 flex items-center justify-between shadow-card">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="size-9 rounded-xl bg-gradient-brand grid place-items-center text-primary-foreground shadow-card group-hover:scale-105 transition-transform">
            <ShieldCheck className="size-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">TrustHire <span className="text-gradient">AI</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {link("/", "Home")}
          {link("/about", "About")}
          {link("/contact", "Contact")}
          {role === "admin" && link("/admin/dashboard", "Admin")}
          {role === "recruiter" && link("/recruiter/dashboard", "Recruiter")}
          {role === "user" && link("/dashboard", "Dashboard")}
        </nav>
        <div className="flex items-center gap-3">
          {!role ? (
            <>
              <Link to="/login" className="hidden sm:block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
              <Link to="/register" className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-brand text-primary-foreground shadow-card hover:opacity-90 active:scale-95 transition-all">Get started</Link>
            </>
          ) : (
            <button onClick={logout} className="px-4 py-2 text-sm font-medium rounded-xl border border-border hover:bg-muted transition-colors">Sign out</button>
          )}
        </div>
      </div>
    </header>
  );
}

