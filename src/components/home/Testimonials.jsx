"use client";
import { TbStarFilled } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { testimonialsData } from "./testimonialsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const TestimonialBox = ({ user }) => {
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
        {user.name}{" "}
        <span className="text-green-700">
          <MdVerified />
        </span>
      </p>
      <p>{user.content}</p>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section>
      <h2 className="font-bold contain">Our Happy Customers</h2>
      <br />
      <Swiper
        className="contain mySwiper"
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay, Navigation]}
      >
        {testimonialsData.map((data, index) => (
          <SwiperSlide key={index}>
            <TestimonialBox user={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
