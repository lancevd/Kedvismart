import React from "react";
import CartItem from "./CartItem";

const page = () => {
  return (
    <main className="contain py-8 flex flex-col lg:flex-row lg:gap-12">
      <div className="w-full lg:w-2/3 border p-4 rounded-xl">
        <CartItem />
      </div>
      <div className="w-full lg:w-1/3"></div>
    </main>
  );
};

export default page;
