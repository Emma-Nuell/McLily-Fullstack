import { FaTrash } from "react-icons/fa";
import AmountButtons from "../AmountButtons";
import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { useCartContext } from "../../context";

const CartItem = ({
  cartId,
  name,
  brand,
  size,
  price,
  stock,
  quantity,
  image,
  productId,
}) => {
  const { removeItem, toggleAmount } = useCartContext();

  CartItem.propTypes = {
    cartId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    size: PropTypes.string,
    productId: PropTypes.string.isRequired,
  };

  const increase = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAmount(cartId, "inc");
  };

  const decrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAmount(cartId, "dec");
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(cartId);
  };

  return (
    <article className='w-full bg-surface rounded-md shadow-md hover:shadow-md transition-shadow duration-300 px-5 py-2'>
      <Link
        className='flex flex-col items-start justify-center p-1.5 w-full'
        to={`/products/singleProduct/${productId}`}
      >
        {/* Main Content */}
        <div className='grid grid-cols-4 gap-4 w-full items-start'>
          {/* Image */}
          <div className='col-span-1 aspect-square'>
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover block rounded-sm'
            />
          </div>

          {/* Product Info */}
          <div className='col-span-3 flex flex-col items-start justify-start gap-0.25 text-black dark:text-gray-200'>
            <h5 className='name font-medium text-sm line-clamp-2 hover:line-clamp-none'>
              {name}
            </h5>
            <p className='text-xs'>
              <span className='text-gray-700 dark:text-gray-300'>Brand:</span>{" "}
              {brand}
            </p>
            {size && (
              <p className='text-xs capitalize'>
                <span className='text-gray-700 dark:text-gray-300'>Size:</span>{" "}
                {size}
              </p>
            )}
            <p className='price text-xs font-semibold text-primary-700 dark:text-primary-400'>
              <span className='text-gray-700 dark:text-gray-300'>Price:</span>{" "}
              {formatPrice(price)}
            </p>

            {/* Stock Status */}
            {stock > 10 ? (
              <p className='units stock text-xs text-gray-700 dark:text-gray-300'>
                In stock
              </p>
            ) : stock > 3 ? (
              <p className='units few text-xs text-amber-600 dark:text-amber-400'>
                few units left
              </p>
            ) : stock > 0 ? (
              <p className='units lack text-xs text-red-500 dark:text-red-400'>
                {stock} units left!
              </p>
            ) : (
              <p className='text-sm text-red-500 font-medium my-1'>
                OUT OF STOCK!!!
              </p>
            )}

            <h5 className='sub-total text-xs text-gray-600 dark:text-gray-300 mt-1'>
              Sub-total: {formatPrice(quantity * price)}
            </h5>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex items-center justify-between w-full mt-2 px-1'>
          <button
            className='flex items-center justify-center gap-2 text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors'
            onClick={handleRemove}
          >
            <FaTrash size={12} /> Remove
          </button>

          <AmountButtons
            quantity={quantity}
            increase={(e) => increase(e)}
            decrease={(e) => decrease(e)}
          />
        </div>
      </Link>
    </article>
  );
};

export default CartItem;
