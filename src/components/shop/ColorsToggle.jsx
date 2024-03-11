import { useState } from "react";
import { TbCheck, TbChevronDown, TbChevronRight } from "react-icons/tb";
import PriceFilter from "./price/PriceFilter";
import ColorCheck from "./colors/ColorCheck";

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
        <div className="ml-3 flex flex-wrap gap-2">
          <ColorCheck color="#000000" />
          <ColorCheck color="red" />
          <ColorCheck color="green-500" />
          <ColorCheck color="blue-800" />
          <ColorCheck color="grey" />
          <ColorCheck color="purple" />
          <ColorCheck color="white" />
        </div>
      )}
    </div>
  );
};

export default ColorsToggle;
