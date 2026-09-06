import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Job } from './models/Job';
import { Application } from './models/Application';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing mock data
        await Job.deleteMany({});
        await Application.deleteMany({});
        console.log('Cleared existing jobs and applications.');

        // Get a recruiter ID and candidate ID (you should have some in the DB from auth)
        // If not, we'll create dummy ones. 
        // We will just use placeholders for now which might break populated fields if they don't exist,
        // but it will populate the UI.
        
        const dummyRecruiterId = new mongoose.Types.ObjectId();
        const dummyCandidateId = new mongoose.Types.ObjectId();

        const jobs = await Job.insertMany([
            {
                title: 'Senior Frontend Engineer',
                company: 'Nimbus Labs',
                location: 'Remote',
                type: 'Full-time',
                salary: '$120,000 - $160,000',
                description: 'We are looking for a Senior Frontend Engineer.',
                recruiterId: dummyRecruiterId,
                status: 'Active',
                applicantsCount: 42,
                scamScore: 12
            },
            {
                title: 'Machine Learning Intern',
                company: 'Corevault Systems',
                location: 'San Francisco, CA',
                type: 'Internship',
                salary: '$40/hr',
                description: 'Join our AI research team.',
                recruiterId: dummyRecruiterId,
                status: 'Active',
                applicantsCount: 156,
                scamScore: 8
            },
            {
                title: 'Quick Money Data Entry (Urgent)',
                company: 'Unknown LLC',
                location: 'Remote',
                type: 'Contract',
                salary: '$5000/week',
                description: 'Pay a $50 registration fee to start working.',
                recruiterId: dummyRecruiterId,
                status: 'Flagged',
                applicantsCount: 0,
                scamScore: 88,
                scamFlags: ['Unrealistic salary', 'Registration fee']
            }
        ]);

        console.log(`Created ${jobs.length} mock jobs.`);

        const applications = await Application.insertMany([
            {
                candidateId: dummyCandidateId,
                jobId: jobs[0]._id,
                resumeText: 'Experienced React developer...',
                atsScore: 94,
                status: 'Interviewing'
            },
            {
                candidateId: dummyCandidateId,
                jobId: jobs[1]._id,
                resumeText: 'Python, TensorFlow, PyTorch...',
                atsScore: 78,
                status: 'Pending'
            }
        ]);

        console.log(`Created ${applications.length} mock applications.`);

        console.log('Seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
