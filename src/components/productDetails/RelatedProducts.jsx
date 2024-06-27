import React from "react";
import RelatedProductCard from "./RelatedProductCard";
import { cardData } from "../CardData";

const RelatedProducts = ({relatedData}) => {
  // const relatedData = cardData.slice(0, 4);
  // console.log(relatedData);

  return (
    <section>
      <h2 className="text-center font-bold uppercase">You might also like</h2>
      <br />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {relatedData &&
          relatedData.map((product, index) => (
            <RelatedProductCard key={index} product={product} /> 
            // <p>Hi</p>
          ))}
      </div>
      <br />
    </section>
  );
};

export default RelatedProducts;
