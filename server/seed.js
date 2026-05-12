/**
 * Seeds the database with admin user and sample data.
 * Run: cd server && node seed.js
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Job from './models/Job.js';
import Application from './models/Application.js';
import Notification from './models/Notification.js';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Job.deleteMany({});
  await Application.deleteMany({});
  await Notification.deleteMany({});
  console.log('Cleared existing data');

  const pw = await bcrypt.hash('admin123', 12);
  const userPw = await bcrypt.hash('password123', 12);

  // 1. Create Admin
  const admin = await User.create({
    name: 'TrustHire Admin',
    email: 'admin@trusthire.ai',
    password: pw,
    role: 'admin',
  });
  console.log('✅ Admin created: admin@trusthire.ai / admin123');

  // 2. Create sample verified recruiter
  const recruiter = await User.create({
    name: 'Lena Park',
    email: 'lena@linearlabs.io',
    password: userPw,
    role: 'recruiter',
    company: 'Linear Labs',
    website: 'https://linearlabs.io',
    linkedin: 'https://linkedin.com/in/lenapark',
    registrationId: 'GST-LIN-2019',
    phone: '+91 98765 43210',
    verificationStatus: 'approved',
    aiTrustScore: 94,
    aiVerificationReport: 'Company domain matches official website. LinkedIn profile verified. GST registration confirmed.',
    aiSignals: ['Verified domain', 'LinkedIn match', 'GST registered'],
  });
  console.log('✅ Recruiter created: lena@linearlabs.io / password123');

  // 3. Create a pending recruiter
  await User.create({
    name: 'Unknown HR',
    email: 'hr@quickhire-jobs.xyz',
    password: userPw,
    role: 'recruiter',
    company: 'QuickHire Solutions',
    website: 'https://quickhire-jobs.xyz',
    linkedin: '',
    registrationId: '',
    phone: '+1 555 000 0000',
    verificationStatus: 'pending',
    aiTrustScore: 14,
    aiVerificationReport: 'Suspicious TLD (.xyz), no LinkedIn presence, email domain registered 11 days ago.',
    aiSignals: ['Suspicious TLD', 'No website', 'Disposable email'],
  });
  console.log('✅ Pending recruiter created: hr@quickhire-jobs.xyz / password123');

  // 4. Create sample user
  const user = await User.create({
    name: 'Jane Cooper',
    email: 'jane@trusthire.ai',
    password: userPw,
    role: 'user',
  });
  console.log('✅ User created: jane@trusthire.ai / password123');

  // 5. Create sample jobs
  const jobs = await Job.insertMany([
    { title: 'Frontend Engineer', company: 'Linear Labs', logo: 'LL', location: 'Bengaluru, India', type: 'Full-time', salary: '₹18–28 LPA', skills: ['React', 'TypeScript', 'Tailwind'], trustScore: 94, atsScore: 88, fraudProbability: 4, verified: true, postedBy: recruiter._id, aiAnalysis: 'Verified company domain, salary in market range, recruiter reputation score 9.2/10. Safe to apply.' },
    { title: 'ML Engineer Intern', company: 'Stripe', logo: 'ST', location: 'Remote', type: 'Internship', salary: '$3,500/mo', skills: ['Python', 'PyTorch', 'NLP'], trustScore: 97, atsScore: 76, fraudProbability: 2, verified: true, postedBy: recruiter._id, aiAnalysis: 'Industry leader with verified hiring practices. Strong intern compensation.' },
    { title: 'Data Analyst (Urgent)', company: 'QuickHire Solutions', logo: 'QH', location: 'Work from Home', type: 'Remote', salary: '₹12 LPA — guaranteed', skills: ['Excel', 'SQL'], trustScore: 18, atsScore: 41, fraudProbability: 86, verified: false, postedBy: recruiter._id, aiAnalysis: 'ALERT: Domain registered 11 days ago, salary 3.2× market median, no LinkedIn presence. 86% likely fake.' },
    { title: 'Product Designer', company: 'Figma', logo: 'FG', location: 'San Francisco', type: 'Full-time', salary: '$140–190k', skills: ['Figma', 'UX', 'Prototyping'], trustScore: 96, atsScore: 71, fraudProbability: 3, verified: true, postedBy: recruiter._id, aiAnalysis: 'Established company with strong market presence. Salary within competitive range.' },
    { title: 'Backend Engineer', company: 'Razorpay', logo: 'RP', location: 'Hybrid · Bengaluru', type: 'Full-time', salary: '₹22–34 LPA', skills: ['Node.js', 'Postgres', 'AWS'], trustScore: 91, atsScore: 82, fraudProbability: 6, verified: true, postedBy: recruiter._id, aiAnalysis: 'Unicorn fintech company with active hiring. Domain verified, LinkedIn matched.' },
    { title: 'HR Executive (No Experience)', company: 'Global Career Hub', logo: 'GC', location: 'Remote', type: 'Remote', salary: '₹80,000/week', skills: ['Communication'], trustScore: 22, atsScore: 35, fraudProbability: 79, verified: false, postedBy: recruiter._id, aiAnalysis: 'WARNING: Weekly salary unusually high, "no experience" requirement suspicious, generic company name.' },
    { title: 'AI Research Intern', company: 'Hugging Face', logo: 'HF', location: 'Paris / Remote', type: 'Internship', salary: '€2,800/mo', skills: ['Transformers', 'Python'], trustScore: 98, atsScore: 84, fraudProbability: 2, verified: true, postedBy: recruiter._id, aiAnalysis: 'Leading AI research company. All signals verified.' },
    { title: 'DevOps Engineer', company: 'Vercel', logo: 'VC', location: 'Remote', type: 'Remote', salary: '$130–170k', skills: ['Kubernetes', 'Terraform'], trustScore: 95, atsScore: 68, fraudProbability: 4, verified: true, postedBy: recruiter._id, aiAnalysis: 'Established tech company with transparent hiring.' },
  ]);
  console.log(`✅ ${jobs.length} sample jobs created`);

  // 6. Create sample applications
  await Application.insertMany([
    { userId: user._id, jobId: jobs[0]._id, status: 'Interview', atsScore: 88 },
    { userId: user._id, jobId: jobs[1]._id, status: 'Under Review', atsScore: 76 },
    { userId: user._id, jobId: jobs[4]._id, status: 'Shortlisted', atsScore: 82 },
    { userId: user._id, jobId: jobs[3]._id, status: 'Rejected', atsScore: 71 },
  ]);
  console.log('✅ Sample applications created');

  // 7. Create sample notifications
  await Notification.insertMany([
    { userId: user._id, title: 'Welcome to TrustHire AI', message: 'Your profile is now active. Explore verified jobs today!', type: 'info' },
    { userId: user._id, title: 'Interview Scheduled', message: 'Congratulations! Linear Labs has invited you for an interview.', type: 'success' },
    { userId: user._id, title: 'New Job Alert', message: 'Figma just posted a role matching your skill "Figma".', type: 'info' },
    { userId: user._id, title: 'Account Verification', message: 'Please upload your degree certificate to reach 100% trust score.', type: 'warning' },
  ]);
  console.log('✅ Sample notifications created');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\nLogin credentials:');
  console.log('  Admin:     admin@trusthire.ai / admin123');
  console.log('  User:      jane@trusthire.ai / password123');
  console.log('  Recruiter: lena@linearlabs.io / password123');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
