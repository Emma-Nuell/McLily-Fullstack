import { useCartContext } from "../../context";
import { formatPrice } from "../../utils/helpers";
import React from "react";

const CartTotal = () => {
  const { total_amount } = useCartContext();

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <h5 className="uppercase text-gray-900 dark:text-gray-100 mb-4 text-sm font-bold tracking-wider">
        Order Summary
      </h5>

      <div className="flex flex-col items-start justify-between w-full bg-white dark:bg-surface gap-3 py-6 px-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800 rounded-2xl mb-4">
        <div className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-gray-100">
          <p>Subtotal</p>
          <p className="text-primary-600 dark:text-primary-400">
            {formatPrice(total_amount)}
          </p>
        </div>

        <hr className="w-full border-t border-gray-100 dark:border-gray-800 my-2" />

        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Delivery fees and taxes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartTotal;
