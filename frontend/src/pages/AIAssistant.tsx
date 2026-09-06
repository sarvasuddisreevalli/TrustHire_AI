import React, { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Is this offer from QuickPayGigs legit? They asked for a ₹2,000 registration fee.',
    isUser: true,
  },
  {
    id: '2',
    text: "No — that's a classic advance-fee scam pattern. Legitimate employers never charge candidates. I've flagged the posting and blocked the recruiter. Avoid sharing any payment or ID documents with them.",
    isUser: false,
  },
  {
    id: '3',
    text: 'Thanks! Can you help me prep for the Linear Labs frontend interview?',
    isUser: true,
  },
  {
    id: '4',
    text: 'Absolutely. Their process typically has 3 rounds: a React/TypeScript coding round, a system-design discussion on component architecture, and a culture round. Want me to generate practice questions for round one?',
    isUser: false,
  },
];

const suggestions = [
  'Review my resume for this role',
  'Draft a salary negotiation reply',
  'Check a recruiter profile',
  'Practice interview questions'
];

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });
      const data = await response.json();
      
      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        text: response.ok ? data.reply : 'Sorry, I am having trouble connecting to my servers.', 
        isUser: false 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Error connecting to the AI server.', isUser: false }]);
    }
    setLoading(false);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 120px)' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>AI Career Copilot</h2>
        <p style={{ color: 'var(--text-muted)' }}>Ask anything — from scam checks to interview prep and negotiation strategy.</p>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem', overflow: 'hidden' }}>
        
        {/* Chat History */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.isUser ? 'flex-end' : 'flex-start', alignItems: 'flex-start', gap: '1rem' }}>
              {!msg.isUser && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, marginTop: '0.25rem' }}>
                  <Bot size={18} />
                </div>
              )}
              
              <div style={{ 
                maxWidth: '75%', 
                padding: '1rem 1.25rem', 
                borderRadius: '1.25rem',
                borderTopLeftRadius: msg.isUser ? '1.25rem' : '0.25rem',
                borderTopRightRadius: msg.isUser ? '0.25rem' : '1.25rem',
                background: msg.isUser ? 'linear-gradient(90deg, #0284c7 0%, #0d9488 100%)' : '#f1f5f9',
                color: msg.isUser ? 'white' : 'var(--primary-dark)',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
             <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '1rem' }}>
               <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                 <Bot size={18} />
               </div>
               <div style={{ padding: '1rem 1.25rem', borderRadius: '1.25rem', borderTopLeftRadius: '0.25rem', background: '#f1f5f9', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                 Typing...
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {suggestions.map((sug, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSuggestion(sug)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.5rem', 
                  padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', 
                  border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', 
                  color: 'var(--primary-dark)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' 
                }}
              >
                <Sparkles size={14} color="#0ea5e9" /> {sug}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-full)', backgroundColor: '#f8fafc' }}>
            <input 
              type="text" 
              placeholder="Ask your copilot anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.75rem 1rem', fontSize: '0.95rem', outline: 'none', color: 'var(--primary-dark)' }}
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0ea5e9', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: (loading || !input.trim()) ? 'default' : 'pointer', opacity: (loading || !input.trim()) ? 0.5 : 1 }}
            >
              <Send size={18} style={{ marginLeft: '-2px' }} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAssistant;
