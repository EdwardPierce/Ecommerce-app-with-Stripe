import React from "react";

import { client } from "@/lib/client";
import { HeroBanner, Product } from "@/components";

const Home = ({ bannerData, productData }) => {
  return (
    <div className="px-5 pt-2 mx-auto">
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      {console.log(productData)}
      <div className="text-center my-10">
        <h2 className=" font-bold text-5xl text-blue-800">
          Best Seller Products
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <ul className="grid  grid-cols-3 gap-6 ">
          {productData.map((product) => (
            <Product key={product._id} product={product} />
          ))}
          {productData.map((product) => (
            <Product key={product._id + "123"} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const productQuery = '*[_type == "product"]';
  const productData = await client.fetch(productQuery);

  return {
    props: { bannerData, productData },
  };
};

export default Home;
