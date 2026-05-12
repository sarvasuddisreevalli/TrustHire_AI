import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Eye, Loader2, Users, Bot } from "lucide-react";
import { toast } from "sonner";
import { apiFetchRecruiterApplicants, apiUpdateAppStatus } from "@/lib/api";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/recruiter/applicants")({
  head: () => ({ meta: [{ title: "Applicants — TrustHire AI" }] }),
  component: Apps,
});

function Apps() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingApp, setViewingApp] = useState<any | null>(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = () => {
    setLoading(true);
    apiFetchRecruiterApplicants()
      .then(setApps)
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleAction = async (id: string, status: string, name: string) => {
    try {
      await apiUpdateAppStatus(id, status);
      toast.success(`${name} ${status.toLowerCase()}`);
      fetchApplicants();
    } catch (err: any) {
      toast.error(err.message || "Action failed");
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Applicants</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Intelligent ranking based on ATS compatibility and skill matching.</p>
      </div>
      
      {apps.length === 0 ? (
        <div className="glass rounded-[3rem] p-24 text-center border-dashed border-border/60">
          <Users className="size-16 mx-auto text-muted-foreground opacity-20" />
          <div className="text-xl font-black mt-6 text-foreground/40">No applicants yet</div>
          <p className="text-sm font-medium text-muted-foreground mt-2 max-w-xs mx-auto opacity-60">When candidates apply to your job postings, they will appear here ranked by fit.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {apps.map(a => (
            <div key={a._id} className="glass rounded-[2rem] p-6 shadow-card hover:shadow-elevated transition-all border-white/40 group">
              <div className="flex items-start gap-5">
                <div className="size-14 rounded-2xl bg-gradient-brand text-primary-foreground grid place-items-center font-black text-xl shadow-card shrink-0">
                  {a.userId?.name?.split(" ").map((n:string)=>n[0]).join("") || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <div className="text-lg font-black text-foreground truncate">{a.userId?.name}</div>
                      <div className="text-xs font-medium text-muted-foreground truncate opacity-70">{a.userId?.email}</div>
                    </div>
                    <div className="shrink-0 px-3 py-1 rounded-xl bg-primary/10 text-primary font-black text-sm border border-primary/20 shadow-sm">
                      {a.atsScore}% <span className="text-[10px] uppercase opacity-60">Match</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-sm font-bold text-foreground/80 mb-4 truncate">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-2 font-black">Applied For</span>
                    {a.jobId?.title}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {a.status !== 'Shortlisted' && (
                      <button onClick={()=>handleAction(a._id, 'Shortlisted', a.userId?.name)} className="px-4 py-2 text-xs font-black rounded-xl bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-colors inline-flex items-center gap-2">
                        <Check className="size-4" /> Shortlist
                      </button>
                    )}
                    {a.status !== 'Rejected' && (
                      <button onClick={()=>handleAction(a._id, 'Rejected', a.userId?.name)} className="px-4 py-2 text-xs font-black rounded-xl bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors inline-flex items-center gap-2">
                        <X className="size-4" /> Reject
                      </button>
                    )}
                    <button onClick={() => setViewingApp(a)} className="px-4 py-2 text-xs font-black rounded-xl glass hover:bg-muted/50 transition-colors inline-flex items-center gap-2">
                      <Eye className="size-4" /> Profile
                    </button>
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <div className={`size-1.5 rounded-full ${a.status === 'Shortlisted' ? 'bg-success' : a.status === 'Rejected' ? 'bg-destructive' : 'bg-primary'}`} />
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                      Status: <span className={a.status === 'Shortlisted' ? 'text-success' : a.status === 'Rejected' ? 'text-destructive' : 'text-primary'}>{a.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewingApp && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-foreground/60 backdrop-blur-sm p-4" onClick={() => setViewingApp(null)}>
          <div className="glass rounded-[3rem] shadow-elevated max-w-2xl w-full p-10 animate-in zoom-in-95 border-white/60" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-border/50 pb-8">
              <div className="flex items-center gap-6">
                <div className="size-20 rounded-[1.5rem] bg-gradient-brand text-primary-foreground grid place-items-center text-3xl font-black shadow-elevated">
                  {viewingApp.userId?.name?.split(" ").map((n:string)=>n[0]).join("")}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground">{viewingApp.userId?.name}</h2>
                  <p className="text-sm font-medium text-muted-foreground mt-1">{viewingApp.userId?.email}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-widest border border-success/20">Verified</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Top 5% Fit</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">ATS Score</div>
                <div className="text-4xl font-black text-primary">{viewingApp.atsScore}%</div>
              </div>
            </div>
            
            <div className="mt-8 grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Applied Position</h3>
                  <div className="p-5 rounded-2xl bg-muted/40 border border-border/50">
                    <div className="font-black text-foreground/80">{viewingApp.jobId?.title}</div>
                    <div className="text-xs font-bold text-muted-foreground/60 mt-1.5 flex items-center gap-2">
                      <div className="size-1 rounded-full bg-muted-foreground/30" />
                      Applied {new Date(viewingApp.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Technical Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Node.js", "MongoDB", "Tailwind"].map(s => (
                      <span key={s} className="px-3 py-1.5 rounded-xl glass text-[11px] font-black text-primary border-primary/20">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 size-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot className="size-4 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Insights</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/70 font-medium italic">
                      "Candidate shows exceptional alignment with the technical requirements. Previous tenure at high-growth startups indicates strong adaptability."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4 justify-end border-t border-border/50 pt-8">
              <button onClick={() => setViewingApp(null)} className="px-6 py-3 rounded-2xl glass hover:bg-muted/50 transition-all font-bold text-sm">Dismiss</button>
              <button onClick={() => { handleAction(viewingApp._id, 'Shortlisted', viewingApp.userId?.name); setViewingApp(null); }} className="px-8 py-3 rounded-2xl bg-gradient-brand text-primary-foreground font-black text-sm shadow-elevated hover:scale-[1.02] active:scale-[0.98] transition-all">
                Shortlist Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

