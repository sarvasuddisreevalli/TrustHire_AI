import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState('user');
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Recruiter fields
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'login') {
      setIsLogin(true);
    } else if (params.get('mode') === 'signup') {
      setIsLogin(false);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email, password } 
        : { fullName, email, password, role, companyName, companyWebsite, employeeId };
      
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Explicitly tell the browser to prompt "Save Password" using Credential Management API
      try {
        if ('credentials' in navigator && (window as any).PasswordCredential) {
          const cred = new (window as any).PasswordCredential({
            id: email,
            password: password,
            name: fullName || email,
          });
          await navigator.credentials.store(cred);
        }
      } catch (err) {
        console.log('Browser credential store failed:', err);
      }

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
          {isLogin ? 'Welcome back!' : 'Free forever for job seekers.'}
        </p>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>I am a...</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                <input type="radio" name="role" value="user" checked={role === 'user'} onChange={(e) => setRole(e.target.value)} /> User
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                <input type="radio" name="role" value="recruiter" checked={role === 'recruiter'} onChange={(e) => setRole(e.target.value)} /> Recruiter
              </label>
              {isLogin && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                  <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={(e) => setRole(e.target.value)} /> Admin
                </label>
              )}
            </div>
          </div>

          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Full name</label>
              <input type="text" id="fullName" name="fullName" autoComplete="name" required={!isLogin} value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-field" placeholder="Jane Cooper" />
            </div>
          )}
          
          {!isLogin && role === 'recruiter' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Company Name</label>
                <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="input-field" placeholder="Acme Corp" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Company Website</label>
                <input type="url" required value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="input-field" placeholder="https://acme.com" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Employee ID</label>
                <input type="text" required value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="input-field" placeholder="EMP-12345" />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Email</label>
            <input type="email" id="email" name="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@email.com" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Password</label>
            <input type="password" id="password" name="password" autoComplete={isLogin ? "current-password" : "new-password"} required value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} className="input-field" placeholder="Min 6 characters" />
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '0.5rem' }}>
            {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Create account')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          {isLogin ? (
            <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); setError(''); if(role === 'admin') setRole('user'); }}>Sign up</a></p>
          ) : (
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); setError(''); }}>Sign in</a></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
