import express from 'express';
import { Application } from '../models/Application';
import { Job } from '../models/Job';

const router = express.Router();

// Candidate applying for a job
router.post('/', async (req, res): Promise<any> => {
    try {
        const { jobId, candidateId, resumeText, atsScore, atsFeedback } = req.body;
        
        // Check if already applied
        const existingApp = await Application.findOne({ jobId, candidateId });
        if (existingApp) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = new Application({
            jobId, candidateId, resumeText, atsScore, atsFeedback
        });
        await application.save();

        // Increment applicants count in the Job model
        await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

        res.status(201).json(application);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error submitting application' });
    }
});

// Get applications submitted by a specific candidate
router.get('/candidate/:id', async (req, res): Promise<any> => {
    try {
        const applications = await Application.find({ candidateId: req.params.id })
            .populate('jobId')
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching your applications' });
    }
});

// Get all applications for a specific job (for Recruiter)
router.get('/job/:id', async (req, res): Promise<any> => {
    try {
        const applications = await Application.find({ jobId: req.params.id })
            .populate('candidateId', 'fullName email')
            .populate('jobId', 'title company')
            .sort({ atsScore: -1 }); // Sort by ATS score descending
        res.json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching applicants' });
    }
});

// Get all applications for all jobs posted by a specific recruiter
router.get('/recruiter/:id', async (req, res): Promise<any> => {
    try {
        // First find all jobs by this recruiter
        const jobs = await Job.find({ recruiterId: req.params.id }).select('_id');
        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({ jobId: { $in: jobIds } })
            .populate('candidateId', 'fullName email')
            .populate('jobId', 'title company')
            .sort({ createdAt: -1 });
            
        res.json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching recruiter applications' });
    }
});

// Update application status (by Recruiter)
router.put('/:id/status', async (req, res): Promise<any> => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(application);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating application status' });
    }
});

export default router;
