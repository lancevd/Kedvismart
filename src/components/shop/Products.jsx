"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { cardData } from "../CardData.js";
import { RxMixerVertical } from "react-icons/rx";
import Link from "next/link";

const STORAGE_KEY = "kedvis_voice_search";

const Products = ({ showFilter }) => {
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cardData;
    return cardData.filter((item) => {
      const name = (item.name || "").toLowerCase();
      const image = (item.image || "").toLowerCase();
      return name.includes(q) || image.includes(q);
    });
  }, [query]);

  return (
    <section className="w-full">
      <div className="contain">
        <div className="flex items-center gap-6 justify-between flex-wrap">
          <h2 className="font-bold text-center">Products</h2>
          <div className="text-xs md:text-sm flex items-center gap-3">
            <p>
              {query
                ? `Showing ${filtered.length} of ${cardData.length} Products`
                : `Showing 1-${cardData.length} of ${cardData.length} Products`}
            </p>
            <span
              onClick={() => showFilter(true)}
              className="md:hidden p-2 cursor-pointer rounded-full bg-gray-200 color-black"
            >
              <RxMixerVertical />
            </span>
          </div>
        </div>

        {/* Voice search results banner */}
        {query && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-black text-white px-4 py-2 text-sm">
            <span>
              Voice search: <strong>"{query}"</strong> — {filtered.length}{" "}
              {filtered.length === 1 ? "result" : "results"}
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
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No products match &ldquo;{query}&rdquo;.</p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-sm underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
            {filtered.map((item, index) => (
              <ProductCard key={index} info={item} />
            ))}
          </div>
        )}
        <br />
      </div>
    </section>
  );
};

export default Products;