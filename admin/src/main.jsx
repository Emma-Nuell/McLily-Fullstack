import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Background } from "./components";
import {
  ProductsProvider,
  ThemeProvider,
  NotificationProvider,
  ModalToast,
  OrdersProvider,
} from "./context/index.js";

createRoot(document.getElementById("root")).render(
    <ProductsProvider>
      <OrdersProvider>
        <ThemeProvider>
          <NotificationProvider>
            <ModalToast>
              <Background>
                <App />
              </Background>
            </ModalToast>
          </NotificationProvider>
        </ThemeProvider>
      </OrdersProvider>
    </ProductsProvider>
  
);
