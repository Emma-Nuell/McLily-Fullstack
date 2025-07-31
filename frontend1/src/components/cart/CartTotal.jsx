import { useCartContext } from "../../context/cart-context";
import { formatPrice } from "../../utils/helpers";
import React from "react";

const CartTotal = () => {
  const { total_amount } = useCartContext();

  return (
    <div className='flex flex-col items-start justify-center bg-transparent'>
      <h5 className='uppercase text-text mb-2 text-sm font-medium px-5'>
        Cart Summary
      </h5>

      <div className='flex flex-col items-start justify-between w-full bg-surface gap-2.5 py-2.5 px-5 shadow-md mb-4'>
        <div className='flex justify-between items-center w-full font-semibold text-gray-800 dark:text-gray-200'>
          <p>Subtotal:</p>
          <p>{formatPrice(total_amount)}</p>
        </div>

        <p className='text-gray-500 dark:text-gray-400 text-xs'>
          Delivery fees not included yet
        </p>
      </div>
    </div>
  );
};

export default CartTotal;
