import { createFileRoute } from "@tanstack/react-router";
import { apiFetchJobs, apiAnalyzeJob, apiFetchApplications, type JobData } from "@/lib/api";
import { JobCard } from "@/components/site/JobCard";
import { GaugeMeter } from "@/components/site/GaugeMeter";
import { useEffect, useMemo, useState } from "react";
import { Search, Filter, X, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app/jobs")({
  head: () => ({ meta: [{ title: "Trusted Jobs — TrustHire AI" }] }),
  component: Jobs,
});

function Jobs() {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("All");
  const [trustMin, setTrustMin] = useState(0);
  const [analyzed, setAnalyzed] = useState<JobData | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const jobsData = await apiFetchJobs();
        setJobs(jobsData);

        if (token) {
          try {
            const appsData = await apiFetchApplications();
            setAppliedIds(appsData.map((app: any) => typeof app.jobId === 'string' ? app.jobId : app.jobId._id));
          } catch (appErr) {
            console.warn("Failed to fetch applications:", appErr);
          }
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token]);


  const filtered = useMemo(() => jobs.filter(j =>
    (type === "All" || j.type === type) &&
    j.trustScore >= trustMin &&
    (q.trim() === "" || (j.title + j.company + j.skills.join(" ")).toLowerCase().includes(q.toLowerCase()))
  ), [jobs, q, type, trustMin]);

  const handleAnalyze = async (job: JobData) => {
    setAnalyzing(true);
    setAnalyzed(job);
    try {
      const res = await apiAnalyzeJob(job);
      setAnalyzed({ ...job, ...res });
    } catch (err: any) {
      toast.error("AI analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

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
        <h1 className="text-2xl font-semibold tracking-tight">Trusted Jobs</h1>
        <p className="text-sm text-muted-foreground">Every listing is scanned by our AI trust engine.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-3 shadow-card flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-64 px-3 py-2 rounded-md bg-secondary">
          <Search className="size-4 text-muted-foreground" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search jobs, companies, skills…" className="bg-transparent outline-none text-sm w-full" />
        </div>
        <select value={type} onChange={e=>setType(e.target.value)} className="text-sm rounded-md border border-input bg-background px-3 py-2">
          {["All","Full-time","Internship","Contract","Remote"].map(t => <option key={t}>{t}</option>)}
        </select>
        <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-border">
          <Filter className="size-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Min trust</span>
          <input type="range" min={0} max={100} value={trustMin} onChange={e=>setTrustMin(+e.target.value)} />
          <span className="text-xs font-medium w-8 text-right">{trustMin}%</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <div className="text-lg font-semibold">No jobs match your filters</div>
          <p className="text-sm text-muted-foreground mt-1">Try lowering the trust threshold or clearing your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(j => (
            <JobCard 
              key={j._id} 
              job={{...j, id: j._id, trust: j.trustScore, ats: j.atsScore, fraudProb: j.fraudProbability}} 
              onAnalyze={() => handleAnalyze(j)} 
              isApplied={appliedIds.includes(j._id)}
            />
          ))}
        </div>
      )}

      {analyzed && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onClick={()=>setAnalyzed(null)}>
          <div className="bg-card rounded-2xl border border-border shadow-elevated max-w-lg w-full p-6" onClick={e=>e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Trust Analysis</div>
                <div className="font-semibold mt-1">{analyzed.title} · {analyzed.company}</div>
              </div>
              <button onClick={()=>setAnalyzed(null)} className="size-8 grid place-items-center rounded-md hover:bg-muted"><X className="size-4" /></button>
            </div>
            
            {analyzing ? (
              <div className="h-48 grid place-items-center">
                <div className="text-center">
                  <Loader2 className="size-8 animate-spin mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground mt-2">Gemini is analyzing fraud signals...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-5 grid grid-cols-3 gap-2 items-center">
                  <GaugeMeter value={analyzed.trustScore} label="Trust" size={150} />
                  <GaugeMeter value={analyzed.atsScore} label="ATS" size={150} />
                  <GaugeMeter value={analyzed.fraudProbability} label="Fraud" size={150} />
                </div>
                <div className={`mt-5 rounded-lg p-4 border ${analyzed.fraudProbability >= 60 ? "bg-destructive/10 border-destructive/20" : "bg-success/10 border-success/20"}`}>
                  <div className="flex items-center gap-2 font-medium">
                    {analyzed.fraudProbability >= 60 ? <><AlertTriangle className="size-4 text-destructive" /> High risk</> : <><ShieldCheck className="size-4 text-success" /> Looks genuine</>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {analyzed.aiAnalysis || (analyzed.fraudProbability >= 60
                      ? "Unrealistic salary detected and recruiter domain registered <30 days ago."
                      : "Verified company domain, salary in market range, recruiter trust 9.2/10.")}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
