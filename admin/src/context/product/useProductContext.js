import { useContext } from "react";
import ProductsContext from "./ProductContext";

const useProductContext = () => useContext(ProductsContext);

export default useProductContext;