import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  logo: { type: String, default: '' },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Internship', 'Contract', 'Remote'], default: 'Full-time' },
  salary: { type: String, default: '' },
  skills: [{ type: String }],
  description: { type: String, default: '' },

  // AI-generated scores
  trustScore: { type: Number, default: 80 },
  atsScore: { type: Number, default: 70 },
  fraudProbability: { type: Number, default: 5 },
  aiAnalysis: { type: String, default: '' },
  verified: { type: Boolean, default: false },

  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['active', 'paused', 'closed', 'removed'], default: 'active' },

}, { timestamps: true });

jobSchema.virtual('postedAgo').get(function () {
  const diff = Date.now() - this.createdAt;
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
});

jobSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Job', jobSchema);
