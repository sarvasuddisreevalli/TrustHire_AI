import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  ScanLine, 
  Award, 
  MessageSquare,
  LogOut,
  Bell,
  Settings,
  User,
  PieChart,
  CheckCircle,
  Users,
  Sliders
} from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('userSettings');
    return saved ? JSON.parse(saved) : {
      emailAlerts: true,
      smsAlerts: false,
      darkMode: false,
      profileVisibility: true
    };
  });

  const updateSetting = (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    showToast(`${key} setting updated`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const navItemStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-full)',
    textDecoration: 'none',
    color: isActive ? 'white' : 'var(--text-main)',
    backgroundColor: isActive ? 'var(--accent-teal)' : 'transparent',
    fontWeight: 500,
    marginBottom: '0.5rem',
    transition: 'all 0.2s',
  });

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isRecruiter = user?.role === 'recruiter';
  const isAdmin = user?.role === 'admin';

  // Mock Notifications based on role (using state to allow marking as read)
  const initialNotifications = isAdmin ? [
    { id: 1, text: 'System update completed', time: '10m ago', unread: true },
    { id: 2, text: 'High scam risk job flagged', time: '1h ago', unread: true }
  ] : isRecruiter ? [
    { id: 1, text: 'New application received', time: '5m ago', unread: true },
    { id: 2, text: 'Job posting "Frontend Dev" approved', time: '2h ago', unread: false }
  ] : [
    { id: 1, text: 'Application viewed by Google', time: '20m ago', unread: true },
    { id: 2, text: 'New job matches your profile', time: '1d ago', unread: false }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  
  const hasUnread = notifications.some(n => n.unread);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    showToast("All notifications marked as read");
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)', position: 'relative' }}>
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
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '2rem' }}>
          <ShieldCheck style={{ color: 'var(--accent-teal)' }} size={28} />
          TrustHire <span style={{ color: 'var(--accent-teal)' }}>AI</span>
        </div>

        {/* User Profile Snippet */}
        <div 
          onClick={() => navigate('/dashboard/profile')}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 0', 
            borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem',
            cursor: 'pointer', transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          title="View Profile"
        >
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
            G
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {isAdmin ? 'PLATFORM ADMIN' : isRecruiter ? 'Verified Recruiter' : 'Authenticated'}
          </span>
          <strong style={{ marginTop: '0.25rem' }}>{user?.fullName?.substring(0, 15) || 'GARAGA VIJ...'}</strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email?.substring(0, 20) || 'vijayagaraga84@gm...'}</span>
        </div>

        <nav style={{ flex: 1 }}>
          <NavLink to="/dashboard" end style={({isActive}) => navItemStyle(isActive)}>
             <LayoutDashboard size={20} /> Overview
          </NavLink>
          
          {isAdmin ? (
            <>
              <NavLink to="/dashboard/users" style={({isActive}) => navItemStyle(isActive)}>
                 <Users size={20} /> Users
              </NavLink>
              <NavLink to="/dashboard/approvals" style={({isActive}) => navItemStyle(isActive)}>
                 <CheckCircle size={20} /> Recruiter approvals
              </NavLink>
              <NavLink to="/dashboard/fake-jobs" style={({isActive}) => navItemStyle(isActive)}>
                 <ShieldCheck size={20} /> Fake job detection
              </NavLink>
              <NavLink to="/dashboard/reports" style={({isActive}) => navItemStyle(isActive)}>
                 <FileText size={20} /> Reports
              </NavLink>
              <NavLink to="/dashboard/settings" style={({isActive}) => navItemStyle(isActive)}>
                 <Sliders size={20} /> Platform settings
              </NavLink>
            </>
          ) : isRecruiter ? (
            <>
              <NavLink to="/dashboard/jobs" style={({isActive}) => navItemStyle(isActive)}>
                 <Briefcase size={20} /> Jobs
              </NavLink>
              <NavLink to="/dashboard/applications" style={({isActive}) => navItemStyle(isActive)}>
                 <FileText size={20} /> Applications
              </NavLink>
              <NavLink to="/dashboard/candidates" style={({isActive}) => navItemStyle(isActive)}>
                 <User size={20} /> Candidates
              </NavLink>
              <NavLink to="/dashboard/verification" style={({isActive}) => navItemStyle(isActive)}>
                 <CheckCircle size={20} /> Verification
              </NavLink>
              <NavLink to="/dashboard/analytics" style={({isActive}) => navItemStyle(isActive)}>
                 <PieChart size={20} /> Analytics
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard/jobs" style={({isActive}) => navItemStyle(isActive)}>
                 <Briefcase size={20} /> Jobs
              </NavLink>
              <NavLink to="/dashboard/applications" style={({isActive}) => navItemStyle(isActive)}>
                 <FileText size={20} /> Applications
              </NavLink>
              <NavLink to="/dashboard/ats" style={({isActive}) => navItemStyle(isActive)}>
                 <ScanLine size={20} /> Resume ATS
              </NavLink>
              <NavLink to="/dashboard/certificates" style={({isActive}) => navItemStyle(isActive)}>
                 <Award size={20} /> Certificates
              </NavLink>
              <NavLink to="/dashboard/ai" style={({isActive}) => navItemStyle(isActive)}>
                 <MessageSquare size={20} /> AI Assistant
              </NavLink>
            </>
          )}
        </nav>

        <button 
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'transparent', color: 'var(--error)', fontWeight: 500, marginTop: 'auto' }}
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '80px', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-main)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isAdmin ? 'var(--accent-teal)' : isRecruiter ? 'var(--accent-teal)' : 'var(--accent-blue)' }}></span>
            {isAdmin ? 'ADMIN CONSOLE' : isRecruiter ? 'RECRUITER DASHBOARD' : 'CANDIDATE DASHBOARD'}
          </div>
          <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
            {/* Notifications Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowSettings(false); }} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
              >
                <Bell size={20} color="var(--text-muted)" />
                {hasUnread && <span style={{ position: 'absolute', top: '5px', right: '5px', width: '8px', height: '8px', backgroundColor: 'var(--accent-red)', borderRadius: '50%' }}></span>}
              </button>
              
              {showNotifications && (
                <div className="card" style={{ position: 'absolute', top: '50px', right: '0', width: '320px', zIndex: 50, padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                    <h4 style={{ fontWeight: 700, margin: 0 }}>Notifications</h4>
                    {hasUnread && (
                      <span onClick={markAllAsRead} style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', cursor: 'pointer' }}>Mark all as read</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.5rem', backgroundColor: n.unread ? 'rgba(14, 165, 233, 0.05)' : 'transparent', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: n.unread ? 'var(--accent-blue)' : 'transparent', marginTop: '6px' }}></div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: n.unread ? 600 : 500, color: 'var(--text-main)' }}>{n.text}</p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Settings Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => { setShowSettings(!showSettings); setShowNotifications(false); }} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Settings size={20} color="var(--text-muted)" />
              </button>
              
              {showSettings && (
                <div className="card" style={{ position: 'absolute', top: '50px', right: '0', width: '280px', zIndex: 50, padding: '1.5rem' }}>
                  <h4 style={{ fontWeight: 700, margin: '0 0 1rem 0', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>Quick Settings</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email Alerts</span>
                      <input type="checkbox" checked={settings.emailAlerts} onChange={(e) => updateSetting('emailAlerts', e.target.checked)} style={{ cursor: 'pointer' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>SMS Alerts</span>
                      <input type="checkbox" checked={settings.smsAlerts} onChange={(e) => updateSetting('smsAlerts', e.target.checked)} style={{ cursor: 'pointer' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Profile Visibility</span>
                      <input type="checkbox" checked={settings.profileVisibility} onChange={(e) => updateSetting('profileVisibility', e.target.checked)} style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => { setShowSettings(false); navigate('/dashboard/profile'); }}
                    style={{ width: '100%', marginTop: '1.5rem', padding: '0.5rem', backgroundColor: '#f1f5f9', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}
                  >
                    Advanced Settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div style={{ padding: '0 2rem 2rem 2rem', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
