import { useInfiniteQuery, useQuery, } from "@tanstack/react-query"
import { getLastViewedProducts, getUserCategoryPreferences, shuffleProducts, useFindProductInQueryCache } from "../utils/helpers"
import { useProductsContext } from "../context"
import StoreAPI from "../utils/endpoints/storeApi"
import { useEffect } from "react"
import { useState } from "react"

export const useHomepageData = () => {
    const preferences = getUserCategoryPreferences()
    const lastViewed = getLastViewedProducts()
    const lastViewedIds = lastViewed.map((item) => item.productId);
    const timeBucket = Math.floor(Date.now() / (7 * 60 * 1000));

    // console.log(preferences, lastViewed);
    

    return useQuery({
      queryKey: ["homepage-data", timeBucket],
      queryFn: () => StoreAPI.getHomepageData(preferences, lastViewedIds),
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
}


export const useInfiniteProducts = (filters) => {
    return useInfiniteQuery({
      queryKey: ["products", filters],
      queryFn: ({ pageParam = 1 }) =>
        StoreAPI.getProductsInfinite({ pageParam, ...filters }),
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
      },
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      onSuccess: (data) => {
        if (filters.sort === "random" && data.pages) {
          // Shuffle each page's products individually
          data.pages.forEach((page) => {
            if (page.products && page.products.length > 0) {
              page.products = shuffleProducts(page.products);
            }
          });
        }
      },
    });
}

// export const useProduct = (productId) => {
//     const { getProduct, addProducts } = useProductsContext()
    
//     const cachedProduct = productId ? getProduct(productId) : null;

//     return useQuery({
//         queryKey: ["product", productId],
//         queryFn: async () => {
//             //if product is in context, return it immediately
//             if (cachedProduct) {
//                 return {data: cachedProduct, fromCache: true}
//             }

//             //otherwise fetch from api
//             const response = await StoreAPI.fetchProduct(productId)
//             if (response.data) {
//                 addProducts([response.data])
//             }
//             return {data: response.data, fromCache: false}
//         },
//         enabled: !!productId,
//         staleTime: 5 * 60 * 1000,
//         cacheTime: 30 * 60 * 1000,
//         // eslint-disable-next-line no-unused-vars
//         retry: (failureCount, error) => {
//             if (cachedProduct) return false
//             return failureCount < 3;
//         }
//     })
// } 

//hook to search for product in cache before fecthing


export const useSmartProduct = (productId) => {
    const { getProduct, addProducts } = useProductsContext()
      const [initialProduct, setInitialProduct] = useState(null);

      const cacheProduct = useFindProductInQueryCache(productId);
      // Initialize product on mount
      useEffect(() => {
        const contextProduct = getProduct(productId);
        if (contextProduct) {
          setInitialProduct(contextProduct);
          return;
        }

        if (cacheProduct) {
          setInitialProduct(cacheProduct);
          
          // Add to context for future use
        addProducts([cacheProduct]);
          
        }
      }, [productId, getProduct, addProducts, cacheProduct]);
    

    return useQuery({
      queryKey: ["product", productId],
      queryFn: async () => {
        // Check if we have it in context now
        const currentProduct = getProduct(productId);
           if (currentProduct) {
             return { data: currentProduct, fromCache: true };
           }



        const response = await StoreAPI.fetchProduct(productId);
        if (response) {
          
          addProducts([response]);
        }
        return { data: response, fromCache: false };
      },
      enabled: !!productId && !initialProduct,
      staleTime: 5 * 60 * 1000,
      // Optimistic data if we have it in cache
      initialData: initialProduct || undefined,
      // Don't need to refetch immediately if we have cached data
      refetchOnMount: !initialProduct,
      // eslint-disable-next-line no-unused-vars
      retry: (failureCount, error) => {
        if (getProduct(productId)) return false;
        return failureCount < 3;
      },
    });
}

// Prefetch product data when hovering over product links

// export const useProductPrefetch = () => {
//   const queryClient = useQueryClient();
//   const { getProduct } = useProductContext();

//   const prefetchProduct = (productId) => {
//     // Don't prefetch if we already have the data
//     if (getProduct(productId)) return;
    
//     queryClient.prefetchQuery({
//       queryKey: ['product', productId],
//       queryFn: () => fetchProduct(productId),
//       staleTime: 5 * 60 * 1000,
//     });
//   };

//   return { prefetchProduct };
// };

// // Usage in ProductCard component
// const ProductCard = ({ product }) => {
//   const { prefetchProduct } = useProductPrefetch();

//   return (
//     <Link
//       to={`/product/${product.productId}`}
//       onMouseEnter={() => prefetchProduct(product.productId)}
//       className="block"
//     >
//       {/* product card content */}
//     </Link>
//   );
// };


export const useSearchSuggestions = (searchTerm, enabled = true) => {
    return useQuery({
      queryKey: ["search-suggestions", searchTerm],
      queryFn: () => StoreAPI.getSearchSuggestions(searchTerm),
        enabled: enabled && searchTerm.length >= 3,// fetch when three characters or more
        staleTime: 2 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
      retry: 1
    });
} 




