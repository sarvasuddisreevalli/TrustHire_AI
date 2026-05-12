import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { verifyRecruiter } from '../services/gemini.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, company, website, linkedin, registrationId, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 12);
    const userData = {
      name, email: email.toLowerCase(), password: hashed,
      role: role || 'user',
    };

    // If registering as recruiter, add recruiter fields
    if (role === 'recruiter') {
      userData.company = company || '';
      userData.website = website || '';
      userData.linkedin = linkedin || '';
      userData.registrationId = registrationId || '';
      userData.phone = phone || '';
      userData.verificationStatus = 'pending';

      // Run AI verification
      try {
        const aiResult = await verifyRecruiter({ name, email, company, website, linkedin, registrationId, phone });
        userData.aiTrustScore = aiResult.trustScore;
        userData.aiVerificationReport = aiResult.reasoning;
        userData.aiSignals = aiResult.signals;
      } catch (err) {
        console.warn('AI recruiter verification failed:', err.message);
        userData.aiTrustScore = 50;
        userData.aiVerificationReport = 'AI verification pending manual review.';
        userData.aiSignals = ['Automated verification unavailable'];
      }
    }

    const user = await User.create(userData);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id, name: user.name, email: user.email, role: user.role,
        company: user.company, verificationStatus: user.verificationStatus,
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    // Check if recruiter is approved
    if (user.role === 'recruiter' && user.verificationStatus !== 'approved') {
      return res.status(403).json({
        error: 'Your recruiter account is pending admin approval.',
        verificationStatus: user.verificationStatus
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id, name: user.name, email: user.email, role: user.role,
        company: user.company, verificationStatus: user.verificationStatus,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json({
    user: {
      id: req.user._id, name: req.user.name, email: req.user.email,
      role: req.user.role, company: req.user.company,
      verificationStatus: req.user.verificationStatus,
    }
  });
});

export default router;
