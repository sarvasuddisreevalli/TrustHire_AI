import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';

const getRoleColor = (role: string) => {
  switch(role) {
    case 'admin': return '#0ea5e9'; // blue
    case 'recruiter': return '#f59e0b'; // amber
    case 'candidate': return '#64748b'; // slate
    default: return '#64748b';
  }
};

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newAdmin, setNewAdmin] = useState({ fullName: '', email: '', password: '' });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchUsers = () => {
    fetch('http://localhost:5000/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to permanently remove this user?")) {
      fetch(`http://localhost:5000/api/admin/users/${id}`, { method: 'DELETE' })
        .then(() => {
          showToast("User removed successfully");
          fetchUsers();
        })
        .catch(() => showToast("Error removing user"));
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.fullName || !newAdmin.email || !newAdmin.password) {
      showToast("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newAdmin, role: 'admin' })
      });

      if (res.ok) {
        setShowModal(false);
        setNewAdmin({ fullName: '', email: '', password: '' });
        showToast("Admin account created successfully");
        fetchUsers();
      } else {
        const data = await res.json();
        showToast(data.message || "Failed to create admin");
      }
    } catch (err) {
      showToast("Error creating admin account");
    }
  };

  const candidatesCount = users.filter(u => u.role === 'user').length;
  const recruitersCount = users.filter(u => u.role === 'recruiter').length;
  const suspendedCount = 0; // Since we delete them in this version instead of suspending

  const statCards = [
    { label: 'CANDIDATES', value: candidatesCount },
    { label: 'RECRUITERS', value: recruitersCount },
    { label: 'ADMINS', value: '1 (You)' },
    { label: 'SUSPENDED', value: suspendedCount }
  ];

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

      {/* Add Admin Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="card" style={{ width: '400px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Create Admin Account</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>This user will have full system access.</p>
            
            <form onSubmit={handleAddAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase' }}>Full Name</label>
                <input type="text" className="input-field" value={newAdmin.fullName} onChange={e => setNewAdmin({...newAdmin, fullName: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase' }}>Email Address</label>
                <input type="email" className="input-field" value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase' }}>Password</label>
                <input type="password" className="input-field" value={newAdmin.password} onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', background: 'transparent', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--accent-teal)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Create Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>User management</h2>
          <p style={{ color: 'var(--text-muted)' }}>Role-based access control across candidates, recruiters and admins.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ 
          backgroundColor: 'var(--accent-teal)', 
          color: 'white', 
          border: 'none', 
          padding: '0.75rem 1.5rem', 
          borderRadius: 'var(--radius-full)',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer'
        }}>
          <Plus size={16} /> Add admin
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {statCards.map(stat => (
          <div key={stat.label} className="card" style={{ flex: 1, minWidth: '180px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              {stat.label}
            </span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', backgroundColor: 'white', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
        <Search size={18} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search users by name, email or ID" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem' }}
        />
      </div>

      {/* Users List Table */}
      <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>All accounts</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fetched directly from MongoDB</p>
        </div>

        {loading ? (
           <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading users...</div>
        ) : users.length === 0 ? (
           <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No users found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>USER</th>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>ROLE</th>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>VERIFIED</th>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>JOINED</th>
                <th style={{ padding: '1rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(u => 
                (u.fullName && u.fullName.toLowerCase().includes(searchQuery.toLowerCase())) || 
                (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (u._id && u._id.toLowerCase().includes(searchQuery.toLowerCase()))
              ).map((user, index) => {
                const roleColor = getRoleColor(user.role);
                const displayRole = user.role === 'user' ? 'Candidate' : user.role === 'recruiter' ? 'Recruiter' : 'Admin';
                
                return (
                  <tr key={user._id} style={{ borderBottom: index !== users.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                    <td style={{ padding: '1.25rem 0' }}>
                      <div style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>{user.fullName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{user.email}</div>
                    </td>
                    <td style={{ padding: '1.25rem 0' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '0.75rem', 
                        fontWeight: 600, 
                        backgroundColor: `${roleColor}15`, 
                        color: roleColor 
                      }}>
                        {displayRole}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 0', fontWeight: 700, color: user.isVerifiedRecruiter || user.role === 'user' ? '#10b981' : '#f59e0b' }}>
                      {user.role === 'recruiter' ? (user.isVerifiedRecruiter ? 'Yes' : 'Pending') : 'N/A'}
                    </td>
                    <td style={{ padding: '1.25rem 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1.25rem 0' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleDelete(user._id)} style={{ 
                          padding: '0.35rem 0.75rem', 
                          borderRadius: 'var(--radius-full)', 
                          border: `1px solid #ef4444`, 
                          background: 'transparent', 
                          fontSize: '0.75rem', 
                          fontWeight: 600, 
                          color: '#ef4444',
                          cursor: 'pointer'
                        }}>
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default AdminUsers;
