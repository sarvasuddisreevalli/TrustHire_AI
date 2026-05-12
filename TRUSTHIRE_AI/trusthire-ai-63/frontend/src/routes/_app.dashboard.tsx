import { createFileRoute, Link } from "@tanstack/react-router";
import { StatsCard, ChartCard } from "@/components/site/Cards";
import { JobCard } from "@/components/site/JobCard";
import { GaugeMeter } from "@/components/site/GaugeMeter";
import { apiFetchJobs, apiFetchApplications, type JobData, type AppData } from "@/lib/api";
import { Briefcase, ScanLine, ShieldCheck, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — TrustHire AI" }] }),
  component: Dashboard,
});

const FRAUD_TREND = [
  { week: "W1", fake: 2 }, { week: "W2", fake: 5 }, { week: "W3", fake: 1 }, { week: "W4", fake: 8 },
  { week: "W5", fake: 3 }, { week: "W6", fake: 2 }, { week: "W7", fake: 4 }, { week: "W8", fake: 2 },
];

const APPS_PER_WEEK = [
  { week: "W1", apps: 12 }, { week: "W2", apps: 18 }, { week: "W3", apps: 15 }, { week: "W4", apps: 22 },
  { week: "W5", apps: 31 }, { week: "W6", apps: 28 }, { week: "W7", apps: 34 }, { week: "W8", apps: 42 },
];

function Dashboard() {
  const { name } = useAuth();
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const jobsData = await apiFetchJobs();
        setJobs(jobsData);

        if (token) {
          try {
            const appsData = await apiFetchApplications();
            setApps(appsData);
          } catch (appErr) {
            console.warn("Dashboard: apps fetch failed", appErr);
          }
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);


  const recommended = jobs.filter(j => j.fraudProbability < 30).slice(0, 3);
  const avgAts = apps.length > 0 ? Math.round(apps.reduce((acc, a) => acc + a.atsScore, 0) / apps.length) : 0;

  if (loading) {
    return (
      <div className="h-96 grid place-items-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-brand p-6 text-primary-foreground shadow-elevated flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80">Welcome back, {name.split(' ')[0]}</div>
          <h1 className="text-2xl font-semibold mt-1">Your trust score this week is excellent.</h1>
          <p className="opacity-90 mt-1 text-sm">{jobs.length} new matches found · 2 risky jobs blocked · ATS rose by +6</p>
        </div>
        <Link to="/jobs" className="px-4 py-2 rounded-md bg-card text-foreground hover:bg-muted text-sm inline-flex items-center gap-2">Explore matches <ArrowRight className="size-4" /></Link>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatsCard label="Trust Score" value="92" hint="+3 this week" icon={<ShieldCheck className="size-4" />} accent="success" />
        <StatsCard label="ATS Average" value={`${avgAts}%`} hint="Across all applications" icon={<ScanLine className="size-4" />} />
        <StatsCard label="Applications" value={apps.length} hint="View status" icon={<Briefcase className="size-4" />} />
        <StatsCard label="Fraud Blocked" value="2" hint="This month" icon={<AlertTriangle className="size-4" />} accent="destructive" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <ChartCard title="Application activity" subtitle="Last 8 weeks" >
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={APPS_PER_WEEK}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.58 0.16 245)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.58 0.16 245)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="apps" stroke="oklch(0.58 0.16 245)" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Fraud blocked" subtitle="Per week" >
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={FRAUD_TREND}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Bar dataKey="fake" fill="oklch(0.62 0.22 25)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Your trust meters" subtitle="Resume readiness">
          <div className="grid grid-cols-2 gap-2 mt-2">
            <GaugeMeter value={avgAts} label="ATS" size={140} />
            <GaugeMeter value={92} label="Profile Trust" size={140} />
          </div>
        </ChartCard>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Recommended for you</h2>
          <Link to="/jobs" className="text-sm text-primary">View all</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {recommended.map(j => <JobCard key={j._id} job={{...j, id: j._id, trust: j.trustScore, ats: j.atsScore, fraudProb: j.fraudProbability, postedAgo: j.postedAgo || "Just now"}} />)}
        </div>
      </div>
    </div>
  );
}
