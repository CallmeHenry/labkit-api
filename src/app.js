import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import deviceRoutes from './routes/device.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LabKit API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/users', userRoutes);

export default app;
