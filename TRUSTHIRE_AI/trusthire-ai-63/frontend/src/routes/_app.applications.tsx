import { createFileRoute } from "@tanstack/react-router";
import { apiFetchApplications, type AppData } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Briefcase } from "lucide-react";

export const Route = createFileRoute("/_app/applications")({
  head: () => ({ meta: [{ title: "Applications — TrustHire AI" }] }),
  component: Applications,
});

const statusStyle: Record<string, string> = {
  "Applied": "bg-secondary text-secondary-foreground border-border",
  "Interview": "bg-primary/10 text-primary border-primary/20",
  "Under Review": "bg-warning/15 text-[oklch(0.5_0.14_60)] border-warning/30",
  "Shortlisted": "bg-success/10 text-success border-success/20",
  "Rejected": "bg-destructive/10 text-destructive border-destructive/20",
};

function Applications() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetchApplications()
      .then(setApps)
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-64 grid place-items-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Your Applications</h1>
        <p className="text-sm text-muted-foreground">Track every application in one place.</p>
      </div>

      {apps.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-16 text-center">
          <Briefcase className="size-12 mx-auto text-muted-foreground opacity-20" />
          <div className="text-lg font-semibold mt-4">No applications yet</div>
          <p className="text-sm text-muted-foreground mt-1">Start applying to trusted jobs to see them here.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr className="text-left text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Job</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">ATS Score</th>
                  <th className="px-5 py-3 font-medium">Applied Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {apps.map(a => {
                  const job = typeof a.jobId === 'object' ? a.jobId : { title: 'Unknown', company: 'Unknown' };
                  return (
                    <tr key={a._id} className="hover:bg-muted/50">
                      <td className="px-5 py-3 font-medium">{job.title}</td>
                      <td className="px-5 py-3 text-muted-foreground">{job.company}</td>
                      <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">{a.atsScore}%</span></td>
                      <td className="px-5 py-3 text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-md text-xs border font-medium ${statusStyle[a.status] || statusStyle.Applied}`}>{a.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
