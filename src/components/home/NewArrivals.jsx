"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
// import { cardData } from "../CardData";
import Link from "next/link";
import axios from "axios";

const NewArrivals = () => {
  // console.log(cardData);
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);

    try {
      const response = await axios.get("api/home/newArrival");
      console.log("THIS IS RESPONSE", response);
      const result = await response.data.data;
      if (result) {
        if (result.length > 3) {
          setCardData(result.slice(0,2))
        }
        setCardData(result);
        console.log(cardData);
        setLoading(false);
      }
    } catch (error) {
      console.log("THERE IS AN ERROR", error);
    }
  }

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
          <Link href={"/shop"}>
            <button className="border border-[var(--primary)] py-2 px-4 rounded-2xl hover:bg-[var(--primary)] hover:text-white">
              View all
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
