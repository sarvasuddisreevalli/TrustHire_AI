import mongoose from 'mongoose';

const ContactMessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'Unread' }, // Unread, Read, Responded
}, { timestamps: true });

export const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);
