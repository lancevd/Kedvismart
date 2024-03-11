import Gallery from "@/components/productDetails/Gallery";
import ProductInfo from "@/components/productDetails/ProductInfo";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import TabComponent from "@/components/productDetails/TabComponent";
import React from "react";

const page = () => {
  return (
    <main className="contain py-4">
      <section className="flex flex-col md:flex-row gap-4 lg:gap-8">
        <div className="w-full md:w-1/2">
          <Gallery />
        </div>
        <div className="w-full md:w-1/2">
          <ProductInfo />
        </div>
      </section>
      <br />
      <div className="space"></div>
      <TabComponent />
      <br />
      <div className="space"></div>
      <RelatedProducts />
    </main>
  );
};

export default page;
