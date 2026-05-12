import { createFileRoute } from "@tanstack/react-router";
import { apiFetchAdminStats, apiFetchFlaggedJobs, type JobData } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { StatsCard, ChartCard } from "@/components/site/Cards";
import { ShieldCheck, Building2, Briefcase, Flag, AlertTriangle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_app/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Overview — TrustHire AI" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [flagged, setFlagged] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiFetchAdminStats(), apiFetchFlaggedJobs()])
      .then(([s, f]) => {
        setStats(s);
        setFlagged(f);
      })
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-96 grid place-items-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Platform Overview</h1>
        <p className="text-sm text-muted-foreground">Monitoring TrustHire AI health and safety.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatsCard label="Pending Recruiters" value={stats?.pendingRecruiters} hint="Needs review" icon={<Building2 className="size-4" />} accent="warning" />
        <StatsCard label="Active Jobs" value={stats?.totalJobs} hint={`${stats?.suspiciousJobs} flagged`} icon={<Briefcase className="size-4" />} />
        <StatsCard label="Verified Companies" value={stats?.verifiedRecruiters} hint="Platform trust" icon={<ShieldCheck className="size-4" />} accent="success" />
        <StatsCard label="Applications" value={stats?.totalApplications} hint="Across platform" icon={<Flag className="size-4" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Security Alerts" subtitle="Recent fraud detections">
          <div className="space-y-4 pt-2">
            {flagged.filter(j => j.fraudProbability >= 50).slice(0, 5).map(j => (
              <div key={j._id} className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 flex items-start gap-4">
                <div className="size-10 rounded-lg bg-destructive/10 text-destructive grid place-items-center shrink-0">
                  <AlertTriangle className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold truncate">{j.title}</span>
                    <span className="text-xs font-bold text-destructive">{j.fraudProbability}% Risk</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{j.company} · Posted by {j.postedBy?.name}</div>
                  <p className="text-xs text-destructive/80 mt-2 italic">"{j.aiAnalysis || 'Automated fraud signals detected.'}"</p>
                </div>
              </div>
            ))}
            {flagged.filter(j => j.fraudProbability >= 50).length === 0 && (
              <div className="h-48 grid place-items-center text-sm text-muted-foreground border border-dashed border-border rounded-xl">
                No critical security alerts found.
              </div>
            )}
          </div>
        </ChartCard>

        <ChartCard title="Recent Recruiter Applications" subtitle="Awaiting AI/Admin review">
          <div className="space-y-3 pt-2">
            <div className="text-center py-10">
              <Building2 className="size-10 mx-auto text-muted-foreground opacity-20" />
              <p className="text-sm text-muted-foreground mt-3">All application data synced.</p>
              <button className="mt-4 text-xs font-medium text-primary hover:underline">View Verification Queue</button>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
