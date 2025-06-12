import { useState } from "react";
import { Navbar, Sidebar, GlobalSearchResults } from "../components/index.js";
import { useGlobalContext } from "../context/index.js";

const Layout = ({ children }) => {
  const { showResults, setShowResults, searchTerm } = useGlobalContext();
  const [searchInput, setSearchInput] = useState(searchTerm || "")
  

 

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
