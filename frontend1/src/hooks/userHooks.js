import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import UserAPI from "../utils/endpoints/userApi"
import OrderAPI from "../utils/endpoints/orderApi"
import UserProfileAPI from "../utils/endpoints/userProfileApi"

export const useSignUp = () => {
    // const queryClient = useQueryClient()

    return useMutation({
      mutationFn: UserProfileAPI.signUp,
      // onSuccess: (data) => {
      //   const userData = {
      //     user: data.user,
      //     token: data.token,
      //   };
   
      // },
    });
}

export const useSignIn = () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: UserProfileAPI.signIn,
      onSuccess: (data) => {
        const userData = {
          user: data.user,
          token: data.token,
        };
        localStorage.setItem("profile", JSON.stringify(userData));
        queryClient.invalidateQueries({
          queryKey: ["cart"],
          exact: true,
        });

        // Prefetch orders in the background
        queryClient.prefetchQuery(
          ["user-orders", 1],
          () => OrderAPI.getUserOrders(),
          { staleTime: 5 * 60 * 1000 }
        );
      },
    });
}

export const useSignOut = () => {
    const queryClient = useQueryClient()

  
    return useMutation({
      mutationFn: () => {
        localStorage.removeItem("profile");
        queryClient.invalidateQueries({
          queryKey: ["cart"],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["user"],
          exact: true,
        });
        return Promise.resolve();
      },
    });
}

export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: UserAPI.getWishlist,
    enabled: !!localStorage.getItem("profile"),
    staleTime: 30 * 60 * 1000,
    cacheTime: 45 * 60 * 1000,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserAPI.addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
          queryKey: ["wishlist"],
          exact: true,
        });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserAPI.removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
        exact: true,
      });
    },
  });
};

export const useCheckWishlist = (productId) => {
  return useQuery({
    queryKey: ["wishlist-check", productId],
    queryFn: () => UserAPI.checkWishlist(productId),
    enabled: !!productId && !!localStorage.getItem("profile"),
  });
};

export const useCanReview = (productId) => {
  return useQuery({
    queryKey: ["can-review", productId],
    queryFn: () => UserAPI.checkCanReview(productId),
    enabled: !!productId && !!localStorage.getItem("profile"),
  });
};

export const useUserAllReviews = () => {
  return useQuery({
    queryKey: ["user-all-reviews"],
    queryFn: UserAPI.getUserAllReviews,
    enabled: !!localStorage.getItem("profile"),
    select: (data) => data.data, 
  });
};


export const usePendingReviews = () => {
  return useQuery({
    queryKey: ["user-pending-reviews"],
    queryFn: UserAPI.getPendingReviews,
    enabled: !!localStorage.getItem("profile"),
    select: (data) => data.pendingReviews,
  });
};

export const useUserReviews = () => {
  return useQuery({
    queryKey: ["user-submitted-reviews"],
    queryFn: UserAPI.getUserReviews,
    enabled: !!localStorage.getItem("profile"),
    select: (data) => data.reviews,
  });
};