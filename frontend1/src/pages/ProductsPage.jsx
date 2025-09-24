import { useParams } from "react-router-dom";
import { CategoryHeader, EmptyCategory, Error, PageHero } from "../components";
import { FiltersSidebar, ProductList, Sort } from "../components/products";
import React, { useState } from "react";
import useFilterContext from "../context/filter/useFilterContext";
import { useInfiniteProducts } from "../hooks/storeHooks";
import { MBlobLoader } from "../components/loaders";

const ProductsPage = () => {
  const { category, subCategory, allSubCategory, surpriseMe } = useParams();

  const { sort, updateSort } = useFilterContext();
  // const [sortBy, setSortBy] = useState("random")
  const [showFilters, setShowFilters] = useState(false);

  const filters = {
    category,
    subCategory,
    allSubCategory,
    surpriseMe: surpriseMe ? "true" : undefined,
    sort: sort,
  };

  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts(filters);

  const products = data?.pages.flatMap((page) => page.products) || [];
  const totalProducts = data?.pages[0]?.total || 0;

  const getPageTitle = () => {
    if (surpriseMe) return "Surprise Me";
    if (allSubCategory) return `All ${allSubCategory}`;
    if (subCategory && category) return `${category} - ${subCategory}`;
    if (subCategory) return subCategory;
    if (category) return category;
    return "All Products";
  };

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-11rem)] flex items-center justify-center p-4 dark:bg-background-white bg-gray-100">
        {/* <PageHero title="Loading..." /> */}
        <MBlobLoader />
      </main>
    );
  }

  if (isError || !products) {
    return (
      <main className="bg-background-white">
        <Error error={error} />
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="bg-background-white">
        <EmptyCategory
          category={`${category}-${subCategory}`}
          showResetButton={!surpriseMe}
          onReset={() => {
            updateSort("random");
            setShowFilters(false);
          }}
        />
      </main>
    );
  }
  return (
    <main className="bg-background-white">
      <PageHero title={getPageTitle()} />
      <div className="">
        <Sort />
        {showFilters && (
          <FiltersSidebar
            category={category}
            subCategory={subCategory}
            onClose={() => setShowFilters(false)}
          />
        )}
        <CategoryHeader
          category={`${category}-${subCategory}`}
          productCount={totalProducts}
        />

        <ProductList
          products={products}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </main>
  );
};

export default ProductsPage;
