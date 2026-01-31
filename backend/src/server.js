import express from 'express';
import { connectDB } from './config/db.js';
import { limiter } from './middleware/rateLimit.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1️⃣ Rate Limiting
app.use(limiter);

// 2️⃣ Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());

// 3️⃣ Connect Database
connectDB();

// 4️⃣ Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
