
import CartNavbar from "./CartNavbar";
import CartTotal from "./CartTotal";
import CartColumn from "./CartColumn";
import Checkoutslide from "./Checkoutslide";
import React from "react";

const CartContent = () => {
  React;
  return (
    <section className='mt-32 '>
      <CartTotal />
      <CartColumn />
      <Checkoutslide />
    </section>
  );
};

export default CartContent;
