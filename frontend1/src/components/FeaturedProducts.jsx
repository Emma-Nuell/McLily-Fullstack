import styled from "styled-components";
import { useProductContext } from "../context/product-context";
import Loading from "./Loading";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const { featuredProducts: featured } = useProductContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  
  

  useEffect(() => {
    if (isInteracting) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featured.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featured, isInteracting]);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featured.length),
    onSwipedRight: () =>
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? featured.length - 1 : prevIndex - 1
      ),
    onTouchStart: () => setIsInteracting(true),
    onTouchEnd: () => setIsInteracting(false),
  });
  if (!featured || featured.length === 0) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <div className='slideshow' {...handlers}>
        <div className="img-container">  
     <img src={featured[currentIndex].images[0]} alt={featured[currentIndex].name} />
        </div>
      </div>
      <div className='indicators'>
        {featured.map((_, index) => {
          return <button key={index} className={`indicator ${index === currentIndex ? "active" : ""}`} onClick={(() => setCurrentIndex(index))}></button>;
          
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
background: var(--white);
width: 90%;
margin: 10px auto;
border-radius: 4px;
padding-bottom: 10px;

  .slideshow {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    overflow: hidden;
    touch-action: pan-y;
    max-width: 100%;
  }
  .img-container {
    position: relative;
    width: 90%;
    height: 90%;
    border-radius: 10px;
    max-width: 500px;
    background: var(--white);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    transition: (--transition);
  }
  .indicators {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  .indicator {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
    transition: background 0.3s;
    border: none;
    background-color: #ccc;
    cursor: pointer;
  }
  .indicator.active {
    background: var(--maincolor-4);
  }
`;
export default FeaturedProducts;
