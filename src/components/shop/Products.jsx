import React from "react";
import ProductCard from "./ProductCard";
import { cardData } from "../CardData.js";
import { RxMixerVertical } from "react-icons/rx";
import Link from "next/link";

const Products = () => {
  // console.log(cardData);

  return (
    <section className="w-full">
      <div className="contain">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-center">Products</h2>
          <div className="text-xs md:text-sm flex items-center gap-3">
            <p>Showing 1-10 of 100 Products</p>
            <span className="lg:hidden p-2 cursor-pointer rounded-full bg-gray-200 color-black">
              <RxMixerVertical />
            </span>
          </div>
        </div>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
          {cardData &&
            cardData.length > 0 &&
            cardData.map((item, index) => (
              <ProductCard key={index} info={item} />
              // <p>{item.name}</p>
            ))}
        </div>
        <br />
      </div>
    </section>
  );
};

export default Products;
