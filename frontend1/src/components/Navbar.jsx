import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaRegUser,
} from "react-icons/fa";
import "../test.css";
import { useProductContext } from "../context/product-context";
import { useCartContext } from "../context/cart-context";

const Navbar = () => {
  const { openSidebar } = useProductContext()
  const {total_items} = useCartContext()
  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='navtop'>
          <div className='left'>
            <button type='button' className='nav-toggle' onClick={openSidebar}>
              <FaBars />
            </button>
            <Link to='/'>
              <h1 className='logo'>
                <span>M</span>c<span>L</span>ily
              </h1>
            </Link>
          </div>
          <div className='right'>
            <Link to="/profile">
              <FaUser />
            </Link>
            <Link to='/cart'>
              <span className='cart-container'>
                <FaShoppingCart />
                <span className='cart-value'>{total_items}</span>
              </span>
            </Link>
          </div>
        </div>
        <div className='navdown'>
          <div className='search-container'>
            <input
              type='search'
              className='search-bar'
              placeholder="I'm searching for..."
            />
            <button type='button' className='search-icon'>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 6rem;
  background: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 0;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .navtop {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
    margin-bottom: 5px;
    h1 {
      font-size: 2rem;
      margin: 0;
      color: var(--black);
      font-weight: 700;
    }
      button {
      display: flex;
      align-items: center;
      justify-content: center;
      }
    span {
      color: var(--black);
    }
  }
  .nav-toggle {
    background: transparent;
    border: none;
    font-size: 1.7rem;
    color: var(--black);
    cursor: pointer;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-size: 1.5rem;
    padding-right: 10px;
    svg {
      color: var(--black);
    }
    link {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .cart-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--color-5);
    color: var(--black);
    font-size: 0.75rem;
    height: 16px;
    width: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 10px;
  }

  .navdown {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-container {
    width: 100%;
    flex-grow: 1;
    position: relative;
  }

  .search-bar {
    width: 100%;
    padding: 7px 15px;
    padding-right: 65px;
    border-radius: 50px;
    border: 2px solid black;
    outline: none;
    font-size: 1rem;
    font-weight: 400;
  }

  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    font-size: 1.25rem;
    width: 50px;
    height: 28px;
    border-radius: 15px;
    background-color: var(--color-5);
    color: var(--black);
  }
`;
export default Navbar;
