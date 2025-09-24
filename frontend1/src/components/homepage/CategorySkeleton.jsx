import React from "react";
import Logo from "../../assets/logo.svg?react";

const CategorySkeleton = () => {
  return (
    <section className="mb-12">
      <div className="h-6 w-1/3 bg-transparent rounded mb-4"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-5">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-4 w-full h-100 border border-primary-200 rounded-lg shadow-2xl hover:shadow-black/50 transition-all duration-300 animate-pulse"
          >
            <div className="h-60 bg-gray-300 rounded mb-4 flex items-center justify-center">
              <Logo className="w-40 text-gray-500 dark:text-gray-400 fill-current drop-shadow-md" />
            </div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 "></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySkeleton;
