/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { useCartContext } from "../../context/cart-context";
import React, { useState } from "react";
import PropTypes from 'prop-types'


const Listview = ({ products }) => {
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState(null);

  Listview.propTypes = {
    products: PropTypes.shape({})
  }

  return (
    <div className='grid gap-6 items-center grid-cols-1 px-5'>
      {products.map((product) => {
        const { name, price, productId, description, images, rating } = product;
        const tempStars = Array.from({ length: 5 }, (_, index) => {
          const number = index + 0.5;
          return (
            <span key={index}>
              {rating.average >= index + 1 ? (
                <BsStarFill />
              ) : rating.average >= number ? (
                <BsStarHalf />
              ) : (
                <BsStar />
              )}
            </span>
          );
        });
        return (
          <Link to={`/products/${productId}`} key={productId} className='w-full'>
            <article className='w-full flex flex-row  justify-start rounded-md items-stretch gap-4 shadow-md p-1.5 hover:shadow-xl transition-shadow dark:shadow-slate-900 duration-300 border border-primary-200 dark:border-gray-600 h-90'>
              {" "}
              {/* Added fixed height */}
              {/* Image Container - Now full height */}
              <div className='h-full w-[37%] overflow-hidden rounded-md'>
                <img
                  src={images[0]}
                  loading='lazy'
                  alt={name}
                  className='block h-full w-full object-cover'
                />
              </div>
              {/* Content Container */}
              <div className='w-[60%] flex flex-col py-2 justify-between'>
                {" "}
                {/* Changed to justify-between */}
                <div>
                  <p className='line-clamp-2 mb-1 font-lora leading-tight text-text text-[15px] font-medium'>
                    {name}
                  </p>
                  <h5 className='price text-primary-600 dark:text-primary-300'>
                    {formatPrice(price)}
                  </h5>
                  <p className='max-w-[45em] text-sm line-clamp-2 text-gray-800 dark:text-gray-300 my-1'>
                    {description.substring(0, 60)}...
                  </p>
                </div>
                <div className='mt-1 flex items-center justify-between w-full'>
                  <div className='flex items-center gap-2 text-sm'>
                    <BsStarFill className='text-yellow-500 flex items-center' />
                    <p className='font-light items-center text-text'>
                      {rating.average}
                    </p>
                  </div>
                  <button
                    type='button'
                    className='flex justify-center items-center gap-2 py-2 px-4 text-sm bg-primary-400 dark:bg-primary-300 text-text rounded hover:bg-primary-500 transition-colors'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(productId, size, amount, product);
                    }}
                  >
                    <FaCartPlus /> Add To Cart
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
export default Listview;
