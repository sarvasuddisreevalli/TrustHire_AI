import { createFileRoute } from "@tanstack/react-router";
import { apiFetchRecruiters, apiRecruiterAction } from "@/lib/api";
import { useEffect, useState } from "react";
import { ShieldCheck, XCircle, Ban, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/admin/recruiters")({
  head: () => ({ meta: [{ title: "Recruiter Approvals — TrustHire AI" }] }),
  component: AdminRecruiters,
});

function AdminRecruiters() {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = () => {
    setLoading(true);
    apiFetchRecruiters()
      .then(setRecruiters)
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleAction = async (id: string, action: 'approve' | 'reject' | 'block') => {
    try {
      await apiRecruiterAction(id, action);
      toast.success(`Recruiter ${action}d`);
      fetchRecruiters();
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    }
  };

  const filtered = recruiters.filter(r => 
    r.name.toLowerCase().includes(q.toLowerCase()) || 
    r.company.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Recruiter Management</h1>
        <p className="text-sm text-muted-foreground">Verify and approve companies joining the platform.</p>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary max-w-sm">
        <Search className="size-4 text-muted-foreground" />
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search companies or HR names…" className="bg-transparent outline-none text-sm w-full" />
      </div>

      {loading ? (
        <div className="h-64 grid place-items-center"><Loader2 className="size-8 animate-spin text-primary" /></div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 border-b border-border">
              <tr className="text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Recruiter / Company</th>
                <th className="px-5 py-3 font-medium">AI Trust Score</th>
                <th className="px-5 py-3 font-medium">Signals</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(r => (
                <tr key={r._id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.company} · {r.email}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`size-8 rounded-full border-2 grid place-items-center text-[10px] font-bold ${r.aiTrustScore >= 70 ? "border-success text-success" : r.aiTrustScore >= 40 ? "border-warning text-warning" : "border-destructive text-destructive"}`}>
                        {r.aiTrustScore}
                      </div>
                      <div className="text-xs text-muted-foreground">AI Rating</div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {r.aiSignals?.slice(0, 3).map((s: string) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-secondary text-[10px] whitespace-nowrap">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${r.verificationStatus === 'approved' ? "bg-success/10 text-success" : r.verificationStatus === 'pending' ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                      {r.verificationStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {r.verificationStatus === 'pending' && (
                        <button onClick={() => handleAction(r._id, 'approve')} className="size-8 rounded-md bg-success/10 text-success hover:bg-success/20 grid place-items-center shadow-sm" title="Approve"><ShieldCheck className="size-4" /></button>
                      )}
                      <button onClick={() => handleAction(r._id, 'reject')} className="size-8 rounded-md bg-warning/10 text-warning hover:bg-warning/20 grid place-items-center shadow-sm" title="Reject"><XCircle className="size-4" /></button>
                      <button onClick={() => handleAction(r._id, 'block')} className="size-8 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 grid place-items-center shadow-sm" title="Block"><Ban className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
