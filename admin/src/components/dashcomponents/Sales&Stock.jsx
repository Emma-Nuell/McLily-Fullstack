import SalesByCategory from "./SalesByCategory"
import LowStock from "./LowStock";

const SalesStock = () => {
  return (
    <div className='grid grid-cols-[auto_1fr] max-md:grid-cols-1 gap-6 mt-12'>
      <SalesByCategory
        value='125000'
        percent={+12.4}
        data={[20000, 50000, 7000, 100000, 30000]}
      />
      <LowStock />
    </div>
  );
}
export default SalesStock