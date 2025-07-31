import React from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../../utils/helpers';
import { BsStarFill } from 'react-icons/bs';

const ProductCard = ({ product }) => {
  const {price} = product
  return (
    <div className='flex flex-col items-center justify-between text-text shadow-md dark:bg-background-white cursor-pointer'>
      <div className='w-full h-[100px] flex justify-center items-center overflow-hidden'>
        <img
          src={product.images[0]}
          alt=''
          className='h-full w-full object-cover block rounded-t-md'
        />
      </div>
      <div className='flex flex-col items-start gap-2 w-full px-4 mt-2 pb-6'>
        <h2 className='line-clamp-2 leading-tight'>{product.name}</h2>
        <p className='price dark:text-primary-300'>{formatPrice(price)}</p>
        <div className='flex gap-2 items-center text-xs mb-2'>
          <BsStarFill className='text-yellow-500 items-center flex' size={14} />
          <p>{product.rating.average}</p>
        </div>
        <div className='w-full'>
          <button
            className='flex items-center font-medium w-full justify-center  text-sm  bg-primary-400 dark:bg-primary-300 text-text px-3 py-2 rounded hover:bg-primary-500 transition-colors'
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
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.shape({
      average: PropTypes.number
    })
  })
}

export default ProductCard