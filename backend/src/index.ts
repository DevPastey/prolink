import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('api/v1/auth', authRoutes);

connectDB().then( () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
