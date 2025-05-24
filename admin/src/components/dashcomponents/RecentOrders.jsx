import { useOrderContext } from "../../context/index.js";
import { recentOrdersTable } from "../../lib/constants.jsx";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const RecentOrders = () => {
  const { recentOrders } = useOrderContext()
    const [currentPage, setCurrentPage] = useState(1);
    let entriesPerPage = 10;

    const indexOfLastOrder = currentPage * entriesPerPage;
    const indexOfFirstOrder = indexOfLastOrder - entriesPerPage;
    const currentOrders = recentOrders.slice(
      indexOfFirstOrder,
      indexOfLastOrder
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
  
  function getStatusColor(status) {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Processing":
        return "text-blue-600";
      case "Shipped":
        return "text-purple-600";
      case "Out_for_delivery":
        return "text-indigo-600";
      case "Delivered":
        return "text-green-600";
      case "Cancelled":
        return "text-red-600";
      case "Returned":
        return "text-orange-600";
      case "Refunded":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
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
              {recentOrdersTable.map((detail, index) => {
                const isFirst = index === 0;
                const isLast = index === recentOrdersTable.length - 1;

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
            {currentOrders.map((order, index) => (
              <tr
                key={order.orderId}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-800"
                    : "bg-aquamine-7 dark:bg-slate-700"
                } hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer`}
              >
                <td className='rounded-l-xl px-4 py-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>
                  <div className='flex items-center'>
                    <div className='h-23 w-23 max-sm:h-20 max-sm:w-20 flex-shrink-0 flex items-center'>
                      <img src={order.image} alt={order.name} />
                    </div>
                    <div className='ml-6'>
                      <div className='font-medium text-black dark:text-dark-text text-[14px] max-sm:text-xs max-w-[300px] max-sm:max-w-[220px] text-nowrap overflow-hidden overflow-ellipsis'>
                        {order.productName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                  {order.customerName}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                  #{order.orderId}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                  x{order.quantity}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                  ₦{Number(order.subtotal).toLocaleString()}
                </td>
                <td
                  className={`font-medium text-[15px] max-sm:text-xs min-w-[120px] max-sm:min-w-[80px] whitespace-nowrap px-4 py-6 ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='w-full h-1 bg-aquamine-5 dark:bg-dark-border my-10'></div>
      <div className='flex items-center justify-between mt-10 py-4 px-1 gap-6'>
        <div className='text-light-text-secondary dark:text-dark-text-secondary text-sm max-sm:text-xs'>
          Showing {indexOfFirstOrder + 1} to{" "}
          {Math.min(indexOfLastOrder, recentOrders.length)} of{" "}
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
}
export default RecentOrders