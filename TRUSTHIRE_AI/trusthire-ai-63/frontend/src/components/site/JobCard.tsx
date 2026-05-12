import { ShieldCheck, MapPin, Briefcase, AlertTriangle, Bookmark, Sparkles, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { apiApplyToJob } from "@/lib/api";
import { useState, useRef } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const trustColor = job.trust >= 75 ? "text-success" : job.trust >= 50 ? "text-warning" : "text-destructive";
  const fraudHigh = job.fraudProb >= 60;

  const handleApplyClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setApplying(true);
    try {
      await apiApplyToJob(job.id || job._id!, file);
      setApplied(true);
      toast.success(`Applied to ${job.title} at ${job.company}`);
    } catch (err: any) {
      toast.error(err.message || "Application failed");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="group glass rounded-[2rem] p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-white/40">
      <div className="flex items-start gap-5">
        <div className="size-14 rounded-2xl bg-gradient-brand text-primary-foreground grid place-items-center font-black text-xl shadow-card group-hover:scale-110 transition-transform">
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-lg font-black text-foreground truncate">{job.title}</h3>
            {job.verified && (
              <div className="px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="size-3" /> Verified
              </div>
            )}
            {fraudHigh && (
              <div className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <AlertTriangle className="size-3" /> High Risk
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="text-foreground/80">{job.company}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{job.location}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {job.skills.slice(0, 4).map(s => (
              <span key={s} className="text-[10px] font-bold px-3 py-1 rounded-lg bg-primary/5 text-primary border border-primary/10">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-muted/30 p-3 text-center border border-border/50 group-hover:bg-muted/50 transition-colors">
          <div className={`text-lg font-black ${trustColor}`}>{job.trust}%</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">Trust</div>
        </div>
        <div className="rounded-2xl bg-muted/30 p-3 text-center border border-border/50 group-hover:bg-muted/50 transition-colors">
          <div className="text-lg font-black text-primary">{job.ats}%</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">ATS Match</div>
        </div>
        <div className="rounded-2xl bg-muted/30 p-3 text-center border border-border/50 group-hover:bg-muted/50 transition-colors">
          <div className={`text-lg font-black ${job.fraudProb >= 60 ? "text-destructive" : "text-foreground/70"}`}>{job.fraudProb}%</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">Fraud</div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Compensation</div>
          <div className="text-sm font-bold text-foreground/80 truncate">{job.salary}</div>
        </div>
        <div className="text-[10px] font-bold text-muted-foreground/60 italic">{job.postedAgo}</div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        {applied ? (
          <Link to="/applications" className="flex-1 px-4 py-3 rounded-2xl bg-success/10 text-success border border-success/20 font-black text-sm text-center">
            View Status
          </Link>
        ) : (
          <>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.txt" />
            <button
              disabled={applying}
              onClick={handleApplyClick}
              className="flex-1 px-4 py-3 rounded-2xl bg-gradient-brand text-primary-foreground font-black text-sm shadow-card hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all inline-flex items-center justify-center gap-2"
            >
              {applying ? <Loader2 className="size-4 animate-spin" /> : "Quick Apply"}
            </button>
          </>
        )}
        <button
          onClick={() => onAnalyze?.(job)}
          className="px-4 py-3 rounded-2xl glass hover:bg-muted/50 transition-all font-bold text-sm inline-flex items-center gap-2"
        >
          <Sparkles className="size-4 text-primary" />
          Analyze
        </button>
      </div>
    </div>
  );
}

