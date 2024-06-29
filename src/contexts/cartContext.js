"use client";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
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
    setCookie("cart_id", result.id); ////////////////////////////////RESULT.ID?///////////////////////
  };

  const addItemToCart = async (productID, quantity) => {
    const response = await axios.post(`/api/cart/cartStatus`, {
      id: productID,
      quantity: quantity,
    });
    if (response.status != 200) {
      console.log("Error don happen o!");
    }
    const result = await response.data;
    console.log(result);
    // setCart(response.data);
    // setCookie("cart_id", result.id);
  };

  const updateItemQuantity = async (productID, quantity) => {
    const ID = getCookie("cart_id");
    const response = await axios.put(
      `/api/cart/updateCart`,
      {
        id: productID,
        quantity: quantity,
      },
      {
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    if (response.status !== 200) {
      console.log("Error don happen o!");
    }
    console.log(response);
    const result = await response.data;
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
