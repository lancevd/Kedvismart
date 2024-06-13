// components/CartItem.js
"use client";

import React, { useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { TbMinus, TbPlus } from "react-icons/tb";
import { useCart } from "@/contexts/cartContext";

const CartItem = ({ item }) => {
  const { removeItemFromCart, updateItemQuantity } = useCart();
  const [qty, setQty] = useState(item.quantity);

  const handleChange = (e) => {
    const value = e.target.value;
    setQty(value === "" ? "" : parseInt(value, 10));
  };

  const handleBlur = () => {
    if (qty === "" || isNaN(qty) || qty < 1) {
      setQty(1);
      updateItemQuantity(item.id, 1);
    } else {
      updateItemQuantity(item.id, qty);
    }
  };

  const handleIncrement = () => {
    const newQty = qty + 1;
    setQty(newQty);
    updateItemQuantity(item.id, newQty);
  };

  const handleDecrement = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      updateItemQuantity(item.id, newQty);
    }
  };

  
  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-4">
        <div className="rounded-lg w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] items-baseline overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full" />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-bold text-sm md:text-lg">{item.name}</p>
          <p className="text-xs">Size: {item.size}</p>
          <p className="text-xs">Color: {item.color}</p>
          <p className="font-medium text-sm md:text-base">
            &#8358;<span>{item.price}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <button
          onClick={() => removeItemFromCart(item.id)}
          className="text-red-500"
        >
          <RiDeleteBinFill />
        </button>

        <div className="bg-gray-200 flex flex-row justify-between rounded-2xl w-24 py-1 px-2">
          <button onClick={handleDecrement}>
            <TbMinus />
          </button>
          <input
            type="number"
            className="bg-transparent w-8 text-sm outline-none text-center"
            value={qty}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button onClick={handleIncrement}>
            <TbPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
