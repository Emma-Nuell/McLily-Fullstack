import React from 'react'
import { categories } from '../../utils/constants'


const CategorySecond = () => {
  return (
    <section className='px-2.5 py-3 mb-6 mt-6 bg-background-white dark:bg-surface'>
      {/* Title Section */}
      <div className='title my-2 mb-8 text-center'>
        <h3 className='text-lg font-medium text-gray-800 dark:text-gray-200'>
          Featured Categories
        </h3>
        <div className='underline h-0.5 w-44 mx-auto bg-primary-400 dark:bg-primary-300 mt-1'></div>
      </div>

      {/* Categories Grid */}
      <div className='categories grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.75 text-center'>
        {categories.slice(6, 12).map((category, index) => (
          <div
            key={index}
            className='category flex flex-col items-center cursor-pointer group'
          >
            {/* Image Container */}
            <div className=' aspect-square w-40 h-40 sm:w-40 sm:h-40 flex justify-center items-center bg-primary-400 dark:bg-primary-300 rounded-xl p-2 group-hover:bg-primary-500 dark:group-hover:bg-primary-400 transition-colors'>
              <img
                src={category.image}
                alt={category.name}
                loading='lazy'
                decoding='async'
                className='max-h-[98%] w-[98%] object-cover'
              />
            </div>

            {/* Category Name */}
            <h5 className='text-xs mt-1.5 text-gray-700 dark:text-gray-300 tracking-wide leading-normal font-medium'>
              {category.name}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySecond