import styled from "styled-components"
import { PageHero, ProductList, Sort } from "../components"

const ProductsPage = () => {
  return (
    <main>
      <PageHero title="products" />
      <Wrapper>
        <div className="section-center products">
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div``
export default ProductsPage