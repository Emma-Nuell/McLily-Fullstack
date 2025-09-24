import CartAPI from "../utils/endpoints/cartApi.js";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const useSyncCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItems) => CartAPI.syncCart(cartItems),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"], exact: true });
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CartAPI.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"], exact: true });
    },
  });
};

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => CartAPI.getCart(),
    enabled: !!localStorage.getItem("profile"),
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CartAPI.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"], exact: true }); 
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CartAPI.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"], exact: true }); 
    },
  });
};

export const useUpdateCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: CartAPI.updateCart,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"], exact: true });
      },
    });
}
