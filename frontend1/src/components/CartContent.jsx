import styled from "styled-components"
import { useCartContext } from "../context/cart-context"
import CartNavbar from "./CartNavbar"
import CartTotal from "./CartTotal"
import CartColumn from "./CartColumn"
import Checkoutslide from "./Checkoutslide"

const CartContent = () => {

  return (
    <Wrapper>
      <CartNavbar />
      <section className="sec">
        <CartTotal />
          <CartColumn />
          <Checkoutslide />
      </section>
    </Wrapper>

  )
}

const Wrapper = styled.section`
.sec {
padding: 0 1rem;
}
`
export default CartContent