import React from 'react'
import ProductCard from './ProductCard'
import PropTypes from 'prop-types'

const RecommendedProducts = ({products: Products}) => {
  return (
    <section className='mb-8 bg-background-white dark:bg-surface py-6 px-4 max-w-7xl '>
            <div className='flex justify-between items-center mb-6 px-4'>
              <h2 className='text-lg font-semibold text-text'>Recommended for you</h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 space-y-6'>
              {Products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
    </section>
  );
}

RecommendedProducts.propTypes = {
  products: PropTypes.array
}

export default RecommendedProducts