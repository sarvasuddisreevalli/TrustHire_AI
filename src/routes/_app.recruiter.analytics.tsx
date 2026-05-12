import { createFileRoute } from "@tanstack/react-router";
import { ChartCard } from "@/components/site/Cards";
import { TOP_SKILLS, APPS_PER_WEEK } from "@/lib/mock-data";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";

export const Route = createFileRoute("/_app/recruiter/analytics")({
  head: () => ({ meta: [{ title: "Recruiter Analytics — TrustHire AI" }] }),
  component: A,
});

function A() {
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-semibold tracking-tight">Analytics</h1><p className="text-sm text-muted-foreground">Hiring funnel insights, last 8 weeks.</p></div>
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Applications received" subtitle="Per week">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={APPS_PER_WEEK}>
                <defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.14 165)" stopOpacity={0.45} /><stop offset="100%" stopColor="oklch(0.72 0.14 165)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="apps" stroke="oklch(0.72 0.14 165)" fill="url(#ar)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Top skills in applicants">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={TOP_SKILLS} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis type="category" dataKey="skill" tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Bar dataKey="count" fill="oklch(0.58 0.16 245)" radius={[0,8,8,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
