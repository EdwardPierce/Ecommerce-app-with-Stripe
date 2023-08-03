import { useState } from "react";
import { client, urlFor } from "@/lib/client";

import { useStateContext } from "@/context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { qty, incQty, decQty, onAdd, setShowCart } = useStateContext();

  const { image, price, name, details } = product;
  const [index, setIndex] = useState(0);

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  return (
    <div className="mt-14">
      <div className="flex gap-10 mx-10">
        <div>
          <div className="w-96">
            <img
              className="border rounded-lg shadow-lg "
              src={urlFor(image && image[index])}
            />
          </div>

          <div className="flex gap-5 mt-5">
            {image.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                onClick={() => setIndex(i)}
                className={
                  i == index
                    ? "w-20 h-20 border-2 rounded-lg shadow-lg border-red-600"
                    : "w-20 h-20 border rounded-lg shadow-lg"
                }
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mt-5 text-3xl font-bold text-blue-800">{name} </h2>
          <h4 className="mt-4 text-lg font-medium">Details:</h4>
          <p className="text-blue-800">{details} </p>
          <p className="mt-7 text-3xl text-red-500 font-medium">${price}</p>

          <div className="flex gap-7 mt-4">
            <h3 className="text-xl font-bold text-blue-800">Quantity:</h3>
            <div className="flex">
              <div
                onClick={decQty}
                className="border border-gray-500 cursor-pointer  px-4 text-2xl text-red-500 text-"
              >
                __
              </div>
              <div className="border-y border-gray-500 px-4 py-2 text-2xl">
                {qty}
              </div>
              <div
                onClick={incQty}
                className="border border-gray-500 cursor-pointer  px-4 py-2 text-2xl text-green-500"
              >
                +
              </div>
            </div>
          </div>

          <div className="flex gap-7 mt-10">
            <button
              onClick={() => {
                onAdd(product, qty);
              }}
              className=" py-3 w-52 hover:scale-110 ease-in duration-300 text-[20px] font-medium text-red-500 border border-red-500"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className=" py-3 w-52 hover:scale-110 ease-in duration-300 text-[20px] font-medium text-white bg-red-500 border border-red-500"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
