import { Link } from "react-router-dom";
import {  ShoppingCart, Menu, User, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import React from "react";
import SearchBar from "./SearchBar";
import { useCartContext, useProductsContext } from "../context";

const Navbar = () => {
  const { openSidebar } = useProductsContext();
  const { total_items } = useCartContext();

  return (
    <nav className='h-60 bg-white dark:bg-surface text-text flex flex-col items-center justify-center px-0 py-4 sticky top-0 z-50 transition-all duration-300 shadow-sm border-b border-gray-200 dark:border-gray-700'>
      <div className='w-[90vw] mx-auto max-w-[--max-width]'>
        <div className='flex justify-between items-center'>
          {/* Top Navigation /}
          {/ Left side - Logo and Menu Button */}
          <div className='flex items-center gap-4 justify-center mb-2'>
            <button
              type='button'
              className='flex items-center justify-center bg-transparent border-none text-2xl text-text cursor-pointer'
              onClick={openSidebar}
            >
              <Menu size={25} />
            </button>
            <Link to='/'>
              <h1 className='text-3xl text-text font-bold font-comorant'>
                McLily
              </h1>
            </Link>
          </div>

          {/* Right side - User and Cart Icons */}
          <div className='flex justify-center items-center gap-1.5 text-2xl pr-2.5'>
            <ThemeToggle />
            <Link to='/profile' className='flex justify-center items-center'>
              <User className='text-text' size={23} />
            </Link>
            <Link to='/cart' className='flex justify-center items-center'>
              <div className='flex items-center justify-center relative'>
                <ShoppingCart className='text-text' size={23} />
                <span className='absolute -top-4.5 -right-6 bg-primary-400 dark:bg-primary-200 text-text text-xs  flex justify-center items-center rounded-full p-4 py-1.5'>
                  {total_items}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Navigation - Search Bar */}
        <SearchBar />
        {/* <div className='flex justify-center items-center'>
          <div className='w-full flex-grow relative'>
            <input
              type='text'
              className='w-full py-2.5 px-7.5 pr-16 rounded-full border-2 border-text outline-none text-text-secondary font-normal'
              placeholder="I'm searching for..."
            />
            <button
              type='button'
              className='flex items-center justify-center absolute right-5.5 top-1/2 -translate-y-1/2 cursor-pointer border-none text-xl p-3 w-22 h-16  rounded-xl bg-primary-400 dark:bg-primary-200 text-text'
            >
              <Search size={16} />
            </button>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
