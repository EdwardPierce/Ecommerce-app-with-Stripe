import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/client";

const HeroBanner = ({ heroBanner: { product, desc, buttonText, image } }) => {
  const img = image.asset._ref;
  const newImage = img
    .replace("image-", "https://cdn.sanity.io/images/nri68r0q/production/")
    .replace("-webp", ".webp");

  return (
    <div className="flex mx-auto w-full h-[500px]  rounded-3xl bg-gray-200/50 overflow-hidden ">
      <div className="w-1/2 pt-32 px-10 ">
        <p className="text-4xl font-extrabold">{product} </p>
        <p className="mt-4 text-lg">{desc} </p>

        <div className="mt-8">
          <Link href="/">
            <span className="bg-red-500 text-white rounded-lg p-3 font-medium">
              {buttonText}
            </span>
          </Link>
        </div>
      </div>

      <div className="w-1/2">
        <Image
          src={newImage}
          width={800}
          height={800}
          alt="lg-tv"
          priority={true}
        />
      </div>
    </div>
  );
};

export default HeroBanner;
