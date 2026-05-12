import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — TrustHire AI" }] }),
  component: Register,
});

function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const form = new FormData(e.currentTarget as HTMLFormElement);
      await register({
        name: String(form.get("name")),
        email: String(form.get("email")),
        password: String(form.get("password")),
        role: "user",
      });
      toast.success("Welcome to TrustHire AI!");
      nav({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Registration failed");
      toast.error(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground">Free forever for job seekers.</p>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div><label className="text-sm font-medium">Full name</label><input name="name" required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Jane Cooper" /></div>
            <div><label className="text-sm font-medium">Email</label><input name="email" type="email" required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="you@email.com" /></div>
            <div><label className="text-sm font-medium">Password</label><input name="password" type="password" required minLength={6} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Min 6 characters" /></div>
            <button disabled={submitting} className="w-full px-4 py-2.5 rounded-md bg-gradient-brand text-primary-foreground shadow-card disabled:opacity-50 inline-flex items-center justify-center gap-2">
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? "Creating…" : "Create account"}
            </button>
          </form>
          <div className="mt-5 text-sm text-center text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link>
          </div>
          <div className="mt-3 text-sm text-center text-muted-foreground">
            Are you a recruiter? <Link to="/recruiter-register" className="text-primary font-medium">Apply for verification</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
