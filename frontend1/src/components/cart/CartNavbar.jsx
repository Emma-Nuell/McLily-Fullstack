import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
// import { list } from "../utils/constants.jsx";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Home, User, Package } from "lucide-react";
import { useCartContext } from "../../context";

const CartNavbar = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const navigate = useNavigate();
  const { total_items } = useCartContext();

  const handleBack = () => {
    navigate(-1);
  };

  const toggleList = () => {
    setIsListVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest(".dropdown-list") &&
      !e.target.closest(".right button")
    ) {
      setIsListVisible(false);
    }
  };

  useEffect(() => {
    if (isListVisible) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isListVisible]);

  const list = [
    { name: "Home", url: "/", icon: <Home size={18} /> },
    { name: "Products", url: "/products", icon: <Package size={18} /> },
    { name: "Profile", url: "/profile", icon: <User size={18} /> },
  ];

  return (
    <nav className='bg-white w-full min-h-30 flex items-center dark:bg-surface py-4 px-5 shadow-sm fixed border-b border-gray-200 dark:border-gray-800 top-0 z-50 mb-2'>
      <div className='flex justify-between items-center w-full'>
        {/* Left side - Back button and title */}
        <div className='flex items-center gap-8'>
          <button
            onClick={handleBack}
            className='bg-transparent border-none text-lg cursor-pointer flex items-center justify-center text-text hover:text-text-secondary transition-colors'
          >
            <FaArrowLeft />
          </button>
          <p className='text-lg  text-text'>Cart({total_items})</p>
        </div>

        {/* Right side - Dropdown menu */}
        {/* dont remove classname */}
        <div className='relative right'>
          <button
            onClick={toggleList}
            className='bg-transparent border-none flex items-center justify-center text-lg cursor-pointer text-text hover:text-text-secondary transition-colors'
          >
            <BsThreeDotsVertical />
          </button>

          {/* Dropdown List */}
          {/* dont remove class name */}
          {isListVisible && (
            <div className='dropdown-list absolute top-19 right-0 bg-surface shadow-md rounded-md overflow-hidden z-53 w-70 animate-fadeIn border-primary-200 dark:border-gray-700 border'>
              <ul className='list-none m-0 p-0'>
                {list.map((link, index) => (
                  <li
                    key={index}
                    className='border-b border-primary-200 dark:border-gray-600 last:border-b-0'
                  >
                    <Link
                      to={link.url}
                      className='flex items-center gap-3 px-4 py-2 text-text hover:text-text-secondary transition-colors w-full'
                      onClick={() => setIsListVisible(false)}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CartNavbar;
