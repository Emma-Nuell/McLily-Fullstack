import CartNavbar from "./CartNavbar";
import CartTotal from "./CartTotal";
import CartColumn from "./CartColumn";
import Checkoutslide from "./Checkoutslide";
import React from "react";

const CartContent = () => {
  return (
    <section className="mt-28 px-4 max-w-[--max-width] mx-auto flex flex-col md:flex-row-reverse gap-8 items-start">
      <div className="w-full md:w-[350px] lg:w-[400px] sticky top-32">
        <CartTotal />
      </div>
      <div className="w-full flex-grow">
        <CartColumn />
      </div>
    </section>
  );
};

export default CartContent;
