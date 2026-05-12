import { createFileRoute } from "@tanstack/react-router";
import { JOBS } from "@/lib/mock-data";
import { Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/admin/jobs")({
  head: () => ({ meta: [{ title: "Jobs Moderation — TrustHire AI" }] }),
  component: J,
});

function J() {
  const flagged = JOBS.filter(j => j.fraudProb >= 50).concat(JOBS.filter(j => j.fraudProb < 50).slice(0,2));
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-semibold tracking-tight">Jobs Moderation</h1><p className="text-sm text-muted-foreground">Review AI-flagged listings and remove fraudulent ones.</p></div>
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50"><tr className="text-left text-muted-foreground">
            <th className="px-5 py-3 font-medium">Job</th>
            <th className="px-5 py-3 font-medium">Company</th>
            <th className="px-5 py-3 font-medium">Trust</th>
            <th className="px-5 py-3 font-medium">Fraud</th>
            <th className="px-5 py-3 font-medium" />
          </tr></thead>
          <tbody className="divide-y divide-border">
            {flagged.map(j => (
              <tr key={j.id} className="hover:bg-muted/40">
                <td className="px-5 py-3 font-medium">{j.title}</td>
                <td className="px-5 py-3 text-muted-foreground">{j.company}</td>
                <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded-md ${j.trust>=70?"bg-success/10 text-success":j.trust>=40?"bg-warning/15 text-[oklch(0.5_0.14_60)]":"bg-destructive/10 text-destructive"}`}>{j.trust}%</span></td>
                <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded-md ${j.fraudProb<30?"bg-success/10 text-success":j.fraudProb<60?"bg-warning/15 text-[oklch(0.5_0.14_60)]":"bg-destructive/10 text-destructive"}`}>{j.fraudProb}%</span></td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button className="size-8 rounded-md hover:bg-muted grid place-items-center"><Eye className="size-4" /></button>
                    <button onClick={()=>toast.error(`Removed: ${j.title}`)} className="size-8 rounded-md hover:bg-destructive/10 text-destructive grid place-items-center"><Trash2 className="size-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
