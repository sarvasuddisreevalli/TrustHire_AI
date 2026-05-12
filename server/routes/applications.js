import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/applications — user's applications
router.get('/', protect, async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user._id })
      .populate('jobId', 'title company salary type location')
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// POST /api/applications — apply to a job
router.post('/', protect, async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const existing = await Application.findOne({ userId: req.user._id, jobId });
    if (existing) return res.status(400).json({ error: 'Already applied to this job' });

    const atsScore = Math.floor(65 + Math.random() * 30); // In production, this would come from resume analysis

    const app = await Application.create({
      userId: req.user._id,
      jobId,
      status: 'Applied',
      atsScore,
    });

    res.status(201).json(app);
  } catch (err) {
    console.error('Apply error:', err);
    res.status(500).json({ error: 'Failed to apply' });
  }
});

// PATCH /api/applications/:id/status — recruiter updates status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Application not found' });
    app.status = req.body.status;
    await app.save();
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update application' });
  }
});

export default router;
