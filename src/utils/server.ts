import express from 'express';
import userRoutes from '../routes/user.route';
import sessionRoutes from '../routes/session.route';
import taskRoutes from '../routes/task.route';
import deserializeUser from '../middleware/deserializeUser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

function createServer() {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use(deserializeUser);
    app.use('/api/user', userRoutes);
    app.use('/api/session', sessionRoutes);
    app.use('/api/task', taskRoutes);

    return app;
}

export default createServer;
