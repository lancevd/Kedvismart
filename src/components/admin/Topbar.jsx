"use client";
import { useSession, signOut } from "next-auth/react";
import { TbBell, TbSearch, TbUserCircle, TbLogout } from "react-icons/tb";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar() {
  const { data: session } = useSession();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 w-96 group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
        <TbSearch className="text-gray-400 group-focus-within:text-blue-500" />
        <input 
          type="text" 
          placeholder="Search for orders, products..." 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all relative">
          <TbBell className="text-xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-xl transition-all"
          >
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-gray-800">{session?.user?.name}</p>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{session?.user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold border border-blue-50 shadow-sm">
              {session?.user?.name?.charAt(0)}
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 overflow-hidden"
                >
                  <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 p-3 text-sm font-semibold rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <TbLogout className="text-lg" /> Logout
                  </button>
                </motion.div>
                <div 
                  className="fixed inset-0 z-[-1]" 
                  onClick={() => setShowProfile(false)}
                ></div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
