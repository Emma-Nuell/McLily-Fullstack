import styled from "styled-components"
import { Link } from "react-router-dom"

const ProfilePage = () => {
  return (
    <Wrapper>
      <div className="section section-center page-100">
        <h5>Create an account with us and enjoy a seamless shopping experince personalised to your needs </h5>
        <Link className="btn">Login</Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
background: var(--white);
margin: 10px 0;
text-align: center;
`
export default ProfilePage