import React, { useState, useEffect } from 'react';
import { Mail, Globe, Check, X } from 'lucide-react';

const ApprovalCard = ({ data, onApprove, onReject }: any) => {
  const isVerified = data.isVerifiedRecruiter;
  const statusColor = isVerified ? '#10b981' : '#f59e0b';
  const status = isVerified ? 'Verified' : 'Pending';

  // Compute a fake trust score for demo purposes based on email domain
  const hasFreeEmail = data.email.includes('gmail') || data.email.includes('yahoo');
  const trustScore = isVerified ? 98 : hasFreeEmail ? 34 : 76;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 40) return '#0ea5e9';
    return '#ef4444';
  };

  const scoreColor = getScoreColor(trustScore);

  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* Left Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{data.companyName || 'Unknown Company'}</h3>
          <span style={{ 
            padding: '0.2rem 0.6rem', 
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.65rem', 
            fontWeight: 700, 
            backgroundColor: `${statusColor}15`, 
            color: statusColor,
            textTransform: 'uppercase'
          }}>
            {status}
          </span>
        </div>
        
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {data.employeeId || 'N/A'} - {data.fullName} - {data.email} - submitted {new Date(data.createdAt).toLocaleDateString()}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
          <span style={{ 
            display: 'flex', alignItems: 'center', gap: '0.35rem', 
            padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', 
            backgroundColor: 'var(--bg-main)', fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--text-main)'
          }}>
            <Mail size={14} color="var(--text-muted)" />
            Email domain <span style={{ color: !hasFreeEmail ? '#10b981' : '#ef4444' }}>{!hasFreeEmail ? 'valid' : 'unverified'}</span>
          </span>
          <span style={{ 
            display: 'flex', alignItems: 'center', gap: '0.35rem', 
            padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', 
            backgroundColor: 'var(--bg-main)', fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--text-main)'
          }}>
            <Globe size={14} color="var(--text-muted)" />
            Website <span style={{ color: data.companyWebsite ? '#10b981' : '#ef4444' }}>{data.companyWebsite ? 'provided' : 'not confirmed'}</span>
          </span>
        </div>
      </div>

      {/* Right Score & Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>{trustScore}</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>trust score</span>
        </div>
        
        {!isVerified && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => onApprove(data._id)} style={{ 
              backgroundColor: '#10b981', color: 'white', border: 'none', 
              padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', 
              fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.35rem'
            }}>
              <Check size={14} /> Approve badge
            </button>
            <button onClick={() => onReject(data._id)} style={{ 
              backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', 
              padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', 
              fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.35rem'
            }}>
              <X size={14} /> Reject
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

const AdminApprovals = () => {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecruiters = () => {
    fetch('http://localhost:5000/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setRecruiters(data.filter((u: any) => u.role === 'recruiter'));
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleApprove = (id: string) => {
    fetch(`http://localhost:5000/api/admin/users/${id}/verify`, { method: 'PUT' })
      .then(() => fetchRecruiters())
      .catch(console.error);
  };

  const handleReject = (id: string) => {
    if (window.confirm("Are you sure you want to reject and remove this recruiter?")) {
       fetch(`http://localhost:5000/api/admin/users/${id}`, { method: 'DELETE' })
         .then(() => fetchRecruiters())
         .catch(console.error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Recruiter verification queue</h2>
        <p style={{ color: 'var(--text-muted)' }}>Review and approve recruiter accounts backed by MongoDB.</p>
      </div>

      {/* Queue List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading recruiters...</div>
        ) : recruiters.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No recruiters to display.</div>
        ) : (
          recruiters.map(item => (
            <ApprovalCard key={item._id} data={item} onApprove={handleApprove} onReject={handleReject} />
          ))
        )}
      </div>

      {/* Rules Footer */}
      <div className="card" style={{ padding: '2rem', marginTop: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>Verification rules</h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Applied automatically before manual review</p>
        
        <div style={{ display: 'flex', gap: '2rem' }}>
          <ul style={{ flex: 1, paddingLeft: '1.25rem', color: 'var(--text-main)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
            <li>Free mail domains (gmail, yahoo) lower trust score dramatically</li>
            <li>Domains under 3 months old require documents</li>
          </ul>
          <ul style={{ flex: 1, paddingLeft: '1.25rem', color: 'var(--text-main)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
            <li>Website must serve valid HTTPS and a reachable careers page</li>
            <li>3+ scam reports auto-suspends the recruiter account</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default AdminApprovals;
