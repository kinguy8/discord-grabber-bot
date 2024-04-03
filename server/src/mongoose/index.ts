import { MongoClient } from 'mongodb';

export const connectDB = async (callback: () => void) => {
  try {
    console.log('Try to connect to database');
    const client = new MongoClient((process.env.MONGODB_URI as string) ?? '');
    await client.connect();
    console.log('connected...');
    callback();
  } catch (e) {
    console.log('e', e);
  }
};
