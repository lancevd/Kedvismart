import { TbFilter } from "react-icons/tb";
import Toggle from "./Toggle";
import FilterToggle from "./price/FilterToggle";
import ColorsToggle from "./ColorsToggle";
import SizesFilter from "./SizesFilter";

const FilterBar = () => {
  const items = [
    {
      title: "Clothes",
      content: ["Men", "Women", "Casual"],
    },
    {
      title: "Shoes",
      content: ["Corporate", "Formal", "Casual"],
    },
    {
      title: "Accessories",
      content: [],
    },
  ];

  return (
    <section>
      <div className="flex  items-center justify-between">
        <h5 className="bold">Filters</h5>
        <div className="">
          <TbFilter />
        </div>
      </div>
      <div className="h-2"></div>
      <hr />
      <div className="h-2"></div>
      <Toggle items={items} />
      <div className="h-2"></div>
      <hr />
      <div className="h-2"></div>
      <FilterToggle title="Price" />
      <div className="h-2"></div>
      <hr />
      <div className="h-2"></div>
      <ColorsToggle title={"Colors"} />
      <div className="h-2"></div>
      <hr />
      <div className="h-2"></div>
      <SizesFilter />
      <div className="h-2"></div>
      <hr />
      <div className="h-2"></div>
    </section>
  );
};

export default FilterBar;
