import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../../utils/helpers';
import { BsStarFill } from 'react-icons/bs';
import {  useNavigate } from 'react-router-dom';
// import { useToast } from '../../context/Modal/useModal&Toast';
import { FaCartPlus } from 'react-icons/fa';
import { useCartContext } from '../../context';
import AmountButtons from '../AmountButtons';

const ProductCard = ({ product, showCart = true }) => {
  const {price, stock, sizes, productId} = product
      // const { showToast, TOAST_TYPES } = useToast();
  const { addToCart, cart, toggleAmount } = useCartContext();

  
  const navigate = useNavigate()
  const handleClick = (product) => {
  navigate(`/products/singleProduct/${product.productId}`)
  }

  const available = stock > 0;
  const [selectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
  
  

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
      e.preventDefault()
      e.stopPropagation()
      if (product.sizes?.length > 0 && !selectedSize) {
        navigate(`/products/singleProduct/${product.productId}`);
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
          className="flex w-full justify-center py-2 items-center gap-4 text-base bg-primary-500 dark:bg-primary-300 hover:bg-primary-600 dark:hover:bg-primary-400 text-text rounded-md cursor-not-allowed"
          disabled
        >
          <FaCartPlus /> Select Size
        </button>
      );
    }

    return (
      <button
        className="flex w-full justify-center py-2 items-center gap-4 text-base bg-primary-400 dark:bg-primary-300 text-text hover:bg-primary-500 rounded-md cursor-pointer"
        onClick={handleAddToCart}
      >
        <FaCartPlus /> Add To Cart
      </button>
    );
  };
  return (
    <div
    onClick={() => handleClick(product)}
    className='flex flex-col items-center justify-between text-text shadow-md dark:bg-background-white cursor-pointer'>
      <div className='w-full h-[100px] flex justify-center items-center overflow-hidden'>
        <img
          src={product.images[0]}
          alt='Main product image'
          className='h-full w-full rounded-t-md'
        />
      </div>
      <div className='flex flex-col items-start gap-2 w-full px-4 mt-2 pb-6'>
        <h2 className='line-clamp-2 leading-tight'>{product.name}</h2>
        <p className='price dark:text-primary-300'>{formatPrice(price)}</p>
        <div className='flex gap-2 items-center text-xs mb-2'>
          <BsStarFill className='text-yellow-500 items-center flex' size={14} />
          <p>{product.rating.average}</p>
        </div>
        {showCart && (

        <div className='w-full'>
          {renderCartButton()}
        </div>
        )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    price: PropTypes.number,
    productId: PropTypes.string,
    sizes: PropTypes.array,
    stock: PropTypes.number,
    rating: PropTypes.shape({
      average: PropTypes.number
    })
  }),
  showCart: PropTypes.bool,
}

export default ProductCard