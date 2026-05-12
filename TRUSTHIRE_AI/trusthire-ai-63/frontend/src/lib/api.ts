/**
 * TrustHire API Service Layer
 * All HTTP calls to the Express backend go through here.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('th_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── AUTH ──────────────────────────────────────────────────────────────
export type UserData = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'recruiter' | 'admin';
  company?: string;
  verificationStatus?: string;
};

export type AuthResponse = { token: string; user: UserData };

export async function apiLogin(email: string, password: string): Promise<AuthResponse> {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function apiRegister(data: {
  name: string; email: string; password: string; role?: string;
  company?: string; website?: string; linkedin?: string;
  registrationId?: string; phone?: string;
}): Promise<AuthResponse> {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiGetMe(): Promise<{ user: UserData }> {
  return request('/auth/me');
}

// ─── JOBS ─────────────────────────────────────────────────────────────
export type JobData = {
  _id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Remote';
  salary: string;
  skills: string[];
  description?: string;
  trustScore: number;
  atsScore: number;
  fraudProbability: number;
  aiAnalysis?: string;
  verified: boolean;
  postedBy?: { name: string; company: string };
  postedAgo?: string;
  status?: string;
  createdAt?: string;
  applicants?: number;
};

export async function apiFetchJobs(): Promise<JobData[]> {
  return request('/jobs');
}

export async function apiCreateJob(data: Partial<JobData>): Promise<JobData> {
  return request('/jobs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiDeleteJob(id: string): Promise<void> {
  return request(`/jobs/${id}`, { method: 'DELETE' });
}

export async function apiUpdateJobStatus(id: string, status: string): Promise<void> {
  return request(`/jobs/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

// ─── APPLICATIONS ─────────────────────────────────────────────────────
export type AppData = {
  _id: string;
  userId: string;
  jobId: { _id: string; title: string; company: string; salary?: string; type?: string; location?: string } | string;
  status: string;
  atsScore: number;
  createdAt: string;
};

export async function apiFetchApplications(): Promise<AppData[]> {
  return request('/applications');
}

export async function apiApplyToJob(jobId: string, file?: File | null): Promise<AppData> {
  if (file) {
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('resume', file);
    return request('/applications', {
      method: 'POST',
      body: formData,
    });
  }
  return request('/applications', {
    method: 'POST',
    body: JSON.stringify({ jobId }),
  });
}

export async function apiUpdateAppStatus(id: string, status: string): Promise<void> {
  return request(`/applications/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

// ─── AI ──────────────────────────────────────────────────────────────
export type ChatResponse = { response: string; aiProvider: string };

export async function apiChat(message: string, history: { role: string; text: string }[] = []): Promise<ChatResponse> {
  return request('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message, history }),
  });
}

export async function apiAnalyzeJob(job: Partial<JobData>) {
  return request('/ai/analyze-job', {
    method: 'POST',
    body: JSON.stringify(job),
  });
}

export async function apiAnalyzeResume(file: File | null, targetRole: string) {
  const formData = new FormData();
  if (file) formData.append('resume', file);
  formData.append('targetRole', targetRole);
  return request('/ai/analyze-resume', {
    method: 'POST',
    body: formData,
  });
}

export async function apiVerifyCertificate(file: File | null, sampleType?: string) {
  const formData = new FormData();
  if (file) formData.append('certificate', file);
  if (sampleType) formData.append('sampleType', sampleType);
  return request('/ai/verify-certificate', {
    method: 'POST',
    body: formData,
  });
}

// ─── ADMIN ────────────────────────────────────────────────────────────
export async function apiFetchRecruiters() {
  return request('/admin/recruiters');
}

export async function apiRecruiterAction(id: string, action: 'approve' | 'reject' | 'block') {
  return request(`/admin/recruiters/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ action }),
  });
}

export async function apiFetchAdminStats() {
  return request('/admin/stats');
}

export async function apiFetchFlaggedJobs(): Promise<JobData[]> {
  return request('/admin/flagged-jobs');
}

// ─── RECRUITER ────────────────────────────────────────────────────────
export async function apiFetchRecruiterStats() {
  return request('/recruiter/stats');
}

export async function apiFetchRecruiterJobs(): Promise<JobData[]> {
  return request('/recruiter/jobs');
}

export async function apiFetchRecruiterApplicants() {
  return request('/recruiter/applicants');
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────
export async function apiFetchNotifications() {
  return request<any[]>('/notifications');
}

export async function apiMarkNotificationRead(id: string) {
  return request(`/notifications/${id}/read`, { method: 'PATCH' });
}
