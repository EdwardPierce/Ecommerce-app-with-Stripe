import React from "react";

import { useStateContext } from "@/context/StateContext";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import getStripe from "@/lib/getStripe";

const Cart = () => {
  const {
    totalQuantities,
    setShowCart,
    cartItems,
    toggleCartItemQuantity,
    onRemove,
    totalPrice,
  } = useStateContext();

  const handleCheckOut = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.status === 500) {
      return;
    }

    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="w-[100vw] fixed right-0 top-0 bg-black/50 z-10">
      <div className="h-[100vh] w-[600px] py-10 px-3 bg-white float-right relative">
        <button
          onClick={() => setShowCart(false)}
          className="flex text-[18px] font-medium"
        >
          <span>&#x2B9C;</span>
          <span className=" ml-3">Your Cart</span>
          <span className="text-red-500 ml-3">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="m-10 text-center">
            <h3 className="text-[20px] font-semibold">
              Your shopping bag is empty
            </h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="w-96 mt-10 bg-red-500 text-white px-5 py-3 text-[20px] rounded-2xl uppercase
              hover:scale-110 ease-in duration-300"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="mt-4 px-5 py-3 max-h-[70vh] overflow-auto">
          {/* Product Container */}
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div key={item._id} className="flex p-5 gap-7">
                <img
                  className=" w-44 border rounded-lg shadow-md"
                  src={urlFor(item?.image[0])}
                />

                <div className=" w-72">
                  <div className="flex justify-between gap-3 items-start">
                    <h4 className="text-[24px] font-bold text-blue-800">
                      {item.name}
                    </h4>
                    <h5 className="pt-1 text-[20px] font-bold">
                      ${item.price}
                    </h5>
                  </div>

                  <div className="flex justify-between mt-14 items-center">
                    <div className="flex">
                      <div
                        onClick={() => toggleCartItemQuantity(item._id, true)}
                        className="border border-gray-500 cursor-pointer  px-4 text-2xl text-red-500 text-"
                      >
                        __
                      </div>
                      <div className="border-y border-gray-500 px-4 py-2 text-2xl">
                        {item.quantity}
                      </div>
                      <div
                        onClick={() => toggleCartItemQuantity(item._id, false)}
                        className="border border-gray-500 cursor-pointer  px-4 py-2 text-2xl text-green-500"
                      >
                        +
                      </div>
                    </div>

                    <div
                      onClick={() => onRemove(item)}
                      className="text-[26px] text-red-500 cursor-pointer"
                    >
                      &#11199;
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* Product Container */}
        </div>

        {cartItems.length >= 1 && (
          <div className="absolute bottom-3 right-1 w-full px-14 py-3">
            <div className="flex justify-between">
              <h3 className="text-[22px] font-bold">Subtotal:</h3>
              <h3 className="text-[22px] font-bold">${totalPrice} </h3>
            </div>

            <div className="mx-auto w-96">
              <button
                type="button"
                onClick={handleCheckOut}
                className="w-96 mt-10 bg-red-500 text-white px-5 py-3 text-[20px] rounded-2xl uppercase
              hover:scale-110 ease-in duration-300"
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
