'use client'
import React, { useState } from "react";

const Gallery = () => {
  const [imgSelector, setImgSelector] = useState(0)
  const [imgUrl, setImgUrl] = useState("")
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="w-full md:w-1/4 flex flex-row justify-between md:flex-col gap-2">
        {/* <div className="rounded-2xl overflow-hidden w-full"> */}
        <img
          src="https://via.placeholder.com/200"
          alt=""
          className="rounded-2xl overflow-hidden w-full"
        />
        <img
          src="https://via.placeholder.com/200"
          alt=""
          className="rounded-2xl overflow-hidden w-full"
        />
        <img
          src="https://via.placeholder.com/200"
          alt=""
          className="rounded-2xl overflow-hidden w-full"
        />
        {/* </div> */}
      </div>
      <div className="w-full md:w-3/4 border rounded-2xl overflow-hidden">
        <img src="https://via.placeholder.com/200" className="w-full" alt="" />
      </div>
    </div>
  );
};

export default Gallery;
