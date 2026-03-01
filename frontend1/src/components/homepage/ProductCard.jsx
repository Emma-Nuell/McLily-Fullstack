import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../utils/helpers";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
// import { useToast } from '../../context/Modal/useModal&Toast';
import { FaCartPlus } from "react-icons/fa";
import { useCartContext } from "../../context";
import AmountButtons from "../AmountButtons";

const ProductCard = ({ product, showCart = true }) => {
  const { price, stock, sizes, productId } = product;
  // const { showToast, TOAST_TYPES } = useToast();
  const { addToCart, cart, toggleAmount } = useCartContext();

  const navigate = useNavigate();
  const handleClick = (product) => {
    navigate(`/products/singleProduct/${product.productId}`);
  };

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
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes?.length > 0 && !selectedSize) {
      navigate(`/products/singleProduct/${product.productId}`);
      return;
    }

    const size = sizes?.find(
      (size) => size.value.toLowerCase() === selectedSize.toLowerCase(),
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
      className="flex flex-col items-center justify-between bg-white dark:bg-surface text-text shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 rounded-2xl cursor-pointer group transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
    >
      <div className="w-full h-[200px] flex justify-center items-center overflow-hidden bg-gray-50 dark:bg-gray-900/50 p-4 relative group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
        <div className="absolute inset-0 bg-primary-100/0 group-hover:bg-primary-100/10 transition-colors duration-300"></div>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110 relative z-10"
        />
      </div>
      <div className="flex flex-col items-start gap-3 w-full p-5 mt-2 flex-grow">
        <h2 className="line-clamp-2 leading-tight font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
          {product.name}
        </h2>
        <div className="flex items-center justify-between w-full mt-auto mb-2">
          <p className="price text-lg font-bold text-primary-600 dark:text-primary-400">
            {formatPrice(price)}
          </p>
          <div className="flex gap-1.5 items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            <BsStarFill className="text-yellow-400" size={12} />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {product.rating.average}
            </span>
          </div>
        </div>

        {showCart && (
          <div className="w-full mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
            {renderCartButton()}
          </div>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    price: PropTypes.number,
    productId: PropTypes.string,
    sizes: PropTypes.array,
    stock: PropTypes.number,
    rating: PropTypes.shape({
      average: PropTypes.number,
    }),
  }),
  showCart: PropTypes.bool,
};

export default ProductCard;
