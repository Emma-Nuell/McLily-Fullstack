import styled from "styled-components";
import { categories } from "../utils/constants";

const Categories = () => {
  return (
    <Wrapper>
      <div className='title'>
        <h3>Featured Categories</h3>
        <div className='underline'></div>
      </div>
      <div className='categories'>
        {categories.map((category, index) => {
          return (
            <div className='category' key={index}>
              <div className='img-container'>
                <img src={category.image} alt={category.name} />
              </div>
              <h5>{category.name}</h5>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 3px 10px;
  margin-bottom: 10px;
  background: var(--white);
  .title {
    margin: 15px 0;
  }
  .categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 7px;
    text-align: center;
  }

  .category {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }

  .img-container {
    background: var(--maincolor-4);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }

  img {
    max-height: 90%;
    width: 90%;
    object-fit: cover;
  }
  h5 {
    font-size: 0.6rem;
  }
`;
export default Categories;
