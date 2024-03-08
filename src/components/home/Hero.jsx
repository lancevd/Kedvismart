import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center h-[80vh] py-4 md:py-8"
      style={{ backgroundImage: "url(/images/Hero.png)" }}
    >
      <div className="contain h-full flex items-center">
        <div className="w-full  lg:w-1/2 ">
          <h1 className="font-bold">FIND CLOTHES THAT MATCHES YOUR STYLE </h1>
          <br />
          <p>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <br />
          <Link href={"/shop"} className="w-full md:w-fit">
            <button className="bg-[var(--primary)] py-2 px-6 rounded-3xl text-white">
              Shop Now
            </button>
          </Link>
          <br />
          <br />
          <div className="flex justify-between">
            <div className="">
              <p className="text-2xl font-medium">200+</p>
              <p>International Brands</p>
            </div>
            <div className="w-4  border-l-2 border-[#00000011]">&nbsp;</div>
            <div className="">
              <p className="text-2xl font-medium">2000+</p>
              <p>High-Quality products</p>
            </div>
            <div className="w-4  border-l-2 border-[#00000011]">&nbsp;</div>
            <div className="">
              <p className="text-2xl font-medium">30,000+</p>
              <p>Happy Customers </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
