import React from "react";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

const LastViewed = ({ products }) => {
  return (
    <section className="mb-12 bg-transparent py-8 px-4 max-w-[--max-width] mx-auto">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-lora">
          Last Viewed
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mt-3"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 space-y-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

LastViewed.propTypes = {
  products: PropTypes.array,
};

export default LastViewed;
