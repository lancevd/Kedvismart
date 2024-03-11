"use client";

import FilterBar from "@/components/shop/FilterBar";

const page = () => {
  return (
    <main className="contain grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-8 gap-4">
      <div className="rounded-2xl col-span-1 border p-2">
        <FilterBar />
      </div>
      <div className="md:col-span-2 lg:col-span-3"></div>
    </main>
  );
};

export default page;
