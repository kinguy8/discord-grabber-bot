import mongoose from 'mongoose';

export const connectDB = async (callback: () => void) => {
  try {
    console.log('Try to connect to database');
    await mongoose.connect((process.env.MONGODB_URI as string) ?? '',
      {},
    );
    console.log('connected...');
    callback();
  } catch (e) {
    console.log('e', e);
  }
};
