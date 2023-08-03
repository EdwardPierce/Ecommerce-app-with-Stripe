import React from "react";
import Link from "next/link";

import { useStateContext } from "@/context/StateContext";
import Cart from "./Cart";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="flex justify-between items-center mx-5 mt-2">
      <p className="text-gray-600 text-lg">
        <Link href="/">
          A<span className="text-red-500">+</span> Electrical
        </Link>
      </p>

      <button
        onClick={() => setShowCart(true)}
        className="bg-gray-500/50 p-2 font-medium relative"
      >
        Cart
        <span
          className=" absolute -right-1 -top-1 bg-red-500 w-5 h-5
         text-white text-xs rounded-full text-center "
        >
          {totalQuantities}
        </span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
