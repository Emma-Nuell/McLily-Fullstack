import React from "react";
import { Link } from "react-router-dom"


const PageHero = ({ title, product }) => {
  return (
    <section className='bg-primary-400 dark:bg-primary-200 w-full min-h-[10vh] flex items-center text-primary-800'>
      <div className='section-center flex items-center'>
        <h3 className='break-words whitespace-normal max-w-full'>
          <Link
            to='/'
            className='text-primary-700 dark:text-primary-400 px-2 transition-colors duration-300 hover:text-primary-700'
          >
            Home
          </Link>
          {product && (
            <Link
              to='/products'
              className='text-primary-700 dark:text-primary-400 px-2 transition-colors duration-300 hover:text-primary-700'
            >
              /Products
            </Link>
          )}
          /{title}
        </h3>
      </div>
    </section>
  );
};

export default PageHero;