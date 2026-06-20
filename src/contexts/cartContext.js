"use client";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/cart`);
      if (response.status === 200) {
        setCart(response.data);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
      setError("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (productID, quantity, color = "", size = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`/api/cart`, {
        productId: productID,
        quantity,
        color,
        size
      });
      if (response.status === 200) {
        setCart(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      setError("Failed to add item to cart");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/cart/items/${itemId}`, { quantity });
      if (response.status === 200) {
        setCart(response.data);
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      setError("Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/cart/items/${itemId}`);
      if (response.status === 200) {
        setCart(response.data);
      }
    } catch (error) {
      console.error("Remove item error:", error);
      setError("Failed to remove item");
    } finally {
      setLoading(false);
    }
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
