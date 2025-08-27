import OrderAPI from "../utils/endpoints/orderApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserOrders = () => {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: () => OrderAPI.getUserOrders(),
    enabled: !!localStorage.getItem("profile"),
  });
};

export const useOrderDetails = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => OrderAPI.getOrderDetails(orderId),
    enabled: !!orderId && !!localStorage.getItem("profile"),
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, reason }) => OrderAPI.cancelOrder(orderId, reason),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-orders"]);
      },
    }
  );
};
