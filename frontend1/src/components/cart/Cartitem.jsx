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
    <article className="w-full bg-white dark:bg-surface rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300 p-4">
      <Link
        className="flex flex-col items-start justify-center w-full"
        to={`/products/singleProduct/${productId}`}
      >
        {/* Main Content */}
        <div className="flex flex-row gap-5 w-full items-start">
          {/* Image */}
          <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-50 dark:bg-gray-900 rounded-xl p-2">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain block mix-blend-multiply dark:mix-blend-normal"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col items-start justify-start flex-grow text-gray-900 dark:text-gray-100">
            <h5 className="name font-bold text-base line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
              {name}
            </h5>
            <p className="text-xs text-gray-500 mb-2">
              Brand:{" "}
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {brand}
              </span>
              {size && (
                <>
                  <span className="mx-2">&bull;</span>
                  Size:{" "}
                  <span className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                    {size}
                  </span>
                </>
              )}
            </p>
            <p className="price text-sm font-bold text-primary-600 dark:text-primary-400 mb-2">
              {formatPrice(price)}
            </p>

            {/* Stock Status */}
            {stock > 10 ? (
              <p className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full w-fit">
                In stock
              </p>
            ) : stock > 3 ? (
              <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full w-fit">
                Few units left
              </p>
            ) : stock > 0 ? (
              <p className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full w-fit">
                {stock} units left!
              </p>
            ) : (
              <p className="text-xs text-red-600 font-bold bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full w-fit">
                OUT OF STOCK
              </p>
            )}

            <h5 className="sub-total text-sm font-semibold text-gray-900 dark:text-gray-100 mt-2">
              Sub-total: {formatPrice(quantity * price)}
            </h5>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between w-full mt-2 px-1">
          <button
            className="flex items-center justify-center gap-2 text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
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
