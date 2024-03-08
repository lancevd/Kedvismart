"use client";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { TbSearch, TbUserCircle, TbX } from "react-icons/tb";
import { BsCart } from "react-icons/bs";

const Header = () => {
  const [showTopbar, setShowTopbar] = useState(true);

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
      <nav className="bg-white py-4 ">
        <div className="contain flex gap-3 justify-between items-center">
          <Link href={"/"}>
            <h1 className="font-bold">K.Mart</h1>
          </Link>
          <menu className="flex flex-col lg:flex-row gap-3">
            <Link href={"/shop"}> Shop </Link>
            <Link href={"#"}> On Sale </Link>
            <Link href={"#"}> New Arrivals </Link>
            <Link href={"#"}> Brands </Link>
          </menu>
          <div className="bg-[#f0f0f0] flex items-center gap-3 rounded-3xl p-3">
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
            <Link href={"/cart"}>
              {" "}
              <BsCart />
            </Link>
            <Link href={"/account"}>
              {" "}
              <TbUserCircle />
            </Link>
          </menu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
