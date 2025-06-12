import { Trash, Pen, Coffee, Plus, Search, Eye, ChevronLeft, ChevronRight, X,  } from "lucide-react";
import { Link } from "react-router-dom";
import { tableDetails } from "../../lib/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/index.js";
import { useModal, useToast } from "../../context/Modal/useModal&Toast.js";

const Main = ({ products, setSelectedProduct, setIsOpen, searchInput, setSearchInput }) => {
const {editProduct, editOn, deleteProduct, addFeatured, removeFeatured, productSearch, clearSearch} = useProductContext()
const {showConfirmation, OPERATION_TYPES} = useModal()
const {showToast, TOAST_TYPES} = useToast()

  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(20)
  // const [searchInput, setSearchInput] = useState(searchTerm || "")
  const [debouncedSearch, setDebouncedSearch] = useState("");

  
  const navigate = useNavigate()

  const indexOfLastProduct = currentPage * entriesPerPage
  const indexOfFirstProduct = indexOfLastProduct - entriesPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / entriesPerPage)

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
            await deleteProduct(product.id);
            showToast("Product deleted successfully", TOAST_TYPES.SUCCESS);
          } catch (error) {
            showToast(
              `Failed to delete Product: ${error.message}`,
              TOAST_TYPES.ERROR
            );
          }
        },
      });
    };

    const handleFeaturedAdd = (product) => {
      showConfirmation({
        operationType: OPERATION_TYPES.ADD,
        itemType: "product",
        itemName: `${product.name} among featured products`,
        onConfirm: async () => {
          try {
            await addFeatured(product.id);
            showToast("Product added successfully", TOAST_TYPES.SUCCESS);
          } catch (error) {
            showToast(
              `Failed to delete product: ${error.message}`,
              TOAST_TYPES.ERROR
            );
          }
        },
      });
    };
    const handleFeaturedRemove = (product) => {
      showConfirmation({
        operationType: OPERATION_TYPES.REMOVE,
        itemType: "product",
        itemName: `${product.name} from featured products`,
        onConfirm: async () => {
          try {
            await removeFeatured(product.id);
            showToast("Product removed successfully", TOAST_TYPES.SUCCESS);
          } catch (error) {
            showToast(
              `Failed to delete product: ${error.message}`,
              TOAST_TYPES.ERROR
            );
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
            await editOn()
            editProduct(product);
            navigate("/add-product");
          } catch (error) {
            showToast(
              `Failed to edit product: ${error.message}`,
              TOAST_TYPES.ERROR
            );
          }
        },
      });
    };
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
     productSearch(debouncedSearch)
    } else {
     clearSearch()
    }
  }, [debouncedSearch, clearSearch, productSearch]);

  return (
    <div className='p-6'>
      <div className='flex items-center gap-4 mb-6'>
        <div>
          <Coffee size={24} />
        </div>
        <p className='text-light-text-secondary dark:text-dark-text-secondary font-light font-poppins'>
          Tip search by Product ID: Each product is provided with a unique ID,
          which you can rely on to find the exact product you need.
        </p>
      </div>
      <div className='flex justify-between items-center flex-wrap gap-8'>
        <div className='flex-grow flex items-center gap-6'>
          <div className='flex items-center gap-4'>
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
        <Link
          to='/add-product'
          className='flex items-center justify-center gap-6 p-8 border-1 border-light-border dark:border-dark-border dark:text-dark-text rounded-lg shadow-lg dark:bg-dark-button dark:hover:bg-dark-buttonhover'
        >
          <Plus /> Add Product
        </Link>
      </div>
      <div className='bg-white dark:bg-slate-800 rounded-lg pb-18 overflow-x-auto scrollbar-hidden'>
        <table className='min-w-full mt-10 border-separate border-spacing-y-6'>
          <thead className='bg-aquamine-7 dark:bg-slate-700'>
            <tr className='mb-10'>
              {tableDetails.map((detail, index) => {
                const isFirst = index === 0;
                const isLast = index === tableDetails.length - 1;

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
          <tbody className='bg-white dark:bg-slate-800 mt-10 '>
            {currentProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-800"
                    : "bg-aquamine-7 dark:bg-slate-700"
                } hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer`}
                onClick={() => handleProductClick(product)}
              >
                <td className='rounded-l-xl px-6 py-8 text-left text-xs font-medium text-gray-500 uppercase tracking-wider pr-16 min-w-[280px] max-sm:min-w-[190px]'>
                  <div className='flex items-center'>
                    <div className='h-25 w-25 max-sm:h-20 max-sm:w-20 flex-shrink-0 flex items-center'>
                      <img src={product.images[0]} alt={product.name} />
                    </div>
                    <div className='ml-6'>
                      <div className='font-medium text-black dark:text-dark-text text-[15px] max-sm:text-xs max-w-[300px] max-sm:max-w-[220px] text-nowrap overflow-hidden overflow-ellipsis'>
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className='px-4 py-6 whitespace-nowrap text-[15px] max-sm:text-xs min-w-[160px] max-sm:min-w-[120px]'>
                  #{product.id}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[15px] max-sm:text-xs min-w-[180px] max-sm:min-w-[140px]'>
                  {product.category}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[15px] max-sm:text-xs min-w-[180px] max-sm:min-w-[140px]'>
                  ₦{Number(product.price).toLocaleString()}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[15px] max-sm:text-xs min-w-[150px] max-sm:min-w-[120px]'>
                  {product.sales}
                </td>
                <td className='px-4 py-6 whitespace-nowrap text-[15px] max-sm:text-xs min-w-[150px] max-sm:min-w-[120px]'>
                  {product.stock}
                </td>
                <td className='rounded-r-xl px-6 py-4 whitespace-nowrap text-sm font-medium min-w-[170px] max-sm:min-w-[130px]'>
                  <div className='flex gap-4 items-center justify-start'>
                    {product.featured ? (
                      <button
                        className='cursor-pointer text-red-600 dark:text-red-700 hover:text-red-800 dark:hover:text-red-400 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4 '
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFeaturedRemove(product);
                        }}
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        className='cursor-pointer text-blue-600 dark:text-blue-700 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4 '
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFeaturedAdd(product);
                        }}
                      >
                        <Plus size={20} />
                      </button>
                    )}
                    <button
                      className='text-green-500 dark:text-green-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4 hover:text-green-800 dark:hover:text-green-400'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductEdit(product);
                      }}
                    >
                      <Pen size={20} />
                    </button>
                    <button
                      className='text-red-600 dark:text-red-700 cursor-pointer   hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-4 hover:text-red-800 dark:hover:text-red-400'
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
export default Main;
