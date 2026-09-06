import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, MapPin, Building, ShieldCheck } from 'lucide-react';
import RecruiterJobs from './RecruiterJobs';

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [minTrust, setMinTrust] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  useEffect(() => {
    if (user?.role !== 'recruiter' && user?.role !== 'admin') {
      // Fetch both jobs and user's past applications in parallel
      Promise.all([
        fetch('http://localhost:5000/api/jobs').then(res => res.json()),
        user ? fetch(`http://localhost:5000/api/applications/candidate/${user.id}`).then(res => res.json()) : Promise.resolve([])
      ])
      .then(([jobsData, applicationsData]) => {
        setJobs(jobsData);
        if (Array.isArray(applicationsData)) {
          const appliedIds = new Set<string>(applicationsData.map((app: any) => app.jobId?._id || app.jobId));
          setAppliedJobIds(appliedIds);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch data', err);
        setLoading(false);
      });
    }
  }, [user?.role]);

  const handleApply = async (jobId: string) => {
    if (!user) {
      setToastMessage("Please log in to apply");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          candidateId: user.id,
          resumeText: 'Default resume generated from profile...',
          atsScore: Math.floor(Math.random() * (99 - 70 + 1) + 70), // Mock ATS score between 70-99
          atsFeedback: 'Strong match based on skills.'
        })
      });

      if (res.ok) {
        setToastMessage("Application submitted successfully!");
        setTimeout(() => setToastMessage(null), 3000);
        setAppliedJobIds(prev => {
          const newSet = new Set(prev);
          newSet.add(jobId);
          return newSet;
        });
      } else {
        const data = await res.json();
        setToastMessage(data.message || "Failed to submit application");
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setToastMessage("Error submitting application");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Using job title or type as a proxy for category since there's no explicit 'category' field
    const matchesCategory = category === 'All' || 
                            job.title?.toLowerCase().includes(category.toLowerCase()) || 
                            job.type?.toLowerCase().includes(category.toLowerCase());
    
    // ScamScore is higher for bad jobs. A trust score would be 100 - scamScore.
    const trustScore = 100 - (job.scamScore || 0);
    const matchesTrust = trustScore >= minTrust;

    return matchesSearch && matchesCategory && matchesTrust;
  });

  if (user?.role === 'recruiter' || user?.role === 'admin') {
    return <RecruiterJobs />;
  }

  return (
    <div style={{ position: 'relative' }}>
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
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Trusted Jobs</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Every listing is scanned by our AI trust engine.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field" 
            placeholder="Search jobs, companies, skills..." 
            style={{ paddingLeft: '3rem', backgroundColor: 'var(--bg-main)', border: 'none' }} 
          />
        </div>
        <select 
          className="input-field" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: 'auto', backgroundColor: 'var(--bg-card)' }}
        >
          <option value="All">All Categories</option>
          <option value="Engineer">Engineering</option>
          <option value="Design">Design</option>
          <option value="Data">Data</option>
          <option value="Internship">Internships</option>
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
          <Filter size={18} color="var(--text-muted)" />
          <span style={{ fontSize: '0.875rem' }}>Min trust</span>
          <input 
            type="range" min="0" max="100" 
            value={minTrust}
            onChange={(e) => setMinTrust(parseInt(e.target.value))}
            style={{ width: '100px' }} 
          />
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{minTrust}%</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading trusted jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', borderStyle: 'dashed', borderColor: 'var(--border-light)' }}>
            <Briefcase size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No jobs match your filters</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Try lowering the trust threshold or clearing your search.</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job._id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Building size={14} /> {job.company || (job.recruiterId && job.recruiterId.companyName)}</span>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {job.location}</span>
                     <span>{job.salary}</span>
                     <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Trust Score: {100 - (job.scamScore || 0)}%</span>
                  </div>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-teal)', fontSize: '0.875rem', fontWeight: 600, backgroundColor: 'rgba(13, 148, 136, 0.1)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
                    <ShieldCheck size={14} /> Verified Safe
                  </span>
                  {appliedJobIds.has(job._id) ? (
                    <button disabled style={{ backgroundColor: 'var(--border-light)', color: 'var(--text-muted)', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'not-allowed' }}>
                      Applied
                    </button>
                  ) : (
                    <button onClick={() => handleApply(job._id)} style={{ backgroundColor: 'var(--accent-teal)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' }}>
                      Apply Now
                    </button>
                  )}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
