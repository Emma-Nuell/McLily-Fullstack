import { Star } from "lucide-react"
import { Charts, SalesStock, RecentOrders, TopBest, ProductsOverview } from "../components/dashcomponents";

const Admin = () => {
  return (
    <div className='p-6'>
      <Charts />
      <SalesStock />
      <RecentOrders />
      <TopBest />
      <ProductsOverview />
    </div>
  );
}
export default Admin