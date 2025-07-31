import React from "react";
import { physicalOrderTable } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { physicalOrder1, physicalOrder2 } from "../../lib/constants";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PhysicalOrderUnpaid = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/orders/${id}`, {
      state: { from: { pathname: "/orders", page: currentPage } },
    });
  };
  // const handleStatusClick = (id) => {
  //   navigate(`/orders/${id}`, {
  //     state: { from: { pathname: "/orders", isOpen: true } },
  //   });
  // };

  const orders = [physicalOrder1, physicalOrder2];

  const [currentPage, setCurrentPage] = useState(1);
  let entriesPerPage = 10;

  const indexOfLastOrder = currentPage * entriesPerPage;
  const indexOfFirstOrder = indexOfLastOrder - entriesPerPage;
  const currentOrder = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / entriesPerPage);

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
          Unpaid Physical Orders
        </h2>
      </div>
      <div className='bg-white dark:bg-slate-800 rounded-lg pb-18 overflow-x-auto scrollbar-hidden'>
        <table className='min-w-full mt-10 border-separate border-spacing-y-6'>
          <thead className='bg-aquamine-7 dark:bg-slate-700'>
            <tr className='mb-10'>
              {physicalOrderTable.map((detail, index) => {
                const isFirst = index === 0;
                const isLast = index === physicalOrderTable.length - 1;

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
            {currentOrder.map((order, index) => (
              <tr
                key={order.orderId}
                onClick={() => handleClick(order.orderId)}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-800"
                    : "bg-aquamine-7 dark:bg-slate-700"
                } hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer`}
              >
                <td className='rounded-l-xl pr-16 px-4 py-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider '>
                  <div className='flex items-center'>
                    <div className='ml-6'>
                      <div className='font-medium text-black dark:text-dark-text text-[14px] max-sm:text-xs max-w-[300px] max-sm:max-w-[220px] text-nowrap overflow-hidden overflow-ellipsis'>
                        {order.customer.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                  #{order.orderId}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                  ₦{order.totalAmount.toFixed(2)}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[160px] max-sm:min-w-[120px] text-[14px] max-sm:text-xs'>
                  ₦{order.amountPaid.toFixed(2)}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[200px] max-sm:min-w-[150px] text-[14px] max-sm:text-xs uppercase'>
                  ₦{order.amountRemaining.toFixed(2)}
                </td>
                <td className='rounded-r-xl px-6 py-4 whitespace-nowrap text-sm font-medium min-w-[130px] max-sm:min-w-[90px]'>
                  <div className='flex gap-4 items-center justify-start'>
                    <button
                      className='text-blue-500 dark:text-blue-700 cursor-pointer hover:text-blue-700 dark:hover:text-blue-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4'
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleStatusClick(order.orderId);
                      }}
                    >
                      View and Update order
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
          Showing {indexOfFirstOrder + 1} to{" "}
          {Math.min(indexOfLastOrder, orders.length)} of {orders.length} entries
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

export default PhysicalOrderUnpaid;
