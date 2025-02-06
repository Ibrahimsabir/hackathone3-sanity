"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";



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

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems([]); // Default empty array to avoid errors
    }
  }, []);

  const removeFromCart = (productId: number) => {
    const confirmed = window.confirm("Are you sure you want to remove this item from your cart?");
    if (!confirmed) return;
  
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    toast.success("Item removed from cart", {
      icon: "✅",
     
      
    });
    toast.error("Item has been deleted!", {
      icon: "🗑️",
    });
  };
  
  const decreaseQuantity = (productId: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId) {
        if (item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          toast.error("Stock limit reached!", { position: "top-center" });
        }
      }
      return item;
    });
  
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  

  const calculateDiscountedPrice = (price: string, discountPercent: number) => {
    const originalPrice = parseFloat(price.replace("$", ""));
    const discountAmount = (originalPrice * discountPercent) / 100;
    return `$${(originalPrice - discountAmount).toFixed(2)}`;
  };

  const totalAmount = cartItems
  .reduce((total, item) => {
    if (!item.price) {
      console.warn("Warning: Price is missing for item", item);
      return total; // Skip this item if price is missing
    }

    const price = parseFloat(item.price.replace("$", "").replace(",", ""));
    
    if (isNaN(price)) {
      Swal.fire("Warning: Price conversion failed for", item.price);
      return total;
    }

    return total + price * item.quantity;
  }, 0)
  .toFixed(2);



  return (
    <div className="container mx-auto py-10 px-4">
      <Toaster />
      
      <h1 className="text-3xl font-bold text-gray-600 underline text-start mb-6">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items Section */}
        <div className="lg:w-2/3 border-2 border-gray-300 rounded-lg p-6">
          {cartItems.length === 0 ? (
            <>
            <p className="text-center text-gray-600">Your cart is empty.</p>
            </>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md"
                >
                  <Image
                    src={urlFor(item.imageUrl).url()}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-gray-700">Category: {item.category}</p>
                    <p className="text-gray-700">Color: {item.color}</p>
                    {item.discountPercent > 0 ? (
                      <div>
                        <span className="text-lg font-bold text-gray-800">
                          {calculateDiscountedPrice(
                            item.price,
                            item.discountPercent
                          )}
                        </span>
                        <span className="text-md line-through font-bold ml-4 text-red-500">
                          {item.price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-800">
                        {item.price}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600"
                  >
                    <AiFillDelete size={24} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary Section */}
        <div className="lg:w-1/3 border-2 border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-600">Cart Summary</h2>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center gap-2 my-2">
              <Image
                src={urlFor(item.imageUrl).url()}
                alt={item.name}
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded"
              />
              <span>{item.name} x {item.quantity}</span>
              <span>
  {(
    item.price && !isNaN(parseFloat(item.price.replace("$", "")))
      ? (item.discountPercent > 0
          ? parseFloat(item.price.replace("$", "")) * (1 - item.discountPercent / 100)
          : parseFloat(item.price.replace("$", ""))) * item.quantity
      : 0 // If price is undefined or invalid, return 0
  ).toFixed(2)}
</span>

            </div>
          ))}
          <div className="flex justify-between text-xl font-bold mt-4">
            <span>Total:</span>
            <span>${totalAmount}</span>
          </div>
          <Link href="/checkout">
            <button className="w-full mt-4 bg-black text-white py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
