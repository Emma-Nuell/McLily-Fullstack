import React from "react";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import styled from "styled-components";

const Stars1 = ({ stars, reviews }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <Wrapper>
      <div className='stars'>
        {tempStars}
         ({reviews} customer reviews)
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.7rem;
  .stars {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 0.7rem;
  }
  .stars span {
    color: #ffb900;

    margin-right: 0.1rem;
    display: flex;
    align-items: center;
  }
`;
export default Stars1;
