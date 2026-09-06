import express from 'express';
import { ContactMessage } from '../models/ContactMessage';

const router = express.Router();

router.post('/', async (req, res): Promise<any> => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newMessage = new ContactMessage({ name, email, message });
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error processing contact message' });
    }
});

export default router;
