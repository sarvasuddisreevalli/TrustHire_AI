import React, { useState } from 'react';
import { UploadCloud, FileText, FileBarChart } from 'lucide-react';

interface ATSAnalysis {
  overallMatch: number;
  semanticMatch: number;
  experienceDepth: number;
  skillsCoverage: number;
  atsReadability: number;
  strongSignals: string[];
  gapsToAddress: string[];
  suggestion: string;
}

const ProgressBar = ({ label, percentage }: { label: string; percentage: number }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
      <span>{label}</span>
      <span style={{ color: 'var(--text-muted)' }}>{percentage}%</span>
    </div>
    <div style={{ height: '8px', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${percentage}%`, backgroundColor: 'var(--success)', borderRadius: 'var(--radius-full)' }}></div>
    </div>
  </div>
);

const Pill = ({ text, type }: { text: string; type: 'success' | 'error' }) => (
  <span style={{
    display: 'inline-block',
    padding: '0.35rem 0.75rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.1)',
    color: type === 'success' ? 'var(--success)' : 'var(--error)'
  }}>
    {text}
  </span>
);

const ResumeATS = () => {
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('Frontend Engineer - Linear Labs');

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a resume first.");
      return;
    }
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a PDF or Word Document (.doc, .docx) resume.");
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setAnalysis(null);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('targetRole', targetRole);

      const response = await fetch('http://localhost:5000/api/ai/ats-analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Analysis failed on server');
      }
      
      setAnalysis(data.analysis);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Error connecting to backend API.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Resume ATS Analysis</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Upload your resume and we'll match it against your target role using Gemini AI.
      </p>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Left Side: Upload Form */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', border: '2px dashed var(--accent-teal)', backgroundColor: 'rgba(13, 148, 136, 0.05)', borderRadius: 'var(--radius-lg)' }}>
            <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <UploadCloud size={32} color="var(--accent-blue)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', textAlign: 'center' }}>{file ? file.name : "Drop your resume here"}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Click to browse • PDF, DOC, DOCX up to 10 MB</p>
          </label>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Target Role</label>
            <select className="input-field" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} style={{ cursor: 'pointer' }}>
              <option value="Frontend Engineer - Linear Labs">Frontend Engineer - Linear Labs</option>
              <option value="Backend Developer - Acme Corp">Backend Developer - Acme Corp</option>
              <option value="Full Stack Developer - Startup Inc">Full Stack Developer - Startup Inc</option>
              <option value="Product Manager - TechFlow">Product Manager - TechFlow</option>
              <option value="Data Scientist - Quant Co">Data Scientist - Quant Co</option>
            </select>
          </div>

          <button className="btn-primary" onClick={handleAnalyze} disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
            {loading ? 'Analyzing with Gemini...' : 'Analyze with AI'}
          </button>
        </div>

        {/* Right Side: Results Display */}
        <div style={{ flex: '1 1 500px' }}>
          {errorMsg ? (
             <div className="card" style={{ padding: '2rem', color: 'var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
               {errorMsg}
             </div>
          ) : analysis ? (
             <div className="card" style={{ padding: '2.5rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Match report</h3>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-blue)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                   <FileBarChart size={18} /> {analysis.overallMatch}% match
                 </div>
               </div>

               <ProgressBar label="Semantic match" percentage={analysis.semanticMatch} />
               <ProgressBar label="Experience depth" percentage={analysis.experienceDepth} />
               <ProgressBar label="Skills coverage" percentage={analysis.skillsCoverage} />
               <ProgressBar label="ATS readability" percentage={analysis.atsReadability} />

               <div style={{ marginTop: '2rem' }}>
                 <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Strong Signals</div>
                 <div>
                   {analysis.strongSignals.map((signal, idx) => (
                     <Pill key={idx} text={signal} type="success" />
                   ))}
                 </div>
               </div>

               <div style={{ marginTop: '1.5rem' }}>
                 <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--error)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Gaps to Address</div>
                 <div>
                   {analysis.gapsToAddress.map((gap, idx) => (
                     <Pill key={idx} text={gap} type="error" />
                   ))}
                 </div>
               </div>

               <div style={{ marginTop: '2rem', backgroundColor: 'var(--primary-light)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', color: 'var(--primary-dark)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                 {analysis.suggestion}
               </div>

             </div>
          ) : (
            <div className="card" style={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <FileText size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>Your AI match report will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeATS;
