// components/PriceSlider.js

import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceSlider = ({ min, max, onChange }) => {
  const [range, setRange] = React.useState([min, max]);

  const handleSliderChange = (values) => {
    setRange(values);
  };

  const handleAfterChange = () => {
    onChange(range);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Slider
        range
        min={min}
        max={max}
        step={100}
        value={range}
        trackStyle={[{ backgroundColor: "#000000" }]}
        handleStyle={[
          { backgroundColor: "#000000", borderColor: "#000000" },
          { backgroundColor: "#000000", borderColor: "#000000" },
        ]}
        onChange={handleSliderChange}
        onAfterChange={handleAfterChange}
      />
      <div className="mt-4 flex justify-between">
        <span>{`${range[0]}`}</span>
        <span>{`${range[1]}`}</span>
      </div>
    </div>
  );
};

export default PriceSlider;
