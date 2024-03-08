import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kedvis Mart",
  description: "Created by Olamide Mosobalaje",
  author: "Olamide Mosobalaje",
  keywords:"E-commerce, Shopping, Fashion ecommerce, next.js-ecommerce, olamide mosobalaje, nextjs ecommerce app, next.js ecommerce app",
  favicon: "/kedvis.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}
