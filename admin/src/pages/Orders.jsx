import { useEffect, useState } from "react";
import { AllOrders, PendingOrders, RecentOrders, CompletedOrders } from "../components/ordercomponents";
import { useOrderContext } from "../context/index.js";
import { useSearchParams } from "react-router-dom";
import {ErrorAlert} from "../components/index.js"


const Orders = () => {
  const { searchTerm, error, clearError } = useOrderContext();
  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const [searchParams, setSearchParams] = useSearchParams()
  
const view = searchParams.get("view")

  
  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchInput(search);
    }
  }, [searchParams, setSearchParams]);

   if (error) {
      return <ErrorAlert message={error} clearError = {clearError} />;
    }

  return (
    <div className='p-6'>
      <PendingOrders />
      <RecentOrders />
      <CompletedOrders />
      <AllOrders
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        scrollIntoView={view === "all"}
      />
    </div>
  );
};
export default Orders;
