import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Main, SidePane } from "../components/allcomponents";
import { productsDetails } from "../lib/constants";


const AllProducts = () => {
 const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false) 
  
  useEffect(() => {
    const productId = searchParams.get("productId")
    const openPanel = searchParams.get("openPanel")

    const productID = Number(productId)
    

    if (productId && openPanel === "true") {
      const product = productsDetails.find(
        (product) => product.id === productID
      );
      
      if (product) {
        setIsOpen(true);
        setSelectedProduct(product);
      } else {
        console.warn(`Product with ID ${productId} not found`);
        setSearchParams({});
      }
    }
  }, [searchParams, setSearchParams]);

  

  const closeSidePane = () => {
    setIsOpen(false)
    setSelectedProduct(null)
    setSearchParams({})
  }
  return (
    <div className="p-6">
      <div className="mb-8">
      <h2 className="dark:text-dark-text font-bold text-3xl">Product List</h2>
      </div>
    <div className='p-6  flex flex-col bg-light-background dark:bg-slate-800 text-light-text dark:text-dark-text h-full'>
      {/* <div className='flex-1 overflow-hidden'>
        <Splitter
          direction={
            isSmallScreen ? SplitDirection.Vertical : SplitDirection.Horizontal
          }
          minWidths={[160, 200]}
          initialSizes={
            selectedProduct ? (isSmallScreen ? [50, 50] : [65, 35]) : [100, 0]
          }
          gutterClassName={`bg-aquamine-5 dark:bg-dark-surface hover:bg-light-hoveraquamine dark:hover:bg-dark-hover cursor-${
            isSmallScreen ? "row" : "col"
          }-resize ${isSmallScreen ? "h-6" : "w-6"}`}
        >
          <Main
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
            products={productsDetails}
          />
          {selectedProduct && (
            <SidePane
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          )}
        </Splitter>
      </div> */}
      <Main
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
        products={productsDetails}
        isOpen={isOpen}
        setIsOpen = {setIsOpen}
      />
      {selectedProduct && (
        <SidePane
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setIsOpen={setIsOpen}
            isOpen={isOpen}
            closeSidePane = {closeSidePane}
        />
      )}
    </div>
    </div>
  );
};
export default AllProducts;

