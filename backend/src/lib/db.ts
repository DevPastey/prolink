import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


connectDB().catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

export async function connectDB() {
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    

    console.log('Connected to MongoDB ✅', connection.connection.host);
}