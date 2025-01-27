"use client";
import { useState, useEffect } from "react";
import "aos/dist/aos.css"; // Import AOS styles
import Aos from "aos";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import { client } from "@/sanity/lib/client";
import { newarrivals } from "@/sanity/lib/queries"; // Import your query for new arrivals
import { urlFor } from "@/sanity/lib/image"; 


type Product = {
  _id: number;
  name: string;
  price: string;
  discountPercent: number;
  priceWithoutDiscount: string;
  description: string;
  rating: number;
  imageUrl: string;
  isnew: boolean;
};

const NewArrival = () => {
  const [product, setproduct] = useState<Product[]>([]); // State to hold fetched products

  // Fetching the product data when the component is mounted
  useEffect(() => {
    async function fetchproduct() {
      const fetchedproduct = await client.fetch(newarrivals); // Fetch products using the query
      setproduct(fetchedproduct); // Update state with fetched data
      console.log(fetchedproduct);
    }
    fetchproduct();
  }, []);

  const [visibleProducts, setVisibleProducts] = useState(4); // To manage the number of visible products
  const [noMoreProducts, setNoMoreProducts] = useState(false); // To show "No more products" message

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  // Function to calculate the discount percentage
  

  const handleViewMore = () => {
    // Load next 4 products
    if (visibleProducts + 4 <= product.length) {
      setVisibleProducts(visibleProducts + 4);
    } else {
      setVisibleProducts(product.length); // Load all remaining products
      setNoMoreProducts(true); // Show message if no more products
    }
  };

  // // Function to truncate text to a maximum length of 20 characters
  // const truncateText = (text: string, maxLength: number) => {
  //   return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  // };

  return (
    <div id="newArrival">
      {/* NEW ARRIVALS Heading */}
      <div className="text-center mt-12 mb-6">
        <h1 className="font-IntegralCF text-4xl font-extrabold leading-[57.6px] text-center">
          NEW ARRIVALS
        </h1>
      </div>

      {/* Card Section */}
      <div className="w-[90%] border-b-2 border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
        {product.slice(0, visibleProducts).map((item) => (
          <Link href={`/testdetail/${item._id}`} key={item._id} rel="noopener">
            <div
              key={item._id}
              className="bg-white rounded-lg p-2 hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
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
                {item.discountPercent && (
                  <>
                    <span className="text-sm line-through text-gray-500">
                      {item.discountPercent} % OFF
                    </span>
                  
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}

        {/* Centered View All Button Inside Card Section */}
        <div className="col-span-full flex justify-center mt-8 mb-12">
          {noMoreProducts && (
            <div className="text-center font-bold mt-10 text-[25px] text-red-600">
              No more products to show
            </div>
          )}

          {/* View More Button */}
          {!noMoreProducts && (
            <div className="flex justify-center items-center w-full mt-8 mb-12">
              <button
                onClick={handleViewMore}
                className="text-lg font-medium text-black px-8 py-2 border-2 border-gray-200 hover:bg-black hover:text-white rounded-full w-[60%] sm:w-[40%] md:w-[30%] lg:w-[20%]"
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

export default NewArrival;
