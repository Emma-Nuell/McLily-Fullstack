import CartAPI from "../utils/endpoints/cartApi.js";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const useSyncCart = () => {
  const queryClient = useQueryClient();

  return useMutation((cartItems) => CartAPI.syncCart(cartItems), {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation(CartAPI.addToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
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

  return useMutation(CartAPI.removeFromCart, {
    onSuccess: queryClient.invalidateQueries(["cart"]),
  });
};

export const useUpdateCart = () => {
    const queryClient = useQueryClient()

    return useMutation(CartAPI.updateCart, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"])
        }
    })
}
