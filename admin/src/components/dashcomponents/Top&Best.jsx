import { BestSellers, TopProducts, FeaturedProducts } from "./index"

const TopBest = () => {
  return (
    <div className=' mt-12 grid grid-cols-3 max-md:grid-cols-1 gap-6'>
      <BestSellers />
      <TopProducts/>
      <FeaturedProducts />
    </div>
  );
}
export default TopBest