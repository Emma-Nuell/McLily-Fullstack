import React from "react";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import styled from "styled-components";


const Stars = ({ stars, reviews }) => {
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
        {tempStars} {stars}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .stars {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .stars span {
    color: #ffb900;
    font-size: 0.8rem;
    margin-right: 0.1rem;
    display: flex;
    align-items: center;
  }
`;
export default Stars;
