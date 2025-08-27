import React from "react";
import PropTypes from "prop-types";
import { ProductCard } from "../homepage";
// import { products } from "../../convert/products1";
import { useQuery } from "@tanstack/react-query";
import ProductsAPI from "../../utils/endpoints/productsApi";

const CartMayLike = ({ cartItems }) => {
  const categories = {}
  cartItems.forEach(item => {
    if (item.productDetails?.category) {
      categories[item.productDetails.category] = (categories[item.productDetails.category] || 0) + 1
    }
    if (item.productDetails?.subCategory) {
      categories[item.productDetails.subCategory] =
        (categories[item.productDetails.subCategory] || 0) + 1;
    }
  });


  const { data: recommendedProducts, isLoading } = useQuery({
    queryKey: ["cart-recommendations", Object.keys(categories)],
    queryFn: () => ProductsAPI.getRecommendedProducts(categories),
    enabled: Object.keys(categories).length > 0
  })

  if (!recommendedProducts?.length) return null
  if (isLoading) {
    return (
    <div>Loading...</div>
    )
  }

    return (
      <section className='mb-8 bg-background-white dark:bg-surface py-6 px-4 max-w-7xl'>
        <div className='flex justify-between items-center mb-8 px-4'>
          <h2 className='text-lg font-semibold text-text'>You May Like</h2>
          {/* <button className='text-primary-600 hover:underline cursor-pointer'>View All</button> */}
        </div>
        <div className='flex overflow-x-auto scrollbar-hidden space-x-4 items-center'>
          {recommendedProducts.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    );
};

CartMayLike.propTypes = {
  cartItems: PropTypes.array
};

export default CartMayLike;
