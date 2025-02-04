"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { topseller } from "@/sanity/lib/queries";
import { Product } from "../../../types/products";


const TopSeller = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(4); // Manage the number of visible products
  const [noMoreProducts, setNoMoreProducts] = useState(false); // To show "No more products" message

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProducts = await client.fetch(topseller);
        setProduct(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProduct();
  }, []);

  // Function to calculate the discount percentage
  const calculateDiscountedPrice = (price: string, discountPercentage: number): string => {
    const originalPrice = parseFloat(price.replace("$", "")); // Convert price string to a number
    const discountAmount = (originalPrice * discountPercentage) / 100; // Calculate discount
    const discountedPrice = originalPrice - discountAmount; // Subtract discount from original price
    return `$${discountedPrice.toFixed(2)}`; // Format to 2 decimal places and return as a string
  };

  const handleViewMore = () => {
    if (visibleProducts + 4 <= product.length) {
      setVisibleProducts(visibleProducts + 4);
    } else {
      setVisibleProducts(product.length);
      setNoMoreProducts(true);
    }
  };

  return (
    <div>
      {/* TOP SELLING Heading */}
      <div className="text-center mt-12 mb-6">
        <h1
          className="font-IntegralCF text-4xl font-extrabold leading-[57.6px] text-center"
          style={{ textUnderlinePosition: "from-font" }}
        >
          TOP SELLING
        </h1>
      </div>

      {/* Card Section */}
      <div className="w-[90%] border-b-2 border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
        {product.slice(0, visibleProducts).map((item) => (
          <Link href={`/productdetail/${item.slug.current}`} key={item._id} rel="noopener">
            <div className="bg-white rounded-lg p-2 hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div className="relative w-full h-[300px] rounded-[20px] overflow-hidden">
                <Image
                  src={urlFor(item.imageUrl).url()}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h2 className="text-sm font-semibold mt-2">{item.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
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
                <span className="text-sm">{item.rating.toFixed(1)}/5</span>
              </div>
              <div className="mt-1 flex items-center gap-4">
                {item.discountPercent > 0 ? (
                  <>
                    <span className="text-lg font-bold text-gray-800">
                      {calculateDiscountedPrice(item.price, item.discountPercent)}
                    </span>
                    <span className="text-md line-through font-bold text-gray-600">
                      {item.price}
                    </span>
                    <span className="bg-pink-100 text-red-600 text-xs py-1 px-2 rounded-full">
                      {item.discountPercent}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-800">{item.price}</span>
                )}
              </div>
            </div>
          </Link>
        ))}

        {/* Centered View More Button */}
        <div className="col-span-full flex justify-center mt-8 mb-12">
          {noMoreProducts && (
            <div className="text-center font-bold mt-10 text-[25px] text-red-600">
              No more products to show
            </div>
          )}
          {!noMoreProducts && (
            <button
              onClick={handleViewMore}
              className="text-lg font-medium text-black px-8 py-2 border-2 border-gray-200 hover:bg-black hover:text-white rounded-full w-[60%] sm:w-[40%] md:w-[30%] lg:w-[20%]"
            >
              View More Products
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSeller;
