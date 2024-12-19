import styled from "styled-components"

const PreorderPage = () => {
  return (
      <Wrapper>
          <div className="section section-center page-100">
              <h5>Preoder some our latest goods to be the among the first to get hands on them when the arrive</h5>
          </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
background: var(--white);
text-align: center;
margin: 10px 0;
`
export default PreorderPage