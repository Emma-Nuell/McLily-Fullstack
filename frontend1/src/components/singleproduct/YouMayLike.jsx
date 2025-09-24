import React from "react";
import PropTypes from "prop-types";
import { ProductCard } from "../homepage";
// import { products } from "../../convert/products1";
import { findCategoryBySubCategory } from "../../utils/helpers";
import { useQuery } from "@tanstack/react-query";
import ProductsAPI from "../../utils/endpoints/productsApi";
import StoreAPI from "../../utils/endpoints/storeApi";

const YouMayLike = ({ product }) => {
  const preferences = {
    [product.category]: 2, // Higher weight for main category
    [product.subCategory]: 1,
  };

  const mainCategory = findCategoryBySubCategory(product.subCategory);
  if (mainCategory) {
    mainCategory.subCategories.forEach((subCat) => {
      if (subCat !== product.subCategory) {
        preferences[subCat] = 0.5; // lower weight for related sub-categories
      }
    });
  }

  const { data: recommendedProducts, isLoading } = useQuery({
    queryKey: ["product-recommendations", product.productId],
    queryFn: () => StoreAPI.getRecommendedProducts(preferences),
    enabled: !!product,
  });

  if (!recommendedProducts?.products) return null;
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='mb-8 bg-background-white dark:bg-surface py-4 px-4 max-w-7xl'>
      <div className='flex justify-between items-center mb-4 px-4'>
        <h2 className='text-lg font-semibold text-text'>You May Like</h2>
        {/* <button className='text-primary-600 hover:underline cursor-pointer'>View All</button> */}
      </div>
      <div className='flex overflow-x-auto scrollbar-hidden space-x-4 items-center'>
        {recommendedProducts.products
          .filter((p) => p.productId !== product.productId)
          .slice(0, 6)
          .map((product) => (
            <ProductCard key={product._id} product={product} showCart={false} />
          ))}
      </div>
    </section>
  );
};

YouMayLike.propTypes = {
  product: PropTypes.object,
};

export default YouMayLike;
