import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Mongoose connection options with improved timeouts and error handling
const options: mongoose.ConnectOptions = {
  bufferCommands: false,
  autoCreate: true,
  autoIndex: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 60000, // Increased from 30000
  socketTimeoutMS: 90000, // Increased from 45000
  family: 4,
  connectTimeoutMS: 60000, // Increased from 30000
  maxIdleTimeMS: 30000, // Increased from 10000
  waitQueueTimeoutMS: 60000, // Increased from 30000
  retryWrites: true,
  retryReads: true,
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
    // Check if we have a connection to the database or if it's time to create a new one
    const shouldCreateNewConnection =
      !cached.conn ||
      (cached.conn.connection.readyState !== 1 &&
        cached.conn.connection.readyState !== 2);

    if (shouldCreateNewConnection) {
      // Clear existing cached connection if it's not valid
      if (cached.conn) {
        try {
          await cached.conn.disconnect();
        } catch (error) {
          console.warn('Error disconnecting from MongoDB:', error);
        }
        cached.conn = null;
        cached.promise = null;
      }

      // Create new connection promise
      if (!cached.promise) {
        const opts = {
          ...options,
          bufferCommands: false,
        };

        cached.promise = mongoose
          .connect(MONGODB_URI as string, opts)
          .then(mongoose => {
            console.log('✅ New MongoDB connection established');

            // Handle connection errors
            mongoose.connection.on('error', err => {
              console.error('MongoDB connection error:', err);
              // Only clear cache if the connection is actually dead
              if (mongoose.connection.readyState !== 1) {
                cached.conn = null;
                cached.promise = null;
              }
            });

            // Handle disconnection
            mongoose.connection.on('disconnected', () => {
              console.warn('MongoDB disconnected');
              cached.conn = null;
              cached.promise = null;
            });

            // Handle process termination
            process.on('SIGINT', async () => {
              try {
                await mongoose.connection.close();
                console.log(
                  'MongoDB connection closed through app termination'
                );
                process.exit(0);
              } catch (err) {
                console.error('Error closing MongoDB connection:', err);
                process.exit(1);
              }
            });

            return mongoose;
          });
      }
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
    // Implement exponential backoff for retries
    if (process.env.NODE_ENV === 'production') {
      console.log('Attempting to reconnect to MongoDB...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connectToDatabase();
    }
    throw e;
  }
}

// MongoDB client for Auth.js adapter with improved error handling
let clientPromise: Promise<MongoClient>;

const clientOptions = {
  serverSelectionTimeoutMS: 60000,
  socketTimeoutMS: 90000,
  connectTimeoutMS: 60000,
  maxIdleTimeMS: 30000,
  retryWrites: true,
  retryReads: true,
};

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI as string, clientOptions);
    globalWithMongo._mongoClientPromise = client.connect().catch(err => {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  const client = new MongoClient(MONGODB_URI as string, clientOptions);
  clientPromise = client.connect().catch(err => {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  });
}

export { clientPromise };
