import { useProductContext } from "../../context/index.js";
import { useState } from "react";
import { ordersDetails } from "../../lib/constants.jsx";
import {
  Trash,
  Pen,
  Coffee,
  Plus,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentOrders = () => {
    const { recentOrders } = useProductContext();

    const navigate = useNavigate();

    const handleClick = (id) => {
      navigate(`/orders/${id}`);
    };

        const [currentPage, setCurrentPage] = useState(1);
        let entriesPerPage = 10;
    
        const indexOfLastProduct = currentPage * entriesPerPage;
        const indexOfFirstProduct = indexOfLastProduct - entriesPerPage;
        const currentProducts = recentOrders.slice(
          indexOfFirstProduct,
          indexOfLastProduct
        );
      const totalPages = Math.ceil(recentOrders.length / entriesPerPage);
      
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
      <div>
        <h2 className='dark:text-dark-text font-bold text-2xl max-sm:text-xl'>
          Recent Orders
        </h2>
      </div>
      <div className='bg-white dark:bg-slate-800 rounded-lg pb-18 overflow-x-auto scrollbar-hidden'>
        <table className='min-w-full mt-10 border-separate border-spacing-y-6'>
          <thead className='bg-aquamine-7 dark:bg-slate-700'>
            <tr className='mb-10'>
              {ordersDetails.map((detail, index) => {
                const isFirst = index === 0;
                const isLast = index === ordersDetails.length - 1;

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
                    key={product.orderId}
                onClick={() => handleClick(product.orderId)}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-800"
                    : "bg-aquamine-7 dark:bg-slate-700"
                } hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer`}
              >
                <td className='rounded-l-xl pr-16 px-4 py-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[280px] max-sm:min-w-[190px]'>
                  <div className='flex items-center'>
                    <div className='h-23 w-23 max-sm:h-20 max-sm:w-20 flex-shrink-0 flex items-center'>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className='ml-6'>
                      <div className='font-medium text-black dark:text-dark-text text-[14px] max-sm:text-xs max-w-[300px] max-sm:max-w-[220px] text-nowrap overflow-hidden overflow-ellipsis'>
                        {product.productName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                  {product.customerName}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                  #{product.orderId}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                  ₦{Number(product.subtotal).toLocaleString()}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[160px] max-sm:min-w-[120px] text-[14px] max-sm:text-xs'>
                  x{product.quantity}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[200px] max-sm:min-w-[150px] text-[14px] max-sm:text-xs'>
                  {product.paymentMethod}
                </td>
                {product.status == "Delivered" ? (
                  <td className='px-4 py-6 rounded-r-xl whitespace-nowrap text-green-700 dark:text-green-700 font-medium text-[15px] max-sm:text-xs min-w-[180px] max-sm:min-w-[140px]'>
                    {product.status}
                  </td>
                ) : product.status == "Shipped" ? (
                  <td className='px-4 py-6 rounded-r-xl whitespace-nowrap  font-medium text-[15px] max-sm:text-xs text-green-600 dark:text-green-500 min-w-[180px] max-sm:min-w-[140px]'>
                    {product.status}
                  </td>
                ) : product.status == "Processing" ? (
                  <td className='px-4 py-6 rounded-r-xl whitespace-nowrap  font-medium text-[15px] max-sm:text-xs  text-amber-600 dark:text-amber-600 min-w-[180px] max-sm:min-w-[140px]'>
                    {product.status}
                  </td>
                ) : (
                  <td className='px-4 py-6 rounded-r-xl whitespace-nowrap  font-medium text-[15px] max-sm:text-xs  text-red-600 dark:text-red-600 min-w-[180px] max-sm:min-w-[140px]'>
                    {product.status}
                  </td>
                )}
                <td className='rounded-r-xl px-6 py-4 whitespace-nowrap text-sm font-medium min-w-[170px] max-sm:min-w-[120px]'>
                  <div className='flex gap-6 items-center justify-start'>
                    <button
                      className='text-indigo-600 dark:text-indigo-700 dark:hover:text-indigo-600 cursor-pointer hover:text-indigo-800'
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("View", product.id);
                      }}
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className='text-green-500 dark:text-green-700 cursor-pointer hover:text-green-700 dark:hover:text-green-600'
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Edit", product.id);
                      }}
                    >
                      <Pen size={20} />
                    </button>
                    <button
                      className='text-red-600 dark:text-red-700 cursor-pointer hover:text-red-900 dark:hover:text-red-600'
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Delete", product.id);
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
          {Math.min(indexOfLastProduct, recentOrders.length)} of{" "}
          {recentOrders.length} entries
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
export default RecentOrders;
