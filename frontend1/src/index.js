import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { ProductsProvider } from "./context/product-context.js";
import { UserProvider } from "./context/user-context.js";
import { CartProvider } from "./context/cart-context.js";
import { FilterProvider } from "./context/filter-context.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </UserProvider>
);
