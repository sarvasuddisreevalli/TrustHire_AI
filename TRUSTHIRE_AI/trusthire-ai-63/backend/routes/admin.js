import express from 'express';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/recruiters — pending recruiters
router.get('/recruiters', protect, requireRole('admin'), async (_req, res) => {
  try {
    const recruiters = await User.find({ role: 'recruiter' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recruiters' });
  }
});

// PATCH /api/admin/recruiters/:id — approve/reject/block
router.patch('/recruiters/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const { action } = req.body; // 'approve', 'reject', 'block'
    const recruiter = await User.findById(req.params.id);
    if (!recruiter) return res.status(404).json({ error: 'Recruiter not found' });

    if (action === 'approve') recruiter.verificationStatus = 'approved';
    else if (action === 'reject') recruiter.verificationStatus = 'rejected';
    else if (action === 'block') recruiter.verificationStatus = 'rejected';

    await recruiter.save();
    res.json({ message: `Recruiter ${action}d`, recruiter: { id: recruiter._id, verificationStatus: recruiter.verificationStatus } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update recruiter' });
  }
});

// GET /api/admin/stats
router.get('/stats', protect, requireRole('admin'), async (_req, res) => {
  try {
    const pendingRecruiters = await User.countDocuments({ role: 'recruiter', verificationStatus: 'pending' });
    const verifiedRecruiters = await User.countDocuments({ role: 'recruiter', verificationStatus: 'approved' });
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalJobs = await Job.countDocuments();
    const suspiciousJobs = await Job.countDocuments({ trustScore: { $lt: 40 } });
    const totalApplications = await Application.countDocuments();

    // Trust distribution
    const trustDistRaw = await Job.aggregate([
      { $group: { _id: { $cond: [{ $gte: ["$trustScore", 70] }, "Trusted", { $cond: [{ $gte: ["$trustScore", 40] }, "Neutral", "Risky"] }] }, count: { $sum: 1 } } }
    ]);
    const trustDist = trustDistRaw.map(d => ({ name: d._id, value: d.count }));

    // Top skills
    const topSkillsRaw = await Job.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 }
    ]);
    const topSkills = topSkillsRaw.map(d => ({ skill: d._id, count: d.count }));

    // Applications per week (last 8 weeks)
    const appsPerWeekRaw = await Application.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { $week: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { "_id": 1 } }
    ]);
    const appsPerWeek = appsPerWeekRaw.map(d => ({ week: `W${d._id}`, apps: d.count }));

    // Fraud trend (last 8 weeks)
    const fraudTrendRaw = await Job.aggregate([
      { $match: { 
          createdAt: { $gte: new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000) },
          trustScore: { $lt: 40 }
      } },
      { $group: { _id: { $week: "$createdAt" }, fake: { $sum: 1 } } },
      { $sort: { "_id": 1 } }
    ]);
    const fraudTrend = fraudTrendRaw.map(d => ({ week: `W${d._id}`, fake: d.count }));

    res.json({ 
      pendingRecruiters, verifiedRecruiters, totalUsers, totalJobs, suspiciousJobs, totalApplications,
      trustDist, topSkills, appsPerWeek, fraudTrend
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});


// GET /api/admin/flagged-jobs
router.get('/flagged-jobs', protect, requireRole('admin'), async (_req, res) => {
  try {
    const jobs = await Job.find({ status: { $ne: 'removed' } })
      .populate('postedBy', 'name company')
      .sort({ fraudProbability: -1 })
      .limit(20);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flagged jobs' });
  }
});

export default router;
