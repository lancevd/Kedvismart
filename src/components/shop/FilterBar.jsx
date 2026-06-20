"use client";

import { useEffect, useState } from "react";
import { TbFilter, TbX } from "react-icons/tb";
import FilterToggle from "./price/FilterToggle";
import ColorsToggle from "./ColorsToggle";
import SizesFilter from "./SizesFilter";
import Spinner from "@/components/Spinner";

const FilterBar = ({ showFilter, onCategoryChange, onPriceChange, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCats(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h5 className="bold">Filters</h5>
        <div>
          <span className="hidden md:block">
            <TbFilter />
          </span>
          <span className="md:hidden cursor-pointer" onClick={() => showFilter(false)}>
            <TbX />
          </span>
        </div>
      </div>
      <div className="h-2" />
      <hr />
      <div className="h-2" />

      {/* Category filter */}
      <div>
        <h5 className="font-semibold text-sm mb-2">Category</h5>
        {loadingCats ? (
          <Spinner />
        ) : (
          <div className="space-y-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ""}
                onChange={() => onCategoryChange("")}
              />
              All
            </label>
            {categories.map((cat) => (
              <label key={cat._id} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="category"
                  value={cat._id}
                  checked={selectedCategory === cat._id}
                  onChange={() => onCategoryChange(cat._id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="h-2" />
      <hr />
      <div className="h-2" />

      {/* Price filter */}
      <FilterToggle title="Price" onPriceChange={onPriceChange} />

      <div className="h-2" />
      <hr />
      <div className="h-2" />
      <ColorsToggle title={"Colors"} />
      <div className="h-2" />
      <hr />
      <div className="h-2" />
      <SizesFilter />
      <div className="h-2" />
      <hr />
      <div className="h-2" />
    </section>
  );
};

export default FilterBar;
