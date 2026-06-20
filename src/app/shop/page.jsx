"use client";

import FilterBar from "@/components/shop/FilterBar";
import Products from "@/components/shop/Products";
import { useState } from "react";

const ShopPage = () => {
  const [mobileFilter, setMobileFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 250, max: 100000 });

  return (
    <main className="contain grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 py-8 gap-4">
      <div
        className={`rounded-2xl bg-white col-span-1 border p-2 ${
          mobileFilter ? "block" : "hidden"
        } ${mobileFilter ? "h-[90vh]" : ""} absolute md:static md:block`}
      >
        <FilterBar
          showFilter={setMobileFilter}
          onCategoryChange={setSelectedCategory}
          onPriceChange={setPriceRange}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="md:col-span-3 lg:col-span-3">
        <Products
          showFilter={setMobileFilter}
          category={selectedCategory}
          minPrice={priceRange.min}
          maxPrice={priceRange.max}
        />
      </div>
    </main>
  );
};

export default ShopPage;
