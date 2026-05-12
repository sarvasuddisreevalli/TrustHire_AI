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
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary shadow-sm mb-6 uppercase tracking-wider">
              <Sparkles className="size-4" /> AI-Powered Recruitment Safety
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-foreground">
              Find <span className="text-gradient">Trusted</span> Jobs.<br />
              Apply with <span className="text-gradient">Certainty.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              The world's first AI trust layer for hiring. We verify recruiters, detect scams, and analyze resumes so you can focus on your career, not frauds.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-brand text-primary-foreground font-bold shadow-elevated hover:scale-[1.02] active:scale-[0.98] transition-all">
                Get Started Free <ArrowRight className="size-5" />
              </Link>
              <Link to="/jobs" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass font-bold hover:bg-muted/50 transition-all">
                Explore Jobs
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 border-t border-border pt-10">
              <div>
                <div className="text-3xl font-black text-foreground">98.6%</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Accuracy</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <div className="text-3xl font-black text-foreground">12k+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Daily Scans</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <div className="text-3xl font-black text-foreground">24/7</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Monitoring</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 shadow-elevated border-white/40">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-gradient-brand grid place-items-center text-primary-foreground">
                    <Building2 className="size-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Analysis Engine</div>
                    <div className="text-xl font-black text-foreground">Linear Labs</div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5" /> Verified Role
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <GaugeMeter value={96} label="Trust" />
                <GaugeMeter value={84} label="Match" />
                <GaugeMeter value={2} label="Risk" />
              </div>

              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="size-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">AI Verdict</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                  Verified company domain, historical hiring data matches industry standards, and salary is within 95th percentile of market range.
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 hidden md:block glass rounded-2xl p-5 shadow-elevated w-72 border-destructive/20">
              <div className="flex items-center gap-2 text-destructive font-black text-xs uppercase tracking-widest mb-2">
                <AlertTriangle className="size-4" /> Scam Blocked
              </div>
              <p className="text-sm font-medium">"Junior React Developer — ₹1.2L/week" flagged for suspicious domain and upfront payment request.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Cards */}
      <section className="mx-auto max-w-7xl px-6 relative z-20 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { v: "98.6%", l: "Detection Accuracy", i: <ShieldCheck /> },
            { v: "12,400+", l: "Daily Job Scans", i: <Users /> },
            { v: "8,300+", l: "Verified Recruiters", i: <Building2 /> },
            { v: "1.2M+", l: "Safe Applications", i: <CheckCircle2 /> },
          ].map(s => (
            <div key={s.l} className="glass p-6 rounded-2xl shadow-card flex items-center gap-4 hover-lift">
              <div className="size-12 rounded-xl bg-primary/10 text-primary grid place-items-center">{s.i}</div>
              <div>
                <div className="text-2xl font-black text-foreground">{s.v}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 mt-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">The Complete Trust Stack</h2>
          <p className="mt-6 text-lg text-muted-foreground">Five specialized AI engines working in parallel to ensure every step of your hiring journey is protected and optimized.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck />, title: "Fake Job Detection", desc: "Our neural network analyzes 50+ signals including domain age, linguistic patterns, and compensation anomalies." },
            { icon: <ScanLine />, title: "ATS Resume Intelligence", desc: "Not just keywords. We use semantic analysis to match your experience to roles with 95% accuracy." },
            { icon: <BadgeCheck />, title: "Credential Verification", desc: "Automated OCR and cryptographic validation for certificates, protecting you from credential fraud." },
            { icon: <Building2 />, title: "Recruiter DNA", desc: "We verify every recruiter profile against official registration databases and professional networks." },
            { icon: <Sparkles />, title: "Smart Job Matching", desc: "Get matched with roles that actually fit your career trajectory, not just your past experience." },
            { icon: <Bot />, title: "AI Career Copilot", desc: "Ask our Gemini-powered assistant anything from interview prep to salary negotiation strategies." },
          ].map(f => (
            <div key={f.title} className="glass p-8 rounded-3xl shadow-card hover:shadow-elevated transition-all border-border/40 group">
              <div className="size-14 rounded-2xl bg-gradient-brand text-primary-foreground grid place-items-center shadow-card mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-xl font-black text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 mt-40 mb-24">
        <div className="relative rounded-[3rem] bg-foreground p-12 md:p-20 overflow-hidden shadow-elevated">
          <div className="absolute top-0 right-0 size-96 bg-primary/20 blur-[100px] rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 size-96 bg-accent/20 blur-[100px] rounded-full -ml-48 -mb-48" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Ready to hire with confidence?</h2>
            <p className="mt-8 text-lg md:text-xl text-white/70 font-medium">Join the thousands of candidates and recruiters using TrustHire AI to secure the future of hiring.</p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link to="/register" className="px-10 py-5 rounded-2xl bg-white text-foreground font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-elevated">
                Get Started Now
              </Link>
              <Link to="/about" className="px-10 py-5 rounded-2xl glass border-white/20 text-white font-black text-lg hover:bg-white/10 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

