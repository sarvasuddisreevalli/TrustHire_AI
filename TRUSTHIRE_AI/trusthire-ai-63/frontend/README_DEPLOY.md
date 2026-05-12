# TrustHire AI Deployment Guide

Follow these steps to deploy the TrustHire AI platform to production.

## 1. Backend (Render / Heroku)
The backend is an Express server located in the `backend/` directory.

1. Create a new Web Service on [Render](https://render.com).
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. **Build Command**: `npm install`
5. **Start Command**: `node index.js` (or use the provided `Procfile`).
6. **Environment Variables**:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A long random string.
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `PORT`: 10000 (standard for Render).

## 2. Database (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and allow access from all IP addresses (`0.0.0.0/0`) or just your backend service IP.
3. Copy the connection string and use it as `MONGO_URI` in your backend settings.

## 3. Frontend (Vercel)
The frontend is a Vite app located in the `frontend/` directory.

1. Create a new Project on [Vercel](https://vercel.com).
2. Connect your GitHub repository.
3. Vercel should automatically detect **Vite** when the root is set to `frontend`.
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variables**:
   - **IMPORTANT**: Update `src/lib/api.ts` `VITE_API_URL` to your deployed backend URL (e.g., `https://trusthire-api.onrender.com/api`).

## Initial Setup
Run the seed script to populate your production database once connected:
```bash
cd backend
node seed.js
```

## Security Note
Ensure your `JWT_SECRET` is never committed to Git. Use the platform's Environment Variable settings.
