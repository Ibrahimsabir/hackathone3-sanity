"use client";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { ProductsData } from "@/app/components/allproductdata";
import { AiOutlineStar, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { ProductDetailComponent } from "@/app/components/productdetail/productcategory";
import Customer from "@/app/components/customer";
import YouMayLike from "@/app/components/productdetail/productyoulike";

export interface Product {
  id: number;
  image: string;
  title: string;
  price: string;
  priceWas: string;
  rating: number;
  description?: string;
}

const ProductDetail = ({ params }: { params: { id: number } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false); // To track if the item is in the cart
  const [quantity, setQuantity] = useState(1); // Track the quantity of the item being added to the cart

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { id } = params;
  console.log("ID from useRouter:", id);

  useEffect(() => {
    // Find the product by id
    if (id) {
      const product = ProductsData.find((item) => item.id === Number(id));
      setProduct(product || null);
    }
  }, [id]); // Add id to the dependency array

  const addtocarthandler = () => {
    if (product) {
      // Here, we would add the item to the cart (e.g., update state or localStorage)
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Check if the product is already in the cart
      const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);

      if (existingProductIndex !== -1) {
        // Update quantity if the product is already in the cart
        cart[existingProductIndex].quantity += quantity;
      } else {
        // Add the new product to the cart
        cart.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // Update the "Add to Cart" button state to reflect the item is added
      setIsAddedToCart(true);
      toast.success("Item added to cart!", {
        position: "top-center",
      });
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const fallbackImage = "/images/default-product.jpg";

  return (
    <div className="max-w-full h-full flex-grow justify-start items-center">
      <ProductDetailComponent />
      <section className="text-gray-600 shadow-lg body-font overflow-hidden">
        <Toaster />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-col sm:flex-row">
            <div className="w-full lg:w-[530px] h-auto rounded overflow-hidden">
              <div className="w-full max-w-[1240px] mx-auto py-8">
                {isMobile ? (
                  <div>
                    {/* Mobile Layout */}
                    <div className="w-full h-[350px] rounded-3xl overflow-hidden mb-4">
                      <Link href="/large-image">
                        <div className="group relative">
                          <Image
                            src={product?.image || fallbackImage}
                            width={1000}
                            height={1000}
                            alt="Large Image"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {["/image 2.png", "/image 5.png", "/image 6.png"].map((img, idx) => (
                        <div key={idx} className="w-full h-[162px] rounded-3xl overflow-hidden">
                          <Link href={`/small-image-${idx + 1}`}>
                            <div className="group relative">
                              <Image
                                src={img}
                                width={1000}
                                height={1000}
                                alt={`Small Image ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                              />
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-[152px_auto] gap-4">
                    <div className="grid grid-rows-3 gap-4">
                      {["/image 2.png", "/image 5.png", "/image 6.png"].map((img, idx) => (
                        <div key={idx} className="w-[152px] h-[162px] rounded overflow-hidden">
                          <Link href={`/small-image-${idx + 1}`}>
                            <div className="group relative">
                              <Image
                                src={img}
                                width={1000}
                                height={1000}
                                alt={`Small Image ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                              />
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="w-full h-full rounded overflow-hidden">
                      <Link href="">
                        <div className="group relative">
                          <Image
                            src={product?.image || fallbackImage}
                            width={1000}
                            height={1000}
                            alt="Large Image"
                            className="w-full h-[530px] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product ? product.title : "Loading..."}
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
                <span className="title-font font-medium text-2xl text-gray-900">
                  {product?.price || "0.00"}
                </span>
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                  <button onClick={decreaseQuantity} className="px-3 py-1 border-2 border-gray-200 rounded hover:bg-black hover:text-white">
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button onClick={increaseQuantity} className="px-3 py-1 border-2 border-gray-200 rounded hover:bg-black hover:text-white">
                    +
                  </button>
                  </div>
                  <div className="flex justify-items-center gap-2">
                  <button
                    onClick={addtocarthandler}
                    className={`text-lg font-Satoshi font-medium text-black px-4 py-2 border-2 rounded-full w-auto ml-4 ${
                      isAddedToCart ? "bg-green-500 text-white border-green-500" : "border-gray-200 hover:bg-black hover:text-white"
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
      <Customer />
      <YouMayLike />
    </div>
  );
};

export default ProductDetail;