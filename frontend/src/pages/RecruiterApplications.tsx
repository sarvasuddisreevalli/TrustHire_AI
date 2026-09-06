import React, { useState, useEffect } from 'react';
import { Filter, Download } from 'lucide-react';

const getStageColor = (stage: string) => {
  switch(stage) {
    case 'Interviewing': return '#f59e0b'; // amber
    case 'Reviewed': return '#0ea5e9'; // sky
    case 'Pending': return '#64748b'; // slate
    case 'Accepted': return '#10b981'; // emerald
    case 'Rejected': return '#ef4444'; // red
    default: return '#64748b';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 85) return '#10b981'; // green
  if (score >= 70) return '#0ea5e9'; // blue
  return '#ef4444'; // red
};

const RecruiterApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      fetch(`http://localhost:5000/api/applications/recruiter/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setApplications(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, []);

  const statCards = [
    { label: 'NEW', value: applications.filter(a => a.status === 'Pending').length },
    { label: 'SCREENING', value: applications.filter(a => a.status === 'Reviewed').length },
    { label: 'INTERVIEW', value: applications.filter(a => a.status === 'Interviewing').length },
    { label: 'HIRED', value: applications.filter(a => a.status === 'Accepted').length }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Applications</h2>
          <p style={{ color: 'var(--text-muted)' }}>AI ranks every applicant by resume-to-job compatibility.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ 
            backgroundColor: 'white', 
            color: 'var(--primary-dark)', 
            border: '1px solid var(--border-light)', 
            padding: '0.5rem 1.25rem', 
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <Filter size={16} /> Filters
          </button>
          <button style={{ 
            backgroundColor: 'var(--accent-teal)', 
            color: 'white', 
            border: 'none', 
            padding: '0.5rem 1.25rem', 
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {statCards.map(stat => (
          <div key={stat.label} className="card" style={{ flex: 1, minWidth: '150px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              {stat.label}
            </span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Applicant List Table */}
      <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Applicant list</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sorted by match score</p>
        </div>

        {loading ? (
           <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading applicants...</div>
        ) : applications.length === 0 ? (
           <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No applications received yet.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>CANDIDATE</th>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>JOB</th>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>ATS SCORE</th>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>STAGE</th>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>APPLIED</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const stageColor = getStageColor(app.status);
                return (
                  <tr key={app._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1.25rem 0' }}>
                      <div style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>{app.candidateId?.fullName || 'Unknown Candidate'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{app.candidateId?.email || 'N/A'}</div>
                    </td>
                    <td style={{ padding: '1.25rem 0', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                      {app.jobId?.title || 'Unknown Job'}
                    </td>
                    <td style={{ padding: '1.25rem 0', fontWeight: 800, color: getScoreColor(app.atsScore) }}>
                      {app.atsScore}%
                    </td>
                    <td style={{ padding: '1.25rem 0' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '0.75rem', 
                        fontWeight: 600, 
                        backgroundColor: `${stageColor}15`, 
                        color: stageColor 
                      }}>
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecruiterApplications;
