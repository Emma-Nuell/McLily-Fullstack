import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import Stars from "./Stars";
import { FaCartPlus } from "react-icons/fa";
import {Link} from "react-router-dom";

const Gridview = ({ products }) => {
  return (
    <Wrapper>
      <div className='products-container'>
        {products.map((product) => {
          const { name, id, price, ratings, images } = product;
          return (
            <Link to={`/products/${id}`} key={id}>
              <article className='product'>
                <div className='img-container'>
                  <img src={images[0]} alt={name} />
                </div>
                <div className='details'>
                  <h4>{name}</h4>
                  <Stars stars={ratings.average} reviews={ratings.reviews} />
                  <p className='price'>{formatPrice(price)}</p>
                  <button className='btn' type='button'>
                    <FaCartPlus /> Add To Cart
                  </button>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .product {
    background-color: var(--white);
    box-shadow: var(--dark-shadow);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 7px;
    height: 250px;
    border: 0.5px solid var(--color-3);
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 57%;
    overflow: hidden;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .details {
    width: 100%;
    padding: 10px;
    height: 35%;
  }

  .details h4 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0.5rem;
  }
`;
export default Gridview;
