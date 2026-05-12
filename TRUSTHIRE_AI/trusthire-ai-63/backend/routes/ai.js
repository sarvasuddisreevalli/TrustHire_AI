import express from 'express';
import { protect } from '../middleware/auth.js';
import { chatWithAI, analyzeJob, analyzeResume, verifyCertificate, isGeminiAvailable } from '../services/gemini.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/ai/chat
router.post('/chat', protect, async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    const response = await chatWithAI(message, history || []);
    res.json({ response, aiProvider: isGeminiAvailable() ? 'gemini' : 'fallback' });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'AI chat failed' });
  }
});

// POST /api/ai/analyze-job
router.post('/analyze-job', protect, async (req, res) => {
  try {
    const result = await analyzeJob(req.body);
    res.json(result);
  } catch (err) {
    console.error('Job analysis error:', err);
    res.status(500).json({ error: 'Job analysis failed' });
  }
});

// POST /api/ai/analyze-resume
router.post('/analyze-resume', protect, upload.single('resume'), async (req, res) => {
  try {
    let resumeText = req.body.resumeText || '';
    if (req.file) {
      resumeText = req.file.buffer.toString('utf-8');
    }
    if (!resumeText) {
      resumeText = 'Experienced software engineer with skills in React, TypeScript, Node.js, and cloud technologies.';
    }
    const targetRole = req.body.targetRole || '';
    const result = await analyzeResume(resumeText, targetRole);
    res.json(result);
  } catch (err) {
    console.error('Resume analysis error:', err);
    res.status(500).json({ error: 'Resume analysis failed' });
  }
});

// POST /api/ai/verify-certificate
router.post('/verify-certificate', protect, upload.single('certificate'), async (req, res) => {
  try {
    let certText = req.body.certText || '';
    const filename = req.file?.originalname || '';
    if (req.file) {
      certText = req.file.buffer.toString('utf-8');
    }
    if (!certText) {
      certText = req.body.sampleType === 'suspicious'
        ? 'Certificate of Completion - Unknown Academy - edited document'
        : 'This certifies that Jane Cooper has successfully completed the Meta Frontend Professional Certificate on March 12, 2024. Issued by Coursera Inc.';
    }
    const result = await verifyCertificate(certText, filename);
    res.json(result);
  } catch (err) {
    console.error('Certificate verification error:', err);
    res.status(500).json({ error: 'Certificate verification failed' });
  }
});

export default router;
