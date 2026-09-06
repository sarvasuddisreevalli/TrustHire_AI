import express from 'express';
import { User } from '../models/User';
import { FakeJobReport } from '../models/FakeJobReport';
import { Job } from '../models/Job';

const router = express.Router();

// Get all users (Recruiters and Candidates)
router.get('/users', async (req, res): Promise<any> => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching users' });
    }
});

// Verify/Approve a recruiter
router.put('/users/:id/verify', async (req, res): Promise<any> => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isVerifiedRecruiter: true }, { new: true });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error verifying recruiter' });
    }
});

// Suspend a user/recruiter (For this demo, we'll just delete them for simplicity, or we could add an isSuspended flag)
router.delete('/users/:id', async (req, res): Promise<any> => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error removing user' });
    }
});

// Get all Fake Job Reports
router.get('/fake-jobs', async (req, res): Promise<any> => {
    try {
        const reports = await FakeJobReport.find()
            .populate({
                path: 'jobId',
                populate: { path: 'recruiterId', select: 'fullName companyName email' }
            })
            .sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching fake job reports' });
    }
});

// Mark a reported job as Safe
router.put('/fake-jobs/:id/safe', async (req, res): Promise<any> => {
    try {
        const report = await FakeJobReport.findByIdAndUpdate(req.params.id, { status: 'Safe' }, { new: true });
        // Optionally update the job's scam score to 0
        if (report && report.jobId) {
             await Job.findByIdAndUpdate(report.jobId, { scamScore: 0 });
        }
        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error marking job safe' });
    }
});

// Remove a scam job entirely
router.delete('/fake-jobs/:id/remove', async (req, res): Promise<any> => {
    try {
        const report = await FakeJobReport.findById(req.params.id);
        if (report && report.jobId) {
            await Job.findByIdAndDelete(report.jobId);
        }
        await FakeJobReport.findByIdAndUpdate(req.params.id, { status: 'Removed' });
        res.json({ message: 'Scam job removed from platform' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error removing scam job' });
    }
});

// Global Analytics Overview
router.get('/analytics', async (req, res): Promise<any> => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
        const pendingApprovals = await User.countDocuments({ role: 'recruiter', isVerifiedRecruiter: false });
        
        const activeJobs = await Job.countDocuments({ status: 'Active' });
        const pendingScamReports = await FakeJobReport.countDocuments({ status: 'Pending' });

        res.json({
            totalUsers,
            totalRecruiters,
            pendingApprovals,
            activeJobs,
            pendingScamReports
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching analytics' });
    }
});

export default router;
