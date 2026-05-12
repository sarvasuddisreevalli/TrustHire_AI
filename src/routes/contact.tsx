import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — TrustHire AI" }] }),
  component: Contact,
});

function Contact() {
  return (
    <div>
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <div className="text-xs uppercase tracking-wider text-primary">Contact</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Talk to our team</h1>
          <p className="mt-3 text-muted-foreground">Questions, partnerships, or enterprise deployment — we usually reply within a few hours.</p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3"><Mail className="size-4 text-primary" /> hello@trusthire.ai</div>
            <div className="flex items-center gap-3"><Phone className="size-4 text-primary" /> +1 (415) 555-0142</div>
            <div className="flex items-center gap-3"><MapPin className="size-4 text-primary" /> Remote-first · HQ Bengaluru, IN</div>
          </div>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Message sent — we'll be in touch."); (e.currentTarget as HTMLFormElement).reset(); }}
          className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Jane Cooper" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input required type="email" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="jane@company.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea required rows={5} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="How can we help?" />
          </div>
          <button className="w-full px-4 py-2.5 rounded-md bg-gradient-brand text-primary-foreground shadow-card">Send message</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
