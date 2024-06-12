"use client";

import React, { useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { TbMinus, TbPlus } from "react-icons/tb";

const CartItem = () => {
  const [qty, setQty] = useState(1);

  const handleChange = (e) => {
    const value = e.target.value;
    setQty(value === "" ? "" : parseInt(value, 10));
  };

  const handleBlur = () => {
    if (qty === "" || isNaN(qty) || qty < 1) {
      setQty(1);
    }
  };

  return (
    <div className="flex justify-between gap-4 ">
      <div className="flex gap-4">
        <div className="rounded-lg w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] items-baseline overflow-hidden">
          <img src="/images/jeans short.png" alt="" className="w-full" />
        </div>
        <div className="flex flex-col justify-between">
          <h4>Name</h4>
          <p className="text-xs">Size: XL</p>
          <p className="text-xs">Color: Red</p>
          <p className="font-medium">
            &#8358;<span>2500</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <p className="text-red-500 cursor-pointer">
          <RiDeleteBinFill />
        </p>

        <div className="bg-gray-200 flex flex-row justify-between rounded-2xl w-24 py-1 px-2">
          <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
            <TbMinus />
          </button>
          <input
            type="number"
            className="bg-transparent w-8 text-sm outline-none text-center"
            value={qty}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button onClick={() => setQty(qty + 1)}>
            <TbPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
