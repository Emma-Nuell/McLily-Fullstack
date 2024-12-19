import { Link } from "react-router-dom"
import styled from "styled-components"
import { products } from "../utils/constants"

const PageHero = ({title, product}) => {
  return (
      <Wrapper>
          <div className="section-center">
              <h3>
                  <Link to="/">Home</Link>
                  {product && <Link to ="/products">/Products</Link>}/{title}
              </h3>
          </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  background: var(--color-6);
  width: 100%;
  min-height: 16vh;
  display: flex;
  align-items: center;
  color: var(--color-2);
  .section-center {
  display: flex;
  align-items: center;
  }
  h3 {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    max-width: 100%;
  }
  a {
    color: var(--color-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--color-1);
  }
`;
export default PageHero