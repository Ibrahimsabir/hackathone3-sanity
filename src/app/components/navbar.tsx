import React from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonCircleSharp } from "react-icons/io5";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="font-IntegralCF w-full h-auto bg-white border-b border-gray-300">
      <div className="max-w-[1170px] h-full flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-0 mx-auto gap-4 md:gap-8 py-4 md:py-0">
        {/* Logo */}
        <h1 className="text-[24px] sm:text-[32px] font-bold mb-2 md:mb-0">
          SHOP.CO
        </h1>

        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm sm:text-base items-start text-left">
  <li className="hover:scale-105 hover:text-blue-600 font-semibold border-gray-400">
    <Link href="/" className="flex items-center">
      Shop <RiArrowDropDownLine className="text-xl sm:text-2xl" />
    </Link>
  </li>
  <li className="hover:scale-105 hover:text-blue-600 font-semibold border-gray-400">
    <Link href="/onsale">On Sale</Link>
  </li>
  <li className="hover:scale-105 hover:text-blue-600 font-semibold border-gray-400">
    <Link href="/newarrivals">New Arrival</Link>
  </li>
  <li className="hover:scale-105 hover:text-blue-600 font-semibold border-gray-400">
    <Link href="/topseller" target="_blank">Top Seller</Link>
  </li>
</ul>


        {/* Search Bar and Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 px-4 sm:px-6 lg:px-8">
  {/* Search Input */}
  <div className="flex items-center bg-gray-100 rounded-full overflow-hidden w-full sm:w-auto">
    <IoSearch className="text-xl sm:text-2xl text-gray-600 px-3" />
    <input
      type="text"
      placeholder="Search for products..."
      className="bg-gray-100 px-4 py-2 outline-none text-sm w-full sm:w-[250px] lg:w-[300px]"
    />
  </div>

  {/* Icons */}
  <div className="flex items-center gap-4">
    <Link href={"/cartcheckout"}>
    <FiShoppingCart className="text-xl sm:text-2xl text-black cursor-pointer hover:text-gray-700 transition-all duration-200" />
    
    </Link>
    <IoPersonCircleSharp className="text-2xl sm:text-3xl text-black cursor-pointer hover:text-gray-700 transition-all duration-200" />
  </div>
</div>

      </div>
    </div>
  );
};

export default Navbar;