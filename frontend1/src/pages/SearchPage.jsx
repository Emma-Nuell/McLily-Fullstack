import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CategoryHeader, Error, PageHero } from '../components';
import { FiltersSidebar, ProductList, Sort } from '../components/products';
import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductsAPI from '../utils/endpoints/productsApi';

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
        queryFn: ({ pageParam = 1 }) => ProductsAPI.getSearchResults({ q: searchQuery, page: pageParam }),
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
        }
    })

    const products = data?.pages.flatMap((page) => page.products) || [];
    // const totalResults = data?.pages[0]?.total || 0;

     if (isLoading) {
        return (
          <main className='bg-background-white'>
            <PageHero title='Loading...' />
            <div className=''>
              <div>Loading.....</div>
            </div>
          </main>
        );
    }
    
      if (isError) {
        return (
          < Error error={ error} />  
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