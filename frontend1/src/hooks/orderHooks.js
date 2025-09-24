import { useOrderContext } from "../context";
import { useToast } from "../context/Modal/useModal&Toast";
import OrderAPI from "../utils/endpoints/orderApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserOrders = () => {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: () => OrderAPI.getUserOrders(),
    enabled: !!localStorage.getItem("profile"),
    staleTime: 20 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const useOrderDetails = (orderId, options = {}) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => OrderAPI.getOrderDetails(orderId),
    enabled: !!orderId && !!localStorage.getItem("profile"),
    staleTime: 50 * 60 * 1000,
    ...options
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, reason }) => OrderAPI.cancelOrder(orderId, reason),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-orders"],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["order"],
          exact: true,
        });
      },
    }
  );
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, ...statusData }) =>
      OrderAPI.updateOrderStatus(orderId, statusData),
    onSuccess: (data, variables) => {
      // Update in cache
      queryClient.setQueryData(["order", variables.orderId], data);
      queryClient.invalidateQueries({
        queryKey: ["user-orders"],
        exact: true,
      });
    },
  });
};

export const useSmartOrder = (orderId) => {
  const { getOrder, updateOrder } = useOrderContext();

  // Check if we have the order in context first
  const { data: cachedOrder, fromCache } = getOrder(orderId);

  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (fromCache) {
        return { data: cachedOrder, fromCache: true };
      }

      const response = await OrderAPI.getOrderDetails(orderId);
      if (response) {
        updateOrder(response);
      }
      return { data: response, fromCache: false };
    },
    enabled: !!orderId && !!localStorage.getItem("profile"),
    staleTime: 10 * 60 * 1000,
    refetchOnMount: !fromCache,
    initialData: fromCache ? () => cachedOrder : undefined,
  });
};

export const usePrefetchOrders = () => {
  const queryClient = useQueryClient();

  const prefetchOrders = () => {
    queryClient.prefetchQuery({
      queryKey: ["user-orders", 1],
      queryFn: () => OrderAPI.getUserOrders(),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchOrders };
};

export const useVerifyPayment = () => {
  const { showToast, TOAST_TYPES } = useToast();

  return useMutation({
    mutationFn: OrderAPI.verifyPayment,
    onSuccess: (data) => {
      if (data.success) {
        showToast("Payment verified successfully", TOAST_TYPES.SUCCESS);
      } else {
        showToast(
          `Payment verification failed: ${data.message}`,
          TOAST_TYPES.ERROR
        );
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Payment verification failed";
      showToast({ errorMessage }, TOAST_TYPES.ERROR);

      console.error("Payment verification failed:", error);
    },
  });
};

export const useCreateOrder = () => {
  const { showToast, TOAST_TYPES } = useToast();
  return useMutation({
    mutationFn: OrderAPI.createOrder,
    onSuccess: () => {
      showToast("Order confirmed", TOAST_TYPES.SUCCESS);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to confirm order";
      showToast({ errorMessage }, TOAST_TYPES.ERROR);
      console.error(error);
    },
  });
};
