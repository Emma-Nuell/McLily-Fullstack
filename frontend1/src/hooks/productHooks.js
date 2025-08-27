import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { findProductInQueryCache, getLastViewedProducts, getUserCategoryPreferences } from "../utils/helpers"
import ProductsAPI from "../utils/endpoints/productsApi"
import { useProductsContext } from "../context"

export const useHomepageData = () => {
    const preferences = getUserCategoryPreferences()
    const lastViewed = getLastViewedProducts()
    // const {addProducts} = useProductsContext()

    return useQuery({
        queryKey: ["homepage-data"],
        queryFn: () => ProductsAPI.getHomepageData(preferences, lastViewed.map(item => item.productId)),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    })
}

// export const useHomepageData = () => {
//   const { addProducts } = useProductContext();

//   return useQuery({
//     queryKey: ["homepage-data"],
//     queryFn: withProductContext(fetchHomepageData, { addProducts }),
//     // ... other options
//   });
// };

export const useInfiniteProducts = (filters) => {
    return useInfiniteQuery({
        queryKey: ["products", filters],
        queryFn: ({ pageParam = 1 }) => ProductsAPI.getProductsInfinite({ pageParam, ...filters }),
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.currentPage + 1 : undefined
        },
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
    })
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
//             const response = await ProductsAPI.fetchProduct(productId)
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
    
    const contextProduct = getProduct(productId)

    const cacheProduct = contextProduct
      ? null
        : findProductInQueryCache(productId);
    
    //if found in cache, add to context
    if (cacheProduct && !contextProduct) {
      addProducts([cacheProduct]);
    }
  
    const finalCachedProduct = contextProduct || cacheProduct

    return useQuery({
      queryKey: ["product", productId],
      queryFn: async () => {
        if (finalCachedProduct) {
          return { data: finalCachedProduct, fromCache: true };
        }

        const response = await ProductsAPI.fetchProduct(productId);
        if (response.data) {
          addProducts([response.data]);
        }
        return { data: response.data, fromCache: false };
      },
      enabled: !!productId,
      staleTime: 5 * 60 * 1000,
      // Optimistic data if we have it in cache
      initialData: finalCachedProduct ? () => finalCachedProduct : undefined,
      // Don't need to refetch immediately if we have cached data
      refetchOnMount: !finalCachedProduct,
      // eslint-disable-next-line no-unused-vars
      retry: (failureCount, error) => {
        if (finalCachedProduct) return false;
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
      queryFn: () => ProductsAPI.getSearchSuggestions(searchTerm),
        enabled: enabled && searchTerm.length >= 3,// fetch when three characters or more
        staleTime: 2 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
      retry: 1
    });
} 