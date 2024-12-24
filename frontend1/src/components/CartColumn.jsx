import styled from "styled-components";
import { useCartContext } from "../context/cart-context";
import Cartitem from "./Cartitem";

const CartColumn = () => {
  const { cart, total_items } = useCartContext();
  
  return (
    <Wrapper>
      <h5 className="clap">Cart({total_items})</h5>
      <div className="items">
      {
        cart.map((item) => {
         return <Cartitem key={item.id} {...item} />
        })
      }
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.section`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
  .clap{
    color: grey;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;
export default CartColumn;
