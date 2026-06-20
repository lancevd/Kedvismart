"use client";

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TbUser, TbPackage, TbLogout, TbSettings, TbMail, TbShieldCheck } from 'react-icons/tb';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const user = session?.user;

  return (
    <div className="contain py-12 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 space-y-2">
            <h1 className="text-2xl font-bold mb-8 px-4">My Account</h1>
            <nav>
              <button className="w-full text-left flex items-center gap-3 p-4 bg-black text-white rounded-2xl font-bold transition-all">
                <TbUser className="text-xl" /> Profile Overview
              </button>
              <button className="w-full text-left flex items-center gap-3 p-4 text-gray-500 hover:bg-gray-100 rounded-2xl font-bold transition-all">
                <TbPackage className="text-xl" /> Order History
              </button>
              <button className="w-full text-left flex items-center gap-3 p-4 text-gray-500 hover:bg-gray-100 rounded-2xl font-bold transition-all">
                <TbSettings className="text-xl" /> Settings
              </button>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full text-left flex items-center gap-3 p-4 text-red-600 hover:bg-red-50 rounded-2xl font-bold transition-all"
                >
                  <TbLogout className="text-xl" /> Logout
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Profile Header */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl font-bold border border-blue-50">
                {user?.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-500 flex items-center gap-1">
                  <TbShieldCheck className="text-green-500" /> {user?.role === 'admin' ? 'Administrator' : 'Verified Customer'}
                </p>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <h3 className="font-bold text-gray-900">Personal Information</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 font-semibold">
                      <TbUser className="text-gray-400" /> {user?.name}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email Address</label>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 font-semibold">
                      <TbMail className="text-gray-400" /> {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Placeholder */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <TbPackage className="text-3xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">No orders yet</h3>
                <p className="text-gray-500 text-sm">Once you make your first purchase, it will appear here.</p>
              </div>
              <button 
                onClick={() => router.push('/shop')}
                className="inline-block px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
