import React from "react";
import ProductCard from "./ProductCard";
import { cardData } from "../CardData.js";
import Link from "next/link";

const Products = () => {
  // console.log(cardData);

  return (
    <section className="w-full">
      <div className="contain">
        <h2 className="font-bold text-center">New Arrivals</h2>
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
