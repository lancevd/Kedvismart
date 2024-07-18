"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import axios from "axios";
import Spinner from "../Spinner";

const TopSelling = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);

    try {
      const response = await axios.get("api/home/top");
      const result = response.data.data;
      if (result && result.length > 4 ) {
        setCardData(result.slice(0, 4)); // Slice first 3 items
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="w-full">
      <div className="contain">
        <h2 className="font-bold text-center">Top Selling</h2>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading && <div className="w-full text-center"><Spinner /></div>}
          {cardData &&
            cardData.length > 0 &&
            cardData.map((item, index) => (
              <ProductCard key={index} info={item} />
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

export default TopSelling;
