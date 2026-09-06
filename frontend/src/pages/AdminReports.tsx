import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { name: 'Apr', users: 1500, recruiters: 120 },
  { name: 'May', users: 2000, recruiters: 140 },
  { name: 'Jun', users: 2500, recruiters: 160 },
  { name: 'Jul', users: 3200, recruiters: 190 },
  { name: 'Aug', users: 3800, recruiters: 205 },
  { name: 'Sep', users: 4310, recruiters: 214 },
];

const reportCards = [
  {
    title: 'Fake job detection report',
    description: '29 blocked postings, scam type breakdown',
  },
  {
    title: 'Recruiter verification report',
    description: '214 verified, 12 pending, 3 rejected',
  },
  {
    title: 'Job application analytics',
    description: '18,402 applications across 640 jobs',
  },
  {
    title: 'User engagement report',
    description: 'DAU/MAU, session length, feature usage',
  },
  {
    title: 'AI recommendation insights',
    description: 'Match accuracy and click-through rates',
  }
];

const AdminReports = () => {
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
      <div style={{ marginBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Reports & analytics</h2>
        <p style={{ color: 'var(--text-muted)' }}>Generate and export platform-wide reports.</p>
      </div>

      {/* Main Chart */}
      <div className="card" style={{ padding: '2rem', height: '400px', display: 'flex', flexDirection: 'column' }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Engagement trend</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Monthly active users and recruiters</p>
        </div>
        
        <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="recruiters" stroke="#10b981" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Export Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {reportCards.map((report, index) => (
          <div key={index} className="card" style={{ 
            padding: '1.5rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>{report.title}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{report.description}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => showToast(`Generating PDF report for ${report.title}...`)}
                style={{ 
                backgroundColor: 'white', 
                color: 'var(--text-main)', 
                border: '1px solid var(--border-light)', 
                padding: '0.4rem 0.8rem', 
                borderRadius: 'var(--radius-full)', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                PDF
              </button>
              <button 
                onClick={() => showToast(`Exporting CSV for ${report.title}...`)}
                style={{ 
                backgroundColor: 'var(--accent-teal)', 
                color: 'white', 
                border: 'none', 
                padding: '0.4rem 0.8rem', 
                borderRadius: 'var(--radius-full)', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Download size={14} /> CSV
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminReports;
