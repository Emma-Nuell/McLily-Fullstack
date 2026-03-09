import { FaPhoneAlt } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
import React from "react";
import {
  useCartContext,
  useUserContext,
  useUserProfileContext,
} from "../../context";
import { useToast } from "../../context/Modal/useModal&Toast";
import { useNavigate } from "react-router-dom";

const CheckoutSlide = () => {
  const { total_amount } = useCartContext();
  const { showToast, TOAST_TYPES } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useUserContext();
  const { isLoading } = useUserProfileContext();

  const handleClick = () => {
    if (!isAuthenticated) {
      showToast("You must be logged in", TOAST_TYPES.INFO);
      navigate("/auth");
    } else {
      showToast("This part is under construction", TOAST_TYPES.INFO);
    }
  };

  return (
    <div className="bg-white/90 dark:bg-surface/90 backdrop-blur-md p-4 md:px-8 flex items-center justify-between gap-4 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] border-t border-gray-100 dark:border-gray-800 fixed w-full bottom-0 left-0 right-0 z-[100] h-[80px]">
      <div className="max-w-[--max-width] w-full mx-auto grid grid-cols-[auto_1fr] gap-4 h-full items-center">
        {/* Phone Button */}
        <button className="flex justify-center items-center h-full aspect-square text-base border-none hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-50 dark:bg-gray-900 rounded-xl transition-colors">
          <FaPhoneAlt
            size={20}
            className="text-primary-600 dark:text-primary-400"
          />
        </button>

        {/* Checkout Button */}
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="flex justify-center items-center w-full h-full text-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer"
        >
          Checkout ({formatPrice(total_amount)})
        </button>
      </div>
    </div>
  );
};

export default CheckoutSlide;
