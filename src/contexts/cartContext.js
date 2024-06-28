"use client";
import axios from "axios";
import { setCookie } from "cookies-next";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    try {
      const response = await axios.get(`/api/cart/initializeCart`);
      if (response.status !== 200) {
        console.log("Error don happen o!");
      }
      const result = await response.data;
      setCart(result);
      setCookie("cart_id", result.id);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    const response = await axios.get(`/api/cart/cartStatus`);
    if (response.status !== 200) {
      console.log("Error don happen o!");
    }
    console.log(response);
    const result = await response.data;
    setCart(response.data);
    setCookie("cart_id", result);
  };

  const addItemToCart = async (productID, quantity, options) => {
    const response = await axios.post(`/api/cart/cartStatus`, {
      id: productID,
      quantity: quantity,
      options: options,
    });
    if (response.status != 200) {
      console.log("Error don happen o!");
    }
    // console.log(response);
    const result = await response.data;
    setCart(response.data);
    setCookie("cart_id", result.id);
  };

  const updateItemQuantity = async (productID, quantity, options) => {
    const response = await axios.put(`/api/cart/cartStatus`, {
      id: productID,
      quantity: quantity,
      options: options,
    });
    if (response.status !== 200) {
      console.log("Error don happen o!");
    }
    console.log(response);
    const result = await response.data;
    setCart(response.data);
    setCookie("cart_id", result);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        initializeCart,
        getCart,
        addItemToCart,
        updateItemQuantity,
        // removeItemFromCart,
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
