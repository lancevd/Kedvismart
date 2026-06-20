'use client'
import React, { useState } from "react";

const Gallery = ({ items, images }) => {
  const [imgSelector, setImgSelector] = useState(0);
  
  // Support both 'items' and 'images' props for backward compatibility
  // Normalise to an array of URLs
  const displayImages = (images || items || []).map(img => {
    if (typeof img === 'string') return img;
    return img.url || img.secure_url || "https://via.placeholder.com/600";
  });

  // Ensure we have at least 3 placeholder slots if needed, or just map what we have
  const mainImage = displayImages[imgSelector] || "https://via.placeholder.com/600";

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="w-full lg:w-1/4 flex flex-row justify-between lg:flex-col gap-2">
        {[0, 1, 2].map((index) => (
          <div 
            key={index}
            onClick={() => setImgSelector(index)}
            className={`cursor-pointer rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
              imgSelector === index ? "border-black scale-95" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={displayImages[index] || "https://via.placeholder.com/200"}
              alt={`Gallery thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="w-full lg:w-3/4 border rounded-2xl overflow-hidden aspect-square bg-gray-50">
        <img
          src={mainImage}
          className="w-full h-full object-contain"
          alt="Product main gallery"
        />
      </div>
    </div>
  );
};

export default Gallery;
