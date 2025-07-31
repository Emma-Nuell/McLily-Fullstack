/* eslint-disable no-unused-vars */
import { formatPrice } from "../../utils/helpers";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cart-context";
import { BsStarFill } from "react-icons/bs";
import { CarTaxiFront, Star } from "lucide-react";
import React, { useState } from "react";
import PropTypes from "prop-types";


const Gridview = ({ products }) => {
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState(null);

  Gridview.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({}))
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-5'>
      {products.map((product) => {
        const { name, productId, price, rating, images } = product;
        return (
          <Link to={`/products/${productId}`} key={productId} className='w-full'>
            <article className='w-full  shadow-md  flex flex-col justify-between items-center gap-1.5 rounded-md h-150 border border-primary-200 dark:border-gray-600 dark:shadow-slate-900 hover:shadow-xl transition-shadow duration-300'>
              {/* Image Container - Fixed Height */}
              <div className='w-full h-[180px] flex justify-center items-center overflow-hidden'>
                <img
                  src={images[0]}
                  alt={name}
                  className='h-full w-full object-cover block rounded-t-md'
                />
              </div>

              {/* Content Container - Flex Grow with Fixed Bottom Button */}
              <div className='flex flex-col justify-between h-full w-full p-4'>
                <div className='flex-grow'>
                  <p className='line-clamp-2 font-lora leading-tight mb-2 text-text text-[15px] font-medium'>
                    {name}
                  </p>
                  <p className='price text-primary-600 dark:text-primary-300 font-medium'>
                    {formatPrice(price)}
                  </p>
                  <div className='flex items-center gap-2 text-sm'>
                    <BsStarFill className='text-yellow-500 flex items-center' />
                    <p className='font-light items-center text-text'>
                      {rating.average}
                    </p>
                  </div>
                </div>

                {/* Button Container - Fixed Position at Bottom */}
                <div className='mt-auto w-full'>
                  <button
                    className='flex items-center justify-center w-full gap-2 text-sm  bg-primary-400 dark:bg-primary-300 text-text px-4 py-2 rounded hover:bg-primary-500 transition-colors'
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(productId, size, amount, product);
                    }}
                  >
                    <FaCartPlus className='text-sm' /> Add To Cart
                  </button>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default Gridview;
