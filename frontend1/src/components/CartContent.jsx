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
        <CartTotal />
          <CartColumn />
          <Checkoutslide />
    </Wrapper>

  )
}

const Wrapper = styled.section``
export default CartContent