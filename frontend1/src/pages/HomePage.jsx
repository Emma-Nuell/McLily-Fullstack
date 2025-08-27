import React from "react"
import {
  FeaturedProducts,
  CategoryFirst,
  CategorySecond,
  RecommendedProducts,
  TopSellers,
  LastViewed,
  ProductCategorySection,
} from "../components/homepage";
import { useHomepageData } from "../hooks/productHooks";
import { Error } from "../components";

const HomePage = () => {
  const { data, isLoading, error } = useHomepageData()
  
  if (isLoading) {
    return (
      <div>Loading ...</div>
    )
  }

  if (error) return <div><Error error={error} /></div>
  
  const {featured, topSellers, recommended, randomCategories, lastViewed} = data.data


  return (
    <main>
      <FeaturedProducts products={featured} />
      <CategoryFirst />
      <RecommendedProducts products={recommended} />
      <CategorySecond />
      <TopSellers products={topSellers} />
      {lastViewed.length > 0 && <LastViewed products={lastViewed} />}
      {randomCategories.map(
        ({ mainCategory, subCategory, products }, index) => (
          <ProductCategorySection
            key={`${mainCategory}-${subCategory}-${index}`}
            products={products}
            mainCategory={mainCategory}
            subCategory = {subCategory}
          />
        )
      )}
    </main>
  );
}
export default HomePage