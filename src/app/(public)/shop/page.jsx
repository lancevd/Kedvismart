"use client";

import FilterBar from "@/components/shop/FilterBar";
import Products from "@/components/shop/Products";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const ShopPageContent = () => {
  const searchParams = useSearchParams();
  const [mobileFilter, setMobileFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "newest");
  const [priceRange, setPriceRange] = useState({ min: 250, max: 100000 });

  useEffect(() => {
    // 1. Sync from URL
    const cat = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    if (cat) setSelectedCategory(cat);
    if (search) setSearchQuery(search);
    if (sort) setSortOrder(sort);

    // 2. Check voice search stash
    const voiceSearch = sessionStorage.getItem("kedvis_voice_search");
    if (voiceSearch) {
      setSearchQuery(voiceSearch);
      sessionStorage.removeItem("kedvis_voice_search");
    }
  }, [searchParams]);

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
          search={searchQuery}
          sort={sortOrder}
          minPrice={priceRange.min}
          maxPrice={priceRange.max}
        />
      </div>
    </main>
  );
};

const ShopPage = () => {
  return (
    <Suspense fallback={<div className="contain py-20 text-center">Loading shop...</div>}>
      <ShopPageContent />
    </Suspense>
  );
};

export default ShopPage;
