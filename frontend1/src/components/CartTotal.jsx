import styled from "styled-components"
import { useCartContext } from "../context/cart-context";
import { formatPrice } from "../utils/helpers";


const CartTotal = () => {
  const {total_amount} = useCartContext()
  return (
    <Wrapper className="shu">
      <h5>Cart Summary</h5>
      <div className="info">
        <div className="total">
          <p>Subtotal:</p>
          <p>{formatPrice(total_amount)}</p>
        </div>
        <p className="deliver">Delivery fees not included yet</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: transparent;
  h5 {
    text-transform: uppercase;
    color: grey;
    margin-bottom: 0.5rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    background: var(--white);
    gap: 10px;
    padding: 10px 0;
    margin-bottom: 15px;
    p {
      margin-bottom: 0;
    }
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    width: 100%;
  }

  .deliver {
    color: grey;
    font-size: 0.8rem;
  }
`;
export default CartTotal