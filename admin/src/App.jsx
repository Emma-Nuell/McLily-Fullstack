import { Layout, ProtectedRoute } from "./components";
import {
  AddProduct,
  Admin,
  AllProducts,
  ExcelUpload,
  NewArrival,
  Notifications,
  OrderDetails,
  Orders,
  Error,
  Login,
  PhysicalSalesForm,
  StockPriceEdit,
  PhysicalOrderDetails
} from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ScrollToTop} from "./components/index.js"

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route
          exact
          path='/*'
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route exact path='/' element={<Admin />} />
                  <Route path='/products' element={<AllProducts />} />
                  <Route path='/add-product' element={<AddProduct />} />
                  <Route path='/orders' element={<Orders />} />
                  <Route path='/orders/:id' element={<OrderDetails />} />
                  <Route path='/new-arrival' element={<NewArrival />} />
                  <Route path='/upload' element={<PhysicalSalesForm />} />
                  <Route path='/notifications' element={<Notifications />} />
                  <Route path='/details' element={<PhysicalOrderDetails />} />
                  <Route path='/edit' element={<StockPriceEdit />} />
                  <Route path='*' element={<Error />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
