import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductsProvider } from "./context/product-context.jsx";
import { UserProvider } from "./context/user-context.jsx";
import { CartProvider } from "./context/cart-context.jsx";
import { FilterProvider } from "./context/filter-context.jsx";
import { ThemeProvider, ModalToast, AuthProvider } from "./context/index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
  <AuthProvider>
  <ModalToast>
  <UserProvider>
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </UserProvider>
  </ModalToast>
  </AuthProvider>
  </ThemeProvider>
);
