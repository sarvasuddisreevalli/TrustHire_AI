import express from 'express';
import Job from '../models/Job.js';
import { protect, requireRole, requireApprovedRecruiter } from '../middleware/auth.js';
import { analyzeJob } from '../services/gemini.js';

const router = express.Router();

// GET /api/jobs — public listing
router.get('/', async (_req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' })
      .populate('postedBy', 'name company verificationStatus')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name company');
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// POST /api/jobs — recruiter creates job (with AI scoring)
router.post('/', protect, requireRole('recruiter', 'admin'), requireApprovedRecruiter, async (req, res) => {
  try {
    const { title, company, location, type, salary, skills, description } = req.body;

    // AI-analyze the job posting
    let aiResult = { trustScore: 80, fraudProbability: 5, atsScore: 70, analysis: '', signals: [], verified: true };
    try {
      aiResult = await analyzeJob({ title, company: company || req.user.company, location, salary, type, skills, description });
    } catch (err) {
      console.warn('AI job analysis failed:', err.message);
    }

    const job = await Job.create({
      title,
      company: company || req.user.company,
      logo: (company || req.user.company || 'JB').substring(0, 2).toUpperCase(),
      location, type, salary,
      skills: Array.isArray(skills) ? skills : (skills || '').split(',').map(s => s.trim()).filter(Boolean),
      description,
      trustScore: aiResult.trustScore,
      atsScore: aiResult.atsScore,
      fraudProbability: aiResult.fraudProbability,
      aiAnalysis: aiResult.analysis,
      verified: aiResult.verified,
      postedBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error('Create job error:', err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// PATCH /api/jobs/:id/status — update job status
router.patch('/:id/status', protect, requireRole('recruiter', 'admin'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    job.status = req.body.status || job.status;
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// DELETE /api/jobs/:id — admin removes job
router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, { status: 'removed' });
    res.json({ message: 'Job removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove job' });
  }
});

export default router;
