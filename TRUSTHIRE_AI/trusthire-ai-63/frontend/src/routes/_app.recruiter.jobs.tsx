import { createFileRoute } from "@tanstack/react-router";
import { Plus, MoreHorizontal, Users, Loader2 } from "lucide-react";
import { apiFetchRecruiterJobs, apiCreateJob, type JobData } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/recruiter/jobs")({
  head: () => ({ meta: [{ title: "Recruiter Jobs — TrustHire AI" }] }),
  component: RecJobs,
});

function RecJobs() {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setLoading(true);
    apiFetchRecruiterJobs()
      .then(setJobs)
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleCreateJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: String(formData.get("title")),
      location: String(formData.get("location")),
      type: String(formData.get("type")),
      salary: String(formData.get("salary")),
      skills: String(formData.get("skills")),
      description: String(formData.get("description")),
    };

    try {
      await apiCreateJob(jobData);
      toast.success("Job posted! AI is analyzing trust signals...");
      setIsModalOpen(false);
      fetchJobs();
    } catch (err: any) {
      toast.error(err.message || "Failed to post job");
    } finally {
      setIsSubmitting(false);
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
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-semibold tracking-tight">Jobs & Internships</h1><p className="text-sm text-muted-foreground">Create, manage and track your roles.</p></div>
        <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-brand text-primary-foreground shadow-card text-sm"><Plus className="size-4" /> New job</button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-card rounded-2xl border border-border shadow-elevated max-w-xl w-full p-6 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-lg font-semibold">Post New Job Listing</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={handleCreateJob} className="mt-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Job Title</label>
                  <input name="title" required placeholder="e.g. Senior Frontend Developer" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Location</label>
                  <input name="location" required placeholder="e.g. Bengaluru, India or Remote" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Job Type</label>
                  <select name="type" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Full-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                    <option>Remote</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Salary Range</label>
                  <input name="salary" required placeholder="e.g. ₹12L - ₹18L" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Required Skills (Comma separated)</label>
                <input name="skills" required placeholder="e.g. React, TypeScript, Tailwind" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Job Description</label>
                <textarea name="description" required rows={4} placeholder="Describe the role, responsibilities, and requirements..." className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none" />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted">Cancel</button>
                <button disabled={isSubmitting} className="px-6 py-2 text-sm rounded-md bg-gradient-brand text-primary-foreground shadow-card disabled:opacity-50 inline-flex items-center gap-2">
                  {isSubmitting ? <><Loader2 className="size-4 animate-spin" /> Posting...</> : "Publish Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50"><tr className="text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Location</th>
              <th className="px-5 py-3 font-medium">Applicants</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium" />
            </tr></thead>
            <tbody className="divide-y divide-border">
              {jobs.map(p => (
                <tr key={p._id} className="hover:bg-muted/40">
                  <td className="px-5 py-3 font-medium">{p.title}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.location}</td>
                  <td className="px-5 py-3"><span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary"><Users className="size-3" />{p.applicants || 0}</span></td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-md border capitalize ${p.status==="active"?"bg-success/10 text-success border-success/20": p.status==="paused"?"bg-warning/15 text-[oklch(0.5_0.14_60)] border-warning/30":"bg-muted text-muted-foreground border-border"}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3 text-right"><button className="size-8 rounded-md hover:bg-muted grid place-items-center"><MoreHorizontal className="size-4" /></button></td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">No jobs posted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
