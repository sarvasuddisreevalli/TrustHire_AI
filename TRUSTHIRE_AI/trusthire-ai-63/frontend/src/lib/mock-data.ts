export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract" | "Remote";
  salary: string;
  skills: string[];
  trust: number;
  ats: number;
  fraudProb: number;
  postedAgo: string;
  verified: boolean;
};

export const JOBS: Job[] = [
  { id: "j1", title: "Frontend Engineer", company: "Linear Labs", logo: "LL", location: "Bengaluru, India", type: "Full-time", salary: "₹18–28 LPA", skills: ["React", "TypeScript", "Tailwind"], trust: 94, ats: 88, fraudProb: 4, postedAgo: "2d ago", verified: true },
  { id: "j2", title: "ML Engineer Intern", company: "Stripe", logo: "ST", location: "Remote", type: "Internship", salary: "$3,500/mo", skills: ["Python", "PyTorch", "NLP"], trust: 97, ats: 76, fraudProb: 2, postedAgo: "5h ago", verified: true },
  { id: "j3", title: "Data Analyst (Urgent)", company: "QuickHire Solutions", logo: "QH", location: "Work from Home", type: "Remote", salary: "₹12 LPA — guaranteed", skills: ["Excel", "SQL"], trust: 18, ats: 41, fraudProb: 86, postedAgo: "1d ago", verified: false },
  { id: "j4", title: "Product Designer", company: "Figma", logo: "FG", location: "San Francisco", type: "Full-time", salary: "$140–190k", skills: ["Figma", "UX", "Prototyping"], trust: 96, ats: 71, fraudProb: 3, postedAgo: "3d ago", verified: true },
  { id: "j5", title: "Backend Engineer", company: "Razorpay", logo: "RP", location: "Hybrid · Bengaluru", type: "Full-time", salary: "₹22–34 LPA", skills: ["Node.js", "Postgres", "AWS"], trust: 91, ats: 82, fraudProb: 6, postedAgo: "1w ago", verified: true },
  { id: "j6", title: "HR Executive (No Experience)", company: "Global Career Hub", logo: "GC", location: "Remote", type: "Remote", salary: "₹80,000/week", skills: ["Communication"], trust: 22, ats: 35, fraudProb: 79, postedAgo: "4h ago", verified: false },
  { id: "j7", title: "AI Research Intern", company: "Hugging Face", logo: "HF", location: "Paris / Remote", type: "Internship", salary: "€2,800/mo", skills: ["Transformers", "Python"], trust: 98, ats: 84, fraudProb: 2, postedAgo: "6h ago", verified: true },
  { id: "j8", title: "DevOps Engineer", company: "Vercel", logo: "VC", location: "Remote", type: "Remote", salary: "$130–170k", skills: ["Kubernetes", "Terraform"], trust: 95, ats: 68, fraudProb: 4, postedAgo: "2d ago", verified: true },
];

export const APPLICATIONS = [
  { id: "a1", job: "Frontend Engineer", company: "Linear Labs", status: "Interview", appliedAt: "Apr 28", ats: 88 },
  { id: "a2", job: "ML Engineer Intern", company: "Stripe", status: "Under Review", appliedAt: "May 02", ats: 76 },
  { id: "a3", job: "Backend Engineer", company: "Razorpay", status: "Shortlisted", appliedAt: "Apr 22", ats: 82 },
  { id: "a4", job: "Product Designer", company: "Figma", status: "Rejected", appliedAt: "Apr 14", ats: 71 },
];

export const APPLICANTS = [
  { id: "u1", name: "Aarav Sharma", role: "Frontend Engineer", ats: 91, skills: ["React", "TS", "Tailwind"], edu: "IIT Delhi · B.Tech CS", status: "New" },
  { id: "u2", name: "Priya Iyer", role: "Frontend Engineer", ats: 86, skills: ["React", "Redux"], edu: "BITS Pilani", status: "Shortlisted" },
  { id: "u3", name: "Marcus Chen", role: "Frontend Engineer", ats: 78, skills: ["Vue", "JS"], edu: "NUS Singapore", status: "Reviewed" },
  { id: "u4", name: "Sara Ahmed", role: "Frontend Engineer", ats: 72, skills: ["React"], edu: "BUET", status: "New" },
  { id: "u5", name: "Diego Lopez", role: "Frontend Engineer", ats: 64, skills: ["HTML", "CSS"], edu: "UNAM", status: "Rejected" },
];

export const PENDING_RECRUITERS = [
  { id: "r1", company: "Northwind Analytics", hr: "Lena Park", email: "lena@northwind.com", domainAge: "9y", trust: 88, signals: ["Verified domain", "LinkedIn match", "GST registered"] },
  { id: "r2", company: "QuickHire Solutions", hr: "Unknown", email: "hr@quickhire-jobs.xyz", domainAge: "11d", trust: 14, signals: ["Suspicious TLD", "No website", "Disposable email"] },
  { id: "r3", company: "Helios Robotics", hr: "Tom Becker", email: "tom@heliosrobotics.io", domainAge: "3y", trust: 76, signals: ["Domain verified", "Pending LinkedIn"] },
];

export const FRAUD_TREND = [
  { week: "W1", fake: 14, reports: 22 },
  { week: "W2", fake: 18, reports: 31 },
  { week: "W3", fake: 11, reports: 19 },
  { week: "W4", fake: 24, reports: 38 },
  { week: "W5", fake: 29, reports: 44 },
  { week: "W6", fake: 21, reports: 35 },
  { week: "W7", fake: 33, reports: 51 },
  { week: "W8", fake: 27, reports: 42 },
];

export const APPS_PER_WEEK = [
  { week: "W1", apps: 120 }, { week: "W2", apps: 184 }, { week: "W3", apps: 162 },
  { week: "W4", apps: 245 }, { week: "W5", apps: 298 }, { week: "W6", apps: 271 },
  { week: "W7", apps: 332 }, { week: "W8", apps: 380 },
];

export const TOP_SKILLS = [
  { skill: "React", count: 412 }, { skill: "Python", count: 388 },
  { skill: "SQL", count: 305 }, { skill: "TypeScript", count: 287 },
  { skill: "AWS", count: 244 }, { skill: "Figma", count: 178 },
];

export const TRUST_DIST = [
  { name: "High (80+)", value: 612 },
  { name: "Medium (50–79)", value: 281 },
  { name: "Low (<50)", value: 94 },
];

export const NOTIFICATIONS = [
  { id: "n1", text: "Suspicious job flagged: 'Data Analyst – Urgent' (86% fraud)", time: "2m", level: "danger" as const },
  { id: "n2", text: "Recruiter Northwind Analytics submitted for approval", time: "12m", level: "info" as const },
  { id: "n3", text: "Your application to Stripe moved to Interview", time: "1h", level: "success" as const },
  { id: "n4", text: "Certificate verification completed (Trust 96%)", time: "3h", level: "success" as const },
];
