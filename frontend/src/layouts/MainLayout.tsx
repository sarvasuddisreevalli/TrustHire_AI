import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--primary-light)' }}>
      <header style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid var(--border-light)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary-dark)', textDecoration: 'none' }}>
          <ShieldCheck style={{ color: 'var(--accent-teal)' }} size={28} />
          TrustHire <span style={{ color: 'var(--accent-teal)' }}>AI</span>
        </Link>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Home</Link>
          <Link to="/about" style={{ color: 'var(--text-main)', fontWeight: 500 }}>About</Link>
          <Link to="/contact" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Contact</Link>
        </nav>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/auth?mode=login" className="btn-outline" style={{ display: 'inline-block', textDecoration: 'none' }}>Sign in</Link>
          <Link to="/auth?mode=signup" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Get started</Link>
        </div>
      </header>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
