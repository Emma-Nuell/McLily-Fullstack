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
                <Link to={`/products/${id}`} key={id} className="link">
                  <article className="product">
                    <div className="img-container">
                    <img src={images[0]} alt={name} />
                    </div>
                    <div className="details">
                      <h4>{name}</h4>
                      <h5 className='price'>{formatPrice(price)}</h5>
                      <p>{description.substring(0, 60)}...</p>
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
    row-gap: 1.5rem;
    aliggn-items: center;
    grid-template-columns: repeat(auto, minmax(300px, 1fr));
    
.link {
width: 95%
}
  .product {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    box-shadow: var(--dark-shadow);
    padding: 0.3rem;
  }
    .img-container {
    height: 100%;
    width: 37%;
    }

  img {
    display: block;
   height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 60%;
      p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  }


  h4 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .price {
    margin-bottom: 0.75rem;
  }



  .shop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
    
    P {
    display: flex:
    align-items: center;
    color: orange;
    margin-bottom: 0;
    }
  .btn {
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 0.4rem;
  }
  }
`;
export default Listview