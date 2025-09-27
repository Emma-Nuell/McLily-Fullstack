import { FaPhoneAlt } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
import React from "react";
import { useCartContext, useUserContext, useUserProfileContext } from "../../context";
import { useToast } from "../../context/Modal/useModal&Toast";
import { useNavigate } from "react-router-dom";

const CheckoutSlide = () => {
  const { total_amount } = useCartContext();
          const {showToast, TOAST_TYPES} = useToast()
          const navigate = useNavigate()
  const { isAuthenticated } = useUserContext();
  const {isLoading} = useUserProfileContext()


  

  const handleClick = () => {
    if(!isAuthenticated) {
      showToast("You must be logged in", TOAST_TYPES.INFO);
    navigate("/auth")
    } else {
      navigate("/checkout")
    }
     
  }

  return (
    <div className='bg-surface mt-10  p-4 grid grid-cols-[1fr_7fr] gap-4 shadow-sm fixed w-full bottom-0 z-50'>
      {/* Phone Button */}
      <button className='flex justify-center items-center gap-1.25 text-base border border-primary-600 dark:border-primary-300 bg-transparent rounded-md active:bg-primary-400 dark:active:bg-primary-500 transition-colors'>
        <FaPhoneAlt className='text-primary-600 dark:text-primary-400' />
      </button>

      {/* Checkout Button */}
      <button
      onClick={handleClick}
      disabled={isLoading}
      className='flex justify-center p-4 items-center text-base bg-primary-600 dark:bg-primary-300 text-white dark:text-gray-200 font-medium rounded-md active:bg-primary-500 dark:active:bg-primary-400 transition-colors cursor-pointer'>
        Checkout ({formatPrice(total_amount)})
      </button>
    </div>
  );
};

export default CheckoutSlide;
