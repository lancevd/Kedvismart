"use client";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/contexts/cartContext";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
