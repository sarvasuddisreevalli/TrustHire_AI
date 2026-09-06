import React, { useState, useEffect } from 'react';
import { Briefcase, FileText, CheckCircle, AlertTriangle, ArrowRight, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const activityData = [
  { name: 'W1', apps: 15, interviews: 5 },
  { name: 'W2', apps: 20, interviews: 8 },
  { name: 'W3', apps: 18, interviews: 6 },
  { name: 'W4', apps: 30, interviews: 10 },
  { name: 'W5', apps: 28, interviews: 9 },
  { name: 'W6', apps: 40, interviews: 15 },
  { name: 'W7', apps: 55, interviews: 18 },
  { name: 'W8', apps: 70, interviews: 22 },
];

const fraudData = [
  { name: 'W1', value: 2 },
  { name: 'W2', value: 5 },
  { name: 'W3', value: 3 },
  { name: 'W4', value: 4 },
  { name: 'W5', value: 1 },
  { name: 'W6', value: 8 },
  { name: 'W7', value: 4 },
  { name: 'W8', value: 2 },
];

const StatCard = ({ title, value, subtext, icon: Icon, iconColor, iconBg, borderTopColor }: any) => (
  <div className="card" style={{ flex: 1, minWidth: '200px', padding: '1.5rem', display: 'flex', flexDirection: 'column', borderTop: borderTopColor ? `4px solid ${borderTopColor}` : 'none' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {title}
      </span>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={14} strokeWidth={3} />
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{value}</span>
      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{subtext}</span>
    </div>
  </div>
);

const ApplicantItem = ({ name, role, matchScore, status, statusColor }: any) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 0', borderBottom: '1px solid var(--border-light)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(15, 23, 42, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
        {name ? name.charAt(0).toUpperCase() : 'U'}
      </div>
      <div>
        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{name}</h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{role}</p>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
        <span style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>
          {matchScore}%
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>match</span>
      </div>
      <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, backgroundColor: `${statusColor}15`, color: statusColor, minWidth: '80px', textAlign: 'center' }}>
        {status}
      </span>
    </div>
  </div>
);

const getStageColor = (stage: string) => {
  switch(stage) {
    case 'Interviewing': return '#f59e0b';
    case 'Reviewed': return '#0ea5e9';
    case 'Pending': return '#10b981';
    case 'Accepted': return '#8b5cf6';
    case 'Rejected': return '#ef4444';
    default: return '#64748b';
  }
};

const RecruiterOverview = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { fullName: 'Recruiter' };
  const firstName = user.fullName ? user.fullName.split(' ')[0] : 'Recruiter';

  useEffect(() => {
    if (user?.id) {
      // Fetch Applications
      fetch(`http://localhost:5000/api/applications/recruiter/${user.id}`)
        .then(res => res.json())
        .then(data => setApplications(data))
        .catch(console.error);

      // Fetch Jobs
      fetch(`http://localhost:5000/api/jobs/recruiter/${user.id}`)
        .then(res => res.json())
        .then(data => setJobs(data))
        .catch(console.error);
    }
  }, [user?.id]);

  const activeJobsCount = jobs.filter(j => j.status === 'Active').length;
  const avgMatch = applications.length > 0 
    ? Math.round(applications.reduce((acc, app) => acc + app.atsScore, 0) / applications.length)
    : 0;
  const flaggedJobsCount = jobs.filter(j => j.scamScore > 50).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Banner */}
      <div style={{ 
        background: 'linear-gradient(90deg, #0284c7 0%, #0f766e 100%)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '2rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', opacity: 0.9 }}>
            WELCOME BACK, {firstName.toUpperCase()}
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>
            Your hiring pipeline is moving fast this week.
          </h2>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            {applications.length} total applications • {activeJobsCount} active jobs • {flaggedJobsCount} flagged posts
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard/applications'}
          style={{ 
          backgroundColor: 'white', 
          color: 'var(--primary-dark)', 
          border: 'none', 
          padding: '0.75rem 1.5rem', 
          borderRadius: 'var(--radius-full)',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          Review applicants <ArrowRight size={16} />
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <StatCard title="Active Jobs" value={activeJobsCount} subtext="Currently live" icon={Briefcase} iconColor="#10b981" iconBg="rgba(16, 185, 129, 0.1)" />
        <StatCard title="Applications" value={applications.length} subtext="Total received" icon={FileText} iconColor="#10b981" iconBg="rgba(16, 185, 129, 0.1)" />
        <StatCard title="Avg Match Score" value={`${avgMatch}%`} subtext="AI resume-job matching" icon={CheckCircle} iconColor="#f59e0b" iconBg="rgba(245, 158, 11, 0.1)" />
        <StatCard title="Flagged Posts" value={flaggedJobsCount} subtext="Needs your attention" icon={AlertTriangle} iconColor="#ef4444" iconBg="rgba(239, 68, 68, 0.1)" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Line Chart */}
        <div className="card" style={{ flex: 2, minWidth: '400px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Application activity</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Last 8 weeks</p>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="apps" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorApps)" />
                <Area type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorInterviews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card" style={{ flex: 1, minWidth: '300px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Fraud blocked</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Per week</p>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fraudData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
      </div>

      {/* Latest Applicants */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Latest applicants</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-time updates from database</p>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--accent-teal)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>View all</button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {applications.slice(0, 4).map(app => (
             <ApplicantItem 
               key={app._id}
               name={app.candidateId?.fullName || 'Candidate'} 
               role={app.jobId?.title || 'Unknown Role'} 
               matchScore={app.atsScore} 
               status={app.status} 
               statusColor={getStageColor(app.status)} 
             />
          ))}
          {applications.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No applications yet.</div>
          )}
        </div>
      </div>

    </div>
  );
};

export default RecruiterOverview;
