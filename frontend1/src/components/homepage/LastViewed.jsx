import React from 'react'
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";



const LastViewed = ({products}) => {
  
  return (
        <section className='mb-8 bg-background-white dark:bg-surface py-6 px-4 max-w-7xl'>
          <div className='flex justify-between items-center mb-8 px-4'>
            <h2 className='text-lg font-semibold text-text'>Last Viewed</h2>
            {/* <button className='text-primary-600 hover:underline cursor-pointer'>View All</button> */}
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 space-y-6'>
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
  )
}




LastViewed.propTypes = {
  products: PropTypes.array,
}

export default LastViewed