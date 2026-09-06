import React from 'react';
import { ShieldCheck, ScanLine, Briefcase, AlertTriangle, ArrowRight } from 'lucide-react';
import RecruiterOverview from './RecruiterOverview';
import AdminOverview from './AdminOverview';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const activityData = [
  { name: 'W1', value: 15 },
  { name: 'W2', value: 20 },
  { name: 'W3', value: 18 },
  { name: 'W4', value: 30 },
  { name: 'W5', value: 28 },
  { name: 'W6', value: 35 },
  { name: 'W7', value: 45 },
  { name: 'W8', value: 55 },
];

const fraudData = [
  { name: 'W1', value: 2 },
  { name: 'W2', value: 5 },
  { name: 'W3', value: 3 },
  { name: 'W4', value: 4 },
  { name: 'W5', value: 2, isGrey: true },
  { name: 'W6', value: 8, isHighlight: true },
  { name: 'W7', value: 4 },
  { name: 'W8', value: 2 },
];

const StatCard = ({ title, value, subtext, icon: Icon, iconColor, iconBg }: any) => (
  <div className="card" style={{ flex: 1, minWidth: '200px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
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

const Gauge = ({ value, label, color, emptyColor }: any) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke={emptyColor}
            strokeWidth="8"
          />
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: color }}>{value}%</span>
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {label}
      </span>
    </div>
  );
};

const Overview = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  if (user?.role === 'admin') {
    return <AdminOverview />;
  }
  
  if (user?.role === 'recruiter') {
    return <RecruiterOverview />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '2rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', opacity: 0.9 }}>
            WELCOME BACK, GARAGA
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>
            Your trust score this week is excellent.
          </h2>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            0 new matches found • 2 risky jobs blocked • ATS rose by +6
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard/jobs'}
          style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
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
          Explore matches <ArrowRight size={16} />
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <StatCard title="Trust Score" value="92" subtext="+3 this week" icon={ShieldCheck} iconColor="#10b981" iconBg="rgba(16, 185, 129, 0.1)" />
        <StatCard title="ATS Average" value="0%" subtext="Across all applications" icon={ScanLine} iconColor="#3b82f6" iconBg="rgba(59, 130, 246, 0.1)" />
        <StatCard title="Applications" value="0" subtext="View status" icon={Briefcase} iconColor="#6366f1" iconBg="rgba(99, 102, 241, 0.1)" />
        <StatCard title="Fraud Blocked" value="2" subtext="This month" icon={AlertTriangle} iconColor="#ef4444" iconBg="rgba(239, 68, 68, 0.1)" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Line Chart */}
        <div className="card" style={{ flex: 1, minWidth: '300px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Application activity</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Last 8 weeks</p>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
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
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {fraudData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isGrey ? '#d1d5db' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gauges */}
        <div className="card" style={{ flex: 1, minWidth: '300px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Your trust meters</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Resume readiness</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '180px' }}>
            <Gauge value={0} label="ATS" color="#ef4444" emptyColor="rgba(239, 68, 68, 0.1)" />
            <Gauge value={92} label="PROFILE TRUST" color="#10b981" emptyColor="rgba(16, 185, 129, 0.1)" />
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <h4 style={{ fontWeight: 600 }}>Recommended for you</h4>
        <button 
          onClick={() => window.location.href = '/dashboard/jobs'} 
          style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.875rem', cursor: 'pointer' }}
        >
          View all
        </button>
      </div>
    </div>
  );
};

export default Overview;
