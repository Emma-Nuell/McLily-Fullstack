import { FaMinus, FaPlus } from "react-icons/fa"
import styled from "styled-components"

const AmountButtons = ({increase, decrease, amount}) => {
  return (
      <Wrapper className="amount-btns">
          <button type="button" className="amount-btn btn" onClick={decrease}><FaMinus /></button>
          <p className="amount">{amount}</p>
          <button type="button" className="amount-btn btn" onClick={increase}><FaPlus /></button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 7px;
  .btn {
  font-size: 0.7rem;
  }
  p {
  font-size: 1rem;
    margin-bottom: 0;
    font-weight: 600;
  }
`;
export default AmountButtons