import { Link } from "react-router-dom";

import {
  CartContent,
  CartNavbar,
  CartMayLike,
  CheckoutSlide,
} from "../components/cart";
import React from "react";
import { useCartContext } from "../context";

const CartPage = () => {
  const { cart } = useCartContext();

  if (cart.length < 1) {
    return (
      <main className="min-h-screen bg-background-white flex items-center justify-center px-4">
        <CartNavbar />

        <div className="empty flex flex-col items-center justify-center max-w-md mx-auto bg-white dark:bg-surface p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center mt-20">
          <h2 className="text-3xl font-bold font-lora text-gray-900 dark:text-gray-100 mb-6">
            Your cart is empty
          </h2>
          <Link
            to="/products"
            className="px-8 py-3 bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-background-white">
      <CartNavbar />
      <div className="pb-32 scrollbar-hidden overflow-auto">
        <CartContent />
        <CartMayLike cartItems={cart} />
      </div>
      <CheckoutSlide />
    </main>
  );
};

export default CartPage;
