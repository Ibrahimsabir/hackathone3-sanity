// FilterComponent.tsx
import React from "react";

type FilterProps = {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;
  colorFilter: string;
  setColorFilter: (value: string) => void;
  sizeFilter: string;
  setSizeFilter: (value: string) => void;
};

const FilterComponent: React.FC<FilterProps> = ({
  categoryFilter,
  setCategoryFilter,
  priceFilter,
  setPriceFilter,
  colorFilter,
  setColorFilter,
  sizeFilter,
  setSizeFilter,
}) => {
  return (
    <div className="w-[90%] mx-auto bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800">Filter</h2>
      <div className="mt-4 space-y-4">
        {/* Category Filter */}
        <div>
          <label className="text-sm text-gray-600">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="text-sm text-gray-600">Price</label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Prices</option>
            <option value="low">Under $50</option>
            <option value="medium">$50 - $100</option>
            <option value="high">Above $100</option>
          </select>
        </div>

        {/* Color Filter */}
        <div>
          <label className="text-sm text-gray-600">Color</label>
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Colors</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="green">Green</option>
            {/* Add more colors as needed */}
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label className="text-sm text-gray-600">Size</label>
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Sizes</option>
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
            <option value="xl">Extra Large</option>
            {/* Add more sizes as needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;