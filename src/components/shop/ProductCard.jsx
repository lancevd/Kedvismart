'use client'

import Link from "next/link";
import React from "react";
import { TbStarFilled } from "react-icons/tb";

const ProductCard = ({ info }) => {
  // Support both MongoDB shape (info.images[], info.slug, info.price in kobo)
  // and legacy static shape (info.image, info.name, info.price as float).
  const imageUrl = info.images?.[0] || info.image || "https://via.placeholder.com/200";
  const href = info.slug ? `/products/${info.slug}` : `/details/${info.name}`;
  // MongoDB stores price in kobo (smallest unit); static data stores as float NGN.
  const displayPrice = info.slug
    ? (info.price / 100).toFixed(2)
    : typeof info.price === "number"
    ? info.price.toFixed(2)
    : info.price;

  return (
    <div className="card">
      <Link href={href}>
        <div className="rounded-3xl bg-white overflow-hidden shadow-xl w-full h-60 lg:h-80 mx-auto my-4">
          <img
            src={imageUrl}
            alt={info.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <Link href={href}>
        <h4>{info.name}</h4>
      </Link>
      <div className="flex gap-1 text-[#FFC633]">
        {[...Array(5)].map((_, index) => (
          <TbStarFilled key={index} />
        ))}
      </div>
      <p className="font-medium text">&#8358;{displayPrice}</p>
    </div>
  );
};

export default ProductCard;
