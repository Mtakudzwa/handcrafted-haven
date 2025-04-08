import mongoose from 'mongoose';

export async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('❌ MONGODB_URI is missing');

  try {
    console.log('🔌 Connecting to MongoDB...');
    return await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
}
