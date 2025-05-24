import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import ProductDescription from "./ProductDescription";
import { Dialog, Transition } from "@headlessui/react";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Pen, ShoppingCartIcon, Trash } from "lucide-react";
import { useProductContext } from "../../context/index.js";
import { useNavigate } from "react-router-dom";
import { useModal, useToast } from "../../context/Modal/useModal&Toast.js";

const SidePane = ({
  selectedProduct,
  isOpen,
  setIsOpen,
  closeSidePane,
  setSelectedProduct,
}) => {
  const { editProduct, editOn, deleteProduct } = useProductContext();
  const {showConfirmation, OPERATION_TYPES} = useModal()
  const {showToast, TOAST_TYPES} = useToast()

  const navigate = useNavigate();

  let images = selectedProduct?.images || [];
  const [mainImage, setMainImage] = useState(images[0]);
  const [expanded, setExpanded] = useState(false);
  const characterLimit = 250;
  const text = selectedProduct.description || "No description available";

  const isLong = text.length > characterLimit;
  const visibleText = expanded ? text : text.slice(0, characterLimit);


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
  
      const handleProductDelete = (product) => {
        showConfirmation({
          operationType: OPERATION_TYPES.DELETE,
          itemType: "product",
          itemName: `${product.name} product`,
          onConfirm: async () => {
            try {
              await deleteProduct(product.id);
              setSelectedProduct(null);
              closeSidePane();
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
  

  return (
    <div className='scrollbar-hidden pb-20'>
      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog as='div' className='relative z-50' onClose={setIsOpen}>
          <Transition.Child
            as={React.Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-50'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-50'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 opacity-50 transition-opacity' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={React.Fragment}
                  enter='transform transition ease-in-out duration-500'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                    <div className='flex h-full flex-col bg-white dark:bg-dark-background shadow-xl overflow-auto scrollbar-hidden'>
                      <div className='px-4 py-6 sm:px-6'>
                        <div className='flex items-center justify-between mb-6 pt-4 max-sm:pr-6'>
                          <Dialog.Title className='font-medium text-2xl dark:text-dark-text'>
                            Product Details
                          </Dialog.Title>
                          <button
                            type='button'
                            className='rounded-full p-1 cursor-pointer flex items-center justify-center bg-light-button dark:bg-dark-button'
                            onClick={closeSidePane}
                          >
                            <Cross2Icon className='size-16' />
                          </button>
                        </div>
                      </div>
                      <div className='relative flex-1 px-4 sm:px-6'>
                        {selectedProduct && (
                          <div className='h-full flex flex-col'>
                            <div className='flex-1 overflow-y-auto p-4'>
                              <div className='mb-6'>
                                {selectedProduct.images &&
                                selectedProduct.images.length > 0 ? (
                                  <div className='relative h-120 bg-gray-100 rounded-md overflow-hidden mb-4'>
                                    <img
                                      src={mainImage}
                                      alt={selectedProduct.name}
                                      className='h-full w-full object-cover'
                                    />
                                  </div>
                                ) : (
                                  <div className='h-100 bg-gray-200 rounded-md flex items-center justify-center mb-4'>
                                    <ShoppingCartIcon className='h-12 w-12 text-gray-400' />
                                  </div>
                                )}

                                {/* Thumbnail images */}
                                {selectedProduct.images &&
                                  selectedProduct.images.length > 1 && (
                                    <div className='flex gap-4 justify-around space-x-2 overflow-x-auto pb-2'>
                                      {selectedProduct.images.map(
                                        (image, index) => (
                                          <div
                                            key={index}
                                            className='h-40 w-40 flex-shrink-0 rounded overflow-hidden border border-gray-200 cursor-pointer'
                                          >
                                            <img
                                              src={image}
                                              onClick={() =>
                                                setMainImage(image)
                                              }
                                              alt={`${selectedProduct.name} ${
                                                index + 1
                                              }`}
                                              className='h-full w-full object-cover'
                                            />
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>

                              {/* Basic Details */}
                              <div className='mb-6'>
                                <h3 className='text-2xl font-bold dark:text-dark-text mb-4'>
                                  {selectedProduct.name}
                                </h3>
                                <div className='flex w-full gap-6 items-center mt-1'>
                                  <span className='bg-indigo-200 dark:bg-indigo-400 text-indigo-800 dark:text-indigo-950 text-xs font-semibold px-2.5 py-2.5 rounded'>
                                    {selectedProduct.brand}
                                  </span>
                                  <span className='bg-green-200 dark:bg-green-400 text-green-800 dark:text-green-950 text-xs font-semibold px-2.5 py-2.5 rounded ml-2'>
                                    {selectedProduct.category}
                                  </span>
                                  {selectedProduct.featured && (
                                    <span className='bg-yellow-200 dark:bg-yellow-400 text-yellow-800 dark:text-yellow-950 text-xs font-semibold px-2.5 py-2.5 rounded ml-2'>
                                      Featured
                                    </span>
                                  )}
                                </div>

                                <div className='mt-4 grid grid-cols-2 gap-4'>
                                  <div className='bg-gray-50 dark:bg-dark-surface p-3 rounded'>
                                    <p className='text-sm text-light-text dark:text-dark-text'>
                                      Price
                                    </p>
                                    <p className='text-lg font-semibold dark:text-dark-text'>
                                      ₦
                                      {Number(
                                        selectedProduct.price
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  <div className='bg-gray-50 p-3 rounded dark:bg-dark-surface'>
                                    <p className='text-sm text-light-text dark:text-dark-text'>
                                      Stock
                                    </p>
                                    <p className='text-lg font-semibold dark:text-dark-text'>
                                      {selectedProduct.stock}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {selectedProduct.sizes &&
                                selectedProduct.sizes.length > 0 && (
                                  <div className='mb-6'>
                                    <h4 className='text-sm font-medium text-light-text dark:text-dark-text uppercase mb-2'>
                                      Available Sizes
                                    </h4>
                                    <div className='flex w-full justify-between flex-wrap gap-4'>
                                      {selectedProduct.sizes.map(
                                        (size, index) => (
                                          <div
                                            key={index}
                                            className='bg-gray-50 border dark:bg-dark-surface dark:border-dark-border border-gray-200 rounded p-4 text-sm'
                                          >
                                            <span className='font-medium uppercase dark:text-dark-text'>
                                              {size.value}
                                            </span>
                                            <div className='flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1'>
                                              <span>Stock: {size.stock}</span>
                                              <span className='mx-1'>•</span>
                                              <span>
                                                ₦
                                                {Number(
                                                  size.price
                                                ).toLocaleString()}
                                              </span>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                              {selectedProduct.specifications && (
                                <div className='mb-6'>
                                  <h4 className='text-sm font-medium dark:text-dark-text uppercase mb-4'>
                                    Specifications
                                  </h4>
                                  <div className='bg-gray-50 dark:bg-dark-surface dark:border-dark-border border border-aquamine-5 rounded-md overflow-hidden'>
                                    <table className='min-w-full divide-y divide-aquamine-5 dark:divide-gray-700'>
                                      <tbody className='divide-y divide-aquamine-5 dark:divide-gray-900'>
                                        {Object.entries(
                                          selectedProduct.specifications
                                        ).map(([key, value], index) => (
                                          <tr key={index}>
                                            <td className='px-4 py-2 text-sm font-medium dark:text-dark-text  capitalize'>
                                              {key}
                                            </td>
                                            <td className='px-4 py-2 text-sm dark:text-dark-text-secondary text-light-text-secondary '>
                                              {value}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}

                              {selectedProduct.tags &&
                                selectedProduct.tags.length > 0 && (
                                  <div className='mb-6'>
                                    <h4 className='text-sm font-medium dark:text-dark-text uppercase mb-4'>
                                      Tags
                                    </h4>
                                    <div className='flex flex-wrap gap-4'>
                                      {selectedProduct.tags.map(
                                        (tag, index) => (
                                          <span
                                            key={index}
                                            className='bg-gray-100 dark:bg-dark-surface dark:text-dark-text text-sm px-2 py-2 rounded'
                                          >
                                            {tag}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                              {selectedProduct.description && (
                                <div className='mb-4 pb-26'>
                                  <h4 className='text-sm font-medium dark:text-dark-text uppercase mb-4'>
                                    Description
                                  </h4>
                                  <div className='bg-white dark:bg-gray-600  dark:border-dark-border border border-aquamine-5 rounded-md p-3'>
                                    <p className='text-sm dark:text-dark-text whitespace-pre-line'>
                                      {visibleText}
                                      {isLong && !expanded && "....."}
                                    </p>
                                  </div>
                                  {isLong && (
                                    <button
                                      onClick={() => setExpanded(!expanded)}
                                      className='text-purple-600 hover:underline text-sm mt-2'
                                    >
                                      {expanded ? "Show less" : "Read more"}
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Footer Actions */}
                            <div className='border border-aquamine-5 dark:border-dark-border p-4 flex gap-6 mb-8 fixed bottom-4 right-12 z-10 backdrop-blur-md bg-white/30 dark:bg-white/50 rounded-lg shadow-md'>
                              <div className='flex space-x-3'>
                                <button
                                  onClick={() =>
                                    handleProductEdit(selectedProduct)
                                  }
                                  className='flex-1 text-blue-600 dark:text-blue-900 bg-blue-600/20 dark:bg-blue-600/40  py-3 px-4 rounded-md hover:bg-blue-400 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2'
                                >
                                  <Pen size={22} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleProductDelete(selectedProduct)
                                  }
                                  className='flex-1 text-red-600  bg-red-600/20 dark:bg-red-600/40 dark:text-red-900  py-3 px-4 cursor-pointer  rounded-md hover:bg-red-400 focus:outline-none focus:ring-1 focus:ring-red-400 focus:ring-offset-2'
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
export default SidePane;
