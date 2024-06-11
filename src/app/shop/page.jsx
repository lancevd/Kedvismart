"use client";

import FilterBar from "@/components/shop/FilterBar";
import Products from "@/components/shop/Products";
import { useEffect, useState } from "react";

const page = () => {
  const [mobileFilter, setMobileFilter] = useState(false) 
  // useEffect(() => {
  //   if (window.innerWidth < 768) {
  //     setMobileFilter(true);
  //   }
  // }, []);
  
  return (
    <main className="contain grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 py-8 gap-4">
      <div
        className={`rounded-2xl bg-white col-span-1 border p-2 ${
          mobileFilter ? "block" : "hidden"
        } ${mobileFilter ? "h-[90vh]" : ""} absolute md:static md:block`}
      >
        <FilterBar showFilter={setMobileFilter} />
      </div>
      <div className="md:col-span-3 lg:col-span-3">
        <Products showFilter={setMobileFilter} />
      </div>
    </main>
  );
};

export default page;
