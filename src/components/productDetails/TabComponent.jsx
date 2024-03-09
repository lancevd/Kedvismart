'use client'
import React, { useState } from "react";
import Reviews from "./Reviews";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Product Details", content: "Product details content goes here." },
    { title: "Reviews", content: <Reviews /> },
    { title: "FAQs", content: "No FAQs available for this product." },
  ];

  return (
    <div className="p-4">
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              activeTab === index ? "border-b-2 border-black" : ""
            } flex-grow py-2 px-4 focus:outline-none`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div key={index} className={`${activeTab === index ? "" : "hidden"}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabComponent;
