import { sidebarLinks, sidebarCat } from "../utils/constants.jsx";
import {  X, ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, } from "react";
import { useProductContext } from "../context/product-context";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, changeLink, activeLink } =
    useProductContext();

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/products")
    closeSidebar()
  }

  return (
    <div className='relative'>
      {/* Overlay */}
      <aside
        className={`fixed w-full h-[calc(100%-6rem)] bg-black/50 z-[999] transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type='button'
          className='absolute right-2 top-3 text-text bg-primary-500 dark:bg-primary-200 rounded-md w-25 h-15 flex items-center justify-center'
          onClick={closeSidebar}
        >
          <X size={21} />
        </button>
        {/* Sidebar Content */}
        <div className='absolute left-0 w-[290px] h-full overflow-y-auto bg-white dark:bg-surface shadow-[2px_0_5px_rgba(0,0,0,0.1)] transition-all duration-300 z-[9999] p-5 pl-7 text-text mt-0 scrollbar-hidden'>
          <div>
            <h2 className='font-medium text-xl tracking-wider'>
              Shop By Category
            </h2>
            <div className='border-t-1 my-3 border-primary-500'></div>

            {sidebarLinks.map((link) => {
              const subcategories = link[`${activeLink}Subcategory`];
              return (
                <ul key={link.id} className='mb-2'>
                  <li
                    className='py-4 font-medium flex items-center justify-between cursor-pointer hover:px-4 hover:bg-gray-100 dark:hover:bg-gray-500 rounded transition-all tracking-wide'
                    onClick={() => changeLink(link.name)}
                  >
                    {link.category}
                    {link.subCategory &&
                      (activeLink === link.name ? (
                        <ChevronDown size={21} />
                      ) : (
                        <ChevronRight size={21} />
                      ))}

                    {link.category === "Anime" && (
                      <div className='text-xs border-1 rounded-md px-2 border-primary-500 py-1'>
                        Coming soon
                      </div>
                    )}
                  </li>

                  <ul>
                    {subcategories?.map((item, index) => (
                      <li
                        onClick={handleClick}
                        key={index}
                        className='py-3 px-6 font-normal text-sm my-0.5 tracking-wide cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 rounded'
                      >
                        <Link to='/products' className='w-full block'>
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </ul>
              );
            })}
          </div>

          <div className='border-t-1 my-4 border-primary-500'></div>

          <div className='mt-4'>
            <ul>
              {sidebarCat.map((cat, index) => (
                <li
                  key={index}
                  className='py-4 font-medium flex items-center cursor-pointer hover:px-4 hover:bg-gray-100 dark:hover:bg-gray-500 rounded transition-all'
                  onClick={closeSidebar}
                >
                  <Link to={cat.url} className='w-full flex items-center gap-3'>
                    {cat.icon}
                    {cat.name}
                  {cat.name === "Pre-orders" && (
                    <div className='text-xs border-1 rounded-md px-2 border-primary-500 py-1'>
                      Coming soon
                    </div>
                  )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='center mt-10 mb-4 flex justify-center'>
            <button
              type='button'
              className='bg-primary-500 px-6 py-4 rounded-md text-black tracking-wide'
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
