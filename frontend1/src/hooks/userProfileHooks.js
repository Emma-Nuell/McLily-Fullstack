import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserProfileAPI from "../utils/endpoints/userProfileApi";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: UserProfileAPI.getUserProfile,
    enabled: !!localStorage.getItem("profile"),
    staleTime: 50 * 60 * 1000,
    cacheTime: 50 * 60 * 1000,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserProfileAPI.updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
        exact: true,
      });
    },
  });
};

export const useUserAddresses = () => {
  return useQuery({
    queryKey: ["user-addresses"],
    queryFn: UserProfileAPI.getUserAddresses,
    enabled: !!localStorage.getItem("profile"),
    staleTime: 50 * 60 * 1000,
    cacheTime: 50 * 60 * 1000,
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserProfileAPI.addUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-addresses"],
        exact: true,
      });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ addressId, ...addressData }) =>
      UserProfileAPI.updateUserAddress(addressId, addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-addresses"],
        exact: true,
      });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserProfileAPI.deleteUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-addresses"],
        exact: true,
      });
    },
  });
};

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserProfileAPI.setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-addresses"],
        exact: true,
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: UserProfileAPI.changePassword,
  });
};