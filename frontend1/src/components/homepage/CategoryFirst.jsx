import React from "react";
import { categories } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const CategoryFirst = () => {
  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate(url);
  };

  return (
    <section className="px-4 py-16 bg-transparent">
      {/* Title Section */}
      <div className="title my-4 mb-10 text-center flex flex-col items-center">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-lora">
          Featured Categories
        </h3>
        <div className="h-1 w-24 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mt-3"></div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-[--max-width] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
        {categories.slice(0, 6).map((category, index) => (
          <div
            onClick={() => handleClick(category.url)}
            key={index}
            className="flex flex-col items-center cursor-pointer group transition-all duration-300 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="aspect-square w-full sm:w-40 flex justify-center items-center bg-white dark:bg-surface border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm group-hover:shadow-xl group-hover:shadow-primary-500/10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-50 dark:bg-primary-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                decoding="async"
                className="max-h-[90%] w-[90%] object-contain rounded-lg relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Category Name */}
            <h5 className="mt-4 text-sm text-gray-800 dark:text-gray-200 font-semibold tracking-wide group-hover:text-primary-500 transition-colors">
              {category.name}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryFirst;
