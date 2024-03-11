import { useState } from "react";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";

const sizeData = [
  "xx-large",
  "x-large",
  "large",
  "medium",
  "small",
  "x-small",
  "xx-small",
];

const SizesFilter = ({ items, title }) => {
  const [openIndex, setOpenIndex] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleToggle = () => {
    setOpenIndex(!openIndex);
  };

  const handleSizeClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
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
      <div className="ml-3 flex gap-2 flex-wrap">
        {openIndex &&
          sizeData.map((size, index) => (
            <div
              key={index}
              onClick={() => handleSizeClick(index)}
              className={`rounded-2xl cursor-pointer hover:text-white hover:bg-black py-1 px-2 ${
                activeIndex === index
                  ? "bg-black text-white"
                  : "bg-[#f0f0f0] text-black"
              } `}
            >
              {size}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SizesFilter;
