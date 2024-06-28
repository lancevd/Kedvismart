"use client";
import React, { useEffect, useState } from "react";
import { TbCheck } from "react-icons/tb";
import { useCart } from "@/contexts/cartContext";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Link from "next/link";
import Spinner from "../Spinner";

const ProductInfo = ({ id, name, price, description, image }) => {
  const { addItemToCart, updateItemQuantity, getCart, cart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState(1);
  const [activeSize, setActiveSize] = useState("Medium");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    if (name) {
      setLoading(false);
    }
  }, [name]);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleAddToCart = () => {
    const selectedColor =
      activeColor === 1 ? "Blue" : activeColor === 2 ? "Green" : "Red";
      
      const itemExists = cart.line_items.some((item) => item.id === id);

      if (itemExists) {
        console.log("Item exists in the cart.");
        updateItemQuantity(qty);
      } else {
        console.log("Item does not exist in the cart.");
        addItemToCart(id, qty);
      }

    getCart();
    onOpenModal();
  };

  if (qty < 1) {
    setQty(1);
  }

  

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="flex flex-col gap-8 justify-center items-center">
          <h3 className="mt-6">Would you like to pay now?</h3>
          <Link
            href="/cart"
            className="text-center w-2/3 bg-black text-white p-3 rounded-sm hover:bg-white hover:border hover:border-black hover:text-black"
          >
            Yes, go to cart
          </Link>
          <button
            onClick={onCloseModal}
            className="w-2/3 bg-black text-white p-3 rounded-sm hover:bg-white hover:border hover:border-black hover:text-black"
          >
            No, keep shopping
          </button>
        </div>
      </Modal>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2>{name ? name : "Loading..."}</h2>
          <br />
          <p className="text-lg font-medium">₦{price}</p>
          <br />
          <p>{description}</p>
          <br />
          <hr />
          <p className="text-sm py-2">Select colors</p>
          <div className="flex gap-2">
            <div
              onClick={() => setActiveColor(1)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white cursor-pointer bg-blue-950"
            >
              {activeColor === 1 && <TbCheck />}
            </div>
            <div
              onClick={() => setActiveColor(2)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white cursor-pointer bg-green-950"
            >
              {activeColor === 2 && <TbCheck />}
            </div>
            <div
              onClick={() => setActiveColor(3)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white cursor-pointer bg-red-950"
            >
              {activeColor === 3 && <TbCheck />}
            </div>
          </div>
          <br />
          <hr />
          <p className="text-sm py-2">Choose Size</p>
          <div className="flex gap-2">
            <p
              className={`rounded-2xl py-1 px-3 ${
                activeSize === "Small"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[#f0f0f0]"
              }`}
              onClick={() => setActiveSize("Small")}
            >
              Small
            </p>
            <p
              className={`rounded-2xl py-1 px-3 ${
                activeSize === "Medium"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[#f0f0f0]"
              }`}
              onClick={() => setActiveSize("Medium")}
            >
              Medium
            </p>
            <p
              className={`rounded-2xl py-1 px-3 ${
                activeSize === "Large"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[#f0f0f0]"
              }`}
              onClick={() => setActiveSize("Large")}
            >
              Large
            </p>
          </div>
          <br />
          <hr />
          <br />
          <div className="flex gap-4">
            <div className="flex items-center gap-1 bg-[#f0f0f0] rounded-3xl w-fit">
              <button
                className="bg-transparent p-2 text-lg font-bold"
                onClick={() => setQty(qty - 1)}
              >
                -
              </button>
              <div className="bg-transparent text-center w-8 p-[2px]">
                {qty}
              </div>
              <button
                className="bg-transparent p-2 text-lg font-bold"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>
            <button
              className="bg-[var(--primary)] p-2 text-white rounded-3xl w-full text-center"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
