import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res): Promise<any> => {
    try {
        const { fullName, email, password, role, companyName, companyWebsite, employeeId } = req.body;
        
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ fullName, email, password, role, companyName, companyWebsite, employeeId });
        await user.save();

        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

        res.status(201).json({ token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, companyName: (user as any).companyName, companyWebsite: (user as any).companyWebsite, employeeId: (user as any).employeeId } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await (user as any).comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

        res.json({ token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, companyName: (user as any).companyName, companyWebsite: (user as any).companyWebsite, employeeId: (user as any).employeeId } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/:id', async (req, res): Promise<any> => {
    try {
        const { fullName, email, companyName, companyWebsite, employeeId } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, {
            fullName, email, companyName, companyWebsite, employeeId
        }, { new: true });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ id: user.id, fullName: user.fullName, email: user.email, role: user.role, companyName: (user as any).companyName, companyWebsite: (user as any).companyWebsite, employeeId: (user as any).employeeId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

export default router;
