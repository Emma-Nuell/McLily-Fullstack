import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  ThemeProvider,
  ModalToast,
  AuthProvider,
  ProductsProvider,
  UserProvider,
  CartProvider,
  FilterProvider,
  OrderProvider,
  UserProfileProvider
} from "./context/index.js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <AuthProvider>
          <ModalToast>
            <ProductsProvider>
              <FilterProvider>
                <OrderProvider>
                <UserProfileProvider>
                  <CartProvider>
                    <App />
                    <ReactQueryDevtools initialIsOpen={false} />
                  </CartProvider>
                </UserProfileProvider>
                </OrderProvider>
              </FilterProvider>
            </ProductsProvider>
          </ModalToast>
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
