import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query';
import ProductsAPI from '../../utils/endpoints/productsApi';

const FiltersSidebar = ({category, subCategory, onClose}) => {
      const { data: filterOptions } = useQuery({
        queryKey: ["filter-options", category, subCategory],
        queryFn: () => ProductsAPI.getFilterOptions(category, subCategory),
        enabled: !!category || !!subCategory,
      });

  
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  
    // Sync price range when filter options load
  useEffect(() => {
    if (filterOptions?.filters?.priceRange) {
      setPriceRange([
        filterOptions.filters.priceRange.min,
        filterOptions.filters.priceRange.max,
      ]);
    }
  }, [filterOptions]);

  if (!filterOptions) {
    return (
      <div className='w-80 bg-white p-6 border-r'>
        <div className='animate-pulse'>
          <div className='h-6 bg-gray-200 rounded mb-4'></div>
          <div className='h-4 bg-gray-200 rounded mb-2'></div>
          <div className='h-4 bg-gray-200 rounded mb-2'></div>
        </div>
      </div>
    );
  }
  return (
    <div className='w-80 bg-white p-6 border-r h-screen sticky top-0 overflow-y-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-lg font-semibold'>Filters</h3>
        <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
          ✕
        </button>
      </div>

      {/* Price Range Filter */}
      <div className='mb-6'>
        <h4 className='font-medium mb-3'>Price Range</h4>
        <div className='space-y-2'>
          <input
            type='range'
            min={filterOptions.filters.priceRange.min}
            max={filterOptions.filters.priceRange.max}
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

      {/* Brands Filter */}
      {filterOptions.filters.brands.length > 0 && (
        <div className='mb-6'>
          <h4 className='font-medium mb-3'>Brands</h4>
          <div className='space-y-2'>
            {filterOptions.filters.brands.map((brand) => (
              <label key={brand} className='flex items-center'>
                <input
                  type='checkbox'
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedBrands([...selectedBrands, brand]);
                    } else {
                      setSelectedBrands(
                        selectedBrands.filter((b) => b !== brand)
                      );
                    }
                  }}
                  className='mr-2'
                />
                <span className='text-sm'>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Apply Filters Button */}
      <button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'>
        Apply Filters
      </button>

      {/* Reset Filters */}
      <button
        onClick={() => {
          setPriceRange([
            filterOptions.filters.priceRange.min,
            filterOptions.filters.priceRange.max,
          ]);
          setSelectedBrands([]);
        }}
        className='w-full text-blue-600 py-2 mt-2'
      >
        Reset Filters
      </button>
    </div>
  );
}

FiltersSidebar.propTypes = {
    category: PropTypes.string,
    subCategory: PropTypes.string,
    onClose: PropTypes.func,
}

export default FiltersSidebar