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
import "../test.css"


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


`
export default SingleProductPage