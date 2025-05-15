import { AllOrders, PendingOrders, RecentOrders, CompletedOrders } from "../components/ordercomponents";


const Orders = () => {

  return (
    <div className = "p-6" >
       <PendingOrders />
       <RecentOrders />
      <CompletedOrders /> 
      <AllOrders />
    </div>
  );
};
export default Orders;
