import React from 'react';
import { CheckCircle, Mail, Globe, Shield, Calendar, AlertCircle } from 'lucide-react';

const RecruiterVerification = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Recruiter verification</h2>
        <p style={{ color: 'var(--text-muted)' }}>Verified recruiters get higher visibility and candidate trust.</p>
      </div>

      {/* Top Banner Card */}
      <div className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Nimbus Labs is verified</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Recruiter trust score 94/100 — top 8% on the platform.
            </p>
            <div style={{ width: '250px', height: '6px', backgroundColor: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '94%', height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }}></div>
            </div>
          </div>
        </div>
        <div>
          <span style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.875rem', 
            fontWeight: 700, 
            backgroundColor: 'rgba(16, 185, 129, 0.1)', 
            color: '#10b981' 
          }}>
            Verified Badge Active
          </span>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Email Domain */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Email domain validation</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>priya@nimbuslabs.io matches the registered company domain.</p>
            </div>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              Verified
            </span>
          </div>
          <Mail size={18} color="#10b981" />
        </div>

        {/* Company Website */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Company website legitimacy</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Domain age 6 years, valid HTTPS certificate, live careers page.</p>
            </div>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              Verified
            </span>
          </div>
          <Globe size={18} color="#10b981" />
        </div>

        {/* Registration Documents */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Registration documents</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Incorporation certificate reviewed by the admin team.</p>
            </div>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              Verified
            </span>
          </div>
          <Shield size={18} color="#10b981" />
        </div>

        {/* Annual Re-verification */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Annual re-verification</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next document refresh due 12 Aug 2027.</p>
            </div>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              Scheduled
            </span>
          </div>
          <Calendar size={18} color="#3b82f6" />
        </div>

      </div>

      {/* Suspicious Activity Monitor */}
      <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>Suspicious activity monitor</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last 30 days</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>Unusual posting volume</span>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Normal</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>External payment links in job posts</span>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>1 Detected</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>Candidate scam reports against your jobs</span>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>0 Reports</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RecruiterVerification;
