import React, { useState } from "react";
import { Toast, Dialog } from "radix-ui";
import { ModalContext, ToastContext } from "./useModal&Toast";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";


const OPERATION_TYPES = {
  DELETE: "delete",
  REMOVE: "remove",
  EDIT: "edit",
  ADD: "add",
  APPROVE: "approve",
  REJECT: "reject",
  ARCHIVE: "archive",
};

const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

const ModalToast = ({ children }) => {
  //modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    description: "",
    confirmText: "Confirm",
    operationType: OPERATION_TYPES.DELETE,
    onConfirm: () => {},
    itemName: "",
    itemType: "item",
  });

  //toast state
  const [toasts, setToasts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentToast, setCurrentToast] = useState(null);

  const showConfirmation = (config) => {
    setModalConfig({
      ...modalConfig,
      ...config,
    });
    setModalOpen(true);
  };

  const showToast = (message, type = TOAST_TYPES.SUCCESS, duration = 2000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (!open) {
      setCurrentToast(newToast);
      setOpen(true);
    }
  };

  const onToastClose = () => {
    setOpen(false);
    setTimeout(() => {
      if (toasts.length > 0) {
        const [nextToast, ...remainingToasts] = toasts;
        setCurrentToast(nextToast);
        setToasts(remainingToasts);
        setOpen(true);
      } else {
        setCurrentToast(null);
      }
    }, 300);
  };

  const getModalStyles = (type) => {
    switch (type) {
      case OPERATION_TYPES.DELETE:
        return {
          icon: (
            <AlertCircle className='text-red-600 size-13 dark:text-red-300' />
          ),
          headerColor: "bg-red-100 dark:bg-red-500/85",
          buttonColor: "bg-red-600 hover:bg-red-700",
          textColor: "text-red-600",
        };
      case OPERATION_TYPES.REMOVE:
        return {
          icon: (
            <AlertCircle className='text-red-600 size-13 dark:text-red-300' />
          ),
          headerColor: "bg-red-100 dark:bg-red-500/85",
          buttonColor: "bg-red-600 hover:bg-red-700",
          textColor: "text-red-600",
        };
      case OPERATION_TYPES.EDIT:
        return {
          icon: <Info className='text-blue-600 size-13 dark:text-blue-300' />,
          headerColor: "bg-blue-100 dark:bg-blue-500/85",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
          textColor: "text-blue-600",
        };
      case OPERATION_TYPES.ADD:
        return {
          icon: <Info className='text-green-600 size-13 dark:text-green-300' />,
          headerColor: "bg-green-100 dark:bg-green-500/85",
          buttonColor: "bg-green-600 hover:bg-green-700",
          textColor: "text-green-600",
        };
      case OPERATION_TYPES.APPROVE:
        return {
          icon: (
            <CheckCircle className='text-green-600 size-13 dark:text-green-300' />
          ),
          headerColor: "bg-green-100 dark:bg-green-500/85",
          buttonColor: "bg-green-600 hover:bg-green-700",
          textColor: "text-green-600",
        };
      case OPERATION_TYPES.REJECT:
        return {
          icon: (
            <AlertTriangle className='text-amber-600 size-13 dark:text-amber-300' />
          ),
          headerColor: "bg-amber-100 dark:bg-amber-500/85",
          buttonColor: "bg-amber-600 hover:bg-amber-700",
          textColor: "text-amber-600",
        };
      case OPERATION_TYPES.ARCHIVE:
        return {
          icon: <Info className='text-gray-600 size-13 dark:text-gray-300' />,
          headerColor: "bg-gray-100 dark:bg-gray-500/85",
          buttonColor: "bg-gray-600 hover:bg-gray-700",
          textColor: "text-gray-600",
        };
      default:
        return {
          icon: <Info className='text-blue-600 size-13 dark:text-blue-300' />,
          headerColor: "bg-blue-100 dark:bg-blue-500/85",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
          textColor: "text-blue-600",
        };
    }
  };

  const getToastStyles = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return {
          icon: <CheckCircle className='text-green-600 size-13' />,
          bgColor: "bg-green-200",
          borderColor: "border-green-300",
        };
      case TOAST_TYPES.ERROR:
        return {
          icon: <AlertCircle className='text-red-600 size-13' />,
          bgColor: "bg-red-200",
          borderColor: "border-red-300",
        };
      case TOAST_TYPES.INFO:
        return {
          icon: <Info className='text-blue-600 size-13' />,
          bgColor: "bg-blue-200",
          borderColor: "border-blue-300",
        };
      case TOAST_TYPES.WARNING:
        return {
          icon: <AlertTriangle className='text-yellow-600 size-13' />,
          bgColor: "bg-yellow-200",
          borderColor: "border-yellow-300",
        };
      default:
        return {
          icon: <Info className='text-blue-600 size-13' />,
          bgColor: "bg-blue-200",
          borderColor: "border-blue-300",
        };
    }
  };

  const modalContextValue = {
    showConfirmation,
    OPERATION_TYPES,
  };

  const toastContextValue = {
    showToast,
    TOAST_TYPES,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      <ToastContext.Provider value={toastContextValue}>
        {children}
        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black/20 backdrop-blur-sm data-[state=open]:animate-overlayShow z-100' />
            <Dialog.Content className='fixed top-1/2 left-1/2 z-110 transform -translate-x-1/2 -translate-y-1/2 max-w-md max-md:max-w-sm w-full bg-white dark:bg-dark-overlaybg dark:text-dark-text rounded-lg shadow-lg p-0 overflow-hidden focus:outline-none data-[state=open]:animate-contentShow'>
              {modalConfig && (
                <>
                  <div
                    className={`p-4 ${
                      getModalStyles(modalConfig.operationType).headerColor
                    } flex items-center gap-3`}
                  >
                    {getModalStyles(modalConfig.operationType).icon}
                    <Dialog.Title
                      className={`text-lg font-medium text-gray-900 dark:text-gray-950`}
                    >
                      {modalConfig.title ||
                        `${
                          modalConfig.operationType.charAt(0).toUpperCase() +
                          modalConfig.operationType.slice(1)
                        } ${modalConfig.itemType}`}
                    </Dialog.Title>
                    <Dialog.Close asChild className='ml-auto'>
                      <button className='rounded-full flex items-center justify-center cursor-pointer text-gray-500 dark:text-gray-300 hover:bg-white/20'>
                        <X className='size-15' />
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className='p-6'>
                    <Dialog.Description className='text-gray-600 mb-6 dark:text-gray-50 '>
                      {modalConfig.description ||
                        `Are you sure you want to ${
                          modalConfig.operationType
                        } ${
                          modalConfig.itemName
                            ? `"${modalConfig.itemName}"`
                            : `this ${modalConfig.itemType}`
                        }? 
                        ${
                          modalConfig.operationType === OPERATION_TYPES.DELETE
                            ? "This action cannot be undone."
                            : ""
                        }
                     `}
                    </Dialog.Description>
                    <div className='flex justify-end gap-3'>
                      <Dialog.Close asChild>
                        <button className='px-4 py-2 border border-gray-300 dark:border-dark-overlayborder text-gray-700 dark:text-white rounded-md hover:bg-gray-50 dark:hover:bg-dark-overlaybtnhover dark:bg-dark-overlaybtn cursor-pointer'>
                          Cancel
                        </button>
                      </Dialog.Close>
                      <button
                        className={`px-4 py-2 text-white rounded-md cursor-pointer ${
                          getModalStyles(modalConfig.operationType).buttonColor
                        }`}
                        onClick={() => {
                          setModalOpen(false);
                          if (modalConfig.onConfirm) {
                            modalConfig.onConfirm();
                          }
                        }}
                      >
                        {modalConfig.confirmText}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Toast.Provider swipeDirection='right'>
          {currentToast && (
            <Toast.Root
              className={`${getToastStyles(currentToast.type).bgColor} ${
                getToastStyles(currentToast.type).borderColor
              } border rounded-lg shadow-lg min-w-[260px] p-4 flex items-center gap-3 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut `}
              open={open}
              onOpenChange={setOpen}
              duration={currentToast.duration}
              onEscapeKeyDown={onToastClose}
              onSwipeEnd={onToastClose}
              onClose={onToastClose}
            >
              {getToastStyles(currentToast.type).icon}
              <div className='flex-1'>
                <Toast.Title className='font-medium text-gray-900'>
                  {currentToast.type.charAt(0).toUpperCase() +
                    currentToast.type.slice(1)}
                </Toast.Title>
                <Toast.Description className='text-gray-600 text-sm'>
                  {currentToast.message}
                </Toast.Description>
              </div>
              <Toast.Close asChild className='flex-none'>
                <button className='rounded-full  flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer'>
                  <X className='size-14' />
                </button>
              </Toast.Close>
            </Toast.Root>
          )}
          <Toast.Viewport className='fixed w-194 bottom-5 right-5 flex flex-col gap-2  max-w-[100vw] m-0 list-none z-50 outline-none' />
        </Toast.Provider>
      </ToastContext.Provider>
    </ModalContext.Provider>
  );
};

export default ModalToast;
