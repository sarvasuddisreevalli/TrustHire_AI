import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    salary: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
    applicantsCount: { type: Number, default: 0 },
    scamScore: { type: Number, default: 0 },
    scamFlags: [{ type: String }]
}, { timestamps: true });

export const Job = mongoose.model('Job', JobSchema);
