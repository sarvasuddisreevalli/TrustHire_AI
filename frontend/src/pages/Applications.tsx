import React, { useState, useEffect } from 'react';
import { Briefcase, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import RecruiterApplications from './RecruiterApplications';

const Applications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  useEffect(() => {
    if (user?.id && user?.role !== 'recruiter' && user?.role !== 'admin') {
      fetch(`http://localhost:5000/api/applications/candidate/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setApplications(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch applications', err);
          setLoading(false);
        });
    }
  }, [user?.id, user?.role]);

  if (user?.role === 'recruiter' || user?.role === 'admin') {
    return <RecruiterApplications />;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock size={16} />;
      case 'Reviewed': return <FileText size={16} />;
      case 'Interviewing': return <Briefcase size={16} />;
      case 'Accepted': return <CheckCircle size={16} />;
      case 'Rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return '#f59e0b';
      case 'Reviewed': return '#3b82f6';
      case 'Interviewing': return '#8b5cf6';
      case 'Accepted': return '#10b981';
      case 'Rejected': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Your Applications</h2>
        <p style={{ color: 'var(--text-muted)' }}>Track every application in one place.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading your applications...</div>
        ) : applications.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5rem 2rem',
            border: '2px dashed var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            minHeight: '300px'
          }}>
            <Briefcase size={48} style={{ color: 'var(--border-light)', marginBottom: '1.5rem', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              No applications yet
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Start applying to trusted jobs to see them here.
            </p>
          </div>
        ) : (
          applications.map(app => {
            const statusColor = getStatusColor(app.status);
            return (
              <div key={app._id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>{app.jobId?.title || 'Unknown Job'}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{app.jobId?.company || 'Company'}</p>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                       <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Applied on {new Date(app.createdAt).toLocaleDateString()}</span>
                       <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: statusColor + '15', color: statusColor }}>
                         {getStatusIcon(app.status)} {app.status}
                       </span>
                    </div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                       <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>ATS Match</span>
                       <span style={{ fontSize: '1.25rem', fontWeight: 800, color: app.atsScore > 75 ? 'var(--accent-teal)' : 'var(--text-main)' }}>{app.atsScore}%</span>
                    </div>
                 </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Applications;
