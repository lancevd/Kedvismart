
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

/**
 * NextAuth configuration
 * This file exports the options object for NextAuth.
 * In Next.js 13+ app router, you can use this in route handlers.
 */
export default {
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }

        const client = await MongoClient.connect(process.env.MONGO_URI);
        const db = client.db();
        const user = await db.collection('users').findOne({ email });
        await client.close();

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return null;
        }

        // Return user object (excluding password)
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role || 'user',
        };
      },
    },
    // Add other providers like Google if needed
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

