import { useState } from "react"
import styled from "styled-components"

const ProductImages = ({images = []}) => {
    const [main, setMain] = useState(images[0])
    
  return (
      <Wrapper>
          <img src={main} alt="image" className="main" />
          <div className="gallery">
              {images.map((image, index) => {
                  return  <img src={image} alt="image" key = {index} className = {`${image === main ? "active" : null}`} onClick={() => setMain(images[index])} />
                  
              }) }
          </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
background: #fcfcfc;
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    overflow-x: auto;
    white-space: nowrap;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .gallery::-webkit-scrollbar {
    height: 0.5rem;
  }
  .gallery::-webkit-scrollbar -thumb {
  background: var(--color-5);
  border-radius: 8px;
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--color-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;
export default ProductImages