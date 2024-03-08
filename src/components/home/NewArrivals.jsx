import React from "react";
import ProductCard from "./ProductCard";
import { cardData } from "../CardData";
import Link from "next/link";

const NewArrivals = () => {
  // console.log(cardData);

  return (
    <section className="w-full">
      <div className="contain">
        <h2 className="font-bold text-center">New Arrivals</h2>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {cardData &&
            cardData.length > 0 &&
            cardData.map((item, index) => (
              <ProductCard key={index} info={item} />
              // <p>{item.name}</p>
            ))}
        </div>
        <br />
        <div className="w-full flex justify-center">
            <Link href={'/shop'}>

        <button className="border border-[var(--primary)] py-2 px-4 rounded-2xl hover:bg-[var(--primary)] hover:text-white">View all</button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
