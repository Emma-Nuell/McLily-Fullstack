import { useProductContext } from "../../context/index.js";
import { productOverviewTable } from "../../lib/constants.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductsOverview = () => {
    const { products } = useProductContext();

    const navigate = useNavigate();
    const handleProductlick = (product) => {
        navigate(`/products?productId=${product.id}&openPanel=true`);
    }

        const [currentPage, setCurrentPage] = useState(1);
        let entriesPerPage = 5;

        const indexOfLastProduct = currentPage * entriesPerPage;
        const indexOfFirstProduct = indexOfLastProduct - entriesPerPage;
        const currentProducts = products.slice(
          indexOfFirstProduct,
          indexOfLastProduct
        );
        const totalPages = Math.ceil(products.length / entriesPerPage);

        const pagesPerGroup = 3;
        const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
        const startPage = currentGroup * pagesPerGroup + 1;
        const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

        const visiblePageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
          visiblePageNumbers.push(i);
        }

  return (
    <div className='bg-white dark:bg-slate-800 p-6 rounded-md mt-12'>
      <div className='flex items-center justify-between'>
        <h2 className='dark:text-dark-text font-bold text-2xl max-sm:text-xl'>
          Product Overview
        </h2>
        <Link to='/products'>
          <button className='bg-aquamine-5  cursor-pointer dark:bg-dark-button dark:text-dark-text font-bold py-2 px-4 rounded-md max-sm:font-medium max-sm:px-3.5 max-sm:py-1 '>
            View All
          </button>
        </Link>
      </div>
      <div className='bg-white dark:bg-slate-800 rounded-lg pb-18 overflow-x-auto scrollbar-hidden'>
        <table className='min-w-full mt-10 border-separate border-spacing-y-6'>
          <thead className='bg-aquamine-7 dark:bg-slate-700'>
            <tr className='mb-10'>
              {productOverviewTable.map((detail, index) => {
                const isFirst = index === 0;
                const isLast = index === productOverviewTable.length - 1;

                return (
                  <th
                    scope='col'
                    key={index}
                    className={`px-6 py-8 text-left text-xs font-bold uppercase tracking-wider
                        ${isFirst ? "rounded-tl-xl rounded-bl-xl" : ""}
                        ${isLast ? "rounded-tr-xl rounded-br-xl" : ""}`}
                  >
                    {detail}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-slate-800 mt-10 dark:text-dark-text'>
            {currentProducts.map((product, index) => (
              <tr
                    key={product.id}
                    onClick={() => handleProductlick(product)}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-800"
                    : "bg-aquamine-7 dark:bg-slate-700"
                } hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer`}
              >
                <td className='rounded-l-xl px-4 py-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>
                  <div className='flex items-center'>
                    <div className='h-23 w-23 max-sm:h-20 max-sm:w-20 flex-shrink-0 flex items-center'>
                      <img src={product.images[0]} alt={product.name} />
                    </div>
                    <div className='ml-6'>
                      <div className='font-medium text-black dark:text-dark-text text-[14px] max-sm:text-xs max-w-[300px] max-sm:max-w-[220px] text-nowrap overflow-hidden overflow-ellipsis'>
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                  #{product.id}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                  ₦{product.price}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                  {product.stock}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                  {product.sales}
                </td>
                <td className='px-4 rounded-r-xl py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                  {product.visits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='w-full h-1 bg-aquamine-5 dark:bg-dark-border my-10'></div>
      <div className='flex items-center justify-between mt-10 py-4 px-1 gap-6'>
        <div className='text-light-text-secondary dark:text-dark-text-secondary text-sm max-sm:text-xs'>
          Showing {indexOfFirstProduct + 1} to{" "}
          {Math.min(indexOfLastProduct, products.length)} of {products.length}{" "}
          entries
        </div>
        <div className='flex space-x-1 gap-6 max-sm:gap-3'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='px-3 py-3 cursor-pointer rounded-full w-22 h-22 max-sm:w-16 max-sm:h-16  border flex justify-center items-center disabled:opacity-50'
          >
            <ChevronLeft size={22} />
          </button>
          {visiblePageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-3 cursor-pointer rounded-full flex justify-center items-center w-22 h-22 max-sm:w-16 max-sm:h-16  ${
                currentPage === number
                  ? "bg-aquamine-5 dark:bg-dark-button dark:text-white"
                  : " hover:bg-aquamine-6 dark:hover:bg-dark-hover"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className='px-3 py-3 cursor-pointer rounded-full flex justify-center items-center w-22 h-22 max-sm:w-16 max-sm:h-16  border disabled:opacity-50'
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductsOverview;
