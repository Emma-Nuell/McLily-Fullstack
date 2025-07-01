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
  Login
} from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
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
                  <Route path='/upload' element={<ExcelUpload />} />
                  <Route path='/notifications' element={<Notifications />} />
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
