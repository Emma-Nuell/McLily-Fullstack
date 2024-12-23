import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import Stars from "./Stars";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Gridview = ({ products }) => {
  return (
    <Wrapper>
      <div className='products-container'>
        {products.map((product) => {
          const { name, id, price, ratings, images } = product;
          return (
            <Link to={`/products/${id}`} key={id} className="link">
              <article className='product'>
                <div className='img-container'>
                  <img src={images[0]} alt={name} />
                </div>
                <div className='details'>
                  <h4>{name}</h4>
                  <Stars stars={ratings.average} reviews={ratings.reviews} />
                  <p className='price'>{formatPrice(price)}</p>
                  <div className="btn-container">

                  <button className='btn' type='button'>
                    <FaCartPlus /> Add To Cart
                  </button>
                  </div>
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
  .products-container {
    display: grid;
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    gap: 10px;
    row-gap: 10px;
  }
  .product {
    width: 100%;
    background-color: var(--white);
    box-shadow: var(--dark-shadow);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    border-radius: 7px;
    height: 280px;
    border: 0.5px solid var(--color-3);
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45%;
    overflow: hidden;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: block;
    border-radius: 7px 7px 0 0;
  }

  .details {
    width: 100%;
    padding: 10px;
    height: 53%;
  }
  .details p {
    margin-bottom: 0.5rem;
  }

  .details h4 {
    margin-bottom: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
  .btn-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;
export default Gridview;
