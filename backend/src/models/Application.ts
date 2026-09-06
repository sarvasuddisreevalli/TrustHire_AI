import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeText: { type: String, required: true },
    atsScore: { type: Number, default: 0 },
    atsFeedback: { type: String },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Interviewing', 'Rejected', 'Accepted'], default: 'Pending' }
}, { timestamps: true });

export const Application = mongoose.model('Application', ApplicationSchema);
