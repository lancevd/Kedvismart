import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '@/models/User';
import Cart from '@/models/Cart';
import { cookies } from 'next/headers';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI);
  }
}

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
        if (!email || !password) return null;

        await connectDB();
        const user = await User.findOne({ email });

        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role || 'user',
        };
      },
    },
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
  events: {
    async signIn({ user }) {
      // Logic to merge guest cart into user cart
      await connectDB();
      const sessionId = cookies().get('cart_id')?.value;
      if (sessionId) {
        const guestCart = await Cart.findOne({ sessionId });
        const userCart = await Cart.findOne({ userId: user.id });

        if (guestCart) {
          if (userCart) {
            // Merge items
            guestCart.items.forEach(gItem => {
              const existingItem = userCart.items.find(uItem => 
                uItem.productId.toString() === gItem.productId.toString()
              );
              if (existingItem) {
                existingItem.quantity += gItem.quantity;
              } else {
                userCart.items.push(gItem);
              }
            });
            await userCart.save();
            await Cart.deleteOne({ _id: guestCart._id });
          } else {
            // Transfer cart to user
            guestCart.userId = user.id;
            guestCart.sessionId = undefined;
            await guestCart.save();
          }
        }
      }
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
