import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('Try to connect to database');
    await mongoose.connect((process.env.MONGODB_URI as string));
    console.log('connected...');
  } catch (e) {
    console.log('e', e);
  }
};