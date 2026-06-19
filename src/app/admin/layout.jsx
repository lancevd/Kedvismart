
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Adjust path if needed
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    // Redirect to login or home
    redirect('/login');
  }
  return children;
}

