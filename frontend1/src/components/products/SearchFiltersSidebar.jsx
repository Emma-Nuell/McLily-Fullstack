import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const SearchFiltersSidebar = ({ filters, searchQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([
    filters.priceRange.min,
    filters.priceRange.max,
  ]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };
  return (
    <div className='w-80 bg-white p-6 border-r'>
      <h3 className='text-lg font-semibold mb-6'>Filters</h3>

      {/* Price Range */}
      <div className='mb-6'>
        <h4 className='font-medium mb-3'>Price Range (₦)</h4>
        <div className='space-y-2'>
          <input
            type='range'
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className='w-full'
          />
          <div className='flex justify-between text-sm text-gray-600'>
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      {filters.categories.length > 0 && (
        <div className='mb-6'>
          <h4 className='font-medium mb-3'>Categories</h4>
          <div className='space-y-2'>
            {filters.categories.map((category) => (
              <button
                key={category}
                onClick={() => updateFilter("category", category)}
                className='block w-full text-left text-sm hover:text-blue-600'
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      {filters.brands.length > 0 && (
        <div className='mb-6'>
          <h4 className='font-medium mb-3'>Brands</h4>
          <div className='space-y-2'>
            {filters.brands.map((brand) => (
              <button
                key={brand}
                onClick={() => updateFilter("brand", brand)}
                className='block w-full text-left text-sm hover:text-blue-600'
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

SearchFiltersSidebar.propTypes = {
    filters: PropTypes.object,
    searchQuery: PropTypes.string,
}

export default SearchFiltersSidebar