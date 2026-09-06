import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Intercept all fetch requests to dynamically route to backend URL in production
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  let [resource, config] = args;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  if (typeof resource === 'string' && resource.startsWith('http://localhost:5000')) {
    resource = resource.replace('http://localhost:5000', apiUrl);
  }
  return originalFetch(resource, config);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
