import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'recruiter', 'admin'], default: 'user' },

  // Recruiter-specific fields
  company: { type: String, default: '' },
  website: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  registrationId: { type: String, default: '' },
  phone: { type: String, default: '' },
  verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  aiTrustScore: { type: Number, default: 0 },
  aiVerificationReport: { type: String, default: '' },
  aiSignals: [{ type: String }],

}, { timestamps: true });

export default mongoose.model('User', userSchema);
