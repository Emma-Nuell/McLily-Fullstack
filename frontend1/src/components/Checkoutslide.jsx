import { FaPhoneAlt } from "react-icons/fa"
import styled from "styled-components"
import { formatPrice } from "../utils/helpers"
import { useCartContext } from "../context/cart-context"

const Checkoutslide = () => {
  const {total_amount} = useCartContext()
  return (
    <Wrapper>
      <button className="btn home">
      <FaPhoneAlt />
      </button>
      <button className="checkout btn">
         Checkout({formatPrice(total_amount)})
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: var(--white);
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 7fr;
  gap: 5px;
  box-shadow: var(--light-shadow);
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 1rem;
  }
  .btn:active {
    background: var(--maincolor-4);
  }

  .home{
    background: none;
    border: 1.5px solid var(--maincolor-4);
  }
`;
export default Checkoutslide