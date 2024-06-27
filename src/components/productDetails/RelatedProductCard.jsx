import Link from "next/link";
import React from "react";
import { TbStarFilled, TbStarHalfFilled } from "react-icons/tb";

const RelatedProductCard = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/details/${product.permalink}`}>
        <div className="rounded-3xl bg-white overflow-hidden shadow-xl w-full h-60 lg:h-80 mx-auto my-4">
          <img
            src={product.image.url || "https://via.placeholder.com/200"}
            alt="Product Image"
            className="h-full w-full"
          />
        </div>
      </Link>
      <Link href={"/details/old"}>
        <h4>{product.name}</h4>
      </Link>
      <p className="font-medium text-lg">&#8358;{product.price.formatted}</p>
    </div>
  );
};

export default RelatedProductCard;
