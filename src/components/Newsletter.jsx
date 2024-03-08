import React from "react";

const Newsletter = () => {
  return (
    <div className="contain bg-[var(--primary)] items-center flex gap-4 lg:p-6 justify-between flex-col md:flex-row p-4 rounded-2xl">
      <h2 className="font-bold w-full md:w-1/2 lg:w-[45%] text-white">
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </h2>
      <form action="" className="w-full md:w-1/2 lg:w-[35%]">
        <div className="bg-white rounded-2xl w-full p-2 ">
          <input type="email" className="w-full outline-none" />
        </div>
        <br />
        <button className="bg-white rounded-2xl p-2 w-full">
          Subscribe to Newsletter
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
