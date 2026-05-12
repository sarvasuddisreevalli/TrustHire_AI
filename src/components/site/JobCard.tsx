import { ShieldCheck, MapPin, Briefcase, AlertTriangle, Bookmark, Sparkles, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { apiApplyToJob } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

export type JobProps = {
  id: string;
  _id?: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
  trust: number;
  ats: number;
  fraudProb: number;
  verified: boolean;
  postedAgo: string;
  isApplied?: boolean;
};

export function JobCard({ job, onAnalyze, isApplied: initialApplied }: { job: JobProps; onAnalyze?: (j: JobProps) => void; isApplied?: boolean }) {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(initialApplied || false);

  const trustColor = job.trust >= 75 ? "text-success" : job.trust >= 50 ? "text-warning" : "text-destructive";
  const fraudHigh = job.fraudProb >= 60;

  const handleApply = async () => {
    setApplying(true);
    try {
      await apiApplyToJob(job.id || job._id!);
      setApplied(true);
      toast.success(`Applied to ${job.title} at ${job.company}`);
    } catch (err: any) {
      toast.error(err.message || "Application failed");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start gap-4">
        <div className="size-12 rounded-lg bg-gradient-brand text-primary-foreground grid place-items-center font-semibold shadow-card">{job.logo}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold truncate">{job.title}</h3>
            {job.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-md bg-success/10 text-success border border-success/20">
                <ShieldCheck className="size-3" /> Verified
              </span>
            )}
            {fraudHigh && (
              <span className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
                <AlertTriangle className="size-3" /> High risk
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground mt-0.5">{job.company} · <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{job.location}</span></div>
          <div className="flex flex-wrap gap-2 mt-3">
            {job.skills.map(s => <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{s}</span>)}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg border border-border p-2">
          <div className={`text-base font-semibold ${trustColor}`}>{job.trust}%</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Trust</div>
        </div>
        <div className="rounded-lg border border-border p-2">
          <div className="text-base font-semibold text-primary">{job.ats}%</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">ATS</div>
        </div>
        <div className="rounded-lg border border-border p-2">
          <div className={`text-base font-semibold ${job.fraudProb >= 60 ? "text-destructive" : job.fraudProb >= 30 ? "text-warning" : "text-success"}`}>{job.fraudProb}%</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Fraud</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 text-sm">
        <div className="text-muted-foreground inline-flex items-center gap-1 min-w-0"><Briefcase className="size-3.5 shrink-0" /><span className="truncate">{job.type} · {job.salary}</span></div>
        <div className="text-xs text-muted-foreground whitespace-nowrap">{job.postedAgo}</div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {applied ? (
          <Link to="/applications" className="flex-1 text-center text-sm py-2 rounded-md bg-success/10 text-success border border-success/20 font-medium">View Status</Link>
        ) : (
          <button disabled={applying} onClick={handleApply} className="flex-1 text-center text-sm py-2 rounded-md bg-gradient-brand text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-50 inline-flex items-center justify-center gap-2">
            {applying ? <Loader2 className="size-4 animate-spin" /> : "Apply"}
          </button>
        )}
        <button onClick={() => onAnalyze?.(job)} className="text-sm py-2 px-3 rounded-md border border-border hover:bg-muted inline-flex items-center gap-1"><Sparkles className="size-3.5" />Analyze</button>
        <button className="size-9 grid place-items-center rounded-md border border-border hover:bg-muted" aria-label="Save"><Bookmark className="size-4" /></button>
      </div>
    </div>
  );
}
