import express from 'express';
import { Job } from '../models/Job';
import { FakeJobReport } from '../models/FakeJobReport';
import { Application } from '../models/Application';

const router = express.Router();

// Get all active jobs (for Candidates)
router.get('/', async (req, res): Promise<any> => {
    try {
        const jobs = await Job.find({ status: 'Active' }).populate('recruiterId', 'companyName companyWebsite');
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching jobs' });
    }
});

// Get jobs for a specific recruiter
router.get('/recruiter/:id', async (req, res): Promise<any> => {
    try {
        const jobs = await Job.find({ recruiterId: req.params.id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching recruiter jobs' });
    }
});

// Post a new job (by Recruiter)
router.post('/', async (req, res): Promise<any> => {
    try {
        const { title, company, location, type, salary, description, requirements, recruiterId, scamScore, scamFlags } = req.body;
        
        const job = new Job({
            title, company, location, type, salary, description, requirements, recruiterId, scamScore, scamFlags
        });
        
        await job.save();
        
        // If the AI flagged it as a high scam score during posting, auto-create a FakeJobReport for Admin review
        if (scamScore > 70) {
            const report = new FakeJobReport({
                jobId: job._id,
                reason: 'AI flagged due to suspicious content or phishing links during creation.',
                aiConfidence: scamScore
            });
            await report.save();
        }

        res.status(201).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating job' });
    }
});

// Update job status (e.g., Close job)
router.put('/:id/status', async (req, res): Promise<any> => {
    try {
        const { status } = req.body;
        const job = await Job.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating job status' });
    }
});

// Update a job
router.put('/:id', async (req, res): Promise<any> => {
    try {
        const { title, company, location, type, salary } = req.body;
        const job = await Job.findByIdAndUpdate(req.params.id, { 
            title, company, location, type, salary 
        }, { new: true });
        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating job' });
    }
});

export default router;
