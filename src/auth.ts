import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { clientPromise } from '@/server/mongoose';
import authConfig from './auth.config';
import { connectToDatabase } from '@/server/mongoose';
import { UserDocument } from './server/models/user.types';
import { Types } from 'mongoose';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    ...authConfig.providers.slice(0, -1),
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.role
        ) {
          throw new Error('Please provide all required fields');
        }

        try {
          await connectToDatabase();
          const { User } = await import('@/server/models/user.model');

          const user = (await User.findOne({
            email: credentials.email.toString().toLowerCase(),
          }).select('+password')) as UserDocument | null;

          if (!user) {
            return null;
            // throw new Error('No account found with this email');
          }

          const isValid = await user.comparePassword(
            credentials.password.toString()
          );

          if (!isValid) {
            return null;
            // throw new Error('Invalid password');
          }

          if (!user.emailVerified) {
            throw new Error('Please verify your email before signing in');
          }

          if (user.role !== credentials.role) {
            console.log(credentials.role, user.role);
            throw new Error(
              `Invalid login. Please use the ${user.role} login option.`
            );
          }

          let userId: string;
          if (typeof user._id === 'string') {
            userId = user._id;
          } else if (user._id instanceof Types.ObjectId) {
            userId = user._id.toString();
          } else {
            userId = new Types.ObjectId(
              (user._id as { toString(): string }).toString()
            ).toString();
          }

          return {
            id: userId,
            email: user.email,
            name: user.name,
            image: user.image || null,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          if (error instanceof Error) {
            throw error;
          }
          throw new Error('An error occurred during sign in');
        }
      },
    },
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'advertiser' | 'freelancer' | 'admin';
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
