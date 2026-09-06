"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Job_1 = require("../models/Job");
const FakeJobReport_1 = require("../models/FakeJobReport");
const Application_1 = require("../models/Application");
const router = express_1.default.Router();
// Get all active jobs (for Candidates)
router.get('/', async (req, res) => {
    try {
        const jobs = await Job_1.Job.find({ status: 'Active' }).populate('recruiterId', 'companyName companyWebsite');
        res.json(jobs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching jobs' });
    }
});
// Get jobs for a specific recruiter
router.get('/recruiter/:id', async (req, res) => {
    try {
        const jobs = await Job_1.Job.find({ recruiterId: req.params.id }).sort({ createdAt: -1 });
        res.json(jobs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching recruiter jobs' });
    }
});
// Post a new job (by Recruiter)
router.post('/', async (req, res) => {
    try {
        const { title, company, location, type, salary, description, requirements, recruiterId, scamScore, scamFlags } = req.body;
        const job = new Job_1.Job({
            title, company, location, type, salary, description, requirements, recruiterId, scamScore, scamFlags
        });
        await job.save();
        // If the AI flagged it as a high scam score during posting, auto-create a FakeJobReport for Admin review
        if (scamScore > 70) {
            const report = new FakeJobReport_1.FakeJobReport({
                jobId: job._id,
                reason: 'AI flagged due to suspicious content or phishing links during creation.',
                aiConfidence: scamScore
            });
            await report.save();
        }
        res.status(201).json(job);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating job' });
    }
});
// Update job status (e.g., Close job)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const job = await Job_1.Job.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(job);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating job status' });
    }
});
exports.default = router;
//# sourceMappingURL=jobs.js.map