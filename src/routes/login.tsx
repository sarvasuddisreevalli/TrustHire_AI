import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — TrustHire AI" }] }),
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { role } = await login(email, password);
      toast.success(`Signed in successfully`);
      if (role === "admin") nav({ to: "/admin/dashboard" });
      else if (role === "recruiter") nav({ to: "/recruiter/dashboard" });
      else nav({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="size-4 text-success" /> Secure sign-in</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your TrustHire workspace.</p>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required
                placeholder="you@email.com"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <button disabled={submitting}
              className="w-full px-4 py-2.5 rounded-md bg-gradient-brand text-primary-foreground shadow-card disabled:opacity-50 inline-flex items-center justify-center gap-2">
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-border bg-secondary/40 p-4">
            <div className="text-xs font-medium text-muted-foreground mb-2">Demo credentials:</div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div><span className="font-medium text-foreground">Admin:</span> admin@trusthire.ai / admin123</div>
              <div><span className="font-medium text-foreground">User:</span> jane@trusthire.ai / password123</div>
              <div><span className="font-medium text-foreground">Recruiter:</span> lena@linearlabs.io / password123</div>
            </div>
          </div>

          <div className="mt-5 text-sm text-center text-muted-foreground">
            New here? <Link to="/register" className="text-primary font-medium">Create an account</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
