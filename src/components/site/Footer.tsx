import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-semibold">TrustHire <span className="text-gradient">AI</span></div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">The trust layer for modern hiring. Detect fake jobs, verify recruiters, and apply with confidence.</p>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Product</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/resume-analysis">ATS Analysis</Link></li>
            <li><Link to="/certificate-check">Certificate Check</Link></li>
            <li><Link to="/chatbot">AI Assistant</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/recruiter-register">For Recruiters</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Trust</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>SOC 2 (in progress)</li>
            <li>GDPR compliant</li>
            <li>Verified recruiter network</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} TrustHire AI · Built for safer hiring.</div>
    </footer>
  );
}
