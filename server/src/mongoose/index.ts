import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    console.log('Try to connect to database');
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('connected to database');
  } catch (e) {
    console.log('e', e);
  }
};
