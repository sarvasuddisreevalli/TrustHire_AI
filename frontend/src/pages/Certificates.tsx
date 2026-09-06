import React, { useState } from 'react';
import { UploadCloud, CheckCircle, ShieldAlert } from 'lucide-react';

const Certificates = () => {
  const [verification, setVerification] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState('AWS Certification');
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async () => {
    if (!file) {
      alert("Please upload a certificate first.");
      return;
    }
    const validTypes = ['application/pdf', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.txt')) {
      alert("Currently only PDF and TXT files are supported for Certificates.");
      return;
    }
    
    setLoading(true);
    setErrorMsg('');
    setVerification('');
    
    try {
      const formData = new FormData();
      formData.append('certificate', file);
      formData.append('issuerName', issuer);

      const response = await fetch('http://localhost:5000/api/ai/verify-certificate', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed on server');
      }
      
      setVerification(data.verification || 'Verification failed');
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Error connecting to backend API.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Certificate Verification</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Upload a certificate and our AI will verify its authenticity against known issuer formats.
      </p>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', border: '2px dashed var(--accent-teal)', backgroundColor: 'rgba(13, 148, 136, 0.05)', borderRadius: 'var(--radius-lg)' }}>
            <input type="file" accept=".pdf,.txt" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <UploadCloud size={32} color="var(--accent-blue)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', textAlign: 'center' }}>{file ? file.name : "Drop certificate here"}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Click to browse • PDF, TXT supported</p>
          </label>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Issuer / Organization</label>
            <select className="input-field" value={issuer} onChange={(e) => setIssuer(e.target.value)} style={{ cursor: 'pointer' }}>
              <option value="AWS Certification">AWS Certification</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Google Cloud">Google Cloud</option>
              <option value="Coursera">Coursera</option>
              <option value="CompTIA">CompTIA</option>
              <option value="Udemy">Udemy</option>
            </select>
          </div>
          
          <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} onClick={handleVerify} disabled={loading}>
             {loading ? 'Verifying with AI...' : 'Verify Authenticity'}
          </button>
        </div>

        <div className="card" style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
          {errorMsg ? (
             <div style={{ padding: '2rem', color: 'var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: 'var(--radius-lg)' }}>
               {errorMsg}
             </div>
          ) : verification ? (
             <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Verification Report</h3>
                  <span style={{ 
                    padding: '0.4rem 1rem', 
                    borderRadius: 'var(--radius-full)', 
                    fontSize: '0.85rem', 
                    fontWeight: 700, 
                    textTransform: 'uppercase',
                    backgroundColor: (verification as any).verdict === 'Genuine' ? 'rgba(16, 185, 129, 0.15)' : (verification as any).verdict === 'Fake' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: (verification as any).verdict === 'Genuine' ? '#10b981' : (verification as any).verdict === 'Fake' ? '#ef4444' : '#f59e0b',
                  }}>
                    {(verification as any).verdict}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{(verification as any).confidenceScore}%</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>AI Confidence Score based on structural, semantic, and metadata analysis.</div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Executive Summary</h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-main)' }}>{(verification as any).executiveSummary}</p>
                </div>

                {((verification as any).anomalies || []).length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#ef4444', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ShieldAlert size={16} /> Detected Anomalies
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                      {((verification as any).anomalies || []).map((anomaly: any, i: number) => (
                        <li key={i} style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderLeft: `3px solid ${anomaly.severity === 'High' ? '#ef4444' : '#f59e0b'}`, borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{anomaly.title}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{anomaly.description}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {((verification as any).authenticElements || []).length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#10b981', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} /> Verified Elements
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
                      {((verification as any).authenticElements || []).map((el: string, i: number) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                          <CheckCircle size={14} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                          {el}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

             </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>Verification result will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
