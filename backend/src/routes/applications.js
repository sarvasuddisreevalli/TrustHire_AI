"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Application_1 = require("../models/Application");
const Job_1 = require("../models/Job");
const router = express_1.default.Router();
// Candidate applying for a job
router.post('/', async (req, res) => {
    try {
        const { jobId, candidateId, resumeText, atsScore, atsFeedback } = req.body;
        // Check if already applied
        const existingApp = await Application_1.Application.findOne({ jobId, candidateId });
        if (existingApp) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }
        const application = new Application_1.Application({
            jobId, candidateId, resumeText, atsScore, atsFeedback
        });
        await application.save();
        // Increment applicants count in the Job model
        await Job_1.Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });
        res.status(201).json(application);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error submitting application' });
    }
});
// Get applications submitted by a specific candidate
router.get('/candidate/:id', async (req, res) => {
    try {
        const applications = await Application_1.Application.find({ candidateId: req.params.id })
            .populate('jobId')
            .sort({ createdAt: -1 });
        res.json(applications);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching your applications' });
    }
});
// Get all applications for a specific job (for Recruiter)
router.get('/job/:id', async (req, res) => {
    try {
        const applications = await Application_1.Application.find({ jobId: req.params.id })
            .populate('candidateId', 'fullName email')
            .populate('jobId', 'title company')
            .sort({ atsScore: -1 }); // Sort by ATS score descending
        res.json(applications);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching applicants' });
    }
});
// Get all applications for all jobs posted by a specific recruiter
router.get('/recruiter/:id', async (req, res) => {
    try {
        // First find all jobs by this recruiter
        const jobs = await Job_1.Job.find({ recruiterId: req.params.id }).select('_id');
        const jobIds = jobs.map(job => job._id);
        const applications = await Application_1.Application.find({ jobId: { $in: jobIds } })
            .populate('candidateId', 'fullName email')
            .populate('jobId', 'title company')
            .sort({ createdAt: -1 });
        res.json(applications);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching recruiter applications' });
    }
});
// Update application status (by Recruiter)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application_1.Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(application);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating application status' });
    }
});
exports.default = router;
//# sourceMappingURL=applications.js.map