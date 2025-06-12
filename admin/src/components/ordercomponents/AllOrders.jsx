import { useOrderContext } from "../../context/index.js";
import { useEffect, useRef, useState } from "react";
import { ordersDetails } from "../../lib/constants.jsx";
import { useModal, useToast } from "../../context/Modal/useModal&Toast.js";
import {
  Trash,
  ChevronLeft,
  ChevronRight,
  ScrollText,
  Coffee,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllOrders = ({searchInput, setSearchInput, scrollIntoView}) => {
  const {
    filteredOrders: orders,
    deleteOrder,
    clearSearch,
    orderSearch,
    getStatusColor,
  } = useOrderContext();
  const { showConfirmation, OPERATION_TYPES } = useModal();
  const { showToast, TOAST_TYPES } = useToast();

  const navigate = useNavigate();

  const tableRef = useRef(null);

 
  useEffect(() => {
    if (scrollIntoView && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollIntoView]);

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
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const indexOfLastOrder = currentPage * entriesPerPage;
  const indexOfFirstOrder = indexOfLastOrder - entriesPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / entriesPerPage);

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
          showToast("Order deleted successfully", TOAST_TYPES.SUCCESS);
        } catch (error) {
          showToast(
            `Failed to delete Order: ${error.message}`,
            TOAST_TYPES.ERROR
          );
        }
      },
    });
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      orderSearch(debouncedSearch);
    } else {
      clearSearch();
    }
  }, [debouncedSearch, orderSearch, clearSearch]);

  return (
    <div
      id='allOrders'
      className='bg-white dark:bg-slate-800 p-6 rounded-md mt-12'
      ref={tableRef}
    >
      <div className='mb-10 py-4'>
        <h2 className='dark:text-dark-text font-bold text-2xl max-sm:text-xl'>
          All Orders
        </h2>
      </div>
      <div className='flex items-center gap-4 mb-6 dark:text-dark-text'>
        <div>
          <Coffee size={24} />
        </div>
        <p className='text-light-text-secondary dark:text-dark-text-secondary font-light font-poppins'>
          Tip search by Order ID: Each order is provided with a unique ID, which
          you can rely on to find the exact product you need.
        </p>
      </div>
      <div className='flex justify-between items-center flex-wrap gap-8'>
        <div className='flex-grow flex items-center gap-6'>
          <div className='flex items-center gap-4 dark:text-dark-text'>
            <p className='font-light text-sm'>showing</p>
            <select
              name='entries'
              id='entries'
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className='p-2 rounded-md outline-none dark:text-white dark:bg-dark-button border-1 border-light-border dark:border-dark-border'
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <p className='font-light text-sm'>entries</p>
          </div>
          <div className='flex items-center border-1 border-light-border dark:border-dark-border p-4 shadow-lg rounded-md w-1/2'>
            <Search className='text-black dark:text-white mr-2' />
            <input
              type='text'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder='Search...'
              className='border-none dark:text-white focus:outline-none ml-2 w-full'
            />
          </div>
        </div>
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
            {currentOrders.map((order, index) => (
              <tr
                key={order.orderId}
                onClick={() => handleClick(order.orderId)}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-800"
                    : "bg-aquamine-7 dark:bg-slate-700"
                } hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer`}
              >
                <td className='rounded-l-xl pr-16 px-4 py-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[280px] max-sm:min-w-[190px]'>
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

                <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                  {order.customerName}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                  #{order.orderId}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                  ₦{Number(order.subtotal).toLocaleString()}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[160px] max-sm:min-w-[120px] text-[14px] max-sm:text-xs'>
                  x{order.quantity}
                </td>
                <td className='px-4 py-6 whitespace-nowrap min-w-[200px] max-sm:min-w-[150px] text-[14px] max-sm:text-xs'>
                  {order.paymentMethod}
                </td>
                <td
                  className={`font-medium text-[15px] max-sm:text-xs min-w-[160px] max-sm:min-w-[110px] whitespace-nowrap px-4 py-6 ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </td>
                <td className='rounded-r-xl px-6 py-4 whitespace-nowrap text-sm font-medium min-w-[130px] max-sm:min-w-[90px]'>
                  <div className='flex gap-4 items-center justify-start'>
                    <button
                      className='text-blue-500 dark:text-blue-700 cursor-pointer hover:text-blue-700 dark:hover:text-blue-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusClick(order.orderId);
                      }}
                    >
                      <ScrollText size={20} />
                    </button>
                    <button
                      className='text-red-600 dark:text-red-700 cursor-pointer hover:text-red-900 dark:hover:text-red-600 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4'
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
export default AllOrders;
