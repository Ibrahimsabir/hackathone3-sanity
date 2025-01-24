"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { ProductsYouMayLike } from "../allproductdata";

type TopSellerData = {
  id: number;
  image: string;
  title: string;
  price: string;
  priceWas: string;
  rating: number;
};

const YouMayLike = () => {
  const card: TopSellerData[] = ProductsYouMayLike;
  const [visibleProducts, setVisibleProducts] = useState(4); // Manage the number of visible products
  const [noMoreProducts, setNoMoreProducts] = useState(false); // To show "No more products" message

  // Function to calculate the discount percentage
  const calculateDiscount = (price: string, priceWas: string) => {
    if (priceWas) {
      const discount =
        ((parseFloat(priceWas.replace("$", "")) - parseFloat(price.replace("$", ""))) /
          parseFloat(priceWas.replace("$", ""))) *
        100;
      return Math.round(discount);
    }
    return 0;
  };

  const handleViewMore = () => {
    // If there are fewer than 4 products left, load all remaining products
    if (visibleProducts + 4 <= card.length) {
      setVisibleProducts(visibleProducts + 4);
    } else {
      setVisibleProducts(card.length); // Load all remaining products
      setNoMoreProducts(true); // Show "No more products" message
    }
  };

  return (
    <div>
      {/* NEW ARRIVALS Heading */}
      <div className="text-center mt-12 mb-6">
        <h1
          className="font-IntegralCF text-4xl font-extrabold leading-[57.6px] text-center"
          style={{ textUnderlinePosition: "from-font" }}
        >
          YOU MIGHT ALSO LIKE
        </h1>
      </div>

      {/* Card Section */}
      <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
        {card.slice(0, visibleProducts).map((item) => (
     <Link href={`/testdetail/${item.id}`} key={item.id} rel="noopener">

          <div
            key={item.id}
            className="bg-white rounded-lg p-2 hover:shadow-lg transition-shadow flex flex-col justify-between"
          >
            <div className="relative w-full h-[300px] rounded-[20px] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h2 className="text-sm font-semibold mt-2">{item.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <IoMdStar
                    key={index}
                    className={`${
                      index < Math.round(item.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    } text-lg`}
                  />
                ))}
              </div>
              <span className="text-sm">{item.rating}/5</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-lg font-bold text-gray-800">{item.price}</span>
              {item.priceWas && (
                <>
                  <span className="text-sm line-through text-gray-500">
                    {item.priceWas}
                  </span>
                  <button className="bg-pink-100 text-red-600 text-xs py-1 px-2 rounded-full">
                    {calculateDiscount(item.price, item.priceWas)}% OFF
                  </button>
                </>
              )}
            </div>
          </div>
          </Link>
        ))}

        {/* View More Button */}
        <div className="col-span-full flex justify-center mt-8 mb-12">
          {noMoreProducts && (
            <div className="text-center font-bold mt-10 text-[25px] text-red-600">
              No more products to show
            </div>
          )}

          {!noMoreProducts && (
            <div className="col-span-full flex justify-center items-center mt-8 mb-12">
              <button
                onClick={handleViewMore}
                className="text-lg font-medium text-black px-16 py-2 border-2 border-gray-200 hover:bg-black hover:text-white rounded-full"
              >
                View More Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouMayLike;