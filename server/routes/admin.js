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

    res.json({ 
      pendingRecruiters, verifiedRecruiters, totalUsers, totalJobs, suspiciousJobs, totalApplications,
      trustDist, topSkills
    });
  } catch (err) {
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
