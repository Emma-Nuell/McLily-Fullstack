import { FaTrash } from "react-icons/fa"
import styled from "styled-components"
import AmountButtons from "./AmountButtons"
import { formatPrice } from "../utils/helpers"
import { useCartContext } from "../context/cart-context"
import { Link } from "react-router-dom"
import "../test.css";

const Cartitem = ({ id, name, brand, size, price, stock, amount, image, old }) => {
    const {removeItem, toggleAmount} = useCartContext()
  const increase = (e) => {
    e.preventDefault()
      e.stopPropagation()
        toggleAmount(id, "inc")
    }
  const decrease = (e) => {
    e.preventDefault();
      e.stopPropagation();
        toggleAmount(id, "dec")
  }
  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation()
    removeItem(id)
  }
  return (
    <Wrapper>
      <Link className='link' to={`/products/${old}`}>
        <div className='main'>
          <div className='image-container'>
            <img src={image} alt={name} />
          </div>
          <div className='info'>
            <h5 className="name">{name}</h5>
            <p>
              <span>Brand:</span> {brand}
            </p>
            {size && 
            <p>
              <span>Size:</span> {size}
            </p>
}
            <p className='price'>
              <span>Price:</span> {formatPrice(price)}
            </p>
            {stock > 20 ? (
              <p className='units stock'>In stock</p>
            ) : stock > 10 ? (
              <p className='units few'>few units left</p>
            ) : (
              <p className='units lack'>{stock} units left!</p>
            )}
            <h5 className='sub-total price'>
              Sub-total: {formatPrice(amount * price)}
            </h5>
          </div>
        </div>
        <div className='buttons'>
          <button className='remove-btn btn' onClick={handleRemove}>
            {" "}
            <FaTrash /> Remove
          </button>
          <AmountButtons
            amount={amount}
            increase={(e) => increase(e)}
            decrease={(e) => decrease(e)}
          />
        </div>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.article`
    width: 100%;
    background: var(--white);
    border-radius: 7px;
    box-shadow: var(--light-shadow);
  .link {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0.3rem;
    height: auto;
    width: 100%;
  }

  .main {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: flex-start;
    gap: 10px;
    span {
      color: grey;
    }

    p {
      color: var(--maincolor-4);
      margin-bottom: 0;
      font-size: 0.8rem;
    }
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.1rem;
    color: var(--black);
    .info {
    white-space: wrap;
    }
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
  .sub-total {
    color: grey;
    font-size: 0.9rem;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 0.8rem;
  }

  .remove-btn {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
  }
`;
export default Cartitem