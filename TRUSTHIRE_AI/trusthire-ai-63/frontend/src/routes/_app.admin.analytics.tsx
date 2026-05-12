import { createFileRoute } from "@tanstack/react-router";
import { ChartCard } from "@/components/site/Cards";
import { apiFetchAdminStats } from "@/lib/api";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_app/admin/analytics")({
  head: () => ({ meta: [{ title: "Platform Analytics — TrustHire AI" }] }),
  component: A,
});

const COLORS = ["oklch(0.7 0.16 155)", "oklch(0.78 0.14 75)", "oklch(0.62 0.22 25)"];

function A() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetchAdminStats()
      .then(setStats)
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

  // Fallbacks for initial seed data or empty state
  const appsData = stats.appsPerWeek?.length ? stats.appsPerWeek : [
    { week: "W1", apps: 0 }, { week: "W2", apps: 0 }
  ];
  const fraudData = stats.fraudTrend?.length ? stats.fraudTrend : [
    { week: "W1", fake: 0 }, { week: "W2", fake: 0 }
  ];

  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-semibold tracking-tight">Platform Analytics</h1><p className="text-sm text-muted-foreground">Real-time trust trends, fraud patterns and engagement.</p></div>
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Fake jobs detected over time">
          <div className="h-64"><ResponsiveContainer><LineChart data={fraudData}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="week" fontSize={11} tickLine={false} axisLine={false} /><YAxis fontSize={11} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} /><Line type="monotone" dataKey="fake" stroke="oklch(0.62 0.22 25)" strokeWidth={2.5} dot={{ r: 3 }} /></LineChart></ResponsiveContainer></div>
        </ChartCard>
        <ChartCard title="Applications per week">
          <div className="h-64"><ResponsiveContainer><AreaChart data={appsData}><defs><linearGradient id="ap" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.58 0.16 245)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.58 0.16 245)" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="week" fontSize={11} tickLine={false} axisLine={false} /><YAxis fontSize={11} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} /><Area type="monotone" dataKey="apps" stroke="oklch(0.58 0.16 245)" fill="url(#ap)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div>
        </ChartCard>
        <ChartCard title="Top job skills (Real-time)">
          <div className="h-64"><ResponsiveContainer><BarChart data={stats.topSkills}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="skill" fontSize={11} tickLine={false} axisLine={false} /><YAxis fontSize={11} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} /><Bar dataKey="count" fill="oklch(0.72 0.14 165)" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div>
        </ChartCard>
        <ChartCard title="Trust score distribution (Real-time)">
          <div className="h-64"><ResponsiveContainer><PieChart><Pie data={stats.trustDist} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>{stats.trustDist.map((_:any,i:number)=><Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} /><Legend wrapperStyle={{ fontSize: 11 }} /></PieChart></ResponsiveContainer></div>
        </ChartCard>
      </div>
    </div>
  );
}
