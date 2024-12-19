import styled from "styled-components"
import "../test.css"



const About = () => {
  return (
    <Wrapper>
      <div className="about">
        <div className="title">
          <h1>Our Story</h1>
          <div className="underline"></div>
        </div>
        <div className="info">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae accusamus animi eum aliquam facilis quas pariatur, fugit labore ea perspiciatis cupiditate soluta officia facere sequi debitis, aperiam optio laborum consectetur tempore placeat maxime, tempora ratione? Asperiores aut laborum dolore totam nobis officiis. Alias temporibus necessitatibus voluptatum ad tenetur totam beatae!
        </div>
     </div>
   </Wrapper>
  )
}

const Wrapper = styled.section`
background: var(--white);
padding: 10px 10px;
margin: 15px 0;
`
export default About