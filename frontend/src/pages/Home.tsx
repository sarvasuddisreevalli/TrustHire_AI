import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ScanLine, Award, Building, Sparkles, Bot, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '6rem 2rem', display: 'flex', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-light)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1.5rem', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
            <Sparkles size={16} /> AI-POWERED RECRUITMENT SAFETY
          </div>
          <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
            Find <span style={{ color: 'var(--accent-blue)' }}>Trusted</span><br />
            Jobs.<br />
            Apply with<br />
            <span style={{ color: 'var(--success)' }}>Certainty.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6 }}>
            The world's first AI trust layer for hiring. We verify recruiters, detect scams, and analyze resumes so you can focus on your career, not frauds.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/auth?mode=signup" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Get Started Free <ArrowRight size={20} />
            </Link>
            <Link to="/auth?mode=signup" className="btn-outline" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.125rem', border: 'none', backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              Explore Jobs
            </Link>
          </div>
        </div>

        {/* Hero Illustration / Dashboard Mockup */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--accent-teal)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Building size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Analysis Engine</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Linear Labs</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
                <ShieldCheck size={16} /> Verified Role
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ position: 'relative', width: '100px', height: '50px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                   <div style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100px', borderRadius: '50%', border: '10px solid var(--success)', borderBottomColor: 'transparent', borderRightColor: 'transparent', transform: 'rotate(-45deg)' }}></div>
                   <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>96%</div>
                 </div>
                 <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Trust</div>
               </div>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ position: 'relative', width: '100px', height: '50px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                   <div style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100px', borderRadius: '50%', border: '10px solid #f59e0b', borderBottomColor: 'transparent', borderRightColor: 'transparent', transform: 'rotate(-45deg)' }}></div>
                   <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>84%</div>
                 </div>
                 <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Match</div>
               </div>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ position: 'relative', width: '100px', height: '50px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                   <div style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100px', borderRadius: '50%', border: '10px solid var(--error)', borderBottomColor: 'transparent', borderLeftColor: 'transparent', transform: 'rotate(45deg)' }}></div>
                   <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, color: 'var(--error)' }}>2%</div>
                 </div>
                 <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Risk</div>
               </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                 <Bot size={16} /> AI VERDICT
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                Historical hiring data matches industry standards. Salary is in the 85th percentile of market range.
              </p>
            </div>

            {/* Scam Blocked Popup Simulation */}
            <div className="card" style={{ position: 'absolute', bottom: '-40px', left: '-40px', padding: '1rem', width: '250px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid var(--border-light)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--error)', fontWeight: 700, fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                 <AlertTriangle size={16} /> SCAM BLOCKED
               </div>
               <p style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>"Junior React Developer — ₹1.2L/week" flagged for suspicious domain and upfront payment request.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: 'white', padding: '4rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '2rem', borderRight: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>98.6%</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>ACCURACY</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '2rem', borderRight: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>12k+</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>DAILY SCANS</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>24/7</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>MONITORING</span>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Cards Row (Below main stats, matching design) */}
      <section style={{ padding: '2rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          
          <div className="card" style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>98.6%</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>DETECTION ACCURACY</div>
            </div>
          </div>

          <div className="card" style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ScanLine size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>12,400+</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>DAILY JOB SCANS</div>
            </div>
          </div>

          <div className="card" style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>8,300+</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>VERIFIED RECRUITERS</div>
            </div>
          </div>

          <div className="card" style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1.2M+</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>SAFE APPLICATIONS</div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>The Complete Trust Stack</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              Five specialized AI engines working in parallel to ensure every step of your hiring journey is protected and optimized.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Fake Job Detection</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Our neural network analyzes 50+ signals including domain age, linguistic patterns, and compensation anomalies.</p>
            </div>

            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <ScanLine size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>ATS Resume Intelligence</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Not just keywords. We use semantic analysis to match your experience to roles with 95% accuracy.</p>
            </div>

            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Credential Verification</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Automated OCR and cryptographic validation for certificates, protecting you from credential fraud.</p>
            </div>

            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Building size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Recruiter DNA</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>We verify every recruiter profile against official registration databases and professional networks.</p>
            </div>

            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Smart Job Matching</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Get matched with roles that actually fit your career trajectory, not just your past experience.</p>
            </div>

            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Bot size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>AI Career Copilot</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Ask our Gemini-powered assistant anything from interview prep to salary negotiation strategies.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'linear-gradient(135deg, #022c22 0%, #0f172a 100%)', borderRadius: 'var(--radius-xl)', padding: '5rem 3rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>
            Ready to hire with<br />confidence?
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Join the thousands of candidates and recruiters using TrustHire AI to secure the future of hiring.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/auth?mode=signup" className="btn-primary" style={{ textDecoration: 'none', backgroundColor: 'white', color: 'var(--primary-dark)', background: 'white', padding: '1rem 2.5rem', fontSize: '1.125rem', fontWeight: 700, borderRadius: 'var(--radius-full)' }}>
              Get Started Now
            </Link>
            <Link to="/about" className="btn-outline" style={{ textDecoration: 'none', borderColor: 'rgba(255,255,255,0.3)', color: 'white', background: 'rgba(255,255,255,0.1)', padding: '1rem 2.5rem', fontSize: '1.125rem', fontWeight: 700, borderRadius: 'var(--radius-full)' }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '4rem 2rem 2rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem', marginBottom: '3rem' }}>
          
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.125rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
              TrustHire <span style={{ color: 'var(--accent-teal)' }}>AI</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              The trust layer for modern hiring. Detect fake jobs, verify recruiters, and apply with confidence.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-dark)' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <li><Link to="/dashboard/jobs" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Jobs</Link></li>
                <li><Link to="/dashboard/ats" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>ATS Analysis</Link></li>
                <li><Link to="/dashboard/certificates" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Certificate Check</Link></li>
                <li><Link to="/dashboard/ai" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>AI Assistant</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-dark)' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <li><Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About</Link></li>
                <li><Link to="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</Link></li>
                <li><Link to="/auth?mode=signup" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>For Recruiters</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-dark)' }}>Trust</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <li style={{ color: 'var(--text-muted)' }}>SOC 2 (in progress)</li>
                <li style={{ color: 'var(--text-muted)' }}>GDPR compliant</li>
                <li style={{ color: 'var(--text-muted)' }}>Verified recruiter network</li>
              </ul>
            </div>
          </div>

        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '2rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          © 2026 TrustHire AI - Built for safer hiring.
        </div>
      </footer>

    </div>
  );
};

export default Home;
