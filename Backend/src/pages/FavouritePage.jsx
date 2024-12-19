import styled from "styled-components"
import { Link } from "react-router-dom"

const FavouritePage = () => {
  return (
    <Wrapper>
      <div className="section section-center page-100">
        <h4>Add products you like to your favourite list to have easy access to them whenever you visit our website</h4>
        <Link className="btn">Login</Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
background: var(--white);
text-align: center;
margin: 10px 0;
`
export default FavouritePage