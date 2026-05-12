import express from 'express';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import { protect, requireRole, requireApprovedRecruiter } from '../middleware/auth.js';

const router = express.Router();

// GET /api/recruiter/stats
router.get('/stats', protect, requireRole('recruiter'), requireApprovedRecruiter, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });
    const jobIds = jobs.map(j => j._id);
    const totalApplicants = await Application.countDocuments({ jobId: { $in: jobIds } });
    const activeJobs = jobs.filter(j => j.status === 'active').length;

    res.json({
      activeJobs,
      totalJobs: jobs.length,
      totalApplicants,
      trustScore: req.user.aiTrustScore || 85,
      company: req.user.company,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recruiter stats' });
  }
});

// GET /api/recruiter/jobs
router.get('/jobs', protect, requireRole('recruiter'), requireApprovedRecruiter, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    // Add applicant count to each job
    const jobsWithCounts = await Promise.all(jobs.map(async (job) => {
      const applicants = await Application.countDocuments({ jobId: job._id });
      return { ...job.toJSON(), applicants };
    }));
    res.json(jobsWithCounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recruiter jobs' });
  }
});

// GET /api/recruiter/applicants
router.get('/applicants', protect, requireRole('recruiter'), requireApprovedRecruiter, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });
    const jobIds = jobs.map(j => j._id);
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('userId', 'name email')
      .populate('jobId', 'title')
      .sort({ atsScore: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
});

export default router;
