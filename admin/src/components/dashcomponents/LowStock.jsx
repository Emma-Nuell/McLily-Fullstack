import { useState} from "react";
import { useProductContext } from "../../context/index.js";
import { lowStockTable } from "../../lib/constants.jsx";
import { useModal } from "../../context/Modal/useModal&Toast.js";
import { useNavigate } from "react-router-dom";
import {
  Trash,
  Pen,
  Eye,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
} from "lucide-react";

const LowStock = () => {
  const { lowStock, editProduct, editOn, deleteProduct } = useProductContext();
const {showConfirmation, OPERATION_TYPES} = useModal()
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  
 
  

  const [currentPage, setCurrentPage] = useState(1);
  let entriesPerPage = 5;

  const indexOfLastProduct = currentPage * entriesPerPage;
  const indexOfFirstProduct = indexOfLastProduct - entriesPerPage;
  const currentProducts = lowStock.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
    const totalPages = Math.ceil(lowStock.length / entriesPerPage);
    
    const pagesPerGroup = 3;
    const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    
    const visiblePageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePageNumbers.push(i);
  }

  const handleProductDelete = (product) => {
    showConfirmation({
      operationType: OPERATION_TYPES.DELETE,
      itemType: "product",
      itemName: `${product.name} product`,
      onConfirm: async () => {
        try {
          await deleteProduct(product.productId);
        } catch (error) {
          setError(error);
        }
      },
    });
  };

  const handleProductEdit = (product) => {
    showConfirmation({
      operationType: OPERATION_TYPES.EDIT,
      itemType: "product",
      itemName: `${product.name}`,
      onConfirm: async () => {
        try {
          await editOn();
          editProduct(product);
          navigate("/add-product");
        } catch (error) {
          setError(error);
        }
      },
    });
  };
  
  const navigate = useNavigate();
  const handleProductlick = (product) => {
    navigate(`/products?productId=${product.productId}&openPanel=true`);
  };


  return (
    <div className='bg-white dark:bg-slate-800 p-6 rounded-md min-w-0'>
      <div>
        <h2 className='text-amber-700 font-bold text-2xl max-sm:text-xl'>
          Low Stock Products
        </h2>
      </div>
      <div className='bg-white dark:bg-slate-800 rounded-lg pb-18 overflow-x-auto max-w-full  scrollbar-hidden'>
        <table className='w-full mt-10 border-separate border-spacing-y-6'>
          <thead className='bg-aquamine-7 dark:bg-slate-700'>
            <tr className='mb-10'>
              {lowStockTable.map((detail, index) => {
                const isFirst = index === 0;
                const isLast = index === lowStockTable.length - 1;

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
                key={product.productId}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-800"
                    : "bg-aquamine-7 dark:bg-slate-700"
                } hover:bg-blue-50 dark:hover:bg-gray-700`}
              >
                <td className='rounded-l-xl px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  <div className='flex items-center'>
                    <div className='h-25 w-25 max-sm:h-20 max-sm:w-20 flex-shrink-0'>
                      <img src={product.images[0]} alt={product.name} />
                    </div>
                    <div className='ml-6'>
                      <div className='font-medium text-black dark:text-dark-text text-[15px] max-sm:text-xs max-w-[270px] max-sm:max-w-[200px] text-nowrap overflow-hidden overflow-ellipsis'>
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className='px-4 py-6 whitespace-nowrap text-[15px] max-sm:text-xs'>
                  #{product.productId}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[15px] max-sm:text-xs'>
                  {product.category}
                </td>
                {product.stock == 0 ? (
                  <td className='px-4 py-6 whitespace-nowrap text-red-600 text-[15px] max-sm:text-xs dark:text-red-800 font-medium'>
                    <span className='flex items-center gap-2'>
                      <CircleAlert /> OUT OF STOCK
                    </span>
                  </td>
                ) : (
                  <td className='px-4 py-6 whitespace-nowrap  font-medium text-[15px] max-sm:text-xs  text-amber-600 dark:text-amber-600'>
                    {product.stock} left
                  </td>
                )}
                <td className='rounded-r-xl px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex gap-4 items-center justify-start'>
                    <button
                      className='text-indigo-600 dark:text-indigo-700 dark:hover:text-indigo-600 cursor-pointer hover:text-indigo-800 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductlick(product);
                      }}
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className='text-green-500 dark:text-green-700 cursor-pointer hover:text-green-700 dark:hover:text-green-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductEdit(product);
                      }}
                    >
                      <Pen size={20} />
                    </button>
                    <button
                      className='text-red-600 dark:text-red-700 cursor-pointer hover:text-red-900 dark:hover:text-red-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductDelete(product);
                      }}
                    >
                      <Trash size={20} />
                    </button>
                  </div>
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
          {Math.min(indexOfLastProduct, lowStock.length)} of {lowStock.length}{" "}
          entries
        </div>
        <div className='flex space-x-1 gap-6 max-sm:gap-3'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='px-3 py-3 cursor-pointer rounded-full w-22 h-22 max-sm:w-16 max-sm:h-16 border flex justify-center items-center disabled:opacity-50'
          >
            <ChevronLeft size={22} />
          </button>
          {visiblePageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-3 cursor-pointer rounded-full flex justify-center items-center w-22 h-22 max-sm:w-16 max-sm:h-16 ${
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
            className='px-3 py-3 cursor-pointer rounded-full flex justify-center items-center w-22 h-22 max-sm:w-16 max-sm:h-16 border disabled:opacity-50'
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default LowStock;
