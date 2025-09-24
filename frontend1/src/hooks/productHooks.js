import { useMutation, useQueryClient } from "@tanstack/react-query"

import ProductsAPI from "../utils/endpoints/productsApi"



export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ProductsAPI.submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["can-review"]);
      queryClient.invalidateQueries(["pending-reviews"]);
      queryClient.invalidateQueries(["user-reviews"]);
      // Also invalidate product queries to update ratings
      queryClient.invalidateQueries(["product"]);
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, ...reviewData }) =>
      ProductsAPI.updateReview(productId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(["user-reviews"]);
      queryClient.invalidateQueries(["product"]);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ProductsAPI.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["can-review"]);
      queryClient.invalidateQueries(["user-reviews"]);
      queryClient.invalidateQueries(["pending-reviews"]);
      queryClient.invalidateQueries(["product"]);
    },
  });
};