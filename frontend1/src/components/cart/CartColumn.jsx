import { useCartContext } from "../../context";
import Cartitem from "./Cartitem";
import React from "react";

const CartColumn = () => {
  const { cart, total_items } = useCartContext();
  return (
    <div className="bg-transparent flex flex-col items-start justify-start mb-2.5 scrollbar-hidden overflow-auto">
      <h5 className="text-text dark:text-gray-400 mb-2 uppercase text-sm font-medium px-5">
        Cart Items ({total_items})
      </h5>
      <div className="flex flex-col gap-4 items-start w-full scrollbar-hidden overflow-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Your cart is empty
          </p>
        ) : (
          cart.map((item) => (
            <div key={item.cartId} className="p-2 rounded-md">
              <Cartitem {...item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartColumn;
