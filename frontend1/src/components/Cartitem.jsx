import { FaTrash } from "react-icons/fa"
import styled from "styled-components"
import AmountButtons from "./AmountButtons"
import { formatPrice } from "../utils/helpers"
import { useCartContext } from "../context/cart-context"

const Cartitem = ({ id, name, brand, size, price, stock, amount, image }) => {
    const {removeItem, toggleAmount} = useCartContext()
    const increase = () => {
        toggleAmount(id, "inc")
    }
    const decrease = () => {
        toggleAmount(id, "dec")
    }
  return (
    <Wrapper>
      <div className='main'>
        <div className='image-container'>
          <img src={image} alt={name} />
        </div>
        <div className='info'>
          <h4>{name}</h4>
          <p>
            <span>Brand:</span> {brand}
          </p>
          <p>
            <span>Size:</span> {size}
          </p>
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
        <button className='remove-btn btn' onClick={() => removeItem(id)}>
          {" "}
          <FaTrash /> Remove
        </button>
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.3rem;
  height: auto;
  .main {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: flex-start;

    span {
      color: grey;
    }

    p {
      color: var(--maincolor-4);
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
  }

  h4,
  h5 {
    margin-bottom: 0;
    text-transform: capitalize;
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
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .remove-btn {
    display: flex;
    align-items: center;
  }
`;
export default Cartitem