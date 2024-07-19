"use client";
import React, { useEffect, useState } from "react";
import CartItem from "../../components/cart/CartItem";
import { FaArrowRightLong } from "react-icons/fa6";
import { useCart } from "@/contexts/cartContext";

const Page = () => {
  // const [cart, setCart] = useState([]);
  const [deliveryPrice] = useState(1500);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const { getCart, cart } = useCart();
  useEffect(() => {
    getCart();
    console.log(cart);
  }, [total]);

  useEffect(()=>{
    setSubTotal(cart.subtotal.raw)
    setTotal(cart.subtotal.raw + deliveryPrice)
  })

  return (
    <main className="contain py-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
      <div className="w-full lg:w-2/3 border p-4 rounded-xl">
        {cart.line_items &&
          (cart.line_items.length < 1
            ? "There are no items in your cart. Add some items to your cart to see them here."
            : cart.line_items.map((item) => (
                <>
                  <CartItem key={item.id} item={item} />
                  <br />
                  <hr />
                  <br />
                </>
              )))}
      </div>
      <div className="w-full lg:w-1/3 border p-4 rounded-xl">
        <h4 className="mb-2">Order Summary</h4>
        <div className="flex justify-between items-center">
          <p className="text-[#0000006b]">Subtotal</p>
          <p className="font-bold">&#8358;{cart.subtotal.raw}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[#0000006b]">Delivery Fee</p>
          <p className="font-bold">&#8358;{deliveryPrice}</p>
        </div>
        <br />
        <hr />
        <br />
        <div className="flex justify-between items-center">
          <p className="">Total</p>
          <p className="font-bold">
            &#8358;{total}
          </p>
        </div>
        <br />
        <div className="flex gap-8 justify-between">
          <input
            type="text"
            className="w-2/3 bg-[var(--grey)] text-[#0000006b] rounded-3xl py-3 px-5 outline-none"
            placeholder={`Add promo code`}
            disabled
          />
          <button className="bg-black w-1/3 rounded-3xl text-white p-3">
            Apply
          </button>
        </div>
        <br />
        <button className="bg-black w-full rounded-3xl flex gap-4 items-center justify-center text-white p-3">
          Checkout <FaArrowRightLong />
        </button>
      </div>
    </main>
  );
};

export default Page;
