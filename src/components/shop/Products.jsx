"use client";

import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { RxMixerVertical } from "react-icons/rx";
import Spinner from "@/components/Spinner";

const STORAGE_KEY = "kedvis_voice_search";

const Products = ({ showFilter, category, minPrice, maxPrice }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // On mount, pull a voice-search term if one was stashed by the voice widget.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stashed = sessionStorage.getItem(STORAGE_KEY);
    if (stashed) {
      setQuery(stashed);
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("search", query);
      if (category) params.set("category", category);
      if (minPrice !== undefined) params.set("minPrice", minPrice);
      if (maxPrice !== undefined) params.set("maxPrice", maxPrice);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, category, minPrice, maxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="w-full">
      <div className="contain">
        <div className="flex items-center gap-6 justify-between flex-wrap">
          <h2 className="font-bold text-center">Products</h2>
          <div className="text-xs md:text-sm flex items-center gap-3">
            <p>
              {loading
                ? "Loading..."
                : `Showing ${products.length} Product${products.length !== 1 ? "s" : ""}`}
            </p>
            <span
              onClick={() => showFilter(true)}
              className="md:hidden p-2 cursor-pointer rounded-full bg-gray-200"
            >
              <RxMixerVertical />
            </span>
          </div>
        </div>

        {/* Voice search results banner */}
        {query && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-black text-white px-4 py-2 text-sm">
            <span>
              Voice search: <strong>&ldquo;{query}&rdquo;</strong> &mdash; {products.length}{" "}
              {products.length === 1 ? "result" : "results"}
            </span>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs underline opacity-80 hover:opacity-100"
            >
              Clear
            </button>
          </div>
        )}

        <br />
        {loading ? (
          <div className="w-full flex justify-center py-12">
            <Spinner />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No products found{query ? ` for &ldquo;${query}&rdquo;` : ""}.</p>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-3 text-sm underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
            {products.map((item) => (
              <ProductCard key={item._id} info={item} />
            ))}
          </div>
        )}
        <br />
      </div>
    </section>
  );
};

export default Products;