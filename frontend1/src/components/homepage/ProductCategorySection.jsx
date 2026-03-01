import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
// import { products } from "../../convert/products1";

const ProductCategorySection = ({ products, mainCategory, subCategory }) => {
  const navigate = useNavigate();

  const handleClick = (mainCategory, subCategory) => {
    navigate(
      `/products/category/${encodeURIComponent(
        mainCategory,
      )}/${encodeURIComponent(subCategory)}`,
    );
  };
  return (
    <section className="mb-12 bg-transparent py-8 px-4 max-w-[--max-width] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 px-4">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-lora">{`${mainCategory} - ${subCategory}`}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mt-3 hidden sm:block"></div>
        </div>
        <button
          onClick={() => handleClick(mainCategory, subCategory)}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors cursor-pointer flex items-center gap-1 mt-4 sm:mt-0"
        >
          View All <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 space-y-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

ProductCategorySection.propTypes = {
  products: PropTypes.array,
  mainCategory: PropTypes.string,
  subCategory: PropTypes.string,
};

export default ProductCategorySection;
