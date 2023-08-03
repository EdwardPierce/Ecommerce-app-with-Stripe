import React from "react";
import { urlFor } from "@/lib/client";
import Link from "next/link";

const Product = ({ product: { slug, price, name, image } }) => {
  return (
    <li>
      <Link href={`/product/${slug.current}`}>
        <div>
          <div className="bg-gray-300  rounded-xl w-60 h-80">
            <img
              className="mx-auto rounded-xl border shadow-lg"
              src={urlFor(image && image[0])}
              alt="pro"
            />
          </div>

          <p className=" text-blue-700 font-medium">{name} </p>
          <p className=" font-extrabold mt-2">${price} </p>
        </div>
      </Link>
    </li>
  );
};

export default Product;
