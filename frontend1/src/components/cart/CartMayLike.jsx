import React from "react";
import PropTypes from "prop-types";
import { ProductCard } from "../homepage";
// import { products } from "../../convert/products1";
import { useQuery } from "@tanstack/react-query";
import ProductsAPI from "../../utils/endpoints/productsApi";
import StoreAPI from "../../utils/endpoints/storeApi";

const CartMayLike = ({ cartItems }) => {
  const categories = {}
  cartItems.forEach(item => {
    if (item.product?.category) {
      categories[item.product.category] = (categories[item.product.category] || 0) + 1
    }
    if (item.product?.subCategory) {
      categories[item.product.subCategory] =
        (categories[item.product.subCategory] || 0) + 1;
    }
  });


  const { data: recommendedProducts, isLoading } = useQuery({
    queryKey: ["cart-recommendations", Object.keys(categories)],
    queryFn: () => StoreAPI.getRecommendedProducts(categories),
    enabled: Object.keys(categories).length > 0
  })

  if (!recommendedProducts?.products?.length) return null
  if (isLoading) {
    return (
    <div>Loading...</div>
    )
  }

    return (
      <section className='mb-8 bg-background-white dark:bg-surface py-2 px-4 max-w-7xl'>
        <div className='flex justify-between items-center mb-4 px-4'>
          <h2 className='text-lg font-semibold text-text'>You May Like</h2>
          {/* <button className='text-primary-600 hover:underline cursor-pointer'>View All</button> */}
        </div>
        <div className='flex overflow-x-auto scrollbar-hidden space-x-4 items-center'>
          {recommendedProducts.products.slice(0, 6).map((product) => (
            <ProductCard key={product._id} product={product} showCart={false} />
          ))}
        </div>
      </section>
    );
};

CartMayLike.propTypes = {
  cartItems: PropTypes.array
};

export default CartMayLike;
