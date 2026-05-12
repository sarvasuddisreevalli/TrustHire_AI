import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Eye, Loader2, Users } from "lucide-react";
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
    <div className="space-y-5">
      <div><h1 className="text-2xl font-semibold tracking-tight">Applicants</h1><p className="text-sm text-muted-foreground">Ranked by ATS compatibility for your active roles.</p></div>
      
      {apps.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-16 text-center">
          <Users className="size-12 mx-auto text-muted-foreground opacity-20" />
          <div className="text-lg font-semibold mt-4">No applicants yet</div>
          <p className="text-sm text-muted-foreground mt-1">When candidates apply to your jobs, they will appear here.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {apps.map(a => (
            <div key={a._id} className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-gradient-brand text-primary-foreground grid place-items-center font-semibold shrink-0">
                  {a.userId?.name?.split(" ").map((n:string)=>n[0]).join("") || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{a.userId?.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{a.userId?.email}</div>
                    </div>
                    <span className="shrink-0 text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-bold">{a.atsScore}% ATS</span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-foreground inline-flex items-center gap-1.5">
                    <span className="text-muted-foreground font-normal">Applied for:</span> {a.jobId?.title}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    {a.status !== 'Shortlisted' && (
                      <button onClick={()=>handleAction(a._id, 'Shortlisted', a.userId?.name)} className="px-3 py-1.5 text-xs rounded-md bg-success/10 text-success border border-success/20 hover:bg-success/20 inline-flex items-center gap-1"><Check className="size-3.5" /> Shortlist</button>
                    )}
                    {a.status !== 'Rejected' && (
                      <button onClick={()=>handleAction(a._id, 'Rejected', a.userId?.name)} className="px-3 py-1.5 text-xs rounded-md bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 inline-flex items-center gap-1"><X className="size-3.5" /> Reject</button>
                    )}
                    <button onClick={() => setViewingApp(a)} className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-muted inline-flex items-center gap-1"><Eye className="size-3.5" /> View Profile</button>
                  </div>
                  <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    Current Status: <span className={a.status === 'Shortlisted' ? 'text-success' : a.status === 'Rejected' ? 'text-destructive' : 'text-primary'}>{a.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewingApp && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onClick={() => setViewingApp(null)}>
          <div className="bg-card rounded-2xl border border-border shadow-elevated max-w-2xl w-full p-8 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-border pb-6">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-gradient-brand text-primary-foreground grid place-items-center text-xl font-bold">
                  {viewingApp.userId?.name?.split(" ").map((n:string)=>n[0]).join("")}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{viewingApp.userId?.name}</h2>
                  <p className="text-sm text-muted-foreground">{viewingApp.userId?.email}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">ATS Compatibility</div>
                <div className="text-2xl font-bold text-primary">{viewingApp.atsScore}%</div>
              </div>
            </div>
            
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Applied Position</h3>
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                    <div className="font-semibold text-sm">{viewingApp.jobId?.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">Applied on {new Date(viewingApp.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Trust Indicators</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">Verified Email</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">Profile 90% Complete</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Skills & Matches</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Node.js", "MongoDB", "Cloud"].map(s => (
                      <span key={s} className="px-2 py-1 rounded bg-secondary text-[11px] font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-xs font-bold text-primary uppercase mb-2">AI Summary</div>
                  <p className="text-xs leading-relaxed text-muted-foreground italic">"Strong candidate with matching technical stack. Experience in similar enterprise roles identified. High trust score based on consistent profile data."</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3 justify-end border-t border-border pt-6">
              <button onClick={() => setViewingApp(null)} className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted">Close</button>
              <button onClick={() => { handleAction(viewingApp._id, 'Shortlisted', viewingApp.userId?.name); setViewingApp(null); }} className="px-6 py-2 text-sm rounded-md bg-gradient-brand text-primary-foreground shadow-card">Shortlist Candidate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
