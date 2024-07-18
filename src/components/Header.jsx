"use client";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { TbSearch, TbUserCircle, TbX } from "react-icons/tb";
import { ImMenu } from "react-icons/im";
import { BsCart } from "react-icons/bs";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const Header = () => {
  const [showTopbar, setShowTopbar] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full">
      <div
        className={`bg-[var(--primary)] text-white p-2 ${
          showTopbar ? "block" : "hidden"
        }`}
      >
        <div className="contain flex justify-between gap-4 text-center">
          <div className="hidden md:block"></div>
          <p className="text-sm">
            Sign up and get 20% off to your first order. Sign Up Now
          </p>
          <div
            className="cursor-pointer text-lg"
            onClick={() => setShowTopbar(false)}
          >
            <TbX />
          </div>
        </div>
      </div>
      <nav className="contain flex justify-between items-center border-b bg-white py-4 ">
        <div className="flex items-center gap-3">
          <div
            className="lg:hidden cursor-pointer text-xl"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <TbX /> : <ImMenu />}
          </div>
          <Link onClick={() => setShowMenu(false)} href={"/"}>
            <h1 className="font-bold">K.Mart</h1>
          </Link>
        </div>
        <motion.div
          animate={showMenu ? "open" : "closed"}
          variants={variants}
          className="flex flex-col lg:flex-row gap-3 absolute lg:static top-28 left-0 w-full lg:w-auto lg:h-auto bg-white lg:bg-transparent lg:!opacity-100 lg:!translate-x-0 p-4 lg:p-0 z-50"
        >
          <Link onClick={() => setShowMenu(false)} href={"/shop"}>
            Shop
          </Link>
          <Link onClick={() => setShowMenu(false)} href={"/#arrival"}>
            New Arrivals
          </Link>
          <Link onClick={() => setShowMenu(false)} href={"/about"}>
            How it works
          </Link>
          <div className="lg:hidden bg-[#f0f0f0] flex items-center gap-3 rounded-3xl p-3 mt-4 lg:mt-0">
            <TbSearch />
            <form action="">
              <input
                type="text"
                className="bg-transparent outline-none"
                placeholder="Search for products..."
              />
            </form>
          </div>
        </motion.div>
        <div className="hidden lg:flex bg-[#f0f0f0] items-center gap-3 rounded-3xl p-3">
          <TbSearch />
          <form action="">
            <input
              type="text"
              className="bg-transparent outline-none"
              placeholder="Search for products..."
            />
          </form>
        </div>
        <menu className="flex gap-3 items-center">
          <Link onClick={() => setShowMenu(false)} href={"/cart"}>
            <BsCart />
          </Link>
          <Link onClick={() => setShowMenu(false)} href={"/account"}>
            <TbUserCircle />
          </Link>
        </menu>
      </nav>
    </header>
  );
};

export default Header;
