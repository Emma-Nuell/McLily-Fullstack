import { FaPhoneAlt } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
import { useCartContext } from "../../context/cart-context";
import React from "react";

const CheckoutSlide = () => {
  const { total_amount } = useCartContext();

  return (
    <div className='bg-surface mt-10  p-4 grid grid-cols-[1fr_7fr] gap-4 shadow-sm fixed w-full bottom-0 z-50'>
      {/* Phone Button */}
      <button className='flex justify-center items-center gap-1.25 text-base border border-primary-600 dark:border-primary-300 bg-transparent rounded-md active:bg-primary-400 dark:active:bg-primary-500 transition-colors'>
        <FaPhoneAlt className='text-primary-600 dark:text-primary-400' />
      </button>

      {/* Checkout Button */}
      <button className='flex justify-center p-4 items-center text-base bg-primary-600 dark:bg-primary-300 text-white dark:text-gray-200 font-medium rounded-md active:bg-primary-500 dark:active:bg-primary-400 transition-colors cursor-pointer'>
        Checkout ({formatPrice(total_amount)})
      </button>
    </div>
  );
};

export default CheckoutSlide;
