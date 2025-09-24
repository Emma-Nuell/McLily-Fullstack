
import CartNavbar from "./CartNavbar";
import CartTotal from "./CartTotal";
import CartColumn from "./CartColumn";
import Checkoutslide from "./Checkoutslide";
import React from "react";

const CartContent = () => {
  return (
    <section className="mt-32 px-4">
      <div className="bg-background-white rounded-lg p-4 mb-6 shadow-lg">
        <CartTotal />
      </div>
      <CartColumn />
    </section>
  );
};

export default CartContent;
