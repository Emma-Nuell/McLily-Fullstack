import styled from "styled-components"
import { Link } from "react-router-dom"
import { formatPrice } from "../utils/helpers"
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import {
  FaCartPlus,
} from "react-icons/fa";

const Listview = ({products}) => {
  return (
      <Wrapper>
          {products.map((product) => {
              const { name, price, id, description, images, ratings } = product
              const tempStars = Array.from({ length: 5 }, (_, index) => {
                const number = index + 0.5;
                return (
                  <span key={index}>
                    {ratings.average >= index + 1 ? (
                      <BsStarFill />
                    ) : ratings.average >= number ? (
                      <BsStarHalf />
                    ) : (
                      <BsStar />
                    )}
                  </span>
                );
              });
              return (
                <Link to={`/products/${id}`} key={id}>
                  <article className="product">
                    <img src={images[0]} alt={name} />
                    <div className="details">
                      <h4>{name}</h4>
                      <h5 className='price'>{formatPrice(price)}</h5>
                      <p>{description.substring(0, 150)}...</p>
                      <div className="shop">
                        <p>{tempStars}</p>
                        <button type='button' className='btn'>
                          <FaCartPlus /> Add To Cart
                        </button>
                      </div>
                    </div>
                  </article>
                </Link>
              );
      })}
      </Wrapper>
  )
}

const Wrapper = styled.section`
    display: grid;
    row-gap: 3rem;
    grid-template-columns: repeat(auto, minmax(320px, 1fr));
  .product {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    gap: 10px;
    box-shadow: var(--light-shadow);
  }
  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  img {
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: cover;
  }

  h4 {
    margin-bottom: 0.5rem;
  }

  .price {
    margin-bottom: 0.75rem;
  }

  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }

  .btn {
    font-size: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  .shop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;
export default Listview