import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import TopSelling from "@/components/home/TopSelling";
import React from "react";

const page = () => {
  return (
    <main>
      <Hero />
      <Partners />
      <div className="space"></div>
      <NewArrivals />
      <div className="space"></div>
      <hr />
      <div className="space"></div>
      <TopSelling />
      <div className="space"></div>
      <Categories />
      <div className="space"></div>
      <Testimonials />
      <div className="space"></div>
    </main>
  );
};

export default page;
