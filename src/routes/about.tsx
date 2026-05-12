import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ShieldCheck, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — TrustHire AI" }, { name: "description", content: "Our mission is to make every hiring interaction trusted." }] }),
  component: About,
});

function About() {
  return (
    <div>
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-xs uppercase tracking-wider text-primary">About</div>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">A trust layer for the world's hiring market.</h1>
        <p className="mt-5 text-lg text-muted-foreground">TrustHire AI was built after seeing thousands of students and professionals fall victim to fake recruiters, phishing offers, and forged certificates. We combine modern NLP, computer vision, and verification networks to make every hiring touchpoint safe and intelligent.</p>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { i: <ShieldCheck className="size-5" />, t: "Trust by default", d: "Every job, recruiter and certificate is scored before it reaches you." },
            { i: <Sparkles className="size-5" />, t: "AI you can explain", d: "Each verdict comes with the signals that produced it — never a black box." },
            { i: <Users className="size-5" />, t: "Built for everyone", d: "Job seekers, recruiters and admins each get a workspace built for them." },
          ].map(c => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="size-9 rounded-lg bg-primary/10 text-primary grid place-items-center">{c.i}</div>
              <div className="mt-3 font-semibold">{c.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-border bg-gradient-soft p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Our impact, so far</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[["1.2M+", "Apps protected"], ["46K", "Scams blocked"], ["8.3K", "Verified recruiters"], ["98.6%", "Accuracy"]].map(([v, l]) => (
              <div key={l}><div className="text-2xl font-semibold">{v}</div><div className="text-xs text-muted-foreground mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
