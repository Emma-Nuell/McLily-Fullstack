import { useFilterContext } from "../context/filter-context"
import Gridview from "./Gridview"
import Listview from "./Listview"

const ProductList = () => {
    const {filtered_products: products, grid_view} = useFilterContext()
    if (products.length < 1) {
        return (
            <h5>Sorry, no product matched your search...</h5>
        )
    }
    if (grid_view === false) {
        return (
            <Listview products= {products} />
        )
    }
  return (
  <Gridview products={products}>product list</Gridview>
  )
}
export default ProductList