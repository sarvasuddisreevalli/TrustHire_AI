import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, CheckCircle, ShieldAlert, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const growthData = [
  { name: 'Apr', users: 1500 },
  { name: 'May', users: 2000 },
  { name: 'Jun', users: 2500 },
  { name: 'Jul', users: 3200 },
  { name: 'Aug', users: 3800 },
  { name: 'Sep', users: 4310 },
];

const scamData = [
  { name: 'Phishing links', value: 38 },
  { name: 'Fee requests', value: 27 },
  { name: 'Fake companies', value: 24 },
  { name: 'Salary bait', value: 14 },
];

const StatCard = ({ title, value, subtext, icon: Icon, iconColor, iconBg }: any) => (
  <div className="card" style={{ flex: 1, minWidth: '200px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {title}
      </span>
      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={12} strokeWidth={3} />
      </div>
    </div>
    <span style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>{value}</span>
    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{subtext}</span>
  </div>
);

const AdminOverview = () => {
  const [stats, setStats] = useState<any>(null);
  const [fakeJobs, setFakeJobs] = useState<any[]>([]);

  useEffect(() => {
    // Fetch global analytics
    fetch('http://localhost:5000/api/admin/analytics')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
      
    // Fetch recent fake job reports
    fetch('http://localhost:5000/api/admin/fake-jobs')
      .then(res => res.json())
      .then(data => setFakeJobs(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner */}
      <div style={{ 
        background: 'linear-gradient(90deg, #0284c7 0%, #0f766e 100%)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '1.5rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.9 }}>
            Platform Health
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', marginBottom: '0.25rem', color: 'white' }}>
            Fraud detection blocked {stats?.pendingScamReports || 0} scam posts this week.
          </h2>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            {stats?.pendingApprovals || 0} recruiters awaiting verification • {stats?.activeJobs || 0} active jobs
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard/approvals'}
          style={{ 
          backgroundColor: 'white', 
          color: '#0f766e', 
          border: 'none', 
          padding: '0.75rem 1.5rem', 
          borderRadius: 'var(--radius-full)', 
          fontWeight: 600,
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer'
        }}>
          Review approvals <ArrowRight size={16} />
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <StatCard title="Total Users" value={stats?.totalUsers || 0} subtext="Registered candidates" icon={Users} iconBg="rgba(14, 165, 233, 0.1)" iconColor="#0ea5e9" />
        <StatCard title="Verified Recruiters" value={stats?.totalRecruiters || 0} subtext={`${stats?.pendingApprovals || 0} pending review`} icon={CheckCircle} iconBg="rgba(16, 185, 129, 0.1)" iconColor="#10b981" />
        <StatCard title="Fake Jobs Blocked" value={fakeJobs.filter(j => j.status === 'Removed').length || 0} subtext="Total removed" icon={ShieldAlert} iconBg="rgba(239, 68, 68, 0.1)" iconColor="#ef4444" />
        <StatCard title="Active Jobs" value={stats?.activeJobs || 0} subtext="Live on platform" icon={Activity} iconBg="rgba(245, 158, 11, 0.1)" iconColor="#f59e0b" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Chart */}
        <div className="card" style={{ flex: 2, minWidth: '400px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Platform growth</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Users and recruiters</p>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart */}
        <div className="card" style={{ flex: 1, minWidth: '300px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Scam types detected</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Share of blocked posts</p>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scamData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-light)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-main)' }} width={90} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Alerts List */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Latest fraud alerts</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-time detections from AI engine</p>
          </div>
          <button onClick={() => window.location.href = '/dashboard/fake-jobs'} style={{ background: 'none', border: 'none', color: 'var(--accent-teal)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>View all</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {fakeJobs.slice(0, 4).map((alert, index) => (
            <div key={alert._id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1rem 0',
              borderBottom: index !== Math.min(fakeJobs.length, 4) - 1 ? '1px solid var(--border-light)' : 'none'
            }}>
              <div>
                <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{alert.jobId?.title || 'Unknown Job'}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{alert.jobId?.recruiterId?.companyName || 'Unknown Company'} - {alert.reason}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ef4444' }}>{alert.aiConfidence}%</span>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  backgroundColor: alert.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: alert.status === 'Pending' ? '#f59e0b' : '#ef4444',
                  minWidth: '90px',
                  textAlign: 'center'
                }}>
                  {alert.status === 'Pending' ? 'Under Review' : alert.status}
                </span>
              </div>
            </div>
          ))}
          {fakeJobs.length === 0 && (
             <div style={{ padding: '1rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>No fake job alerts generated yet.</div>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminOverview;
