"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";
import { allproducts } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { Product } from "../../../types/products";



const CasualCard = () => {
  // Filter products based on "casual" and "formal" categories
  const [product,setproduct] = useState<Product[]>([]);

  useEffect(()=>{
    async function fetchproduct(){
     const fetchedproduct = await client.fetch(allproducts)
     setproduct(fetchedproduct);
    }
    fetchproduct();
  },[])

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9; // Display 6 cards per page (2 columns and 3 rows on mobile)
  const totalPages = Math.ceil(product.length / cardsPerPage); // Total number of pages

  // Get the cards for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = product.slice(startIndex, startIndex + cardsPerPage);

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

  // Next Page Handler
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Increment page number
    }
  };

  // Previous Page Handler
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement page number
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Title */}
      <div className="text-center mt-12 mb-4">
        <h1 className="font-IntegralCF text-4xl font-extrabold leading-[57.6px] text-start">
          Casual
        </h1>
      </div>

      {/* Product Cards */}
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {currentCards.map((item) => (
          <Link href={`/testdetail/${item._id}`} key={item._id}>
            <div className="bg-white rounded-lg p-4 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="relative w-48 h-48 rounded-md overflow-hidden">
                <Image 
                     src={urlFor(item.imageUrl).url()}
                     alt={item.name} 
                     layout="fill" 
                     objectFit="cover" 
                     className=" rounded-md" />
              </div>
              <h2 className="text-sm font-semibold mt-2">{item.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <IoMdStar key={index} className={`${index < Math.round(item.rating) ? "text-yellow-500" : "text-gray-300"} text-lg`} />
                  ))}
                </div>
                <span className="text-sm">{item.rating}/5</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold text-gray-800">{item.price}</span>
                {item.discountPercent && (
                  <>
                    <span className="text-sm line-through text-gray-500">{item.price}</span>
                    <button className="bg-pink-100 text-red-600 text-xs py-1 px-2 rounded-full">
                      {calculateDiscount(item.price, item.price)}% OFF
                    </button>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="col-span-full border-y-2 border-gray-200 flex justify-center sm:justify-between items-center py-6 px-12 mt-8 mb-36 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`flex gap-4 justify-center items-center text-lg sm:text-xl font-Satoshi font-medium text-black px-8 sm:px-16 py-2 border-2 border-gray-200 rounded-xl ${currentPage === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-black hover:text-white"}`}
        >
          <FaArrowLeft />
          Previous
        </button>

        {/* Page Number Display */}
        <div className="flex items-center justify-center text-lg sm:text-xl">
          Page {currentPage} of {totalPages}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`flex gap-4 justify-center items-center text-lg sm:text-xl font-Satoshi font-medium text-black px-8 sm:px-16 py-2 border-2 border-gray-200 rounded-xl ${currentPage === totalPages ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-black hover:text-white"}`}
        >
          Next
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CasualCard;