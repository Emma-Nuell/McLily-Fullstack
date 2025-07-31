import { categories } from "../utils/constants.jsx";
import React from "react";

const Categories = () => {
  return (
    <section className='px-2.5 py-0.75 mb-2.5 bg-white dark:bg-gray-800'>
      {/* Title Section */}
      <div className='title my-3.75 text-center'>
        <h3 className='text-lg font-medium text-gray-800 dark:text-gray-200'>
          Featured Categories
        </h3>
        <div className='underline h-0.5 w-24 mx-auto bg-primary-400 mt-1'></div>
      </div>

      {/* Categories Grid */}
      <div className='categories grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.75 text-center'>
        {categories.map((category, index) => (
          <div
            key={index}
            className='category flex flex-col items-center cursor-pointer group'
          >
            {/* Image Container */}
            <div className=' aspect-square w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-primary-400 dark:bg-primary-500 rounded-xl p-2 group-hover:bg-primary-500 dark:group-hover:bg-primary-600 transition-colors'>
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                decoding="async"
                className='max-h-[90%] w-[90%] object-cover'
              />
            </div>

            {/* Category Name */}
            <h5 className='text-xs mt-1.5 text-gray-700 dark:text-gray-300 font-medium'>
              {category.name}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;