import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Main, SidePane } from "../components/allcomponents";
import { productsDetails } from "../lib/constants";
import { useProductContext } from "../context/index.js";
// import { useProductContext } from "../../context/index.js";




const AllProducts = () => {
  const {products} = useProductContext()
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
      <Main
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
        products={products}
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

