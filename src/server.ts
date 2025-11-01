
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectToMongoDB} from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectToMongoDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5300;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
