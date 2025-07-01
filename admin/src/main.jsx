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
  GlobalProvider,
  AuthProvider,
} from "./context/index.js";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
              <ModalToast>
      <ProductsProvider>
        <OrdersProvider>
          <GlobalProvider>
            <NotificationProvider>
                <Background>
                  <App />
                </Background>
            </NotificationProvider>
          </GlobalProvider>
        </OrdersProvider>
      </ProductsProvider>
              </ModalToast>
    </AuthProvider>
  </ThemeProvider>
);
