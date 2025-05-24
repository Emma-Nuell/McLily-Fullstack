import { useContext } from "react";
import OrdersContext from "./OrderContext";

const useOrderContext = () => useContext(OrdersContext);

export default useOrderContext