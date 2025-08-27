import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import authRoutes from './src/routes/auth.js';
import projectRoutes from './src/routes/projects.js';
import timesheetRoutes from './src/routes/timesheets.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- DB ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/neelam_infra';
mongoose.connect(MONGO_URI).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// --- API routes ---
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/timesheets', timesheetRoutes);

// --- Serve frontend ---
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// SPA-friendly fallback for simple pages
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`NEELAM INFRASTRUCTURE server running on http://localhost:${PORT}`);
});
