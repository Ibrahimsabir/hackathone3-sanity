import React from 'react';
import { CategoryTop } from '../components/categorytop';
import CasualCard from '../components/casualcard';

const CategoryPage = () => {
  return (
    <div className="max-w-[1440px] max-h-full flex-grow justify-start items-center mb-0">
      <CategoryTop />

      <div className="flex flex-col sm:flex-row max-w-[90%] max-h-full justify-center items-start mb-48 mt-8 m-auto p-2">
        
        {/* Sidebar */}
        <div className="w-full sm:w-1/4 border-2 border-gray-200 mt-12 rounded-xl sm:mr-4 p-4">
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Category</h3>
            <ul className="space-y-2">
              {["T-Shirts", "Shorts", "Jeans", "Hoodies"].map((category) => (
                <li key={category}>
                  <input type="checkbox" id={category.toLowerCase()} className="mr-2" />
                  <label htmlFor={category.toLowerCase()}>{category}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price</h3>
            <div className="flex items-center space-x-2">
              <span>$50</span>
              <input type="range" min="50" max="500" className="w-full" defaultValue="250" />
              <span>$500</span>
            </div>
          </div>

          {/* Colors Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {["green", "blue", "pink", "red", "purple", "white", "black"].map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={color.charAt(0).toUpperCase() + color.slice(1)}
                ></div>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex flex-wrap gap-3">
              {["Small", "Medium", "Large", "X-Large", "3XL Large", "4XL Large"].map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border rounded-md transition-all duration-300 hover:bg-black hover:text-white focus:ring-2 focus:ring-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dress Style Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Dress Style</h3>
            <ul className="space-y-2">
              {["Casual", "Formal", "Party", "Gym"].map((style) => (
                <li key={style}>
                  <input type="checkbox" id={style.toLowerCase()} className="mr-2" />
                  <label htmlFor={style.toLowerCase()}>{style}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Apply Filter Button */}
          <button className="mt-4 bg-black text-white px-4 py-2 rounded">Apply Filter</button>
        </div>
 {/* CasualCard */}
 <div className="w-full sm:w-[925px] max-h-[11800px] p-2">
        <CasualCard />
      </div> 
        {/* Product Grid */}
        {/* <div className="w-full sm:w-3/4 p-4">
          <h1 className="text-[32px] font-bold mb-4">Casual</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Gradient Graphic T-Shirt", price: "$145", img: "/image19.png" },
              { name: "Polo with Tipping Details", price: "$180", img: "/image20.png" },
              { name: "Black Striped T-Shirt", price: "$120", img: "/image21.png" },
              { name: "Skinny Fit Jeans", price: "$240", img: "/image22.png" },
              { name: "Checkered Shirt", price: "$180", img: "/image23.png" },
              { name: "Sleeve Striped T-Shirt", price: "$130", img: "/image24.png" },
            ].map((item) => (
              <div key={item.name} className="border p-4 rounded">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="h-[298px] w-full rounded-[20px] bg-[#F0EEED] object-cover mb-4"
                />
                <h3 className="font-bold mt-2">{item.name}</h3>
                <div className='flex items-center'>
                  <FaStar className='text-yellow-400' />
                  <FaStar className='text-yellow-400' />
                  <FaStar className='text-yellow-400' />
                  <FaStar className='text-yellow-400' />
                </div>
                <p className="text-[24px] font-bold">{item.price}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>

     
    </div>
  );
}

export default CategoryPage;