import { PageHero } from "../components"
import {ProductList, Sort} from "../components/products"
import React from "react"

const ProductsPage = () => {
  return (
    <main className = "bg-background-white">
      <PageHero title="products" />
      <div className="">
        <div className="">
          <div className = "">
            <Sort />
            <ProductList />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductsPage