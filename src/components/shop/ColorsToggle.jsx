import { useState } from "react";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import PriceFilter from "./price/PriceFilter";

const ColorsToggle = ({ items, title }) => {
  const [openIndex, setOpenIndex] = useState(true);

  const handleToggle = () => {
    setOpenIndex(!openIndex);
  };

  return (
    <div className="max-w-md mx-auto mt-2">
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
  );
};

export default ColorsToggle;
