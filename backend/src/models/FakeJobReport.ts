import mongoose from 'mongoose';

const FakeJobReportSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Can be null if flagged by system AI automatically
    reason: { type: String, required: true },
    aiConfidence: { type: Number, default: 0 },
    status: { type: String, enum: ['Pending', 'Removed', 'Safe'], default: 'Pending' }
}, { timestamps: true });

export const FakeJobReport = mongoose.model('FakeJobReport', FakeJobReportSchema);
