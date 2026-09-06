import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { name: 'W1', apps: 18, interviews: 4 },
  { name: 'W2', apps: 25, interviews: 6 },
  { name: 'W3', apps: 22, interviews: 5 },
  { name: 'W4', apps: 35, interviews: 9 },
  { name: 'W5', apps: 30, interviews: 8 },
  { name: 'W6', apps: 45, interviews: 12 },
  { name: 'W7', apps: 50, interviews: 14 },
  { name: 'W8', apps: 60, interviews: 18 },
];

const pipelineData = [
  { name: 'New', count: 128 },
  { name: 'Screening', count: 74 },
  { name: 'Interview', count: 31 },
  { name: 'Offer', count: 9 },
  { name: 'Hired', count: 5 },
];

const StatCard = ({ title, value }: { title: string, value: string }) => (
  <div className="card" style={{ flex: 1, minWidth: '150px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
      {title}
    </span>
    <span style={{ fontSize: '2rem', fontWeight: 800 }}>{value}</span>
  </div>
);

const RecruiterAnalytics = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Reports & analytics</h2>
          <p style={{ color: 'var(--text-muted)' }}>Hiring performance across your active postings.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => showToast('PDF export coming soon!')} style={{ 
            backgroundColor: 'white', 
            color: 'var(--text-main)', 
            border: '1px solid var(--border-light)', 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-md)', 
            fontWeight: 500, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <Download size={16} /> PDF Report
          </button>
          <button onClick={() => showToast('CSV export coming soon!')} style={{ 
            backgroundColor: 'white', 
            color: 'var(--text-main)', 
            border: '1px solid var(--border-light)', 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-md)', 
            fontWeight: 500, 
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
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <StatCard title="Time to hire" value="18 days" />
        <StatCard title="Interview rate" value="29%" />
        <StatCard title="Offer acceptance" value="76%" />
        <StatCard title="Match accuracy" value="84%" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Line Chart */}
        <div className="card" style={{ flex: 2, minWidth: '400px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Applications vs interviews</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Last 8 weeks</p>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="apps" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: 'white', strokeWidth: 2 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: 'white', strokeWidth: 2 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card" style={{ flex: 1.5, minWidth: '350px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Pipeline breakdown</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Current candidates per stage</p>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#0284c7" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default RecruiterAnalytics;
