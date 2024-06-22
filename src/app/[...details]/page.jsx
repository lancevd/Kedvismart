'use client'
import Gallery from "@/components/productDetails/Gallery";
import ProductInfo from "@/components/productDetails/ProductInfo";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import TabComponent from "@/components/productDetails/TabComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [id, setId] =  useState(null)
  useEffect(()=>{
    const { searchParams } = new URL(window.location);
    const ProdId = searchParams.get("id");
    setId(ProdId)
  },[])
  if (id) {
    
  }

  async function getID() {
    try {
      const response = axios.post("/api/details/singleProduct", id);
      console.log(response);
      
    }
  }

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
