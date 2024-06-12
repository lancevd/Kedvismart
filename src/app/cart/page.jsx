"use client"
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";

const page = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    setCart(cart);
  })
  return (
    <main className="contain py-8 flex flex-col lg:flex-row lg:gap-12">
      <div className="w-full lg:w-2/3 border p-4 rounded-xl">
        {
          cart.length < 1 ? "There are no items in your cart. Add some items to your cart to see them here." : 
          cart.map((item) =>(
            <CartItem name="" />
          ))
        }
        
      </div>
      <div className="w-full lg:w-1/3"></div>
    </main>
  );
};

export default page;
