import styled from "styled-components"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <Wrapper className="page-100">
      <section>
      <h1>404</h1>
      <h3>Sorry, the page you entered cannot be found</h3>
      <Link to="/" className="btn">Back Home</Link>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
display: flex;
align-items: center;
justify-content: center;
text-align: center;
h1 {
  font-size: 10rem
};
h3 {
 margin-bottom: 2rem
}

`
export default ErrorPage