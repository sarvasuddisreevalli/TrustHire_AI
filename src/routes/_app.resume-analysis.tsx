import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GaugeMeter } from "@/components/site/GaugeMeter";
import { apiAnalyzeResume } from "@/lib/api";
import { Upload, FileText, CheckCircle2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/resume-analysis")({
  head: () => ({ meta: [{ title: "Resume ATS Analysis — TrustHire AI" }] }),
  component: Analysis,
});

function Analysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState("Frontend Engineer · Linear Labs");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    handleAnalyze(file);
  };

  const handleAnalyze = async (file: File | null = null) => {
    setAnalyzing(true);
    try {
      const res = await apiAnalyzeResume(file, targetRole);
      setResult(res);
      toast.success("Analysis complete!");
    } catch (err: any) {
      toast.error(err.message || "Resume analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Resume ATS Analysis</h1>
        <p className="text-sm text-muted-foreground">Upload your resume and we'll match it against your target role using Gemini AI.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <label className="block">
            <div className="rounded-xl border-2 border-dashed border-border bg-secondary/40 p-10 text-center cursor-pointer hover:border-primary/40 transition">
              <Upload className="mx-auto size-7 text-primary" />
              <div className="mt-3 font-medium">{filename || "Drop your resume here"}</div>
              <div className="text-xs text-muted-foreground mt-1">PDF, DOCX up to 10 MB</div>
            </div>
            <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} />
          </label>
          <button disabled={analyzing} onClick={() => handleAnalyze()} className="mt-4 w-full px-4 py-2.5 rounded-md bg-gradient-brand text-primary-foreground shadow-card inline-flex items-center justify-center gap-2">
            {analyzing ? <><Loader2 className="size-4 animate-spin" /> Analyzing…</> : "Analyze with AI"}
          </button>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Target role</div>
            <select value={targetRole} onChange={e=>setTargetRole(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>Frontend Engineer · Linear Labs</option>
              <option>ML Engineer Intern · Stripe</option>
              <option>Backend Engineer · Razorpay</option>
              <option>Product Designer · Figma</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          {!result && !analyzing ? (
            <div className="h-full grid place-items-center text-center text-muted-foreground py-16">
              <div>
                <FileText className="size-10 mx-auto opacity-40" />
                <p className="mt-3 text-sm">Your AI analysis will appear here.</p>
              </div>
            </div>
          ) : analyzing ? (
            <div className="h-full grid place-items-center text-center py-16">
              <div>
                <Loader2 className="size-10 mx-auto text-primary animate-spin" />
                <p className="mt-3 text-sm text-muted-foreground">Gemini is parsing your resume...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-2 gap-3 items-center">
                <GaugeMeter value={result.atsScore} label="ATS Match" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Result</div>
                  <div className="text-lg font-semibold mt-1">{result.result}</div>
                  <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>
                </div>
              </div>

              <Section title="Extracted skills">
                {result.extractedSkills?.map((s: string) => <Chip key={s}>{s}</Chip>)}
              </Section>
              <Section title="Missing keywords for this role">
                {result.missingKeywords?.map((s: string) => <Chip key={s} tone="warn">{s}</Chip>)}
              </Section>
              <Section title="Suggested certifications">
                {result.suggestedCertifications?.map((s: string) => <Chip key={s} tone="ok">{s}</Chip>)}
              </Section>
              <div className="rounded-lg border border-border bg-secondary/40 p-4 text-sm">
                <div className="font-medium flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Resume improvement suggestions</div>
                <ul className="mt-2 space-y-1 text-muted-foreground list-disc pl-5">
                  {result.improvements?.map((imp: string, i: number) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "warn" | "ok" }) {
  const map = {
    default: "bg-secondary text-secondary-foreground",
    warn: "bg-warning/15 text-[oklch(0.45_0.14_60)] border border-warning/30",
    ok: "bg-success/10 text-success border border-success/20",
  } as const;
  return <span className={`text-xs px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${map[tone]}`}>{tone === "warn" && <Plus className="size-3" />}{children}</span>;
}
