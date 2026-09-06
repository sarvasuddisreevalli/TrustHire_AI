import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import ResumeATS from './pages/ResumeATS';
import Certificates from './pages/Certificates';
import Jobs from './pages/Jobs';
import Applications from './pages/Applications';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';
import RecruiterCandidates from './pages/RecruiterCandidates';
import RecruiterVerification from './pages/RecruiterVerification';
import RecruiterAnalytics from './pages/RecruiterAnalytics';
import AdminOverview from './pages/AdminOverview';
import AdminUsers from './pages/AdminUsers';
import AdminApprovals from './pages/AdminApprovals';
import AdminFakeJobs from './pages/AdminFakeJobs';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="auth" element={<Auth />} />
        </Route>
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="ats" element={<ResumeATS />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="approvals" element={<AdminApprovals />} />
          <Route path="fake-jobs" element={<AdminFakeJobs />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="applications" element={<Applications />} />
          <Route path="candidates" element={<RecruiterCandidates />} />
          <Route path="verification" element={<RecruiterVerification />} />
          <Route path="analytics" element={<RecruiterAnalytics />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
