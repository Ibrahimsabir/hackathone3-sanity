"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems } from "../action/addtocart";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";

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
export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems
    .reduce((total, item) => {
      if (!item.price) {
        console.warn("Warning: Price is missing for item", item);
        return total; // Skip this item if price is missing
      }

      const price = parseFloat(item.price.replace("$", "").replace(",", ""));
      
      if (isNaN(price)) {
        console.warn("Warning: Price conversion failed for", item.price);
        return total;
      }

      return total + price * item.quantity;
    }, 0)
    .toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };
  
  const calculateDiscountedPrice = (price: string, discountPercent: number) => {
    const originalPrice = parseFloat(price.replace("$", ""));
    const discountAmount = (originalPrice * discountPercent) / 100;
    return `$${(originalPrice - discountAmount).toFixed(2)}`;
  };

  const handlePlaceOrder = async () => {
    // Validate form before placing order
    if (validateForm()) {
        // Create order data object based on the form
        const orderData = {
            _type: 'order',
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            address: formValues.address,
            city: formValues.city,
            zipCode: formValues.zipCode,
            phone: formValues.phone,
            email: formValues.email,
            cartItems: cartItems.map(item => ({
                _type: 'reference',
                _ref: item._id,  // Assuming cartItems have the correct product references
            })),
            total: subtotal,  // Make sure this value is being calculated
            discount: discount,  // Add any discount if applicable
            orderDate: new Date().toISOString(),  // Order date for when the order was placed
        };

        try {
            // Send the order data to Sanity
            await client.create(orderData);

            // Notify the user of success
            Swal.fire('Order placed successfully');
            
            // Optionally clear the cart or local storage
            localStorage.removeItem("appliedDiscount");

            // Redirect or clear form after successful order placement (optional)
        } catch (error) {
            // Handle any errors that occur during order placement
            Swal.fire('Failed to place order');
            console.error('Error creating order in Sanity:', error);
        }
    } else {
        // Handle validation error if form is not filled correctly
       Swal.fire('Please fill in all the fields');
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50`}>
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link
              href="/cart"
              className="text-[#666666] hover:text-black transition text-sm"
            >
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-[#666666]" />
            <span className="text-sm">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 py-3 border-b"
                >
                  <div className="w-16 h-16 rounded overflow-hidden">
                    {item.imageUrl && (
                      <Image
                        src={urlFor(item.imageUrl).url()}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.stock}
                    </p>
                  </div>
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
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm">
                Subtotal: <span className="font-medium">${subtotal}</span>
              </p>
              <p className="text-sm">
                Discount: <span className="font-medium">-${discount}</span>
              </p>
              <p className="text-lg font-semibold">
                Total: ${(parseFloat(subtotal) - discount).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className="border my-2 px-2"
                />
                {formErrors.firstName && (
                  <p className="text-sm text-red-500">
                    First name is required.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName">Last Name </label>
                <input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                   className="border my-2 px-2"
                />
                {formErrors.lastName && (
                  <p className="text-sm text-red-500">
                    Last name is required.
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="address">Address </label>
              <input
                id="address"
                placeholder="Enter your address"
                value={formValues.address}
                onChange={handleInputChange}
                 className="border mx-2 px-2"
              />
              {formErrors.address && (
                <p className="text-sm text-red-500">Address is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                id="city"
                placeholder="Enter your city"
                value={formValues.city}
                onChange={handleInputChange}
                 className="border mx-2 px-2"
              />
              {formErrors.city && (
                <p className="text-sm text-red-500">City is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                id="zipCode"
                placeholder="Enter your zip code"
                value={formValues.zipCode}
                onChange={handleInputChange}
                 className="border mx-2 px-2"
              />
              {formErrors.zipCode && (
                <p className="text-sm text-red-500">Zip Code is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                placeholder="Enter your phone number"
                value={formValues.phone}
                onChange={handleInputChange}
                 className="border mx-2 px-2"
              />
              {formErrors.phone && (
                <p className="text-sm text-red-500">Phone is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="Enter your email address"
                value={formValues.email}
                onChange={handleInputChange}
                 className="border mx-2 px-2"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">Email is required.</p>
              )}
            </div>
            <button
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
