import React, { useState } from "react";
// import { products } from "../../convert/products1";
import { BsStarFill } from "react-icons/bs";
import { formatPrice } from "../../utils/helpers";
import { FaCartPlus } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context";
import AmountButtons from "../AmountButtons";

const TopSellers = ({ products: Products }) => {
  const navigate = useNavigate();
  const { addToCart, cart, toggleAmount } = useCartContext();
  const [selectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const handleClick = (product) => {
    navigate(`/products/singleProduct/${product.productId}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 bg-background-white dark:bg-surface mb-10">
      <div className="flex items-center mb-6 justify-between">
        <h2 className="text-2xl font-bold text-text">Top Sellers</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Products.map((product) => {
          const { price, stock, productId, sizes } = product;
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
                  className="flex justify-center py-2 px-3 font-medium items-center text-sm bg-primary-500 dark:bg-primary-300 hover:bg-primary-600 dark:hover:bg-primary-400 text-text rounded-md cursor-not-allowed"
                  disabled
                >
                  Select Size
                </button>
              );
            }

            return (
              <button
                className="flex justify-center py-2 px-3 font-medium items-center text-sm bg-primary-400 dark:bg-primary-300 text-text hover:bg-primary-500 rounded-md cursor-pointer"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            );
          };

          return (
            <div
              onClick={() => handleClick(product)}
              key={product.productId}
              className="bg-white dark:bg-surface h-80 rounded-2xl transition-all duration-300 overflow-hidden group grid grid-cols-[3fr_5fr] p-6 gap-6 text-text shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 cursor-pointer hover:-translate-y-1"
            >
              <div className="rounded-xl h-full flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-900 overflow-hidden relative group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="object-contain w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <h2 className="font-bold text-lg leading-tight line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
                  {product.name}
                </h2>
                <div className="flex gap-2 items-center text-sm text-gray-500">
                  <BsStarFill
                    className="text-yellow-400 items-center flex"
                    size={14}
                  />
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {product.rating.average}
                  </p>
                  <p className="text-xs">
                    ({product.rating.reviewsCount} reviews)
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
                  <p className="price text-lg font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(price)}
                  </p>
                  {renderCartButton()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

TopSellers.propTypes = {
  products: PropTypes.array,
};

export default TopSellers;
