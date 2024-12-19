import { Navbar, Sidebar, Footer } from "./components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthWrapper, Cart, Checkout, Error, Favourite, Home, PrivateRoute, Products, Profile, SingleProduct, Preoder } from "./pages"


const App = () => {
  return (
      <Router>
    <Navbar />
    <Sidebar />
          <Routes>
          <Route exact path= "/" element= {<Home />} />
          <Route  path= "/products" element= {<Products />} />
          <Route  path= "/products/:id" element= {<SingleProduct />} />
          <Route  path= "/cart" element= {<Cart />} />
          <Route  path= "/checkout" element= {<Checkout />} />
          <Route  path= "/profile" element= {<Profile />} />
          <Route  path= "/favourite" element= {<Favourite />} />
          <Route  path= "/preorder" element= {<Preoder />} />
          <Route  path= "*" element= {<Error />} />
          </Routes>  
          <Footer />
      </Router>

  )
}
export default App