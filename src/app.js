import express from 'express';
import authRoutes from './routes/auth.routes.js';
import deviceRoutes from './routes/device.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LabKit API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);

export default app;
