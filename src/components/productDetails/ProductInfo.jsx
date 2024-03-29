"use client";
import React, { useState } from "react";
import { TbCheck } from 'react-icons/tb'

const ProductInfo = () => {
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState(1);
  if (qty < 1) {
    setQty(1);
  }
  return (
    <div>
      <h2>Product Name</h2>
      <br />
      <p className="text-lg font-medium">&#8358;2000</p>
      <br />
      <p>
        This graphic t-shirt which is perfect for any occasion. Crafted from a
        soft and breathable fabric, it offers superior comfort and style.
      </p>
      <br />
      <hr />
      <p className="text-sm py-2">Select colors</p>
      <div className="flex gap-2">
        <div
          onClick={() => setActiveColor(1)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-white cursor-pointer bg-blue-950"
        >
          {activeColor == 1 && <TbCheck />}
        </div>
        <div
          onClick={() => setActiveColor(2)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-white cursor-pointer bg-green-950"
        >
          {activeColor == 2 && <TbCheck />}
        </div>
        <div
          onClick={() => setActiveColor(3)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-white cursor-pointer bg-red-950"
        >
          {activeColor == 3 && <TbCheck />}
        </div>
      </div>
      <br />
      <hr />
      <p className="text-sm py-2">Choose Size</p>
      <div className="flex gap-2">
        <p className="rounded-2xl py-1 px-3 bg-[#f0f0f0] hover:bg-[var(--primary)] hover:text-white">
          Small
        </p>
        <p className="rounded-2xl py-1 px-3 bg-[#f0f0f0] hover:bg-[var(--primary)] hover:text-white">
          Medium
        </p>
        <p className="rounded-2xl py-1 px-3 bg-[#f0f0f0] hover:bg-[var(--primary)] hover:text-white">
          Large
        </p>
      </div>
      <br />
      <hr />
      <br />
      <div className="flex gap-4">
        <div className="flex items-center gap-1 bg-[#f0f0f0] rounded-3xl w-fit">
          <button
            className="bg-transparent p-2 text-lg font-bold"
            onClick={() => setQty(qty - 1)}
          >
            -
          </button>
          <div className="bg-transparent text-center w-8 p-[2px]">{qty}</div>
          <button
            className="bg-transparent p-2 text-lg font-bold"
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>
        </div>
        <button className="bg-[var(--primary)] p-2 text-white rounded-3xl w-full text-center">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
