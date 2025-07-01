import { useState } from "react";
import { Navbar, Sidebar, GlobalSearchResults } from "../components/index.js";
import { useGlobalContext, useAuthContext, useNotificationContext, useOrderContext, useProductContext } from "../context/index.js";
import {MclilyLoader} from "./Loaders/index.js"

const Layout = ({ children }) => {
  const { showResults, setShowResults, searchTerm } = useGlobalContext();
  const { loading: authLoading } = useAuthContext()
  const { loading: notLoading } = useNotificationContext()
  const { loading: productLoading } = useProductContext()
  const {loading: orderLoading} = useOrderContext()
  const [searchInput, setSearchInput] = useState(searchTerm || "")
  

   if (authLoading || notLoading || productLoading || orderLoading) {
     return (
       <div className='flex items-center justify-center h-screen'>
         <MclilyLoader />
       </div>
     );
   }

  return (
    <>
      {showResults && (
        <GlobalSearchResults
          onClose={() => setShowResults(false)}
          showResults={showResults}
          setSearchInput={setSearchInput}
        />
      )}
      <div className='flex flex-auto h-screen'>
        <Sidebar />
        <div className='grow h-screen overflow-auto scrollbar-hidden'>
          <Navbar searchInput={searchInput} setSearchInput = {setSearchInput} />
          <div className='m-5'>{children} </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
