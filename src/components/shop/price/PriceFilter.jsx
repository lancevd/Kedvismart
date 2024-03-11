import PriceSlider from "./PriceSlider";

const PriceFilter = () => {
  const handlePriceChange = (range) => {
    // Implement logic to handle price filter
    console.log("Price Range:", range);
  };

  return (
    <div>
      <PriceSlider min={250} max={100000} onChange={handlePriceChange} />
    </div>
  );
};

export default PriceFilter;
