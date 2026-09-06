import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Mail, Check, ChevronDown } from 'lucide-react';

const getScoreColor = (score: number) => {
  if (score >= 85) return '#10b981'; // green
  if (score >= 70) return '#0ea5e9'; // blue
  return '#ef4444'; // red
};

const CandidateCard = ({ candidate, showToast, jobsData }: any) => {
  const [invitedJob, setInvitedJob] = useState<string | null>(null);
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  
  // Simulate AI scores for candidate pool since they haven't applied to a specific job yet
  const matchScore = Math.floor(Math.random() * 30) + 65; // 65-95
  const trustScore = Math.floor(Math.random() * 20) + 80; // 80-100
  
  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(15, 23, 42, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
          {candidate.fullName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 style={{ fontWeight: 600 }}>{candidate.fullName}</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{candidate.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>MATCH</span>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: getScoreColor(matchScore) }}>{matchScore}%</span>
        </div>
        <div style={{ width: '1px', backgroundColor: 'var(--border-light)' }}></div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>TRUST</span>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: getScoreColor(trustScore) }}>{trustScore}</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 'auto' }}>
        <button 
          onClick={() => {
            if (!invitedJob) {
              setShowJobDropdown(!showJobDropdown);
            }
          }} 
          disabled={!!invitedJob}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-full)', 
            backgroundColor: invitedJob ? 'var(--bg-main)' : 'white', 
            color: invitedJob ? 'var(--text-muted)' : 'var(--primary-dark)', 
            border: '1px solid var(--border-light)', 
            fontSize: '0.875rem', fontWeight: 600, 
            cursor: invitedJob ? 'default' : 'pointer' 
          }}
        >
          {invitedJob ? <Check size={16} /> : <Mail size={16} />}
          {invitedJob ? 'Invited' : 'Invite to apply'}
          {!invitedJob && <ChevronDown size={14} />}
        </button>
        
        {showJobDropdown && (
          <div className="card" style={{ 
            position: 'absolute', bottom: '100%', right: '0', marginBottom: '0.5rem',
            width: '220px', padding: '0.5rem', zIndex: 50,
            display: 'flex', flexDirection: 'column', gap: '0.25rem'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', padding: '0.25rem 0.5rem', marginBottom: '0.25rem' }}>Select a role:</div>
            {jobsData && jobsData.length > 0 ? (
              jobsData.filter((j: any) => j.status === 'Active').map((job: any) => (
                <button 
                  key={job._id}
                  onClick={async () => {
                    try {
                      const res = await fetch('http://localhost:5000/api/applications', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          jobId: job._id,
                          candidateId: candidate._id,
                          resumeText: 'Invited directly by recruiter from candidate pool.',
                          atsScore: 100,
                          status: 'Pending'
                        })
                      });
                      if (res.ok) {
                        setInvitedJob(job.title);
                        setShowJobDropdown(false);
                        showToast(`Invitation sent for ${job.title}!`);
                      } else {
                        showToast('Failed to send invite.');
                      }
                    } catch (e) {
                      showToast('Error sending invite.');
                    }
                  }}
                  style={{ 
                    textAlign: 'left', padding: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)',
                    borderRadius: 'var(--radius-md)', border: 'none', background: 'transparent',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-main)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {job.title}
                </button>
              ))
            ) : (
              <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>No active jobs found.</div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

const RecruiterCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobsData, setJobsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    // Fetch all users with role 'user' (candidates) from the admin users endpoint
    fetch('http://localhost:5000/api/admin/users')
      .then(res => res.json())
      .then(data => {
        const candidateUsers = data.filter((u: any) => u.role === 'user');
        setCandidates(candidateUsers);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch candidates', err);
        setLoading(false);
      });

    // Fetch recruiter's jobs to populate the invite dropdown
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      fetch(`http://localhost:5000/api/jobs/recruiter/${user.id}`)
        .then(res => res.json())
        .then(data => setJobsData(data))
        .catch(console.error);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
      {toastMessage && (
        <div style={{ 
          position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', 
          backgroundColor: 'var(--primary-dark)', color: 'white', 
          padding: '1rem 2rem', borderRadius: 'var(--radius-full)', 
          zIndex: 9999, fontWeight: 600, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' 
        }}>
          {toastMessage}
        </div>
      )}
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Candidate pool</h2>
          <p style={{ color: 'var(--text-muted)' }}>Discover verified candidates registered on TrustHire AI.</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', backgroundColor: 'white', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
        <Search size={18} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search by skill, role or keyword (e.g. React, NLP)" 
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem' }}
        />
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {loading ? (
          <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading candidate pool...</div>
        ) : candidates.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No candidates registered yet.</div>
        ) : (
          candidates.map(candidate => (
            <CandidateCard key={candidate._id} candidate={candidate} showToast={showToast} jobsData={jobsData} />
          ))
        )}
      </div>

    </div>
  );
};

export default RecruiterCandidates;
