"use client";
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...state];
        const existingItem = updatedCart[existingItemIndex];
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        return updatedCart;
      } else {
        return [...state, action.payload];
      }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map(item => 
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity, totalPrice: action.payload.quantity * item.price } : item
      );
    case 'SET_CART':
      return action.payload;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
