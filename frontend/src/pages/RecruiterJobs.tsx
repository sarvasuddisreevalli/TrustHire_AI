import React, { useState, useEffect } from 'react';
import { Search, Plus, AlertCircle, X as CloseIcon } from 'lucide-react';

const JobCard = ({ job, onEdit, showToast }: any) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return '#10b981'; // emerald
      case 'Flagged': return '#ef4444'; // red
      case 'Closed': return '#64748b'; // slate
      default: return '#64748b';
    }
  };

  const statusColor = getStatusColor(job.status);
  const probColor = job.scamScore > 50 ? '#ef4444' : '#10b981';

  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Top Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{job.title}</h3>
            <span style={{ 
              padding: '0.15rem 0.5rem', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.65rem', 
              fontWeight: 700, 
              textTransform: 'uppercase',
              backgroundColor: statusColor + '15', 
              color: statusColor,
              border: '1px solid ' + statusColor + '30'
            }}>
              {job.status}
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            ID: {job._id.substring(job._id.length - 6)} • {job.location} • {job.type} • {job.salary}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{job.applicantsCount}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>applicants</span>
        </div>
      </div>

      {/* Fake Probability Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>AI Flag Probability</span>
        <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--border-light)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: job.scamScore + '%', backgroundColor: probColor, borderRadius: '2px' }}></div>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: probColor, width: '30px', textAlign: 'right' }}>{job.scamScore}%</span>
      </div>

      {/* Flag Alert Box */}
      {job.scamFlags && job.scamFlags.length > 0 && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginTop: '0.5rem' }}>
          <AlertCircle size={16} color="#ef4444" style={{ marginTop: '2px', flexShrink: 0 }} />
          <p style={{ fontSize: '0.875rem', color: '#b91c1c' }}>Flagged by AI: {job.scamFlags.join(', ')}</p>
        </div>
      )}

      {/* Bottom Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: 'auto' }}>Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
        <button onClick={() => onEdit(job)} style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', background: 'white', color: 'var(--primary-dark)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
          Edit
        </button>
        <button onClick={() => window.location.href = '/dashboard/applications'} style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: 'none', background: '#f8fafc', color: 'var(--primary-dark)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
          View applicants
        </button>
      </div>

    </div>
  );
};

const RecruiterJobs = () => {
  const [jobsData, setJobsData] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    salary: '',
    type: 'Full-time',
    location: ''
  });

  const [editJobId, setEditJobId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      fetch(`http://localhost:5000/api/jobs/recruiter/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setJobsData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, []);

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    const user = JSON.parse(userStr);

    if (!formData.title || !formData.company || !formData.salary || !formData.location) {
      showToast("Please fill in all required fields.");
      return;
    }

    try {
      const url = editJobId 
        ? `http://localhost:5000/api/jobs/${editJobId}` 
        : 'http://localhost:5000/api/jobs';
        
      const method = editJobId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          company: formData.company,
          location: formData.location,
          type: formData.type,
          salary: formData.salary,
          description: 'Job posted from TrustHire Dashboard.',
          recruiterId: user.id
        })
      });

      if (res.ok) {
        setShowModal(false);
        setEditJobId(null);
        setFormData({ title: '', company: '', salary: '', type: 'Full-time', location: '' });
        
        // Refresh local data instead of full reload for smoother UX
        fetch(`http://localhost:5000/api/jobs/recruiter/${user.id}`)
          .then(res => res.json())
          .then(data => setJobsData(data));
      } else {
        showToast("Failed to save job");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving job");
    }
  };

  const openPostModal = () => {
    setEditJobId(null);
    setFormData({ title: '', company: '', salary: '', type: 'Full-time', location: '' });
    setShowModal(true);
  };

  const openEditModal = (job: any) => {
    setEditJobId(job._id);
    setFormData({
      title: job.title,
      company: job.company,
      salary: job.salary,
      type: job.type,
      location: job.location
    });
    setShowModal(true);
  };

  const filteredJobs = jobsData.filter(job => {
    const matchesFilter = activeFilter === 'All' || job.status === activeFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (job.title && job.title.toLowerCase().includes(searchLower)) ||
      (job.location && job.location.toLowerCase().includes(searchLower)) ||
      (job._id && job._id.toLowerCase().includes(searchLower));
    
    return matchesFilter && matchesSearch;
  });

  const filters = ['All', 'Active', 'Flagged', 'Closed'];

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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Job postings</h2>
          <p style={{ color: 'var(--text-muted)' }}>Every posting is scanned by the fake-job detection engine before it goes live.</p>
        </div>
        <button onClick={openPostModal} style={{ 
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
          <Plus size={18} /> Post a job
        </button>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', backgroundColor: 'white', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search jobs by title, ID or location" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: activeFilter === filter ? '1px solid var(--primary-dark)' : '1px solid transparent',
                backgroundColor: activeFilter === filter ? 'white' : 'transparent',
                color: activeFilter === filter ? 'var(--primary-dark)' : 'var(--text-muted)'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? (
           <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading jobs...</div>
        ) : (
          filteredJobs.map(job => (
            <JobCard key={job._id} job={job} onEdit={openEditModal} showToast={showToast} />
          ))
        )}
        {!loading && filteredJobs.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No jobs found. Post a new job to get started.
          </div>
        )}
      </div>

      {/* Post Job Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <CloseIcon size={20} />
            </button>
            
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {editJobId ? 'Edit Job Posting' : 'Create New Posting'}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Enter the basic details for this position.</p>
            </div>

            <form onSubmit={handleSaveJob} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role / Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Senior Frontend Engineer"
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="e.g. Nimbus Labs"
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Package / Salary</label>
                  <input 
                    type="text" 
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    placeholder="e.g. $120k - $150k"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.95rem', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.95rem', outline: 'none', backgroundColor: 'white' }}
                  >
                    <option value="Full-time">Job (Full-time)</option>
                    <option value="Part-time">Job (Part-time)</option>
                    <option value="Contract">Job (Contract)</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Place (Location)</label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Remote, San Francisco, CA"
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', background: 'transparent', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--accent-teal)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                  {editJobId ? 'Save Changes' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default RecruiterJobs;
