import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, CheckCircle2, Loader2, Clock } from "lucide-react";

export const Route = createFileRoute("/recruiter-register")({
  head: () => ({ meta: [{ title: "Recruiter Verification — TrustHire AI" }] }),
  component: RecRegister,
});

function RecRegister() {
  const { register } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const f = new FormData(e.currentTarget as HTMLFormElement);
      await register({
        name: String(f.get("hr")),
        email: String(f.get("email")),
        password: String(f.get("password")),
        role: "recruiter",
        company: String(f.get("company")),
        website: String(f.get("website")),
        linkedin: String(f.get("linkedin")),
        registrationId: String(f.get("reg")),
        phone: String(f.get("phone")),
      });
      setSubmitted(true);
      toast.success("Application submitted — pending AI verification & admin approval");
    } catch (err: any) {
      setError(err.message || "Registration failed");
      toast.error(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <Navbar />
        <section className="mx-auto max-w-lg px-6 py-20 text-center">
          <div className="rounded-2xl border border-border bg-card p-10 shadow-elevated">
            <div className="size-16 rounded-2xl bg-primary/10 text-primary grid place-items-center mx-auto"><Clock className="size-7" /></div>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight">Application Submitted</h1>
            <p className="mt-3 text-muted-foreground max-w-sm mx-auto">Your recruiter application is being verified by our AI engine. An admin will review and approve your account within 24 hours.</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-success/20 bg-success/10 p-3">
                <CheckCircle2 className="size-4 text-success mx-auto" />
                <div className="text-xs text-success mt-1">Step 1: Submitted</div>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/10 p-3">
                <Loader2 className="size-4 text-primary mx-auto animate-spin" />
                <div className="text-xs text-primary mt-1">Step 2: AI Review</div>
              </div>
              <div className="rounded-lg border border-border bg-secondary/40 p-3">
                <ShieldCheck className="size-4 text-muted-foreground mx-auto" />
                <div className="text-xs text-muted-foreground mt-1">Step 3: Admin</div>
              </div>
            </div>
            <Link to="/login" className="mt-6 inline-flex px-5 py-2.5 rounded-md bg-gradient-brand text-primary-foreground shadow-card">Go to Sign In</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="text-xs uppercase tracking-wider text-primary">For recruiters</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Get your TrustHire verification badge</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Our AI verifies your domain, LinkedIn, registration records, and team metadata. Most recruiters are approved within 24 hours.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-3 text-sm">
          {["Domain age & DNS check", "LinkedIn presence match", "Company registration cross-check", "Email deliverability", "Metadata consistency", "Past activity signals"].map(x => (
            <div key={x} className="rounded-lg border border-border bg-card p-3 flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />{x}</div>
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
        )}

        <form onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-card grid md:grid-cols-2 gap-5">
          <Field name="company" label="Company name" placeholder="Linear Labs" />
          <Field name="hr" label="HR name" placeholder="Lena Park" />
          <Field name="email" label="Official email" type="email" placeholder="hr@company.com" />
          <Field name="phone" label="Contact number" placeholder="+1 415 555 0142" />
          <Field name="website" label="Website" placeholder="https://company.com" />
          <Field name="reg" label="Company registration ID" placeholder="GST / MCA / EIN" />
          <Field name="linkedin" label="LinkedIn profile" placeholder="https://linkedin.com/in/..." />
          <Field name="password" label="Password" type="password" placeholder="Min 6 characters" />
          <button disabled={submitting} className="md:col-span-2 px-4 py-2.5 rounded-md bg-gradient-brand text-primary-foreground shadow-card inline-flex items-center justify-center gap-2 disabled:opacity-50">
            {submitting ? <><Loader2 className="size-4 animate-spin" /> Verifying…</> : <><ShieldCheck className="size-4" /> Submit for AI verification</>}
          </button>
        </form>

        <div className="mt-5 text-sm text-center text-muted-foreground">
          Already verified? <Link to="/login" className="text-primary font-medium">Sign in</Link>
        </div>
      </section>
    </div>
  );
}

function Field({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input name={name} type={type} required placeholder={placeholder} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
    </div>
  );
}
