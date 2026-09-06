import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showToast("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        showToast("Failed to send message. Please try again.");
      }
    } catch (err) {
      showToast("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
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

      {/* Main Content */}
      <div style={{ flex: 1, padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1000px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Left Column: Info */}
          <div style={{ flex: '1 1 400px', paddingTop: '1rem' }}>
            <div style={{ color: 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
              CONTACT
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Talk to our team
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '3rem' }}>
              Questions, partnerships, or enterprise deployment — we usually reply within a few hours.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                <Mail size={20} style={{ color: 'var(--accent-blue)' }} />
                <span style={{ fontSize: '1rem' }}>hello@trusthire.ai</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                <Phone size={20} style={{ color: 'var(--accent-blue)' }} />
                <span style={{ fontSize: '1rem' }}>+1 (415) 555-0142</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                <MapPin size={20} style={{ color: 'var(--accent-blue)' }} />
                <span style={{ fontSize: '1rem' }}>Remote-first · HQ Bengaluru, IN</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div style={{ flex: '1 1 400px' }}>
            <div className="card" style={{ padding: '2.5rem' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--primary-dark)' }}>Name</label>
                  <input type="text" className="input-field" placeholder="Jane Cooper" style={{ backgroundColor: 'var(--primary-light)' }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--primary-dark)' }}>Email</label>
                  <input type="email" className="input-field" placeholder="jane@company.com" style={{ backgroundColor: 'var(--primary-light)' }} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--primary-dark)' }}>Message</label>
                  <textarea className="input-field" rows={5} placeholder="How can we help?" style={{ backgroundColor: 'var(--primary-light)', resize: 'vertical' }} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
