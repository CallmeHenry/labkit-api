import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import deviceRoutes from './routes/device.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

const allowedOrigins = [
    "https://labkit.ca",
    "https://marvelous-crepe-7e48da.netlify.app",
    "http://localhost:5173"
];

app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? allowedOrigins : true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));


app.get('/', (req, res) => {
    res.json({message: 'Welcome to LabKit API'});
});

app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/users', userRoutes);

export default app;