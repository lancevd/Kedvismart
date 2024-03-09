"use client";
import { TbStarFilled } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { reviewsData } from "./ReviewsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const ReviewBox = ({ customer }) => {
  return (
    <div className="w-full border rounded-2xl p-4">
      <div className="flex gap-2 text-[#FFC633]">
        <TbStarFilled />
        <TbStarFilled />
        <TbStarFilled />
        <TbStarFilled />
        <TbStarFilled />
      </div>
      <p className="font-bold flex gap-2 items-center">
        {customer.name}
        <span className="text-green-700">
          <MdVerified />
        </span>
      </p>
      <p>{customer.content}</p>
      <br />
      <p className="text-small font-bold">{customer.date}</p>
    </div>
  );
};

const Reviews = () => {
  return (
    <section>
      <h2 className="font-bold">All Reviews</h2>
      <br />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {reviewsData.map((data, index) => (
          <ReviewBox key={index} customer={data} />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
