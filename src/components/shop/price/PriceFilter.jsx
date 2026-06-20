import PriceSlider from "./PriceSlider";

const PriceFilter = ({ onPriceChange }) => {
  const handlePriceChange = (range) => {
    onPriceChange({ min: range[0], max: range[1] });
  };

  return (
    <div>
      <PriceSlider min={250} max={100000} onChange={handlePriceChange} />
    </div>
  );
};

export default PriceFilter;
