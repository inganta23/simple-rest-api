import createServer from './utils/server';
import path from 'path';
import express, { Request, Response } from 'express';

const PORT = process.env.PORT || 3000;
const app = createServer();

//---Deployment

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/dist')));
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req: Request, res: Response) => {
        res.send('API is Running');
    });
}

//---Deployment

app.listen(PORT, () => console.log(`REST API server ready at: http://localhost:${PORT}`));
