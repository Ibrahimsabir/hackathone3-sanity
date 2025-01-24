"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  price: string;
  priceWas: string;
  color: string;
  aosDelay: number;
  quantity: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);

  // Fetch cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Remove item from cart
  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart", {
      position: "top-center",
    });
  };

  // Decrease item quantity in cart
  const decreaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase item quantity in cart
  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity < 10 // Prevent going over 10 items
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total amount
  const totalAmount = cart
    .reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", "").replace(",", ""));
      return total + price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto py-10 px-4">
      <Toaster />
      <div className="flex flex-col sm:flex-row mx-auto gap-2 ">
      <div className="flex flex-col w-[60%] gap-6 items-start bg-white p-4 ">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 ml-20 text-gray-600 underline uppercase animate-wobble text-center sm:text-left">
        Your Cart
      </h1>
      <div className="flex flex-col sm:flex-row  gap-6 sm:gap-12">
        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col sm:flex-row  border-2 border-gray-300 rounded-3xl p-6 justify-between ml-20">
            {/* Cart Items */}
            <div className="flex flex-col gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24">
                    <Image
                      src={item.image || "/images/default-product.jpg"}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                      {item.title.toUpperCase()}
                    </h3>
                    <p className="text-base font-medium text-gray-700">
                      <span className="font-semibold text-lg">
                        Category : {` `}
                      </span>
                      {item.category}
                    </p>
                    <p className="text-base font-medium text-gray-700">
                      <span className="font-semibold text-lg">
                        Color : {` `}
                      </span>
                      {item.color}
                    </p>
                    <p className="font-bold text-gray-800 text-base sm:text-lg">
                      {item.price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 mt-2 sm:mt-0"
                    >
                      <AiFillDelete size={24} />
                    </button>
                    <div className="flex items-center border-2 px-3 py-1 border-gray-200 bg-gray-200 rounded-full gap-3 mt-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className=" text-2xl font-medium text-gray-800"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="text-2xl font-medium text-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
        {/* Cart Summary Section */}
        <div className="flex flex-col w-[40%] gap-6 items-center bg-white p-4 ">
        

        <div className="bg-white p-4 border-2 border-gray-300 rounded-3xl max-w-xs ml-2 mt-28">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-600  animate-wobble text-center sm:text-left">Cart Summary</h1> 
          <div className="space-y-3">
            {cart.map((item) => {
              const itemTotal = (
                parseFloat(item.price.replace("$", "").replace(",", "")) *
                item.quantity
              ).toFixed(2);
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center gap-4 text-sm"
                >
                  <div className="flex items-center ">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 mr-3">
                      <Image
                        src={item.image || "/images/default-product.jpg"}
                        alt={item.title}
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xs">x{item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-gray-800 font-semibold">
                    ${itemTotal}
                  </div>
                  
                </div>
                
              );
            })}
      <div className="bg-white p-6 mb-6 mt-6">
        <div className="flex justify-between items-center text-xl">
          <span className="font-medium">Total:</span>
          <span className="text-black font-bold">${totalAmount}</span>
        </div>
      </div>
             <Link href="/checkoutpage">
          <button className="text-lg font-Satoshi font-medium text-black px-8 py-2 border-2 mt-6 border-gray-200 hover:bg-black hover:text-white rounded-full w-full">
            Proceed to Checkout
          </button>
        </Link>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;