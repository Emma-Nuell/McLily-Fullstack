import { User, Search, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import GlobalSearchResults from "./GlobalSearchResults.jsx";
import { useEffect, useState } from "react";
import { Hamburger } from "./addcomponents/index.js";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../lib/constants.jsx";
import Messages from "./Messages.jsx";
import { useGlobalContext } from "../context/index.js"
import UserB from "./User.jsx";


const Navbar = ({searchInput, setSearchInput}) => {
  const {performGlobalSearch, setLoading, clearSearch, setShowResults} = useGlobalContext()
  const [mobileMenu, setMobileMenu] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // const [showResults, setShowResults] = useState(false)
  const location = useLocation();

  
   useEffect(() => {
     const timer = setTimeout(() => {
       setDebouncedSearch(searchInput);
     }, 300);

     return () => clearTimeout(timer);
   }, [searchInput]);

   useEffect(() => {
     if (debouncedSearch.trim()) {
       setLoading(true)
       performGlobalSearch(debouncedSearch);
      setShowResults(!!debouncedSearch.trim());

     } else {
       clearSearch();
       setShowResults(false);
     }
   }, [debouncedSearch, performGlobalSearch, setLoading, clearSearch, setShowResults]);
  
  const handleClearInput = () => {
    clearSearch();
    setSearchInput("")
  }
  


  return (
    <>
      <nav className='top-0 flex items-center flex-auto mt-6 z-50 sticky  max-sm:bg-aquamine-4/15 max-sm:dark:bg-dark-background/15 max-sm:backdrop-blur-2xl'>
        <div className='pt-3 sm:hidden'>
          <Hamburger setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
        </div>
        <div className='sm:hidden'>
          <div
            className={`${
              mobileMenu ? "flex" : "hidden"
            } absolute z-50 flex-col w-[95%] items-center self-end py-8 px-6 mt-16 space-y-6 font-bold sm:w-auto top-16 right-6 dark:text-white bg-white shadow-lg dark:bg-slate-700 drop-shaow md rounded-xl`}
          >
            {sidebarLinks.map((link, index) => {
              return (
                <Link
                  className='flex justify-center w-full text-center'
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
          <div className='container flex items-center justify-between gap-6 mx-auto '>
            <div className='flex items-center w-1/3 p-2 bg-gray-200 rounded shadow-lg dark:bg-gray-700 max-sm:w-7/10'>
              <Search className='mr-2 text-black dark:text-white' />
              <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='Search...'
                className='w-full ml-2 border-none dark:text-white focus:outline-none'
              />
              {searchInput && (
                <div>
                  <X 
                  onClick={handleClearInput }
                    className='text-black dark:text-white cursor-pointer' />
                </div>
              )}
            </div>
            <div className='flex items-center justify-end gap-4 pr-4 cursor-pointer'>
              <Messages />
              <ThemeToggle />
              <UserB />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
