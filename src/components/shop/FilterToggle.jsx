import { useState } from "react";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import PriceFilter from "./price/PriceFilter";

const FilterToggle = ({ items, title }) => {
  const [openIndex, setOpenIndex] = useState(true);

  const handleToggle = () => {
    setOpenIndex(!openIndex);
  };

  return (
    <div className="max-w-md mx-auto mt-2">
      {/* {items.map((item, index) => (
        <div key={index} className="mb-1 overflow-hidden"> */}
      <div
        onClick={() => handleToggle()}
        className="cursor-pointer p-1 flex justify-between items-center"
      >
        <h5 className="font-bold">{title}</h5>
        <span>{!openIndex ? <TbChevronRight /> : <TbChevronDown />}</span>
      </div>
      {openIndex && (
        <div className="ml-3">
          <PriceFilter />
        </div>
      )}
    </div>
    //   ))}
    // </div>
  );
};

export default FilterToggle;
