import {
  useGlobalContext,
  useOrderContext,
  useProductContext,
} from "../context/index.js";
import { useModal } from "../context/Modal/useModal&Toast.js";
import { useNavigate } from "react-router-dom";
import { MBlobLoader } from "../components/Loaders/index.js";
import { globalOrdersTable, globalProductsTable } from "../lib/constants.jsx";
import { Trash, Pen, Plus, X, ScrollText } from "lucide-react";
import { useState } from "react";

const GlobalSearchResults = ({ onClose, setSearchInput }) => {
  const { results, loading, searchTerm, setShowResults, clearSearch } = useGlobalContext();
  const { getStatusColor, deleteOrder } = useOrderContext();
  const { deleteProduct, editOn, editProduct, toggleFeatured } =
    useProductContext();
  const { showConfirmation, OPERATION_TYPES } = useModal();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)

  
  

  const { products, orders } = results;
  const totalResults = products.length + orders.length;

  const navigate = useNavigate();
  const handleProductlick = (product) => {
    navigate(`/products?productId=${product.productId}&openPanel=true`);
    clearSearch();
    setSearchInput("");
  };

  const handleClick = (id) => {
    navigate(`/orders/${id}`);
    clearSearch()
    setSearchInput("");
  };

  const handleStatusClick = (id) => {
    navigate(`/orders/${id}`, {
      state: { from: { pathname: "/orders", isOpen: true } },
    });
   clearSearch()
    setSearchInput("")
  };

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

  const handleFeaturedAdd = (product) => {
    showConfirmation({
      operationType: OPERATION_TYPES.APPROVE,
      title: "Change product featured status",
      description:
        "Are you sure you want to change the featured status of this product",
      itemType: "product",
      itemName: `${product.name} among featured products`,
      onConfirm: async () => {
        try {
          await toggleFeatured(product.productId, product.featured);
        } catch (error) {
          setError(error);
        }
      },
    });
  };
  const handleFeaturedRemove = (product) => {
    showConfirmation({
      operationType: OPERATION_TYPES.APPROVE,
      title: "Change product featured status",
      description:
        "Are you sure you want to change the featured status of this product",
      itemType: "product",
      itemName: `${product.name} from featured products`,
      onConfirm: async () => {
        try {
          await toggleFeatured(product.productId, product.featured);
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
          setShowResults(false);
        } catch (error) {
          setError(error);
        }
      },
    });
  };

  if (loading) {
    return (
      <div>
        <MBlobLoader />
      </div>
    );
  }

  return (
    <div>
      <div className='fixed inset-0 bg-black/55 data-[state=open]:animate-overlayShow scrollbar-hidden z-40 backdrop-blur-sm' />
      <div className='fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-overlaybg rounded-lg p-6 w-full max-w-3xl max-md:max-w-sm max-h-[76%] dark:text-dark-text overflow-auto  scrollbar-hidden'>
        {totalResults === 0 ? (
          <div className='p-4'>
            <p className='text-xl'>No results found for "{searchTerm}"</p>
          </div>
        ) : (
          <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <p className='text-sm text-gray-600 '>
                Found {totalResults} results for "{searchTerm}"
              </p>
              <button
                className='flex items-center justify-center cursor-pointer text-light-button dark:text-dark-button'
                onClick={onClose}
              >
                <X />
              </button>
            </div>
            {products.length > 0 && (
              <div>
                <h2 className='text-2xl font-bold dark:text-dark-text max-sm:text-xl'>
                  Product Section{" "}
                  <span className='text-xs text-light-text-secondary dark:text-dark-text-secondary'>
                    ({products.length} products)
                  </span>
                </h2>
                <div className='overflow-x-auto bg-white rounded-lg dark:bg-slate-800 pb-18 scrollbar-hidden'>
                  <table className='min-w-full mt-10 border-separate border-spacing-y-6'>
                    <thead className='bg-aquamine-7 dark:bg-slate-700'>
                      <tr className='mb-10'>
                        {globalProductsTable.map((detail, index) => {
                          const isFirst = index === 0;
                          const isLast =
                            index === globalProductsTable.length - 1;

                          return (
                            <th
                              scope='col'
                              key={index}
                              className={`px-6 py-8 text-left text-xs font-bold uppercase tracking-wider
                                        ${
                                          isFirst
                                            ? "rounded-tl-xl rounded-bl-xl"
                                            : ""
                                        }
                                        ${
                                          isLast
                                            ? "rounded-tr-xl rounded-br-xl"
                                            : ""
                                        }`}
                            >
                              {detail}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className='mt-10 bg-white dark:bg-slate-800 dark:text-dark-text'>
                      {products.slice(0, 5).map((product, index) => (
                        <tr
                          key={product.productId}
                          onClick={() => handleProductlick(product)}
                          className={`${
                            index % 2 === 0
                              ? "bg-white dark:bg-slate-800"
                              : "bg-aquamine-7 dark:bg-slate-700"
                          } hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer`}
                        >
                          <td className='px-4 py-6 text-sm font-medium tracking-wider text-left text-gray-500 uppercase rounded-l-xl'>
                            <div className='flex items-center'>
                              <div className='flex items-center flex-shrink-0 h-23 w-23 max-sm:h-20 max-sm:w-20'>
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                />
                              </div>
                              <div className='ml-6'>
                                <div className='font-medium text-black dark:text-dark-text text-[14px] max-sm:text-xs max-w-[350px] max-sm:max-w-[250px] text-nowrap overflow-hidden overflow-ellipsis'>
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                            #{product.productId}
                          </td>
                          <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                            ₦{product.price}
                          </td>
                          <td className='px-4 py-6 whitespace-nowrap text-[14px] max-sm:text-xs'>
                            {product.stock}
                          </td>
                          <td className='rounded-r-xl px-6 py-4 whitespace-nowrap text-sm font-medium min-w-[170px] max-sm:min-w-[130px]'>
                            <div className='flex items-center justify-start gap-4'>
                              {product.featured ? (
                                <button
                                  className='p-4 text-red-600 rounded-full cursor-pointer dark:text-red-700 hover:text-red-800 dark:hover:text-red-400 hover:bg-gray-300 dark:hover:bg-gray-600 '
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFeaturedRemove(product);
                                  }}
                                >
                                  <X size={20} />
                                </button>
                              ) : (
                                <button
                                  className='p-4 text-blue-600 rounded-full cursor-pointer dark:text-blue-700 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-300 dark:hover:bg-gray-600 '
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFeaturedAdd(product);
                                  }}
                                >
                                  <Plus size={20} />
                                </button>
                              )}
                              <button
                                className='p-4 text-green-500 rounded-full cursor-pointer dark:text-green-700 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-green-800 dark:hover:text-green-400'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProductEdit(product);
                                }}
                              >
                                <Pen size={20} />
                              </button>
                              <button
                                className='p-4 text-red-600 rounded-full cursor-pointer dark:text-red-700 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-red-800 dark:hover:text-red-400'
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
                {products.length > 5 && (
                  <>
                    <div className='w-full h-1 my-6 bg-aquamine-5 dark:bg-dark-border'></div>
                    <div className='mb-10 text-right'>
                      <button
                        onClick={() => {
                          navigate("/products?search=" + searchTerm);
                          onClose();
                        }}
                        className='text-sm text-blue-600 cursor-pointer p-3'
                      >
                        View all {products.length} products
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {orders.length > 0 && (
              <div>
                <h2 className='text-2xl font-bold dark:text-dark-text max-sm:text-xl'>
                  Orders Section{" "}
                  <span className='text-xs text-light-text-secondary dark:text-dark-text-secondary'>
                    ({orders.length}orders)
                  </span>
                </h2>
                <div className='overflow-x-auto bg-white rounded-lg dark:bg-slate-800 pb-18 scrollbar-hidden'>
                  <table className='min-w-full mt-10 border-separate border-spacing-y-6'>
                    <thead className='bg-aquamine-7 dark:bg-slate-700'>
                      <tr className='mb-10'>
                        {globalOrdersTable.map((detail, index) => {
                          const isFirst = index === 0;
                          const isLast = index === globalOrdersTable.length - 1;

                          return (
                            <th
                              scope='col'
                              key={index}
                              className={`px-6 py-8 text-left text-xs font-bold uppercase tracking-wider
                                                ${
                                                  isFirst
                                                    ? "rounded-tl-xl rounded-bl-xl"
                                                    : ""
                                                }
                                                ${
                                                  isLast
                                                    ? "rounded-tr-xl rounded-br-xl"
                                                    : ""
                                                }`}
                            >
                              {detail}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className='mt-10 bg-white dark:bg-slate-800 dark:text-dark-text'>
                      {orders.slice(0, 5).map((order, index) => (
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
                              <div className='flex items-center flex-shrink-0 h-23 w-23 max-sm:h-20 max-sm:w-20'>
                                <img
                                  src={order.orderItems[0].image}
                                  alt={order.orderItems[0].productName}
                                />
                              </div>
                              <div className='ml-6'>
                                <div className='font-medium text-black dark:text-dark-text text-[14px] max-sm:text-xs max-w-[300px] max-sm:max-w-[220px] text-nowrap overflow-hidden overflow-ellipsis'>
                                  {order.orderItems[0].productName}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                            {order.customerDetails.name}
                          </td>
                          <td className='px-4 py-6 whitespace-nowrap min-w-[180px] max-sm:min-w-[140px] text-[14px] max-sm:text-xs'>
                            #{order.orderId}
                          </td>
                          <td
                            className={`font-medium text-[15px] max-sm:text-xs min-w-[160px] max-sm:min-w-[110px] whitespace-nowrap px-4 py-6 ${getStatusColor(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus}
                          </td>
                          <td className='rounded-r-xl px-6 py-4 whitespace-nowrap text-sm font-medium min-w-[130px] max-sm:min-w-[90px]'>
                            <div className='flex items-center justify-start gap-4'>
                              <button
                                className='p-4 text-blue-500 rounded-full cursor-pointer dark:text-blue-700 hover:text-blue-700 dark:hover:text-blue-600 hover:bg-gray-300 dark:hover:bg-gray-600'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusClick(order.orderId);
                                }}
                              >
                                <ScrollText size={20} />
                              </button>
                              <button
                                className='p-4 text-red-600 rounded-full cursor-pointer dark:text-red-700 hover:text-red-900 dark:hover:text-red-600 hover:bg-gray-300 dark:hover:bg-gray-600'
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
                {orders.length > 5 && (
                  <>
                    <div className='w-full h-1 my-10 bg-aquamine-5 dark:bg-dark-border'></div>
                    <div className='mb-6 text-right'>
                      <button
                        onClick={() => {
                          navigate(`/orders?search=${searchTerm}&view=all`);
                          onClose();
                        }}
                        className='text-sm text-blue-600 cursor-pointer p-3'
                      >
                        View all {orders.length} products
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default GlobalSearchResults;
