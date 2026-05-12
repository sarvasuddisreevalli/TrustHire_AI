import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GaugeMeter } from "@/components/site/GaugeMeter";
import { apiVerifyCertificate } from "@/lib/api";
import { Upload, BadgeCheck, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/certificate-check")({
  head: () => ({ meta: [{ title: "Certificate Verification — TrustHire AI" }] }),
  component: CertCheck,
});

function CertCheck() {
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [filename, setFilename] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    handleVerify(file);
  };

  const handleVerify = async (file: File | null = null, sampleType?: string) => {
    setVerifying(true);
    try {
      const res = await apiVerifyCertificate(file, sampleType);
      setResult(res);
      if (res.verdict === 'authentic') toast.success("Certificate verified!");
      else toast.warning("Suspicious certificate detected");
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Certificate Verification</h1>
        <p className="text-sm text-muted-foreground">OCR + QR validation detects altered certificates and verifies issuer authenticity using Gemini AI.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <label className="block">
            <div className="rounded-xl border-2 border-dashed border-border bg-secondary/40 p-10 text-center cursor-pointer hover:border-primary/40 transition">
              <Upload className="mx-auto size-7 text-primary" />
              <div className="mt-3 font-medium">{filename || "Upload certificate"}</div>
              <div className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF · QR supported</div>
            </div>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button disabled={verifying} onClick={() => handleVerify(null, 'genuine')} className="px-4 py-2.5 rounded-md bg-gradient-brand text-primary-foreground shadow-card disabled:opacity-50 inline-flex items-center justify-center gap-2">
              {verifying ? <Loader2 className="size-4 animate-spin" /> : "Verify (sample · genuine)"}
            </button>
            <button disabled={verifying} onClick={() => handleVerify(null, 'suspicious')} className="px-4 py-2.5 rounded-md border border-border hover:bg-muted disabled:opacity-50">
              Verify (sample · altered)
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          {!result && !verifying ? (
            <div className="h-full grid place-items-center text-center text-muted-foreground py-16">
              <div>
                <BadgeCheck className="size-10 mx-auto opacity-40" />
                <p className="mt-3 text-sm">Verification result appears here.</p>
              </div>
            </div>
          ) : verifying ? (
            <div className="h-full grid place-items-center text-center py-16">
              <div>
                <Loader2 className="size-10 mx-auto text-primary animate-spin" />
                <p className="mt-3 text-sm text-muted-foreground">Analyzing certificate pixels and metadata...</p>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-2 gap-2 items-center">
                <GaugeMeter value={result.trustScore} label="Trust" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Verdict</div>
                  <div className="text-lg font-semibold mt-1 inline-flex items-center gap-2">
                    {result.verdict === "authentic" ? <><ShieldCheck className="size-5 text-success" /> Authentic</> : <><AlertTriangle className="size-5 text-destructive" /> Suspicious</>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{result.reasoning}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Field k="Issuer" v={result.issuer} />
                <Field k="Recipient" v={result.recipient} />
                <Field k="Course" v={result.course} />
                <Field k="Issued" v={result.issuedDate} />
              </div>

              <div className="mt-5 rounded-lg border border-border bg-secondary/40 p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Assessment</div>
                <p className="text-sm mt-1">{result.reasoning}</p>
              </div>

              {result.redFlags?.length > 0 && (
                <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm">
                  <div className="font-medium text-destructive">Red flags detected</div>
                  <ul className="mt-1 space-y-1 text-muted-foreground list-disc pl-5">
                    {result.redFlags.map((rf: string, i: number) => <li key={i}>{rf}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return <div className="rounded-lg border border-border p-3"><div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</div><div className="font-medium mt-0.5">{v}</div></div>;
}
