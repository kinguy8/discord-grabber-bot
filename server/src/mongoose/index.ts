import mongoose from 'mongoose';

export const connectDB = async (callback: () => void) => {
  try {
    console.log('Try to connect to database');
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.dqbep06.mongodb.net/`,
      {},
    );
    console.log('connected...');
    callback();
  } catch (e) {
    console.log('e', e);
  }
};
