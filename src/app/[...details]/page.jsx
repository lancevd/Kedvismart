"use client";
import Spinner from "@/components/Spinner";
import Gallery from "@/components/productDetails/Gallery";
import ProductInfo from "@/components/productDetails/ProductInfo";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import TabComponent from "@/components/productDetails/TabComponent";
import axios from "axios";
import { setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ProdId = searchParams.get("id");
    setId(ProdId);
    if (ProdId) {
      setCookie("itemID", ProdId);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getProducts();
    }
  }, [id]);

  const getProducts = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/details/singleProduct");
      const result = response.data;
      if (result) {
        setProducts(result);
        setLoading(false);
        console.log("THIS IS PRODUCT DATA", result);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products) {
      console.log("THIS IS PRODUCT STATE DATA", products); 
    }
  }, [products]);

  return (
    <main className="contain py-4">
      <section className="flex flex-col md:flex-row gap-4 lg:gap-8">
        <div className="w-full md:w-1/2">
          {products ? <Gallery items={products.assets} /> : <Spinner />}
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

export default ProductPage;
