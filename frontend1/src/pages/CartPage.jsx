import { Link } from "react-router-dom";

import { CartContent, CartNavbar, CartMayLike, CheckoutSlide } from "../components/cart";
import React from "react";
import { useCartContext } from "../context";

const CartPage = () => {
  const { cart } = useCartContext();

  if (cart.length < 1) {
    return (
      <main className='min-h-screen bg-background-white flex items-center justify-center px-4'>
        <CartNavbar />

        <div className='empty text-center'>
          <h2 className='text-2xl font-medium text-text mb-4'>
            Your cart is empty
          </h2>
          <Link
            to='/products'
            className='px-6 py-2 bg-primary-500 dark:bg-primary-300 text-gray-900 rounded-md hover:bg-primary-600 dark:hover:bg-primary-400 transition-colors'
          >
            Fill it
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-gray-100 dark:bg-background-white'>
      <CartNavbar />
      <div className="pb-32 scrollbar-hidden overflow-auto">
      <CartContent />
      <CartMayLike cartItems={cart} /> 

      </div>
      <CheckoutSlide/> 
    </main>
  );
};

export default CartPage;
