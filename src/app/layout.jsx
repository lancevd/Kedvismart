import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VoiceAssistant from "@/components/VoiceAssistant";
import { CartProvider } from "@/contexts/cartContext";
// import { QueryClientProvider, useQueryClient } from "react-query";


export const metadata = {
  title: "Kedvis Mart",
  description: "Created by Olamide Mosobalaje",
  author: "Olamide Mosobalaje",
  keywords:
    "E-commerce, Shopping, Fashion ecommerce, next.js-ecommerce, olamide mosobalaje, nextjs ecommerce app, next.js ecommerce app",
  favicon: "/kedvis.ico",
};

import { Providers } from "@/components/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}