import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CategoryHeader, Error, PageHero } from '../components';
import { FiltersSidebar, ProductList, Sort } from '../components/products';
import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import StoreAPI from '../utils/endpoints/storeApi';
import { MBlobLoader } from '../components/loaders';

const SearchPage = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get('q') || ""
    // eslint-disable-next-line no-unused-vars
    const [showFilters, setShowFilters] = useState(false)

    const {
        data,
        error,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["search-results", searchQuery],
        queryFn: ({ pageParam = 1 }) => StoreAPI.getSearchResults({ q: searchQuery, page: pageParam }),
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
        }
    })

    const products = data?.pages.flatMap((page) => page.products) || [];
    // const totalResults = data?.pages[0]?.total || 0;

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
        )
      }

  return (
    <main className='bg-background-white'>
      <PageHero
        title={`Search Results {searchQuery && for "${searchQuery}"}`}
      />
      <div className=''>
        <Sort />
        {showFilters && (
          <FiltersSidebar
            filters={data?.pages[0]?.filters}
            searchQuery={searchQuery}
          />
        )}

        <ProductList
          products={products}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </main>
  );
}

SearchPage.propTypes = {}

export default SearchPage