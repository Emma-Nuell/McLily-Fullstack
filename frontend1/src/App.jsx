import { Navbar, Sidebar, Footer } from "./components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";
import {
  AuthWrapper,
  Cart,
  Checkout,
  Error,
  Favourite,
  Home,
  PrivateRoute,
  Products,
  Profile,
  SingleProduct,
  Preorder,
  AuthPage,
  Legal,
  SearchPage
} from "./pages";
import {
  AccountManagement,
  AddressForm,
  AddressPage,
  Help,
  OrderDetail,
  Orders,
  ProductRating,
  ProfileNavbar,
  Ratings,
  Wishlist,
} from "./components/profile";
import { ScrollToTop } from "./components/index.js";
import React from "react";

const AppContent = () => {
  const location = useLocation();
  const hiddenNavbarRoutes = [
    "/cart",
    "/auth",
    "/profile/orders",
    "/profile/orders/:orderId",
    // "/profile/ratings",
    "/profile/addresses",
    "/profile/addresses/new",
    "/profile/addresses/:addressId",
    "/legal",
   
  ];
  const hiddenFooterRoutes = [
    "/products/:id",
    "/cart",
    "/profile",
    "/profile/orders",
    "/profile/orders/:orderId",
    "/profile/ratings",
    "/profile/ratings/:productId",
    "/profile/addresses",
    "/profile/addresses/new",
    "/profile/addresses/:addressId",
    "/profile/wishlist",
    "/profile/help",
     "/search",
  ];
  const shouldHideFooter = hiddenFooterRoutes.some((route) =>
    matchPath(route, location.pathname)
  );
  return (
    <>
      {!hiddenNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Sidebar />
      <ScrollToTop />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/auth' element={<AuthPage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/category/:category' element={<Products />} />
        <Route path='/products/category/:category/:subCategory' element={<Products />} />
        <Route path='/products/subcategory/:subcategory' element={<Products />} />
        <Route path='/products/all/:allSubCategory' element={<Products />} />
        <Route path='/products/suprise-me' element={<Products />} />
        <Route path='/products/:productId' element={<SingleProduct />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<Orders />} />
        <Route path='/profile/orders/:orderId' element={<OrderDetail />} />
        <Route path='/profile/wishlist' element={<Wishlist />} />
        <Route path='/profile/addresses' element={<AddressPage />} />
        <Route path='/profile/addresses/new' element={<AddressForm />} />
        <Route path='/profile/addresses/:addressId' element={<AddressForm />} />
        <Route path='/profile/ratings' element={<Ratings />} />
        <Route path='/profile/ratings/:productId' element={<ProductRating />} />
        <Route path='/profile/account' element={<AccountManagement />} />
        <Route path='/profile/help' element={<Help />} />
        <Route path='/favourite' element={<Favourite />} />
        <Route path='/preorder' element={<Preorder />} />
        <Route path='/legal' element={<Legal />} />
        <Route path='*' element={<Error />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
export default App;
