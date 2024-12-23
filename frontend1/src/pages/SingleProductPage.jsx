import { useNavigate, useParams, Link } from "react-router-dom"
import { useProductContext } from "../context/product-context"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { PageHero, ProductImages, Stars, Stars1 } from "../components"
import { formatPrice } from "../utils/helpers"
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import {
  FaRegCheckCircle,
  FaHome,
  FaRegHeart,
  FaHeart,
  FaCartPlus,
} from "react-icons/fa";


const SingleProductPage = () => {
  const { id } = useParams() 
  // const navigate = useNavigate()
  const { fetchSingleProduct, single_product: product } = useProductContext()
  const [size, setSize] = useState(null)

  useEffect(() => {
  fetchSingleProduct(id)
}, [id])

  const {
    name = "Loading...",
    images = [
      "https://www.course-api.com/images/store/product-6.jpeg",
      "https://www.course-api.com/images/store/extra-product-1.jpeg",
      "https://www.course-api.com/images/store/extra-product-2.jpeg",
      "https://www.course-api.com/images/store/extra-product-3.jpeg",
      "https://www.course-api.com/images/store/extra-product-4.jpeg",
    ],
    sizes = [
      {
        size: "40",
        stock: 10,
      },
      {
        size: "41",
        stock: 8,
      },
      {
        size: "42",
        stock: 6,
      },
      {
        size: "44",
        stock: 4,
      },
      {
        size: "45",
        stock: 10,
      },
    ],
    description = "Loading...",
    price,
    brand,
    stock,
    ratings = { average: 4.6, reviews: 75 },
    specifications = { color: "Red", size: "38", material: "Leather" },
    reviews = [
      {
        userId: "90876",
        comment: "Comfortable and stylish!",
        rating: 5,
        date: "2024-11-15",
      },
    ],
  } = product || {};
  // console.log(specifications);

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className='section section-center page'>
        <div className='product-center'>
          <div className='details'>
            <ProductImages images={images} />
            <h4>{name}</h4>
            <p className='brand'>
              Brand: <span>{brand}</span>
            </p>
            <p className='price'>{formatPrice(price)}</p>
            {stock > 20 ? (
              <p className='units stock'>In stock</p>
            ) : stock > 10 ? (
              <p className='units few'>few units left</p>
            ) : (
              <p className='units lack'>{stock} units left!</p>
            )}
            <Stars1 stars={ratings.average} reviews={ratings.reviews} />
            {stock ? (
              <div className='size'>
                <hr className='grey' />
                <p>Sizes:</p>
                <div className='buttons-cont'>
                  {sizes.map((p, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => setSize(p.size)}
                        className={`${
                          size === p.size ? "size-btn active-size" : "size-btn"
                        }`}
                      >
                        {p.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <hr className='main' />
          <div className='delivery'>
            <h5>Delivery and returns info</h5>
            <hr className='grey' />
            <p>Product is available and can be delivered to your doorstep</p>
          </div>
          <hr className='main' />
          <div className='description'>
            <h5>Product details</h5>
            <hr className='grey' />
            <p>{description}</p>

            <ul>
              {Object.entries(specifications).map(([key, value], index) => (
                <li key={index}>
                  <strong>{key}</strong>: {value}
                </li>
              ))}
            </ul>
          </div>
          <hr className='main' />
          <div className='reviews'>
            <h5>Product Rating & Reviews</h5>
            <p className='rate'>
              <span>{ratings.average}/5</span> ({ratings.reviews} ratings)
            </p>
            <hr className='grey' />
            {reviews.length > 0 ? (
              reviews.map((review, index) => {
                const tempStars = Array.from({ length: 5 }, (_, index) => {
                  const number = index + 0.5;
                  return (
                    <span key={index}>
                      {review.rating >= index + 1 ? (
                        <BsStarFill />
                      ) : review.rating >= number ? (
                        <BsStarHalf />
                      ) : (
                        <BsStar />
                      )}
                    </span>
                  );
                });
                return (
                  <article key={index}>
                    <div className="first">
                      <p>{tempStars}</p>
                      <p>{review.date}</p>
                    </div>
                    <h5>{review.comment}</h5>
                    <div className = "second">
                      <p className = "user">By User {review.userId}</p>
                      <p className = "purchase">
                        <FaRegCheckCircle /> Verified Purchase
                      </p>
                    </div>
                  </article>
                );
              })
            ) : (
              <h5 className="no-rating">No Customer Rating</h5>
            )}
          </div>
          <div className='cart'>
            <div className="button-cont">
            <Link to='/' className='btn home'>
              <FaHome />
            </Link>
            <button className='btn fave'>
              <FaRegHeart />
            </button>
            <button className='btn cart-add'>
              <FaCartPlus /> Add To Cart
            </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  background: var(--white);
  margin-bottom: 2rem;
  .section {
    padding: 1rem 0;
  }
  .details {
  width: 100%;
    h4 {
      text-transform: capitalize;
    }
    p {
      margin-bottom: 0.5rem;
    }

    .brand span {
      color: var(--color-2);
    }

    .units {
      font-size: 0.7rem;
    }

    .stock {
      color: #525151;
    }

    .few {
      color: rgb(199, 131, 4);
    }

    .lack {
      color: red;
    }

    .buttons-cont {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
      gap: 7px;
    }
      .size {
      width: 100%;
      }

    .size-btn {
      background: none;
      outline: none;
      border: 1px solid var(--color-5);
      width: 40px;
      height: fit-content;
      text-align: center;
      cursor: pointer;
      padding: 2px;
      border-radius: 3px;
    }

    .active-size {
      background: var(--color-5);
    }

    hr {
      margin: 3px 0;
    }
    .price {
      font-size: 1.25;
      font-weight: 600;
    }
  }

  .grey {
    border-top: 1px solid rgb(172, 170, 170);
  }

  .main {
    margin: 1rem 0;
  }

  .delivery {
    h5 {
      margin-bottom: 0.4rem;
    }

    hr {
      margin-bottom: 0.5rem;
    }
  }

  .description {
    h5 {
      margin-bottom: 0.4rem;
    }

    hr {
      margin-bottom: 0.5rem;
    }

    li strong {
      text-transform: capitalize;
    }

    p {
      margin-bottom: 0.5rem;
    }
  }

  .reviews {
    h5 {
      margin-bottom: 0.1rem;
    }

    .rate {
      font-size: 0.7rem;
      color: rgb(27, 27, 27);
      font-weight: light;
      margin-bottom: 0.7rem;
    }

    .rate span {
      border: 0.5px solid var(--color-5);
      padding: 0.1rem;
    }

    article {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 0.3rem;
      border-bottom: 1.5px solid grey;
      gap: 3px;
    }

    article p {
      margin-bottom: 0.3rem;
    }

    article h5 {
      margin-bottom: 0.3rem;
    }

    article div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
    }

    .first {
      font-size: 0.7rem;
      margin-bottom: 0;
    }

    .second {
      display: flex;
    }

    .user {
      font-size: 0.7rem;
    }

    .purchase {
      color: green;
      font-size: 0.8rem;
    }

    .no-rating {
      text-align: center;
    }
  }

  .cart {
    background: var(--white);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    z-index: 50;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--maincolor-4);

    .button-cont {
      width: 85%;
      display: grid;
      grid-template-columns: 1fr 1fr 4fr;
      gap: 5px;
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      font-size: 1rem;
    }
    .btn:active {
      background: var(--maincolor-4);
    }

    .home,
    .fave {
      background: none;
      border: 1.5px solid var(--maincolor-4);
    }
  }
`;
export default SingleProductPage