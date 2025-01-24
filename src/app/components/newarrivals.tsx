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
  discountPercentage: number;
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
      const fetchedproduct:Product[] = await client.fetch(newarrivals) // Fetch products using the query
      setproduct(fetchedproduct); // Update state with fetched data
      console.log(fetchedproduct);
    }
    fetchproduct();
  }, []);

  const [visibleproducts, setVisibleproducts] = useState(4); // To manage the number of visible products
  const [noMoreproducts, setNoMoreproducts] = useState(false); // To show "No more products" message

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  // // Function to calculate the discount percentage
  // const calculateDiscount = (price: string, priceWas: string) => {
  //   if (priceWas) {
  //     const discount =
  //       ((parseFloat(priceWas.replace("$", "")) - parseFloat(price.replace("$", ""))) /
  //         parseFloat(priceWas.replace("$", ""))) *
  //       100;
  //     return Math.round(discount);
  //   }
  //   return 0;
  // };

  const handleViewMore = () => {
    // Load next 4 products
    if (visibleproducts + 4 <= product.length) {
      setVisibleproducts(visibleproducts + 4);
    } else {
      setVisibleproducts(product.length); // Load all remaining products
      setNoMoreproducts(true); // Show message if no more products
    }
  };

  // Function to truncate text to a maximum length of 20 characters
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div id="newArrival">
      {/* NEW ARRIVALS Heading */}
      <div className="text-center mt-12 mb-6">
        <h1 className="font-IntegralCF text-4xl font-extrabold leading-[57.6px] text-center">
          NEW ARRIVALS
        </h1>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
        {product.slice(0, visibleproducts).map((product) => (
          <Link href={`/testdetail/${product._id}`} key={product._id} rel="noopener">
            <div className="bg-white rounded-lg p-2 hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div className="relative w-full h-auto rounded-[20px] overflow-hidden">
                <Image
                  src={urlFor(product.imageUrl).url()} // Assuming you have the correct image URL path
                  alt={product.name} // Using the correct name field for alt text
                  objectFit="cover"
                  className="w-60 h-60 rounded-md shadow-lg"
                  width={220}
                  height={200}
                />
              </div>

              {/* Truncated Name */}
              <h2 className="text-sm font-semibold mt-2">{truncateText(product.name, 20)}</h2>

              {/* Truncated Description (optional) */}
              <p className="text-xs text-gray-600 mt-1">{truncateText(product.description, 20)}</p>

              <div className="flex products-center gap-2 mt-1">
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <IoMdStar
                      key={index}
                      className={`${
                        index < Math.round(product.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      } text-lg`}
                    />
                  ))}
                </div>
                <span className="text-sm">{product.rating}/5</span>
              </div>

              <div className="mt-1 flex products-center gap-2">
                <span className="text-lg font-bold text-gray-800">{product.price}</span>

               
              </div>
            </div>
          </Link>
        ))}

        {/* Centered View All Button Inside Card Section */}
        <div className="col-span-full flex justify-center mt-8 mb-12">
          {noMoreproducts && (
            <div className="text-center font-bold mt-10 text-[25px] text-red-600">
              No more products to show
            </div>
          )}

          {/* View More Button */}
          {!noMoreproducts && (
            <div className="flex justify-center py-10 w-full">
              <button
                onClick={handleViewMore}
                className="text-lg font-Satoshi font-medium text-black px-8 py-2 border-2 border-gray-200 hover:bg-black hover:text-white rounded-full w-[60%] sm:w-[40%] md:w-[30%] lg:w-[20%]"
              >
                View More products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
