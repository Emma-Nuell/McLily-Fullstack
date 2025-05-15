import { useState } from "react";
import { Hamburger } from "./index.js";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../lib/constants.jsx";
import { ArrowLeftCircleIcon } from "lucide-react";
import Logo from "../../assets/logo.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  return (
    <>
      <div
        className={`transition-all duration-300 ${
          isOpen ? "w-160 min-w-[260px]" : "w-fit min-w-[4.2rem]"
        } hidden sm:block relative bg-white border-r border-aquamine-4 dark:border-slate-500 p-5 dark:bg-slate-800 h-screen mr-10`}
      >
        <ArrowLeftCircleIcon
          size={36}
          className={`${
            !isOpen && "rotate-180"
          } absolute text-3xl bg-white text-aquamine-3 rounded-full cursor-pointer top-9 -right-9 dark:text-slate-400 dark:bg-slate-800`}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Link to='/'>
          <div className={`flex items-center ${isOpen && "gap-x-4"}`}>
            <img src={Logo} alt='mclily-logo' className='pl-2 mr-4' />
            {isOpen && (
              <h1 className='font-comorant text-3xl text-bold whitespace-nowrap dark:text-white'>
                McLily
              </h1>
            )}
          </div>
        </Link>
        {isOpen && (
          <div className='h-1.5 bg-aquamine-4 dark:bg-gray-400 my-4'></div>
        )}
        <ul className='pt-6'>
          {sidebarLinks.map((link, index) => {
            return (
              <Link key={index} to={link.url}>
                <li
                  className={`flex items-center mt-2 gap-x-6 p-8 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-aquamine-6 dark:hover:bg-gray-700 ${
                    location.pathname === link.url &&
                    "bg-aquamine-6 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className='text-2xl'
                    onClick={() => !isOpen && setIsOpen(true)}
                  >
                    {link.icon}
                  </span>
                  {isOpen && (
                    <span
                      className={`origin-left duration-300 hover:block ${
                        !isOpen && "hidden"
                      }`}
                    >
                      {link.title}
                    </span>
                  )}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      {/* mobile menu */}
      <div className='pt-3 hidden'>
        <Hamburger setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
      </div>
      <div className='sm:hidden'>
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white bg-gray-50 dark:bg-slate-800 drop-shaow md rounded-xl`}
        >
          {sidebarLinks.map((link, index) => {
            return (
              <Link
                to={link.url}
                key={index}
                onClick={() => setMobileMenu(false)}
              >
                <span
                  className={`${
                    location.pathname === link.url &&
                    "bg-gray-200 dark:bg-gray-700"
                  } p-2 rounded-xl hover:bg-gray-200 dark:bg-gray-700`}
                >
                  {link.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
