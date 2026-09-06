import React, { useState, useEffect } from 'react';
import { AlertCircle, Check, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const detectionsData = [
  { name: 'W1', value: 2 },
  { name: 'W2', value: 5 },
  { name: 'W3', value: 3 },
  { name: 'W4', value: 4 },
  { name: 'W5', value: 1 },
  { name: 'W6', value: 8 },
  { name: 'W7', value: 4 },
  { name: 'W8', value: 2 },
];

const AdminFakeJobs = () => {
  const [fakeJobs, setFakeJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFakeJobs = () => {
    fetch('http://localhost:5000/api/admin/fake-jobs')
      .then(res => res.json())
      .then(data => {
        setFakeJobs(data);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchFakeJobs();
  }, []);

  const handleMarkSafe = (id: string) => {
    fetch(`http://localhost:5000/api/admin/fake-jobs/${id}/safe`, { method: 'PUT' })
      .then(() => fetchFakeJobs())
      .catch(console.error);
  };

  const handleRemove = (id: string) => {
    if (window.confirm("Are you sure you want to permanently remove this scam job?")) {
      fetch(`http://localhost:5000/api/admin/fake-jobs/${id}/remove`, { method: 'DELETE' })
        .then(() => fetchFakeJobs())
        .catch(console.error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Fake job detection</h2>
        <p style={{ color: 'var(--text-muted)' }}>NLP scanning of job descriptions, salary sanity checks and phishing link detection.</p>
      </div>

      {/* Top Row: Chart & Stats */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Chart */}
        <div className="card" style={{ flex: 2, minWidth: '400px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Detections per week</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Last 8 weeks</p>
          <div style={{ height: '200px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detectionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#ef4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats */}
        <div className="card" style={{ flex: 1, minWidth: '250px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Model performance</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Fake job classifier</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--border-light)', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Precision</span>
              <span style={{ fontWeight: 700 }}>0.94</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--border-light)', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Recall</span>
              <span style={{ fontWeight: 700 }}>0.89</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--border-light)', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>False positives (30d)</span>
              <span style={{ fontWeight: 700 }}>{fakeJobs.filter(j => j.status === 'Safe').length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Avg scan time</span>
              <span style={{ fontWeight: 700 }}>1.2s</span>
            </div>
          </div>
        </div>

      </div>

      {/* Jobs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading AI reports...</div>
        ) : fakeJobs.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No fake job reports found.</div>
        ) : (
          fakeJobs.map((report) => {
            
            const isRemoved = report.status === 'Removed';
            const isCleared = report.status === 'Safe';
            const isReview = report.status === 'Pending';
            
            let statusColor = '#f59e0b';
            if (isRemoved) statusColor = '#ef4444';
            if (isCleared) statusColor = '#10b981';

            let scoreColor = '#ef4444';
            if (report.aiConfidence < 40) scoreColor = '#10b981';
            else if (report.aiConfidence < 75) scoreColor = '#f59e0b';

            return (
              <div key={report._id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{report.jobId?.title || 'Deleted Job'}</h3>
                    <span style={{ 
                      padding: '0.15rem 0.6rem', 
                      borderRadius: 'var(--radius-full)', 
                      fontSize: '0.65rem', 
                      fontWeight: 700, 
                      backgroundColor: `${statusColor}15`, 
                      color: statusColor,
                    }}>
                      {report.status}
                    </span>
                  </div>
                  
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    ID: {report._id.substring(report._id.length - 6)} • {report.jobId?.recruiterId?.companyName || 'Unknown Company'} • detected {new Date(report.createdAt).toLocaleDateString()}
                  </p>

                  <div style={{ 
                    backgroundColor: 'rgba(239, 68, 68, 0.05)', 
                    border: '1px solid rgba(239, 68, 68, 0.1)',
                    borderRadius: 'var(--radius-md)', 
                    padding: '0.75rem 1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginBottom: isReview ? '1rem' : '0'
                  }}>
                    <AlertCircle size={16} />
                    <span>{report.reason}</span>
                  </div>

                  {isReview && (
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button onClick={() => handleRemove(report._id)} style={{ 
                        backgroundColor: '#ef4444', color: 'white', border: 'none', 
                        padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', 
                        fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.4rem'
                      }}>
                        <X size={14} /> Remove posting
                      </button>
                      <button onClick={() => handleMarkSafe(report._id)} style={{ 
                        backgroundColor: 'white', color: 'var(--text-main)', border: '1px solid var(--border-light)', 
                        padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', 
                        fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.4rem'
                      }}>
                        <Check size={14} /> Mark as safe
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '100px' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>{report.aiConfidence}%</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>scam probability</span>
                </div>
              </div>
            );
          })
        )}
      </div>
      
    </div>
  );
};

export default AdminFakeJobs;
