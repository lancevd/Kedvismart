import NextAuth from 'next-auth';
import authOptions from '@/lib/auth';

const handler = typeof NextAuth === 'function' ? NextAuth(authOptions) : NextAuth.default(authOptions);

export { handler as GET, handler as POST };
