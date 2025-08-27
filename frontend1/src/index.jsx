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
} from "./context/index.js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <ModalToast>
          <ProductsProvider>
            <FilterProvider>
              <CartProvider>
                <UserProvider>
                  <App />
                  <ReactQueryDevtools initialIsOpen={false} />
                </UserProvider>
              </CartProvider>
            </FilterProvider>
          </ProductsProvider>
        </ModalToast>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
