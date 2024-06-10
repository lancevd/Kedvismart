// components/ColorCheck.js

import React, { useState } from "react";
import { TbCheck } from "react-icons/tb";

const ColorCheck = ({ color }) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border border-black `}
        onClick={handleCheckboxChange}
        style={{
          backgroundColor: color,
          borderColor: isChecked ? color : "transparent",
        }}
      >
        <div className="text-black">{isChecked && <TbCheck />}</div>
      </div>
      <label
        className="select-none cursor-pointer"
        onClick={handleCheckboxChange}
      ></label>
    </div>
  );
};

export default ColorCheck;
