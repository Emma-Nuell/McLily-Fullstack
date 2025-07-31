import React from 'react'

const CategorySkeleton = () => {
  return (
      <section className='mb-12'>
          <div className='h-8 w-1/3 bg-gray-200 rounded mb-4'></div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {[...Array(4)].map((_, i) => (
                  <div key={i} className='p-4 w-60 border border-gray-200 rounded-lg shadow-2xl hover:shadow-black/50 transition-all duration-300 animate-pulse'>
                      <div className='h-40 bg-gray-300 rounded mb-4'></div>
                      <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
                      <div className='h-4 bg-gray-300 rounded w-1/2 '></div>
                  </div>
              ))}
          </div>
   </section>
  )
}

export default CategorySkeleton