import React, { useState, useEffect } from 'react';
import { User, Mail, Briefcase, MapPin, Edit2, Save, X, Building, Globe, Hash, Shield } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    targetRole: 'Frontend Engineer',
    location: 'San Francisco, CA',
    bio: 'Passionate professional looking for new opportunities.',
    companyName: '',
    companyWebsite: '',
    employeeId: '',
    department: 'System Administration',
    adminId: 'ADM-9932'
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserRole(user.role || 'user');
      setProfileData(prev => ({
        ...prev,
        fullName: user.fullName || 'User Name',
        email: user.email || 'user@example.com',
        companyName: user.companyName || 'Acme Corp',
        companyWebsite: user.companyWebsite || 'https://acme.com',
        employeeId: user.employeeId || 'EMP-12345'
      }));
    }
  }, []);

  const [editData, setEditData] = useState({ ...profileData });

  // Update editData when profileData changes (on mount)
  useEffect(() => {
    setEditData({ ...profileData });
  }, [profileData]);

  const handleSave = async () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    const user = JSON.parse(userStr);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        // Update local storage so it persists across reloads
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Update component state
        setProfileData(editData);
        setIsEditing(false);
        showToast("Profile saved successfully!");
      } else {
        showToast("Failed to save profile");
      }
    } catch (error) {
      console.error(error);
      showToast("Error saving profile");
    }
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const roleLabel = userRole === 'admin' ? 'System Admin' : userRole === 'recruiter' ? 'Recruiter Account' : 'Candidate Account';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%', position: 'relative' }}>
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
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>My Profile</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage your personal information and account settings.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', 
              backgroundColor: 'var(--primary-dark)', color: 'white', 
              border: 'none', fontWeight: 600, cursor: 'pointer' 
            }}
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        )}
      </div>

      <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
            {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{profileData.fullName}</h3>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(13, 148, 136, 0.1)', color: 'var(--accent-teal)', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Profile Details Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} /> Full Name
            </label>
            {isEditing ? (
              <input type="text" className="input-field" value={editData.fullName} onChange={e => setEditData({...editData, fullName: e.target.value})} />
            ) : (
              <div style={{ padding: '0.75rem 0', fontWeight: 500 }}>{profileData.fullName}</div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} /> Email Address
            </label>
            {isEditing ? (
              <input type="email" className="input-field" value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} />
            ) : (
              <div style={{ padding: '0.75rem 0', fontWeight: 500 }}>{profileData.email}</div>
            )}
          </div>

          {userRole === 'user' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={16} /> Target Role
                </label>
                {isEditing ? (
                  <input type="text" className="input-field" value={editData.targetRole} onChange={e => setEditData({...editData, targetRole: e.target.value})} />
                ) : (
                  <div style={{ padding: '0.75rem 0', fontWeight: 500 }}>{profileData.targetRole}</div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} /> Location
                </label>
                {isEditing ? (
                  <input type="text" className="input-field" value={editData.location} onChange={e => setEditData({...editData, location: e.target.value})} />
                ) : (
                  <div style={{ padding: '0.75rem 0', fontWeight: 500 }}>{profileData.location}</div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Professional Bio</label>
                {isEditing ? (
                  <textarea className="input-field" style={{ minHeight: '100px', resize: 'vertical' }} value={editData.bio} onChange={e => setEditData({...editData, bio: e.target.value})} />
                ) : (
                  <div style={{ padding: '0.75rem 0', fontWeight: 500, lineHeight: 1.6 }}>{profileData.bio}</div>
                )}
              </div>
            </>
          )}

          {userRole === 'recruiter' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building size={16} /> Company Name
                </label>
                {isEditing ? (
                  <input type="text" className="input-field" value={editData.companyName} onChange={e => setEditData({...editData, companyName: e.target.value})} />
                ) : (
                  <div style={{ padding: '0.75rem 0', fontWeight: 500 }}>{profileData.companyName}</div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Globe size={16} /> Company Website
                </label>
                {isEditing ? (
                  <input type="text" className="input-field" value={editData.companyWebsite} onChange={e => setEditData({...editData, companyWebsite: e.target.value})} />
                ) : (
                  <div style={{ padding: '0.75rem 0', fontWeight: 500 }}>{profileData.companyWebsite}</div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Hash size={16} /> Employee ID
                </label>
                {isEditing ? (
                  <input type="text" className="input-field" value={editData.employeeId} onChange={e => setEditData({...editData, employeeId: e.target.value})} />
                ) : (
                  <div style={{ padding: '0.75rem 0', fontWeight: 500 }}>{profileData.employeeId}</div>
                )}
              </div>
            </>
          )}

          {userRole === 'admin' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={16} /> Department
                </label>
                {isEditing ? (
                  <input type="text" className="input-field" value={editData.department} onChange={e => setEditData({...editData, department: e.target.value})} />
                ) : (
                  <div style={{ padding: '0.75rem 0', fontWeight: 500 }}>{profileData.department}</div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={16} /> Admin ID
                </label>
                {isEditing ? (
                  <input type="text" className="input-field" value={editData.adminId} onChange={e => setEditData({...editData, adminId: e.target.value})} />
                ) : (
                  <div style={{ padding: '0.75rem 0', fontWeight: 500 }}>{profileData.adminId}</div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
            <button 
              onClick={handleCancel}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', backgroundColor: '#f1f5f9', color: 'var(--text-main)', border: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              <X size={16} /> Cancel
            </button>
            <button 
              onClick={handleSave}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--accent-teal)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
