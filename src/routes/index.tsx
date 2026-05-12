import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, ScanLine, BadgeCheck, Bot, AlertTriangle, ArrowRight, CheckCircle2, Users, Building2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { GaugeMeter } from "@/components/site/GaugeMeter";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero */}
      <section className="relative bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs text-muted-foreground shadow-card">
              <Sparkles className="size-3.5 text-primary" /> AI Trust Layer for Hiring
            </motion.div>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Find <span className="text-gradient">Trusted Jobs.</span><br />
              Detect <span className="text-gradient">Fake Recruiters.</span><br />
              Apply with confidence.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              TrustHire AI scans every job, verifies every recruiter, scores your resume against any role, and authenticates certificates — so you never waste a click on a scam again.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-brand text-primary-foreground shadow-card hover:opacity-95">Start free <ArrowRight className="size-4" /></Link>
              <Link to="/jobs" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-card hover:bg-muted">Explore live demo</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />12,400+ jobs scanned daily</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />98.6% scam detection accuracy</span>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="relative">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Trust Analysis</div>
                  <div className="text-lg font-semibold mt-1">Senior Frontend Engineer · Linear Labs</div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-success/10 text-success border border-success/20">
                  <ShieldCheck className="size-3.5" />Verified
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 items-center gap-4">
                <GaugeMeter value={94} label="Trust" />
                <GaugeMeter value={88} label="ATS Match" />
                <GaugeMeter value={4} label="Fraud Risk" />
              </div>
              <div className="mt-6 rounded-lg bg-secondary/60 border border-border p-4 text-sm">
                <div className="font-medium">AI verdict</div>
                <p className="text-muted-foreground mt-1">Verified company domain, salary in market range, recruiter reputation score 9.2/10. Safe to apply.</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-xl border border-border bg-card p-4 shadow-elevated w-64">
              <div className="flex items-center gap-2 text-xs text-destructive font-medium"><AlertTriangle className="size-3.5" /> Scam blocked</div>
              <div className="mt-1 text-sm">"Data Analyst — ₹80k/week" flagged 86% fraud.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust metrics */}
      <section className="mx-auto max-w-7xl px-6 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "98.6%", l: "Scam detection accuracy" },
            { v: "12,400+", l: "Jobs scanned daily" },
            { v: "8,300+", l: "Recruiters verified" },
            { v: "1.2M+", l: "Applications protected" },
          ].map(s => (
            <div key={s.l} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="text-2xl font-semibold tracking-tight">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 mt-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">A complete trust stack for modern hiring</h2>
          <p className="mt-3 text-muted-foreground">Five AI engines work together to make every application safe, smart, and successful.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: <ShieldCheck className="size-5" />, title: "Fake Job Detection", desc: "NLP + classifier model flags unrealistic offers, suspicious domains, and recruiter red flags in real time." },
            { icon: <ScanLine className="size-5" />, title: "ATS Resume Analysis", desc: "Parse your resume, match against any role, and get tailored skill & certification suggestions." },
            { icon: <BadgeCheck className="size-5" />, title: "Certificate Verification", desc: "OCR + QR validation detects altered certificates and verifies issuer authenticity." },
            { icon: <Building2 className="size-5" />, title: "Recruiter Verification", desc: "Domain, LinkedIn, registration & metadata signals scored into one trust badge." },
            { icon: <Sparkles className="size-5" />, title: "AI Job Matching", desc: "Sentence transformers rank roles by your real fit — not by keyword spam." },
            { icon: <Bot className="size-5" />, title: "AI Career Assistant", desc: "Ask questions, paste any job link, and get instant analysis powered by Gemini." },
          ].map(f => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow">
              <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center">{f.icon}</div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 mt-24">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">How TrustHire works</h2>
        <div className="mt-10 grid md:grid-cols-4 gap-4">
          {[
            { n: "01", t: "Upload your resume", d: "AI parses skills, education and experience in seconds." },
            { n: "02", t: "Discover trusted jobs", d: "Every listing is scored for trust, fit and fraud probability." },
            { n: "03", t: "Verify before applying", d: "One-click recruiter & certificate authentication." },
            { n: "04", t: "Apply with confidence", d: "Track applications and get smart interview prep." },
          ].map(s => (
            <div key={s.n} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="text-xs font-semibold text-primary">{s.n}</div>
              <div className="mt-2 font-medium">{s.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recruiter section */}
      <section className="mx-auto max-w-7xl px-6 mt-24">
        <div className="rounded-2xl border border-border bg-gradient-soft p-10 grid md:grid-cols-2 gap-8 items-center shadow-card">
          <div>
            <div className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-card border border-border"><Users className="size-3.5" /> For recruiters</div>
            <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">Stand out as a verified recruiter</h3>
            <p className="mt-2 text-muted-foreground">Get a trust badge, reach quality candidates, and access ATS-ranked applicants instantly.</p>
            <div className="mt-5 flex gap-3">
              <Link to="/recruiter-register" className="px-4 py-2 rounded-md bg-gradient-brand text-primary-foreground shadow-card">Apply for verification</Link>
              <Link to="/about" className="px-4 py-2 rounded-md border border-border bg-card">Learn more</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { t: "Verified Domain", v: "linearlabs.io · 8y" },
              { t: "LinkedIn Match", v: "100%" },
              { t: "Registration", v: "GST · MCA verified" },
              { t: "Trust Score", v: "94 / 100" },
            ].map(x => (
              <div key={x.t} className="rounded-lg bg-card border border-border p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{x.t}</div>
                <div className="mt-1 font-medium">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 mt-24">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">Loved by candidates and teams</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            { n: "Aarav S.", r: "CS student, IIT Delhi", q: "I almost applied to a fake internship. TrustHire flagged it instantly and recommended a real one I got the offer for." },
            { n: "Lena Park", r: "Head of Talent, Northwind", q: "Verification took 24 hours. We're now closing roles 40% faster with ATS-ranked applicants." },
            { n: "Marcus C.", r: "Frontend Engineer", q: "The ATS analyzer told me exactly what to add. Interview rate doubled in two weeks." },
          ].map(t => (
            <div key={t.n} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <p className="text-sm">"{t.q}"</p>
              <div className="mt-4 text-sm font-medium">{t.n}</div>
              <div className="text-xs text-muted-foreground">{t.r}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 mt-24">
        <div className="rounded-2xl bg-gradient-brand p-10 text-primary-foreground text-center shadow-elevated">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Hire safer. Apply smarter. Trust everything.</h3>
          <p className="mt-2 opacity-90 max-w-xl mx-auto">Join TrustHire AI today and never get tricked by a fake recruiter again.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/register" className="px-5 py-2.5 rounded-md bg-card text-foreground hover:bg-muted">Create account</Link>
            <Link to="/dashboard" className="px-5 py-2.5 rounded-md border border-white/30 hover:bg-white/10">Try the demo</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
