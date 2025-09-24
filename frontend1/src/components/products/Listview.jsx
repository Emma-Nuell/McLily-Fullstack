/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import React, { useState } from "react";
import PropTypes from 'prop-types'
import { useCartContext } from "../../context";
import AmountButtons from "../AmountButtons";


const Listview = ({ products }) => {
  const { addToCart, cart, toggleAmount } = useCartContext();
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState(null);
   const [selectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate()

  Listview.propTypes = {
    products: PropTypes.shape({})
  }

  return (
    <div className='grid gap-6 items-center grid-cols-1 px-5'>
      {products.map((product) => {
        const {
          name,
          price,
          productId,
          description,
          images,
          rating,
          stock,
          sizes,
        } = product;
         const available = stock > 0;
        
                const cartItemId =
                  sizes?.length > 0 ? `${productId}_${selectedSize}` : productId;
                const inCart = cart.find((item) => item.cartId === cartItemId);
                const maxQuantity =
                  sizes?.length > 0
                    ? sizes?.find((s) => s.value === selectedSize)?.stock || stock
                    : stock;
        
                const increase = (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (inCart) {
                    toggleAmount(inCart.cartId, "inc");
                  } else {
                    setQuantity((prev) => Math.min(prev + 1, maxQuantity));
                  }
                };
                const decrease = (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (inCart) {
                    toggleAmount(inCart.cartId, "dec");
                  } else {
                    setQuantity((prev) => Math.max(prev - 1, 1));
                  }
                };
        
                const handleAddToCart = (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (product.sizes?.length > 0 && !selectedSize) {
                    navigate(`/products/singleProduct/${productId}`);
                    return;
                  }
        
                  const size = sizes?.find(
                    (size) => size.value.toLowerCase() === selectedSize.toLowerCase()
                  );
        
                  addToCart(size, quantity, product);
                };
        
                const renderCartButton = () => {
                  if (!available) {
                    return (
                      <button
                        disabled={true}
                        className="flex justify-center py-2 items-center gap-4 text-base bg-gray-300 dark:bg-gray-600 text-text rounded-md cursor-not-allowed"
                      >
                        Out Of Stock
                      </button>
                    );
                  }
        
                  if (inCart) {
                    return (
                      <AmountButtons
                        quantity={inCart.quantity}
                        increase={increase}
                        decrease={decrease}
                      />
                    );
                  }
        
                  if (sizes?.length > 0) {
                    return (
                      <button
                        className="flex justify-center py-2 items-center gap-4 text-base bg-primary-500 dark:bg-primary-300 hover:bg-primary-600 dark:hover:bg-primary-400 text-text rounded-md cursor-not-allowed"
                        disabled
                      >
                        <FaCartPlus /> Select Size
                      </button>
                    );
                  }
        
                  return (
                    <button
                      className="flex justify-center py-2 items-center gap-4 text-base bg-primary-400 dark:bg-primary-300 text-text hover:bg-primary-500 rounded-md cursor-pointer"
                      onClick={handleAddToCart}
                    >
                      <FaCartPlus /> Add To Cart
                    </button>
                  );
                };
        return (
          <Link to={`/products/singleProduct/${productId}`} key={productId} className='w-full'>
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
                  {renderCartButton()}
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

Listview.propTypes = {
  products: PropTypes.array,
};

export default Listview;
