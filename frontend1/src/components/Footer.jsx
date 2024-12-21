import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy;{new Date().getFullYear()} 
         <span> McLily Stores</span>
      </h5>
      <h5>All Rights Reserved</h5>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background: var(--white);
  height: 5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h5 {
    text-transform: none;
    margin-bottom: 0.1rem;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;
export default Footer;
