import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
// import { products } from "../../convert/products1";

const ProductCategorySection = ({ products, mainCategory, subCategory }) => {

   const navigate = useNavigate()
  
    const handleClick = (mainCategory, subCategory) => {
      navigate(
        `/products?category=${encodeURIComponent(
          mainCategory
        )}&subCategory=${encodeURIComponent(subCategory)}`
      );
    }
  return (
    <section className='mb-8 bg-background-white dark:bg-surface py-6 px-4 max-w-7xl'>
      <div className='flex justify-between items-center mb-8 px-4'>
        <h2 className='text-lg font-semibold text-text'>{`${mainCategory} - ${subCategory}`}</h2>
        <button
          onClick={() => handleClick(mainCategory, subCategory)}
          className='text-primary-600 hover:underline cursor-pointer'>View All</button>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 space-y-6'>
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
