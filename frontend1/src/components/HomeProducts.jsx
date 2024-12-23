import styled from "styled-components"
import { useProductContext } from "../context/product-context"
import Stars from "./Stars"
import { formatPrice } from "../utils/helpers"
import {Link} from "react-router-dom"

const HomeProducts = () => {
    const { products } = useProductContext()
  
    
   
  return (
    <Wrapper>
      <div className='title'>
        <h3>Some of our products...</h3>
        <div className='underline'></div>
          </div>
          <div className="products">
              {products.slice(0, 16).map((product) => {
                  const ratings = product.ratings  
                  return (
                      <Link to={`/products/${product.id}`} key={product.id}>
                      <article className="product" >
                          <div className="img-container">
                              <img src={product.images[0]} alt={product.name} />
                          </div>
                          <div className="details">
                              <h5>{product.name}</h5>
                              <Stars stars= {ratings.average} reviews = {ratings.reviews} />
                              <p className="price">{formatPrice(product.price)}</p>
                          </div>
                      </article>
                      </Link>
                  )
              })}
          </div>
          <div className="btn-container"> 
          <Link to ='/products' className="btn">All Products</Link>
          </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding: 10px 10px;
  background: var(--white);
  .title {
  text-align: left;
  }
  .underline {
  margin-left: 20px;
  width: 10rem;
  }
  .products {
    display: grid;
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    gap: 10px;
    margin-top: 20px;
  }

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
    border-radius: 7px 7px 0 0;
  }

  .details {
    width: 100%;
    padding: 10px;
    padding-bottom: 5px;
    height: 40%;
  }

  .details h5 {
  width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0.5rem;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7px 0;
    padding: 10px 0;
    .btn {
    font-size: 0.9rem;
    }
  }
`;
export default HomeProducts