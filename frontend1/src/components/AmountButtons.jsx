import { FaMinus, FaPlus } from "react-icons/fa"
import styled from "styled-components"

const AmountButtons = ({increase, decrease, amount}) => {
  return (
      <Wrapper className="amount-btns">
          <button type="button" className="amount-btn btn" onClick={decrease}><FaMinus /></button>
          <h4 className="amount">{amount}</h4>
          <button type="button" className="amount-btn btn" onClick={increase}><FaPlus /></button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  h4 {
    margin-bottom: 0;
    font-weight: bold;
  }
`;
export default AmountButtons