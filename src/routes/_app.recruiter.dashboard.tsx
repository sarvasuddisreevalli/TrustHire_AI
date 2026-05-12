import { createFileRoute } from "@tanstack/react-router";
import { apiFetchRecruiterStats, apiFetchRecruiterJobs, type JobData } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { StatsCard, ChartCard } from "@/components/site/Cards";
import { GaugeMeter } from "@/components/site/GaugeMeter";
import { LayoutDashboard, Users, Briefcase, TrendingUp, Loader2, Plus } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_app/recruiter/dashboard")({
  head: () => ({ meta: [{ title: "Recruiter Dashboard — TrustHire AI" }] }),
  component: RecruiterDashboard,
});

const JOB_PERF = [
  { name: "Frontend Eng", views: 420, apps: 124 },
  { name: "ML Intern", views: 890, apps: 256 },
  { name: "Product Des", views: 310, apps: 45 },
  { name: "Backend Eng", views: 560, apps: 89 },
];

function RecruiterDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiFetchRecruiterStats(), apiFetchRecruiterJobs()])
      .then(([s, j]) => {
        setStats(s);
        setJobs(j);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Recruiter Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage hiring for {stats?.company}</p>
        </div>
        <button className="px-4 py-2 rounded-md bg-gradient-brand text-primary-foreground shadow-card text-sm font-medium inline-flex items-center gap-2 hover:opacity-90">
          <Plus className="size-4" /> Post New Job
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatsCard label="Active Jobs" value={stats?.activeJobs} hint={`${stats?.totalJobs} total`} icon={<Briefcase className="size-4" />} />
        <StatsCard label="Total Applicants" value={stats?.totalApplicants} hint="+12 today" icon={<Users className="size-4" />} accent="primary" />
        <StatsCard label="Trust Score" value={stats?.trustScore} hint="High reputation" icon={<TrendingUp className="size-4" />} accent="success" />
        <StatsCard label="Interview Rate" value="18%" hint="Target 20%" icon={<LayoutDashboard className="size-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <ChartCard title="Job Performance" subtitle="Views vs Applications">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={JOB_PERF}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Bar dataKey="views" fill="var(--primary)" radius={[4,4,0,0]} opacity={0.4} />
                <Bar dataKey="apps" fill="var(--primary)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Your Trust Rating" subtitle="AI Verification Details">
          <div className="flex flex-col items-center justify-center h-full pt-2">
            <GaugeMeter value={stats?.trustScore} label="Trust Score" size={180} />
            <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border w-full">
              <div className="text-xs font-medium uppercase text-muted-foreground mb-1">AI Verdict</div>
              <p className="text-xs leading-relaxed">Reputation based on domain age, LinkedIn matching, and historical job validity. Keep score high to increase candidate reach.</p>
            </div>
          </div>
        </ChartCard>

        <div className="space-y-4">
          <h2 className="font-semibold text-sm">Recent Activity</h2>
          <div className="space-y-3">
            {jobs.slice(0, 4).map(j => (
              <div key={j._id} className="p-3 rounded-lg border border-border bg-card flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{j.title}</div>
                  <div className="text-xs text-muted-foreground">{j.applicants} applicants · {j.status}</div>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${j.trustScore >= 80 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {j.trustScore}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
