import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import styled from "styled-components";
import { list } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCartContext } from "../context/cart-context";


const CartNavbar = () => {
  const [isListVisible, setIsListVisible] = useState(false)
  const navigate = useNavigate()
  const {total_items} = useCartContext()

  const handleBack = () => {
    navigate(-1)
  }
  const toggleList = () => {
    setIsListVisible((prev) => !prev)
  }
  const handleClickOutside = (e) => {
    if (!e.target.closest(".list") && !e.target.closest(".right button")) {
      setIsListVisible(false)
    }
  }
  React.useEffect(() => {
    if (isListVisible) {
      window.addEventListener("click", handleClickOutside)
    } else {
      window.removeEventListener("click", handleClickOutside)
    }
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [isListVisible])
  return (
    <Wrapper>
      <div className='container'>
        <div className='left'>
          <button onClick={handleBack}>
            <FaArrowLeft />{" "}
          </button>
          <p>Cart({total_items})</p>
        </div>
        <div className="right">
          <button onClick={toggleList}>
            <BsThreeDotsVertical /></button>
          {isListVisible && (
            <div className="list">
            {list.map((link, index) => (
                <ul key={index}>
                  <li >
                    <Link to={link.url}>{link.icon} {link.name}</Link>
                  </li>
                  </ul> 
            )
                )
              }
          </div>
              )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
    background-color: var(--white);
    padding: 1rem;
    box-shadow: var(--light-shadow);
    height: 3rem;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    margin-bottom: 0.8rem;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 99%;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .left button {
    background: none;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left p {
    margin-left: 0.5rem;
    font-size: 1.1rem;
    margin-bottom: 0;
  }

  .right {
    position: relative;
  }

  .right button {
    background: none;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .list {
    display: block;
    position: fixed;
    top: 5px;
    right: 1rem;
    background-color: #fff;
    box-shadow: var(--light-shadow);
    border-radius: 2px;
    overflow: hidden;
    z-index: 10;
    color: black;
  }

  .list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .list li {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--color-5);
    display: flex;
    align-items: center;
  }
  .list li a {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 7px;
    justify-content: flex-start;
    width: 100%;
  }
`;
export default CartNavbar;
