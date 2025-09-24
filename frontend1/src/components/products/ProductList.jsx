import React, { useEffect } from "react";
import Gridview from "./Gridview";
import Listview from "./Listview";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import { useInView} from "react-intersection-observer"
import { useFilterContext } from "../../context";
import { CategorySkeleton } from "../homepage";

const ProductList = ({products, hasNextPage, isFetchingNextPage, fetchNextPage}) => {
  const { grid_view } = useFilterContext();

  const { ref, inView } = useInView();
    useEffect(() => {
      if (inView && hasNextPage && !isFetchingNextPage) {
       fetchNextPage()
     }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])
    
  if (grid_view === false) {   
    return (
      <div>
        <Listview
          products={products}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
        {/* Load more trigger */}
        <div ref={ref} className="h-10 flex items-center justify-center">
          {isFetchingNextPage && <CategorySkeleton />}
          {!hasNextPage && products.length > 0 && (
            <p className="text-gray-600 dark:text-gray-400 my-4 text-center py-8">
              You&apos;ve reached the end of this category
            </p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Gridview
        products={products}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      ></Gridview>
      {/* Load more trigger */}
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <CategorySkeleton />}
        {!hasNextPage && products.length > 0 && (
          <p className="text-gray-600 dark:text-gray-400 my-4 text-center py-8">
            You&apos;ve reached the end of this category
          </p>
        )}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
  hasNextPage: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func
}
export default ProductList;
