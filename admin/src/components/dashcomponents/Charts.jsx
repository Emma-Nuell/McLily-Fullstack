import ChartCard from "./ChartCard";
import { ShoppingCart, Users, DollarSign, User } from "lucide-react";

const Charts = () => {
  return (
    <div className='grid grid-cols-2 max-md:grid-cols-1 gap-6'>
      <ChartCard
        title='Total Sales'
        value='125,000'
        percentage={+12.4}
        data={[20000, 50000, 7000, 100000, 30000, 80000, 100000]}
        icon={<ShoppingCart />}
        color='#10b981'
      />
      <ChartCard
        title='Total Visitors'
        value='1237'
        percentage={+20.4}
        data={[30000, 5000, 10000, 95000, 70000, 50000, 90000]}
        icon={<Users />}
        color='#3b82f6'
      />
      <ChartCard
        title='Orders Paid'
        value='76,000'
        percentage={-1.4}
        data={[70000, 10000, 9000, 100000, 20000, 90000, 52000]}
        icon={<DollarSign />}
        color='#f97316'
      />
      <ChartCard
        title='Registered Users'
        value='437'
        percentage={+42.4}
        data={[25000, 40000, 17000, 43000, 10000, 90000, 70000]}
        icon={<User />}
        color='#94a3b8'
      />
    </div>
  );
};
export default Charts;
