import React from "react";
import {
  FeaturedProducts,
  CategoryFirst,
  CategorySecond,
  RecommendedProducts,
  TopSellers,
  LastViewed,
  ProductCategorySection,
} from "../components/homepage";
import { Error } from "../components";
import { useHomepageData } from "../hooks/storeHooks";
import { MBlobLoader, MclilyLoader } from "../components/loaders";

const HomePage = () => {
  const { data, isLoading, error } = useHomepageData();

  if (isLoading) {
    return (
      <main className="fixed inset-0 z-50 flex items-center justify-center p-4 dark:bg-background-white bg-gray-100">
        <MclilyLoader />
      </main>
    );
  }

  if (error || !data || data.error) {
    return (
     <main className="bg-background-white">
             <Error error={error} />
           </main>
    );
  }

  const { featured, topSellers, recommended, randomCategories, lastViewed } =
    data.data;

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
            subCategory={subCategory}
          />
        )
      )}
    </main>
  );
};
export default HomePage;
