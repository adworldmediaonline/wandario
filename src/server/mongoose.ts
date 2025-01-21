import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Mongoose connection options
const options: mongoose.ConnectOptions = {
  bufferCommands: false,
  autoCreate: true,
  autoIndex: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
  connectTimeoutMS: 30000,
  maxIdleTimeMS: 10000,
  waitQueueTimeoutMS: 30000,
};

// Global type declaration
declare global {
  // eslint-disable-next-line no-var
  var mongoose: GlobalMongoose;
}

const cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  try {
    if (cached.conn) {
      if (cached.conn.connection.readyState === 1) {
        console.log('🚀 Using cached mongoose connection');
        return cached.conn;
      } else {
        cached.conn = null;
        cached.promise = null;
      }
    }

    if (!cached.promise) {
      const opts = {
        ...options,
        bufferCommands: false,
      };

      cached.promise = mongoose
        .connect(MONGODB_URI as string, opts)
        .then(mongoose => {
          console.log('✅ New connection established');

          mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
            cached.conn = null;
            cached.promise = null;
          });

          mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
            cached.conn = null;
            cached.promise = null;
          });

          return mongoose;
        });
    }

    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (e) {
      cached.promise = null;
      throw e;
    }
  } catch (e) {
    console.error('MongoDB connection error:', e);
    throw e;
  }
}

// MongoDB client for Auth.js adapter
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI as string, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  const client = new MongoClient(MONGODB_URI as string, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });
  clientPromise = client.connect();
}

export { clientPromise };
