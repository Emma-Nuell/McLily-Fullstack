import React from "react";
import PropTypes from "prop-types";


const Size = ({ sizes, selectedSize, onSelectSize}) => {
 

  return (
    <div className="w-full border-t border-primary-200 dark:border-primary-300">
      <div className='bg-backgroud-white '>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-sm font-medium text-gray-900 dark:text-gray-300 mt-2'>SELECT SIZE</h3>
        </div>

        <div className='flex flex-wrap gap-6 mb-4'>
          {sizes.map(({ value: size, stock}, index) => {
            const available = stock > 0;
            return (
              <button
                key={index}
                onClick={() => available && onSelectSize(size)}
                disabled={!available}
                className={`px-8 py-2 border rounded-md font-medium transition-colors uppercase ${
                  selectedSize === size
                    ? "border-primary-500 bg-primary-300 dark:bg-primary-200 text-primary-700"
                    : available
                    ? "dark:border-primary-300 border-primary-600 text-gray-900 dark:text-gray-200 hover:border-primary-500 hover:text-primary-600"
                    : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
                }`}
              >
                {size}
                {stock <= 0 && " (Out of stock)"}
              </button>
            );
          })}
        </div>
      </div>

      
    </div>
  );
};

Size.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.shape({})),
    selectedSize: PropTypes.string,
  onSelectSize: PropTypes.func,
};

export default Size;
