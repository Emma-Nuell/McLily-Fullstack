import { User, Search, MessageSquare } from "lucide-react";
import ThemeToggle from "../ThemeToggle.jsx";
import { useState } from "react";
import { Hamburger } from "./index.js";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../lib/constants.jsx";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  return (
    <nav className='mt-6 z-50 flex flex-auto items-center md:sticky top-0'>
      <div className='pt-3 sm:hidden'>
        <Hamburger setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
      </div>
      <div className='sm:hidden'>
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute z-50 flex-col items-center self-end py-8 px-6 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white bg-white shadow-lg dark:bg-slate-700 drop-shaow md rounded-xl`}
        >
          {sidebarLinks.map((link, index) => {
            return (
              <Link
                className='w-full flex justify-center text-center'
                to={link.url}
                key={index}
                onClick={() => setMobileMenu(false)}
              >
                <span
                  className={`${
                    location.pathname === link.url &&
                    "bg-aquamine-6 dark:bg-gray-700"
                  } p-2 rounded-md w-full dark:hover:bg-slate-500 hover:bg-aquamine-6 dark:bg-gray-700`}
                >
                  {link.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className='dark:border-slate-500 border-aquamine-4 border-2 mx-2 px-4 py-2.5 rounded bg-white dark:bg-gray-800 flex items-center w-full'>
        <div className=' container flex justify-between gap-6 items-center mx-auto'>
          <div className='flex items-center bg-gray-200 shadow-lg dark:bg-gray-700 p-2 rounded w-1/3 max-sm:w-7/10'>
            <Search className='text-black dark:text-white mr-2' />
            <input
              type='text'
              placeholder='Search...'
              className='border-none dark:text-white focus:outline-none ml-2 w-full'
            />
          </div>
          <div className='flex justify-end pr-4 gap-4 items-center cursor-pointer'>
            <span>
              <MessageSquare className='text-xl dark:text-white' />
            </span>
            <ThemeToggle />
            <User className='text-xl dark:text-white' />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
