import React from "react";

const Categories = () => {
  return (
    <section className="contain bg-[#f0f0f0] p-8 rounded-3xl">
      <h2 className="text-center font-bold">BROWSE BY STYLE STYLE</h2>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:p-8">
        <div
          className="rounded-3xl bg-cover bg-center h-52 lg:h-64 lg:col-span-2 overflow-hidden"
          style={{ backgroundImage: "url(/images/casual.png)" }}
        >
          <p className="text-2xl lg:text-3xl font-medium p-4">Casual</p>
        </div>
        <div
          className="rounded-3xl bg-cover bg-center h-52 lg:h-64 lg:col-span-3 overflow-hidden"
          style={{ backgroundImage: "url(/images/formal.png)" }}
        >
          <p className="text-2xl lg:text-3xl font-medium p-4">Formal</p>
        </div>
        <div
          className="rounded-3xl bg-cover bg-center h-52 lg:h-64 lg:col-span-3 overflow-hidden"
          style={{ backgroundImage: "url(/images/party.png)" }}
        >
          <p className="text-2xl lg:text-3xl font-medium p-4">Party</p>
        </div>
        <div
          className="rounded-3xl bg-cover bg-center h-52 lg:h-64 lg:col-span-2 overflow-hidden"
          style={{ backgroundImage: "url(/images/gym.png)" }}
        >
          <p className="text-2xl lg:text-3xl font-medium p-4">Gym</p>
        </div>
      </div>
    </section>
  );
};

export default Categories;
