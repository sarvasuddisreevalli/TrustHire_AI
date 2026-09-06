import React, { useState, useEffect } from 'react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    autoHide: true,
    requireDocs: true,
    allowFreeMail: false,
    realTimeAlerts: true,
    multilingual: true,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const saved = localStorage.getItem('platformSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      localStorage.setItem('platformSettings', JSON.stringify(newSettings));
      showToast(`Setting ${key} updated!`);
      return newSettings;
    });
  };

  const ToggleRow = ({ label, settingKey }: { label: string, settingKey: keyof typeof settings }) => {
    const isOn = settings[settingKey];
    
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>{label}</span>
        <button 
          onClick={() => toggleSetting(settingKey)}
          style={{ 
            backgroundColor: isOn ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-main)', 
            color: isOn ? '#10b981' : 'var(--text-muted)', 
            border: 'none', 
            padding: '0.2rem 1rem', 
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            cursor: 'pointer',
            minWidth: '50px',
            transition: 'all 0.2s'
          }}
        >
          {isOn ? 'On' : 'Off'}
        </button>
      </div>
    );
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
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Platform settings</h2>
        <p style={{ color: 'var(--text-muted)' }}>Controls that apply across recruiters, candidates and the AI engines.</p>
      </div>

      {/* Rules Card */}
      <div className="card" style={{ padding: '1.5rem 2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>Detection & verification rules</h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Applied platform-wide</p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ToggleRow label="Auto-hide jobs above 80% scam probability" settingKey="autoHide" />
          <ToggleRow label="Require documents for domains under 3 months old" settingKey="requireDocs" />
          <ToggleRow label="Allow free-mail recruiter registrations" settingKey="allowFreeMail" />
          <ToggleRow label="Send real-time scam alerts to candidates" settingKey="realTimeAlerts" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>Multilingual chatbot responses</span>
            <button 
              onClick={() => toggleSetting('multilingual')}
              style={{ 
                backgroundColor: settings.multilingual ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-main)', 
                color: settings.multilingual ? '#10b981' : 'var(--text-muted)', 
                border: 'none', 
                padding: '0.2rem 1rem', 
                borderRadius: 'var(--radius-full)', 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                cursor: 'pointer',
                minWidth: '50px',
                transition: 'all 0.2s'
              }}
            >
              {settings.multilingual ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid Policies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Security Card */}
        <div className="card" style={{ padding: '1.5rem 2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>Security</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Session and data policies</p>
          
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
            <li>HTTPS/TLS enforced on all traffic</li>
            <li>Passwords hashed with bcrypt, sessions expire in 24h</li>
            <li>Encrypted storage for resumes and documents</li>
            <li>Role-based access: candidate, recruiter, admin</li>
          </ul>
        </div>

        {/* AI Assistant Card */}
        <div className="card" style={{ padding: '1.5rem 2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>AI assistant</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Recruitment chatbot configuration</p>
          
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
            <li>Answers job and recruitment queries</li>
            <li>Flags suspicious postings during conversation</li>
            <li>Interview preparation guidance enabled</li>
            <li>Languages: English, Hindi, Telugu, Tamil</li>
          </ul>
        </div>

      </div>

    </div>
  );
};

export default AdminSettings;
