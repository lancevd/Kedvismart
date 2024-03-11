import { useState } from "react";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";

const Toggle = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-md mx-auto mt-2">
      {items.map((item, index) => (
        <div key={index} className="mb-1 overflow-hidden">
          <div
            onClick={() => handleToggle(index)}
            className="cursor-pointer p-1 flex justify-between items-center"
          >
            <p className="">{item.title}</p>
            <span>
              {openIndex === index ? <TbChevronDown /> : <TbChevronRight />}
            </span>
          </div>
          {openIndex === index && (
            <div className="ml-3">
              {item.content.map((item) => (
                <p className="text-sm">{item}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Toggle;
