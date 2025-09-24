import {  useOrderContext } from "../../context/index.js";
import { useState } from "react";
import { ordersDetails } from "../../lib/constants.jsx";
import { useModal } from "../../context/Modal/useModal&Toast.js";

import {
  Trash,
  Pen,
  Eye,
  ChevronLeft,
  ChevronRight,
  ScrollText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentOrders = () => {
  const { recentOrders, deleteOrder, getStatusColor } = useOrderContext();
  const { showConfirmation, OPERATION_TYPES } = useModal();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)


  

    const navigate = useNavigate();

    const handleClick = (id) => {
      navigate(`/orders/${id}`, {
        state: { from: { pathname: "/orders", page: currentPage } },
      });
    };
    const handleStatusClick = (id) => {
      navigate(`/orders/${id}`, {
        state: { from: { pathname: "/orders", isOpen: true } },
      });
    };

  
        const [currentPage, setCurrentPage] = useState(1);
        let entriesPerPage = 10;
    
        const indexOfLastOrder = currentPage * entriesPerPage;
        const indexOfFirstOrder = indexOfLastOrder - entriesPerPage;
        const currentOrder = recentOrders.slice(
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
  

  const handleOrderDelete = (order) => {
    showConfirmation({
      operationType: OPERATION_TYPES.DELETE,
      itemType: "order",
      itemName: `order ${order.orderId}`,
      onConfirm: async () => {
        try {
          await deleteOrder(order.orderId);
        } catch (error) {
          setError(error);
        }
      },
    });
  };


  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-md mt-12">
      <div>
        <h2 className="dark:text-dark-text font-bold text-2xl max-sm:text-xl">
          Recent Orders
        </h2>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-lg pb-18 overflow-x-auto scrollbar-hidden">
        <table className="min-w-full mt-10 border-separate border-spacing-y-6">
          <thead className="bg-aquamine-7 dark:bg-slate-700">
            <tr className="mb-10">
              {ordersDetails.map((detail, index) => {
                const isFirst = index === 0;
                const isLast = index === ordersDetails.length - 1;

                return (
                  <th
                    scope="col"
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
          <tbody className="bg-white dark:bg-slate-800 mt-10 dark:text-dark-text">
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
                <td className="rounded-l-xl pr-16 px-4 py-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[280px] max-sm:min-w-[190px]">
                  <div className="flex items-center">
                    <div className="h-23 w-23 max-sm:h-20 max-sm:w-20 flex-shrink-0 flex items-center">
                      <img
                        src={order.orderItems[0].image}
                        alt={order.orderItems[0].productName}
                      />
                    </div>
                    <div className="ml-6">
                      <div className="font-medium text-black dark:text-dark-text text-[14px] max-sm:text-xs max-w-[300px] max-sm:max-w-[220px] text-nowrap overflow-hidden overflow-ellipsis">
                        {order.orderItems[0].productName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs">
                  {order.customerDetails.firstName}{" "}
                  {order.customerDetails.lastName}
                </td>
                <td className="px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs">
                  #{order.orderId}
                </td>
                <td className="px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs">
                  ₦{Number(order.subtotal).toLocaleString()}
                </td>
                <td className="px-4 py-6 whitespace-nowrap min-w-[160px] max-sm:min-w-[120px] text-[14px] max-sm:text-xs">
                  x{order.orderItems.length}
                </td>
                <td className="px-4 py-6 whitespace-nowrap min-w-[200px] max-sm:min-w-[150px] text-[14px] max-sm:text-xs uppercase">
                  {order.deliveryMethod}
                </td>
                <td
                  className={`font-medium text-[15px] max-sm:text-xs min-w-[160px] max-sm:min-w-[110px] whitespace-nowrap px-4 py-6 ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </td>
                <td className="rounded-r-xl px-6 py-4 whitespace-nowrap text-sm font-medium min-w-[130px] max-sm:min-w-[90px]">
                  <div className="flex gap-4 items-center justify-start">
                    <button
                      className="text-blue-500 dark:text-blue-700 cursor-pointer hover:text-blue-700 dark:hover:text-blue-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusClick(order.orderId);
                      }}
                    >
                      <ScrollText size={20} />
                    </button>
                    <button
                      className="text-red-600 dark:text-red-700 cursor-pointer hover:text-red-900 dark:hover:text-red-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderDelete(order);
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
      <div className="w-full h-1 bg-aquamine-5 dark:bg-dark-border my-10"></div>
      <div className="flex items-center justify-between mt-10 py-4 px-1 gap-6">
        <div className="text-light-text-secondary dark:text-dark-text-secondary text-sm max-sm:text-xs">
          Showing {indexOfFirstOrder + 1} to{" "}
          {Math.min(indexOfLastOrder, recentOrders.length)} of{" "}
          {recentOrders.length} entries
        </div>
        <div className="flex space-x-1 gap-6 max-sm:gap-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-3 cursor-pointer rounded-full w-22 h-22 max-sm:w-16 max-sm:h-16  border flex justify-center items-center disabled:opacity-50"
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
            className="px-3 py-3 cursor-pointer rounded-full flex justify-center items-center w-22 h-22 max-sm:w-16 max-sm:h-16  border disabled:opacity-50"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default RecentOrders;
