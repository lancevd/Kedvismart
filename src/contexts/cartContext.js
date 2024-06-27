'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        updatedCart[existingItemIndex].totalPrice += item.totalPrice;
        return updatedCart;
      }

      return [...prevCart, item];
    });
  };

  const removeItemFromCart = (id, color, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(
            cartItem.id === id &&
            cartItem.color === color &&
            cartItem.size === size
          )
      )
    );
  };

  const updateItemQuantity = (id, color, size, quantity) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id && cartItem.color === color && cartItem.size === size
          ? {
              ...cartItem,
              quantity,
              totalPrice: cartItem.price * quantity,
            }
          : cartItem
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
