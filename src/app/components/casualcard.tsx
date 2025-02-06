"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";
import { allproducts } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { addToCart } from "../action/addtocart";
import toast from "react-hot-toast";

export interface Product {
  _id: number;
  name: string;
  stock: number;
  price: string;
  discountPercent: number;
  priceWithoutDiscount: string;
  description: string;
  rating: number;
  imageUrl: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  isnew: boolean;
  slug: {
    _type: "slug";
    current: string;
  };
  category: string;
  color: string;
  quantity: number;
}


// async function getProductCategory(category: string): Promise<Product | null> {
//   return client.fetch(
//     groq`*[_type == "products" && category.current == $category][0]{
//       _id,
//       name,
//       price,
//       discountPercent,
//       rating,
//       description,
//       "imageUrl": image.asset->url,
//     }`,
//     { category }
//   );
// }


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
 const handleAddToCart = (e: React.MouseEvent, product: Product) => {
   e.preventDefault();

   toast.success('product added to cart', { position: "top-center" , duration: 1000 }, )
   // Add the product to the cart
   addToCart(product);
   console.log(handleAddToCart)
  //  alert('ok')
   
 }
  return (
    <div className="min-h-screen pb-12">
      {/* Title */}
      <div className="text-center mt-12 mb-4">
        <h1 className="font-IntegralCF text-4xl capitalize font-extrabold leading-[57.6px] text-start">
        category
        </h1>
      </div>

      {/* Product Cards */}
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {currentCards.map((product) => (
          <Link href={`/${product.category}/${product.slug.current}`} key={product._id}>
            <div className="bg-white rounded-lg p-4 ">
              <div className="relative w-48 h-48 rounded-md overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300">
                <Image 
                     src={urlFor(product.imageUrl).url()}
                     alt={product.name} 
                     layout="fill" 
                     objectFit="cover" 
                     className=" rounded-md" />
              </div>
     <h2 className="text-sm font-semibold mt-2">
         {product.name.length > 20 ? product.name.slice(0, 20) + "..." : product.name}
     </h2>              
    <div className="flex products-center gap-2 mt-1">
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <IoMdStar key={index} className={`${index < Math.round(product.rating) ? "text-yellow-500" : "text-gray-300"} text-lg`} />
                  ))}
                </div>
                <span className="text-sm">{product.rating}/5</span>
              </div>
              
              <div className="mt-2 flex products-center gap-2">
                <span className="text-lg font-bold text-gray-800">{product.price}</span>
                {product.discountPercent && (
                  <>
                    <span className="text-sm line-through text-gray-500">{product.price}</span>
                    <button className="bg-pink-100 text-red-600 text-xs py-1 px-2 rounded-full">
                      {calculateDiscount(product.price, product.price)}% OFF
                    </button>
                  </>
                )}
                
              </div>
              
              <button
                   className=" flex gap-2 text-lg bg-gradient-to-r from-gray-300 to-gray-700 py-1 px-4 border-2 bprder-gray-500 rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300 ease-in-out my-4 mx-auto"
                  onClick={(e)=> handleAddToCart(e, product)}
                  >
                  
                  Add To Cart
              </button>
                     
            </div>
          </Link>
        ))}
         
      </div>

      {/* Pagination Controls */}
      <div className="col-span-full border-y-2 border-gray-200 flex justify-center sm:justify-between products-center py-6 px-12 mt-8 mb-36 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`flex gap-4 justify-center products-center text-lg sm:text-xl font-Satoshi font-medium text-black px-8 sm:px-16 py-2 border-2 border-gray-200 rounded-xl ${currentPage === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-black hover:text-white"}`}
        >
          <FaArrowLeft />
          Previous
        </button>

        {/* Page Number Display */}
        <div className="flex products-center justify-center text-lg sm:text-xl">
          Page {currentPage} of {totalPages}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`flex gap-4 justify-center products-center text-lg sm:text-xl font-Satoshi font-medium text-black px-8 sm:px-16 py-2 border-2 border-gray-200 rounded-xl ${currentPage === totalPages ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-black hover:text-white"}`}
        >
          Next
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CasualCard;