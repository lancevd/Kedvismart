'use client'

import Link from "next/link";
import React from "react";
import { TbStarFilled, TbStarHalfFilled } from "react-icons/tb";

const ProductCard = ({ info }) => {
  return (
    <div className="card">
      <Link href={`/details/${info.name}`}>
        <div className="rounded-3xl bg-white overflow-hidden shadow-xl w-full h-60 lg:h-80 mx-auto my-4">
          <img
            src={info.image || "https://via.placeholder.com/200"}
            alt="Product Image"
            className="h-full w-full"
          />
        </div>
      </Link>
      <Link href={`/details/${info.name}`}>
        <h4>{info.name}</h4>
      </Link>
      <div className="flex gap-1 text-[#FFC633]">
        {[...Array(Math.floor(info.rating))].map((_, index) => (
          <TbStarFilled key={index} />
        ))}
        {info.rating % 1 !== 0 && <TbStarHalfFilled />}
      </div>
      <p className="font-medium text">&#8358;{info.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
