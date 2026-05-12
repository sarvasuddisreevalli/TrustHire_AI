import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Rejected'],
    default: 'Applied'
  },
  atsScore: { type: Number, default: 0 },

}, { timestamps: true });

applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
