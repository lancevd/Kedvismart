'use client'
import React, { useState } from "react";

const Gallery = ({items}) => {
  const [imgSelector, setImgSelector] = useState(0)
  const [imgUrl, setImgUrl] = useState("")


  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      <div className="w-full lg:w-1/4 flex flex-row justify-between lg:flex-col gap-2">
        {/* <div className="rounded-2xl overflow-hidden w-full"> */}
        <img
          onClick={()=>setImgSelector(0)}
          src={items[0] ? items[0].url : "https://via.placeholder.com/200"}
          alt=""
          className={`rounded-2xl overflow-hidden w-full border ${imgSelector == 0 ? "border-2 border-black" : ""}`}
        />
        <img
          onClick={()=>setImgSelector(1)}
          src={items[1] ? items[1].url : "https://via.placeholder.com/200"}
          alt=""
          className={`rounded-2xl overflow-hidden w-full border ${imgSelector == 1 ? "border-2 border-black" : ""}`}
        />
        <img
          onClick={()=>setImgSelector(2)}
          src={items[2] ? items[2].url : "https://via.placeholder.com/200"}
          alt=""
          className={`rounded-2xl overflow-hidden w-full border ${imgSelector == 2 ? "border-2 border-black" : ""}`}
        />
        {/* </div> */}
      </div>
      <div className="w-full lg:w-3/4 border rounded-2xl overflow-hidden">
        <img
          src={
            items[imgSelector]
              ? items[imgSelector].url
              : "https://via.placeholder.com/200"
          }
          className="w-full h-full"
          alt=""
        />
      </div>
    </div>
  );
};

export default Gallery;
