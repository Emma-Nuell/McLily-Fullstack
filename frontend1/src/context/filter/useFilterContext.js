import { useContext } from "react";
import FilterContext from "./FilterContext";

const useFilterContext = () => useContext(FilterContext);

export default useFilterContext;
