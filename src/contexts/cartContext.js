"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart  = async () => {
    try {
      const response = await axios.get(`/api/cart/initializeCart`);
      // if (response.status != 200) console.log("Error don happen o!");
      console.log(response)
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        initializeCart,
        // addItemToCart,
        // removeItemFromCart,
        // updateItemQuantity,
        // getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
