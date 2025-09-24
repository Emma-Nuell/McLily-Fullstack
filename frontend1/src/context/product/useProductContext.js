import { useContext } from "react";
import ProductsContext from "./ProductContext";

const useProductsContext = () => useContext(ProductsContext);

export default useProductsContext;
