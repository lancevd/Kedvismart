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
            Sign up and get 20% off your first order. Sign Up Now
          </p>
          <div
            className="cursor-pointer text-lg"
            onClick={() => setShowTopbar(false)}
          >
            <TbX />
          </div>
        </div>
      </div>
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className="contain flex flex-wrap gap-3 justify-between items-center border-b bg-white py-4"
      >
        <div className="flex justify-between items-center w-full lg:w-auto">
          <Link href={"/"}>
            <h1 className="font-bold text-lg">K.Mart</h1>
          </Link>
          <div
            className="text-xl cursor-pointer lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <TbX /> : <ImMenu />}
          </div>
        </div>
        <menu
          className={`flex-col lg:flex-row gap-3 items-center w-full lg:w-auto lg:flex ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <Link href={"/shop"}> Shop </Link>
          <Link href={"#"}> On Sale </Link>
          <Link href={"#"}> New Arrivals </Link>
          <Link href={"#"}> Brands </Link>
          <div className="bg-[#f0f0f0] flex items-center gap-3 rounded-3xl p-3 w-full lg:w-auto">
            <TbSearch />
            <form action="" className="w-full">
              <input
                type="text"
                className="bg-transparent outline-none w-full"
                placeholder="Search for products..."
              />
            </form>
          </div>
        </menu>
        <menu className="flex gap-3 items-center">
          <Link href={"/cart"}>
            <BsCart />
          </Link>
          <Link href={"/account"}>
            <TbUserCircle />
          </Link>
        </menu>
      </motion.nav>
    </header>
  );
};

export default Header;
