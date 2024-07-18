import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/cartContext";
// import { QueryClientProvider, useQueryClient } from "react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kedvis Mart",
  description: "Created by Olamide Mosobalaje",
  author: "Olamide Mosobalaje",
  keywords:
    "E-commerce, Shopping, Fashion ecommerce, next.js-ecommerce, olamide mosobalaje, nextjs ecommerce app, next.js ecommerce app",
  favicon: "/kedvis.ico",
};

// const queryClient = new useQueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <QueryClientProvider client={queryClient}> */}
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
