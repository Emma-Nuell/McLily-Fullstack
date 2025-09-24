/* eslint-disable no-unused-vars */
import { formatPrice } from "../../utils/helpers";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { CarTaxiFront, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCartContext } from "../../context";
import AmountButtons from "../AmountButtons";

const Gridview = ({ products }) => {
  const { addToCart, cart, toggleAmount } = useCartContext();
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState(null);
  const [selectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-5">
      {products.map((product) => {
        const { name, productId, price, rating, images, stock, sizes } = product;
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
          <Link
            to={`/products/singleProduct/${productId}`}
            key={productId}
            className="w-full"
          >
            <article className="w-full  shadow-md  flex flex-col justify-between items-center gap-1.5 rounded-md h-150 border border-primary-200 dark:border-gray-600 dark:shadow-slate-900 hover:shadow-xl transition-shadow duration-300">
              {/* Image Container - Fixed Height */}
              <div className="w-full h-[180px] flex justify-center items-center overflow-hidden">
                <img
                  src={images[0]}
                  alt={name}
                  className="h-full w-full object-cover block rounded-t-md"
                />
              </div>

              {/* Content Container - Flex Grow with Fixed Bottom Button */}
              <div className="flex flex-col justify-between h-full w-full p-4">
                <div className="flex-grow">
                  <p className="line-clamp-2 font-lora leading-tight mb-2 text-text text-[15px] font-medium">
                    {name}
                  </p>
                  <p className="price text-primary-600 dark:text-primary-300 font-medium">
                    {formatPrice(price)}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <BsStarFill className="text-yellow-500 flex items-center" />
                    <p className="font-light items-center text-text">
                      {rating.average}
                    </p>
                  </div>
                </div>

                {/* Button Container - Fixed Position at Bottom */}
                <div className="mt-auto w-full">
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

Gridview.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Gridview;
