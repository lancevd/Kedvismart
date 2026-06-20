import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Fixed */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Topbar />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="p-6 text-center text-gray-400 text-xs font-semibold uppercase tracking-widest bg-gray-50 border-t border-gray-100">
          Kedvis Mart Admin v1.0 &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
