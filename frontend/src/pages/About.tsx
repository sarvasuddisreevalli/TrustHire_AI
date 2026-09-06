import React from 'react';
import { ShieldCheck, Sparkles, Users } from 'lucide-react';

const About = () => {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ color: 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
          ABOUT
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
          A trust layer for the world's hiring<br />market.
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '800px' }}>
          TrustHire AI was built after seeing thousands of students and professionals fall victim to fake recruiters, phishing offers, and forged certificates. We combine modern NLP, computer vision, and verification networks to make every hiring touchpoint safe and intelligent.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <ShieldCheck size={20} />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Trust by default</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Every job, recruiter and certificate is scored before it reaches you.
          </p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Sparkles size={20} />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>AI you can explain</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Each verdict comes with the signals that produced it — never a black box.
          </p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Users size={20} />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Built for everyone</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Job seekers, recruiters and admins each get a workspace built for them.
          </p>
        </div>

      </div>

      <div className="card" style={{ padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Our impact, so far</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
          
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>1.2M+</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Apps protected</div>
          </div>
          
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>46K</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scams blocked</div>
          </div>
          
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>8.3K</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified recruiters</div>
          </div>
          
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>98.6%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Accuracy</div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;
