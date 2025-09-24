import Stars from "./products/Stars";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import React from "react";
import { useProductsContext } from "../context";

const HomeProducts = () => {
  const { products } = useProductsContext();

  return (
    <section className='px-2.5 py-2.5 bg-white dark:bg-gray-800'>
      {/* Title Section */}
      <div className='title text-left'>
        <h3 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
          Some of our products...
        </h3>
        <div className='underline h-0.5 w-40 ml-5 bg-primary-400 mt-1'></div>
      </div>

      {/* Products Grid */}
      <div className='products grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mt-5'>
        {products.slice(0, 16).map((product) => {
          const ratings = product.ratings;
          return (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className='group'
            >
              <article className='product bg-white dark:bg-gray-700 shadow-lg flex flex-col justify-center items-center gap-1.5 rounded-md h-64 border border-gray-300 dark:border-gray-600 group-hover:shadow-xl transition-shadow'>
                {/* Image Container */}
                <div className='img-container w-full h-[57%] flex justify-center items-center overflow-hidden'>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading='lazy'
                    className='h-full w-full object-cover rounded-t-md'
                  />
                </div>

                {/* Product Details */}
                <div className='details w-full px-2.5 pb-1 h-[40%] flex flex-col'>
                  <h5 className='w-full overflow-hidden whitespace-nowrap text-ellipsis text-gray-800 dark:text-gray-200 mb-1 text-sm font-medium'>
                    {product.name}
                  </h5>
                  <Stars stars={ratings.average} reviews={ratings.reviews} />
                  <p className='price text-primary-600 dark:text-primary-400 font-medium mt-1'>
                    {formatPrice(product.price)}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {/* View All Button */}
      <div className='btn-container flex justify-center items-center my-1.75 py-2.5'>
        <Link
          to='/products'
          className='btn px-4 py-2 text-sm bg-primary-400 dark:bg-primary-500 text-white rounded hover:bg-primary-500 dark:hover:bg-primary-600 transition-colors'
        >
          All Products
        </Link>
      </div>
    </section>
  );
};

export default HomeProducts;
