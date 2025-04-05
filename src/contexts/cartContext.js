"use client";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/cart/initializeCart`);
      if (response.status === 200) {
        const result = await response.data;
        setCart(result);
        setCookie("cart_id", result.id);
      } else {
        throw new Error("Failed to initialize cart");
      }
    } catch (error) {
      setError(error.message || "Failed to initialize cart");
      console.error("Cart initialization error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/cart/cartStatus`);
      if (response.status === 200) {
        const result = await response.data;
        setCart(result);
        setCookie("cart_id", result.id);
      } else {
        throw new Error("Failed to fetch cart");
      }
    } catch (error) {
      setError(error.message || "Failed to fetch cart");
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (productID, quantity) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`/api/cart/cartStatus`, {
        id: productID,
        quantity: quantity,
      });
      if (response.status === 200) {
        const result = await response.data;
        setCart(result);
        return result;
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      setError(error.message || "Failed to add item to cart");
      console.error("Add to cart error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
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
    getCart();
  };

  const removeItemFromCart = async (productID) => {
    // Implementation needed
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        error,
        loading,
        addItemToCart,
        getCart,
        updateItemQuantity,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
