"use client";

import { Product } from "../../../types/products";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";

interface ProductDetailClientProps {
  product: Product | null;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    if (product) {
      // Access localStorage
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Check if the product is already in the cart
      const existingProductIndex = cart.findIndex((p: Product) => p._id === product._id);

      if (existingProductIndex !== -1) {
        // Update quantity if the product is already in the cart
        cart[existingProductIndex].quantity += quantity;
      } else {
        // Add the new product to the cart
        cart.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setIsAddedToCart(true);
      toast.success("Product added to cart!", { position: "top-center" }); // Toast notification
    }
  };

  const calculateDiscountedPrice = (price: string, discountPercentage: number): string => {
    const originalPrice = parseFloat(price.replace("$", "")); // Convert price string to a number
    const discountAmount = (originalPrice * discountPercentage) / 100; // Calculate discount
    const discountedPrice = originalPrice - discountAmount; // Subtract discount from original price
    return `$${discountedPrice.toFixed(2)}`; // Format to 2 decimal places and return as a string
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error("Stock limit reached!", { position: "top-center" });
    }
  };
  
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return <p>Product not available.</p>;
  }

  return (
    <section className="text-gray-600 shadow-lg body-font overflow-hidden">
      <Toaster /> {/* Toast container */}
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-col sm:flex-row">
          <div className="w-full lg:w-[530px] h-auto rounded overflow-hidden">
            {product?.imageUrl && (
              <Image
                src={urlFor(product.imageUrl).url()}
                width={1000}
                height={1000}
                alt={product.name || "Product Image"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
              />
            )}
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product ? product.name : "Loading..."}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {Array(Math.floor(product?.rating || 0))
                  .fill("")
                  .map((_, idx) => (
                    <AiFillStar key={idx} className="w-4 h-4 text-yellow-400" />
                  ))}
                {Array(5 - Math.ceil(product?.rating || 0))
                  .fill("")
                  .map((_, idx) => (
                    <AiOutlineStar key={idx} className="w-4 h-4 text-yellow-400" />
                  ))}
              </span>
            </div>
            <p className="leading-relaxed">{product?.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="my-2 flex items-center gap-4">
                {product.discountPercent > 0 ? (
                  <>
                    <span className="text-lg font-bold text-gray-800">
                      {calculateDiscountedPrice(product.price, product.discountPercent)}
                    </span>
                    <span className="text-md line-through font-bold text-gray-600 ">
                      {product.price}
                    </span>
                    <span className="bg-pink-100 text-red-600 text-xs py-1 px-2 rounded-full">
                      {product.discountPercent}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-800">{product.price}</span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 border-2 border-gray-200 rounded hover:bg-black hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 border-2 border-gray-200 rounded hover:bg-black hover:text-white"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={addToCartHandler}
                    className={`text-lg font-medium text-black px-4 py-2 border-2 rounded-full w-auto ml-4 ${
                      isAddedToCart
                        ? "bg-green-500 text-white border-green-500"
                        : "border-gray-200 hover:bg-black hover:text-white"
                    }`}
                  >
                    {isAddedToCart ? "Added" : "Add To Cart"}
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <AiOutlineHeart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
