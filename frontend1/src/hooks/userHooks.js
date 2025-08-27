import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import UserAPI from "../utils/endpoints/userApi"

export const useSignUp = () => {
    const queryClient = useQueryClient()

    return useMutation(UserAPI.signUp, {
        onSuccess: (response) => {
            const userData = {
                user: response.data.user,
                token: response.data.token
            }
            localStorage.setItem("profile", JSON.stringify(userData))
            queryClient.invalidateQueries(["cart"])
        }
    })
}

export const useSignIn = () => {
    const queryClient = useQueryClient()

    return useMutation(UserAPI.signIn, {
        onSuccess: (response) => {
            const userData = {
              user: response.data.user,
              token: response.data.token,
            };
            localStorage.setItem("profile", JSON.stringify(userData))
            queryClient.invalidateQueries(["cart"])
        }
    })
}

export const useSignOut = () => {
    const queryClient = useQueryClient()

    return useMutation(() => {
        localStorage.removeItem("profile")
        queryClient.invalidateQueries(["cart"])
        queryClient.invalidateQueries(["user"])
        return Promise.resolve()
    })
}

export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: UserAPI.getWishlist,
    enabled: !!localStorage.getItem("profile"), 
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation(UserAPI.addToWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation(UserAPI.removeFromWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
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
