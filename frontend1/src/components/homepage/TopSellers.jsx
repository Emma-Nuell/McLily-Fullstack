import React from "react";
import { products } from "../../convert/products1";
import { shuffleArray } from "../../utils/helpers";
import { BsStarFill } from "react-icons/bs";
import { formatPrice } from "../../utils/helpers";
import { FaCartPlus } from "react-icons/fa";

const TopSellers = () => {
  const Products = shuffleArray(products).slice(0, 4);

  return (
    <section className='max-w-7xl mx-auto px-4 py-8 bg-background-white dark:bg-surface mb-10'>
      <div className='flex items-center mb-6 justify-between'>
        <h2 className='text-2xl font-bold text-text'>Top Sellers</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {Products.map((product) => {
          const { price } = product;

          return (
            <div
              key={product.productId}
              className='bg-background-white h-80 rounded-xl transition-all duration-500 overflow-hidden group grid grid-cols-[3fr_5fr] p-6 gap-5 text-text shadow-[6px_6px_10px_#bebebe,_-6px_-6px_10px_#f2f2f2] dark:shadow-[3px_3px_6px_#2b2a2a,_-6px_-6px_10px_#111111] cursor-pointer hover:scale-[1.02]'
            >
              <div className='rounded-md h-[98%] shadow-[4px_4px_6px_#bebebe,_-4px_-4px_10px_#f2f2f2] dark:shadow-[3px_3px_6px_#2b2a2a,_-6px_-6px_10px_#111111]'>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className='object-cover w-full h-full rounded-md'
                />
              </div>
              <div className='flex flex-col gap-4 justify-center'>
                <h2 className='font-semibold line-clamp-2'>{product.name}</h2>
                <div className='flex gap-1 items-center text-sm'>
                  <BsStarFill
                    className='text-yellow-500 items-center flex'
                    size={14}
                  />
                  <p>{product.rating.average}</p>
                  <p>({product.rating.reviewsCount})</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='price text-base font-semibold text-primary-600 dark:text-primary-300'>
                    {formatPrice(price)}
                  </p>
                  <button
                    className='flex items-center font-medium justify-center  text-sm  bg-primary-400 dark:bg-primary-300 text-text px-3 py-2 rounded hover:bg-primary-500 transition-colors'
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopSellers;
