import { createFileRoute } from "@tanstack/react-router";
import { Flag, AlertTriangle, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — TrustHire AI" }] }),
  component: Reports,
});

const REPORTS = [
  { id: "rp1", type: "Fake Job", target: "Data Analyst — QuickHire", severity: "High", reporter: "12 users", evidence: "Salary 3.2× market, domain 11d old, no LinkedIn." },
  { id: "rp2", type: "Recruiter", target: "GlobalCareerHub HR", severity: "Medium", reporter: "4 users", evidence: "Asked candidate for ID upfront, generic Gmail address." },
  { id: "rp3", type: "Certificate", target: "Forged Coursera cert", severity: "High", reporter: "AI flag", evidence: "Pixel resampling in name region; QR not registered." },
  { id: "rp4", type: "Fake Job", target: "HR Executive — Global Career Hub", severity: "High", reporter: "9 users", evidence: "Weekly salary unusually high, no company info." },
];

const sevStyle = (s: string) => s === "High" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-warning/15 text-[oklch(0.5_0.14_60)] border-warning/30";
const icon = (t: string) => t === "Certificate" ? <BadgeCheck className="size-4" /> : t === "Fake Job" ? <AlertTriangle className="size-4" /> : <Flag className="size-4" />;

function Reports() {
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-semibold tracking-tight">Fraud Reports</h1><p className="text-sm text-muted-foreground">Review AI and user-submitted fraud reports.</p></div>
      <div className="grid lg:grid-cols-2 gap-4">
        {REPORTS.map(r => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-secondary grid place-items-center text-muted-foreground">{icon(r.type)}</div>
                <div>
                  <div className="font-semibold">{r.target}</div>
                  <div className="text-xs text-muted-foreground">{r.type} · reported by {r.reporter}</div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-md border ${sevStyle(r.severity)}`}>{r.severity}</span>
            </div>
            <div className="mt-3 rounded-lg border border-border bg-secondary/40 p-3 text-sm text-muted-foreground">{r.evidence}</div>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={()=>toast.success("Action: removed listing")} className="px-3 py-1.5 text-xs rounded-md bg-destructive text-destructive-foreground">Remove</button>
              <button onClick={()=>toast.success("Marked as resolved")} className="px-3 py-1.5 text-xs rounded-md bg-success text-success-foreground">Resolve</button>
              <button className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-muted">Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
