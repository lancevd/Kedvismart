"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { TbSearch, TbUserCircle, TbX, TbLogout, TbSettings, TbLayoutDashboard } from "react-icons/tb";
import { ImMenu } from "react-icons/im";
import { BsCart3 } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/contexts/cartContext";

const Header = () => {
  const { data: session } = useSession();
  const { cart } = useCart();
  const [showTopbar, setShowTopbar] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className={`w-full fixed top-0 left-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"}`}>
      {/* Top Banner */}
      <AnimatePresence>
        {showTopbar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black text-white py-2 overflow-hidden"
          >
            <div className="contain flex justify-between items-center text-xs md:text-sm font-medium">
              <div className="hidden md:block w-8"></div>
              <p className="flex-1 text-center">
                Sign up and get 20% off your first order.{" "}
                <Link href="/register" className="underline font-bold hover:text-gray-300 transition-colors">Sign Up Now</Link>
              </p>
              <button 
                onClick={() => setShowTopbar(false)}
                className="hover:rotate-90 transition-transform duration-300"
              >
                <TbX className="text-lg" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="contain flex justify-between items-center py-4 lg:py-6">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <TbX /> : <ImMenu />}
          </button>

          {/* Logo */}
          <Link href="/" className="transition-transform hover:scale-105">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tighter uppercase">Kedvis.</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-wide text-gray-600">
            <Link href="/shop" className="hover:text-black transition-colors relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/shop?category=sale" className="hover:text-black transition-colors relative group text-red-600">
              On Sale
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/#arrival" className="hover:text-black transition-colors relative group">
              New Arrivals
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/brands" className="hover:text-black transition-colors relative group">
              Brands
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-[#f0f0f0] rounded-full py-3 pl-12 pr-4 outline-none focus:bg-[#e8e8e8] transition-all text-sm"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex gap-4 lg:gap-6 items-center">
          <button className="lg:hidden text-2xl">
            <TbSearch />
          </button>
          
          <Link href="/cart" className="relative group transition-transform hover:scale-110">
            <BsCart3 className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="group flex items-center gap-1 transition-transform hover:scale-110"
            >
              <TbUserCircle className="text-2xl" />
              {session && <span className="hidden lg:block text-xs font-bold uppercase truncate max-w-[80px]">{session.user.name.split(' ')[0]}</span>}
            </button>

            <AnimatePresence>
              {showUserDropdown && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[110]"
                  >
                    {!session ? (
                      <div className="p-4 flex flex-col gap-3">
                        <Link 
                          href="/login" 
                          onClick={() => setShowUserDropdown(false)}
                          className="w-full bg-black text-white text-center py-2 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                        >
                          Login
                        </Link>
                        <Link 
                          href="/register" 
                          onClick={() => setShowUserDropdown(false)}
                          className="w-full text-center py-2 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          Register
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="p-4 bg-gray-50 border-b border-gray-100">
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Signed in as</p>
                          <p className="font-bold text-sm truncate">{session.user.name}</p>
                          <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                        </div>
                        <div className="p-2">
                          {session.user.role === 'admin' && (
                            <Link 
                              href="/admin" 
                              onClick={() => setShowUserDropdown(false)}
                              className="flex items-center gap-3 p-3 text-sm font-semibold rounded-xl hover:bg-blue-50 text-blue-600 transition-colors"
                            >
                              <TbLayoutDashboard className="text-lg" /> Dashboard
                            </Link>
                          )}
                          <Link 
                            href="/account" 
                            onClick={() => setShowUserDropdown(false)}
                            className="flex items-center gap-3 p-3 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <TbSettings className="text-lg" /> Account Settings
                          </Link>
                          <button 
                            onClick={() => {
                              signOut();
                              setShowUserDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 text-sm font-semibold rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                          >
                            <TbLogout className="text-lg" /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                  <div 
                    className="fixed inset-0 z-[105]" 
                    onClick={() => setShowUserDropdown(false)}
                  ></div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-4/5 bg-white shadow-2xl z-[150] p-6 lg:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <h1 className="text-2xl font-extrabold tracking-tighter uppercase">Kedvis.</h1>
                <button onClick={() => setShowMenu(false)} className="text-3xl"><TbX /></button>
              </div>
              <div className="flex flex-col gap-6 text-xl font-bold">
                <Link onClick={() => setShowMenu(false)} href="/shop" className="hover:pl-2 transition-all">Shop</Link>
                <Link onClick={() => setShowMenu(false)} href="/shop?category=sale" className="text-red-600 hover:pl-2 transition-all">On Sale</Link>
                <Link onClick={() => setShowMenu(false)} href="/#arrival" className="hover:pl-2 transition-all">New Arrivals</Link>
                <Link onClick={() => setShowMenu(false)} href="/brands" className="hover:pl-2 transition-all">Brands</Link>
              </div>
              <div className="absolute bottom-10 left-6 right-6">
                {!session ? (
                  <Link 
                    href="/login" 
                    className="block w-full bg-black text-white text-center py-4 rounded-2xl font-bold"
                    onClick={() => setShowMenu(false)}
                  >
                    Login / Register
                  </Link>
                ) : (
                  <button 
                    onClick={() => {
                      signOut();
                      setShowMenu(false);
                    }}
                    className="w-full border-2 border-red-100 text-red-600 py-4 rounded-2xl font-bold"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[140] lg:hidden"
              onClick={() => setShowMenu(false)}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="h-0.5 bg-gray-50"></div>
    </header>
  );
};

export default Header;
