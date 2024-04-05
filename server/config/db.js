import mongoose from "mongoose";
import 'dotenv/config';

const URI = process.env.MONGODB_URI;

export const connectDB =async ()=>{

  const connection = await mongoose.connect(URI)
  console.log(`MongoDB connected: ${connection.connection.host}`)
};

