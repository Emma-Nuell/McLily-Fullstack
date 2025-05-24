import { useEffect, useState } from "react";
import { useNotificationContext, useThemeContext } from "../context/index.js";
import { useModal, useToast } from "../context/Modal/useModal&Toast.js";

import { SlidersHorizontal, Trash, Check, Bell, X, Eye } from "lucide-react";

const Notifications = () => {
const {showConfirmation, OPERATION_TYPES} = useModal()
const {showToast, TOAST_TYPES} = useToast()

  const {
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearReadNotifications,
    getFilteredNotifications,
  } = useNotificationContext();
  const { theme } = useThemeContext();
  const [filter, setFilter] = useState("all");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  

  const handleNotificationDelete = (notification) => {
    showConfirmation({
      operationType: OPERATION_TYPES.DELETE,
      itemType: "notification",
      itemName: `${notification.title} notification`,  
      onConfirm: async () => {
        try {
          await deleteNotification(notification.id);
          showToast("Notification deleted successfully", TOAST_TYPES.SUCCESS);
        } catch (error) {
          showToast(`Failed to delete notification: ${error.message}`, TOAST_TYPES.ERROR);
        }
      }
    })
  }

  useEffect(() => {
    getFilteredNotifications(filter);
  }, [filter, getFilteredNotifications]);


  const getNotificationIcon = (type, priority) => {
    let bgColor = "";

    
    if (theme === "dark") {
      switch (priority) {
        case "high":
          bgColor = "bg-red-600";
          break;
        case "medium":
          bgColor = "bg-yellow-500";
          break;
        case "low":
          bgColor = "bg-green-600";
          break;
        default:
          bgColor = "bg-blue-600";
      }
    } else {
      switch (priority) {
        case "high":
          bgColor = "bg-red-200 text-red-700";
          break;
        case "medium":
          bgColor = "bg-yellow-200 text-yellow-700";
          break;
        case "low":
          bgColor = "bg-green-200 text-green-700";
          break;
        default:
          bgColor = "bg-blue-200 text-blue-700";
      }
    }

    return (
      <div
        className={`p-4 max-sm:p-2.5 rounded-full ${bgColor} flex items-center justify-center`}
      >
        <Bell className='size-10 max-sm:size-8' />
      </div>
    );
  };

  return (
    <div className='p-6'>
      <div className='mb-8 flex justify-between items-center'>
        <h2 className='dark:text-dark-text font-bold text-3xl max-sm:text-2xl'>
          Notifications
        </h2>
        <div className='relative'>
          <button
            className='cursor-pointer outline-none dark:text-dark-text'
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <SlidersHorizontal className='size-20 max-sm:size-16' />
          </button>

          {isFilterMenuOpen && (
            <div className='absolute right-0 mt-2 p-2.5 w-auto min-w-[130px] rounded-md shadow-lg z-10 bg-white dark:bg-dark-surface dark:text-dark-text'>
              <button
                onClick={() => {
                  setFilter("all");
                  setIsFilterMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-[15px] 
                   dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md
                 ${filter === "all" ? "dark:bg-gray-800 bg-gray-100" : ""}`}
              >
                All Notifications
              </button>
              <button
                onClick={() => {
                  setFilter("unread");
                  setIsFilterMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-[15px] 
                  dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md
                  ${filter === "unread" ? "dark:bg-gray-800 bg-gray-100" : ""}`}
              >
                Unread
              </button>
              <button
                onClick={() => {
                  setFilter("read");
                  setIsFilterMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-[15px]  
                  dark:hover:bg-gray-800 hover:bg-gray-100 rounded-md
                  ${filter === "read" ? "dark:bg-gray-800 bg-gray-100" : ""}`}
              >
                Read
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='bg-white dark:bg-slate-800 dark:text-dark-text rounded-lg shadow-lg p-8 mb-10'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <h2 className='text-lg font-medium'>
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${
                    unreadCount !== 1 ? "s" : ""
                  }`
                : "No unread notifications"}
            </h2>
            <p className='text-sm'>
              {filter === "all"
                ? "Showing all notifications"
                : filter === "unread"
                ? "Showing unread notifications"
                : "Showing read notifications"}
            </p>
          </div>

          <div className='flex space-x-4'>
            <button
              onClick={markAllAsRead}
              className={`flex items-center px-3 py-1.5 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700  ${
                unreadCount === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={unreadCount === 0}
            >
              <Check className='size-12 mr-2' />
              Mark all as read
            </button>

            <button
              onClick={clearReadNotifications}
              className={`flex items-center px-3 py-1.5 text-sm rounded cursor-pointer bg-red-500/90 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600`}
            >
              <Trash className='size-12 mr-2' />
              Clear read notifications
            </button>
          </div>
        </div>
      </div>
      <div className='bg-white dark:bg-slate-800 p-6 py-8 rounded-lg shadow-lg'>
        <div className='space-y-3'>
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications(filter).map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-8 cursor-pointer dark:bg-slate-800`}
              >
                <div className='flex items-start'>
                  
                  <div className='flex-shrink-0 mr-6 max-sm:mr-4'>
                    {getNotificationIcon(
                      notification.type,
                      notification.priority
                    )}
                  </div>

                 
                  <div className='flex-1 min-w-0 '>
                    <div className='flex items-start justify-between mb-1 pr-6 max-sm:pr-3'>
                      <h3
                        className={`text-lg font-medium  ${
                          notification.isRead
                            ? "text-light-text-secondary dark:text-dark-text-secondary font-medium text-lg max-sm:text-sm"
                            : "text-light-text dark:text-dark-text font-bold text-xl max-sm:text-lg"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <span
                        className={`max-sm:hidden sm:inline text-xs text-gray-500 dark:text-gray-400`}
                      >
                        {notification.time}
                      </span>
                    </div>
                    <p
                      className={`text-nowrap text-ellipsis overflow-clip ${
                        notification.isRead
                          ? "text-light-text-secondary dark:text-dark-text-secondary font-medium text-sm"
                          : "text-light-text dark:text-dark-text font-medium text-lg max-sm:text-sm"
                      }`}
                    >
                      {notification.message}
                    </p>

    
                    <div className='mt-3 flex items-center justify-between w-full space-x-3'>
                      <div className='flex gap-4 items-center'>
                        <span
                          className={`px-2.5 py-2 text-xs rounded-lg capitalize bg-gray-200 dark:bg-gray-600 dark:text-gray-100`}
                        >
                          {notification.type}
                        </span>
                        <span
                          className={`px-2.5 py-2 text-xs rounded-lg capitalize ${
                            notification.priority === "high"
                              ? "bg-red-200 text-red-900 dark:bg-red-700 dark:text-red-100"
                              : notification.priority === "medium"
                              ? "bg-yellow-200 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-100"
                              : "bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-100"
                          }`}
                        >
                          {notification.priority} priority
                        </span>
                      </div>
                      <div>
                        <span
                          className={`sm:hidden text-xs text-gray-500 dark:text-gray-400`}
                        >
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>

                 
                  <div className='ml-2 flex-shrink-0 flex items-start space-x-4'>
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className={`p-2 rounded-full flex items-center justify-center dark:bg-gray-600 bg-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700`}
                        title='Mark as read'
                      >
                        <Eye className='size-10' />
                      </button>
                    )}
                    <button
                      onClick={() => handleNotificationDelete(notification)}
                      className={`p-2 rounded-full flex items-center justify-center dark:bg-gray-600 bg-light-button hover:bg-light-buttonhover dark:hover:bg-gray-700 `}
                      title='Delete notification'
                    >
                      <X className='size-10' />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`p-8 text-center `}>
              <Bell
                className={`size-13 mx-auto text-light-text-secondary dark:text-dark-text-secondary `}
              />
              <h3 className='mt-4 text-lg font-medium'>No notifications</h3>
              <p
                className={`mt-1 text-light-text-secondary dark:text-dark-text-secondary}`}
              >
                {filter === "all"
                  ? "You don't have any notifications yet."
                  : filter === "unread"
                  ? "You don't have any unread notifications."
                  : "You don't have any read notifications."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Notifications;
