import React, { useState, useEffect } from "react";
import {
  BellIcon,
  CheckIcon,
  EyeIcon,
  TrashIcon,
  SunIcon,
  MoonIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

const NotificationsPage = () => {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'unread', 'read'
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Sample notification data
  useEffect(() => {
    // This would normally be an API call
    const sampleNotifications = [
      {
        id: 1,
        title: "New Order Received",
        message: "Order #12345 has been placed for $129.99",
        time: "5 minutes ago",
        isRead: false,
        type: "order",
        priority: "high",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      },
      {
        id: 2,
        title: "Payment Processed",
        message: "Payment for order #12340 has been successfully processed",
        time: "30 minutes ago",
        isRead: false,
        type: "payment",
        priority: "medium",
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      },
      {
        id: 3,
        title: "Product Out of Stock",
        message: "Nike Air Max 95 is now out of stock",
        time: "1 hour ago",
        isRead: false,
        type: "inventory",
        priority: "high",
        timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      },
      {
        id: 4,
        title: "New User Registration",
        message: "John Doe has created a new account",
        time: "2 hours ago",
        isRead: true,
        type: "user",
        priority: "low",
        timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      },
      {
        id: 5,
        title: "System Update Complete",
        message: "The system has been updated to version 2.3.0",
        time: "5 hours ago",
        isRead: true,
        type: "system",
        priority: "medium",
        timestamp: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
      },
      {
        id: 6,
        title: "Product Return Request",
        message: "Customer requested return for order #12288",
        time: "1 day ago",
        isRead: true,
        type: "order",
        priority: "medium",
        timestamp: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
      },
      {
        id: 7,
        title: "Weekly Report Generated",
        message: "Sales report for last week is now available",
        time: "2 days ago",
        isRead: true,
        type: "report",
        priority: "low",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
      },
    ];

    setNotifications(sampleNotifications);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Get filtered notifications based on current filter
  const getFilteredNotifications = () => {
    switch (filter) {
      case "unread":
        return notifications.filter((notification) => !notification.isRead);
      case "read":
        return notifications.filter((notification) => notification.isRead);
      default:
        return notifications;
    }
  };

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Clear all read notifications
  const clearReadNotifications = () => {
    setNotifications(
      notifications.filter((notification) => !notification.isRead)
    );
  };
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Get notification icon based on type
  const getNotificationIcon = (type, priority) => {
    let bgColor = "";

    // Determine bg color based on priority and dark mode
    if (darkMode) {
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
          bgColor = "bg-red-100 text-red-600";
          break;
        case "medium":
          bgColor = "bg-yellow-100 text-yellow-600";
          break;
        case "low":
          bgColor = "bg-green-100 text-green-600";
          break;
        default:
          bgColor = "bg-blue-100 text-blue-600";
      }
    }

    return (
      <div className={`p-3 rounded-full ${bgColor}`}>
        <BellIcon className='h-5 w-5' />
      </div>
    );
  };

  // Get unread count

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`py-4 px-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}
      >
        <div className='max-w-6xl mx-auto flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Notifications</h1>

          <div className='flex items-center space-x-4'>
            {/* Filter Button */}
            <div className='relative'>
              <button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className={`p-2 rounded-full ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <AdjustmentsHorizontalIcon className='h-16 w-16' />
              </button>

              {isFilterMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 py-2 w-48 rounded-md shadow-lg z-10 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => {
                      setFilter("all");
                      setIsFilterMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    } ${
                      filter === "all"
                        ? darkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                        : ""
                    }`}
                  >
                    All Notifications
                  </button>
                  <button
                    onClick={() => {
                      setFilter("unread");
                      setIsFilterMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    } ${
                      filter === "unread"
                        ? darkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                        : ""
                    }`}
                  >
                    Unread
                  </button>
                  <button
                    onClick={() => {
                      setFilter("read");
                      setIsFilterMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    } ${
                      filter === "read"
                        ? darkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                        : ""
                    }`}
                  >
                    Read
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {darkMode ? (
                <SunIcon className='h-5 w-5' />
              ) : (
                <MoonIcon className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-6xl mx-auto p-6'>
        {/* Notification Stats and Actions */}
        <div
          className={`mb-6 p-4 rounded-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow`}
        >
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div>
              <h2 className='text-lg font-medium'>
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${
                      unreadCount !== 1 ? "s" : ""
                    }`
                  : "No unread notifications"}
              </h2>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {filter === "all"
                  ? "Showing all notifications"
                  : filter === "unread"
                  ? "Showing unread notifications"
                  : "Showing read notifications"}
              </p>
            </div>

            <div className='flex space-x-3'>
              <button
                onClick={markAllAsRead}
                className={`flex items-center px-3 py-1.5 text-sm rounded ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                } ${unreadCount === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={unreadCount === 0}
              >
                <CheckIcon className='h-4 w-4 mr-1' />
                Mark all as read
              </button>

              <button
                onClick={clearReadNotifications}
                className={`flex items-center px-3 py-1.5 text-sm rounded ${
                  darkMode
                    ? "bg-red-900 hover:bg-red-800 text-white"
                    : "bg-red-50 hover:bg-red-100 text-red-600"
                }`}
              >
                <TrashIcon className='h-4 w-4 mr-1' />
                Clear read notifications
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className='space-y-3'>
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications().map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow transition-all duration-200 ${
                  darkMode
                    ? notification.isRead
                      ? "bg-gray-800"
                      : "bg-gray-800 border-l-4 border-blue-500"
                    : notification.isRead
                    ? "bg-white"
                    : "bg-white border-l-4 border-blue-500"
                }`}
              >
                <div className='flex items-start'>
                  {/* Icon */}
                  <div className='flex-shrink-0 mr-4'>
                    {getNotificationIcon(
                      notification.type,
                      notification.priority
                    )}
                  </div>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between mb-1'>
                      <h3
                        className={`text-lg font-medium ${
                          !notification.isRead && "font-semibold"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <span
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {notification.time}
                      </span>
                    </div>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {notification.message}
                    </p>

                    {/* Type and Priority badges */}
                    <div className='mt-2 flex items-center space-x-2'>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        {notification.type}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          notification.priority === "high"
                            ? darkMode
                              ? "bg-red-900 text-red-200"
                              : "bg-red-100 text-red-800"
                            : notification.priority === "medium"
                            ? darkMode
                              ? "bg-yellow-900 text-yellow-200"
                              : "bg-yellow-100 text-yellow-800"
                            : darkMode
                            ? "bg-green-900 text-green-200"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {notification.priority} priority
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='ml-4 flex-shrink-0 flex items-start space-x-2'>
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className={`p-1.5 rounded-full ${
                          darkMode
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        title='Mark as read'
                      >
                        <EyeIcon className='h-4 w-4' />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className={`p-1.5 rounded-full ${
                        darkMode
                          ? "bg-gray-700 hover:bg-red-800"
                          : "bg-gray-200 hover:bg-red-100 hover:text-red-600"
                      }`}
                      title='Delete notification'
                    >
                      <XMarkIcon className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`p-8 rounded-lg shadow text-center ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <BellIcon
                className={`h-12 w-12 mx-auto ${
                  darkMode ? "text-gray-600" : "text-gray-300"
                }`}
              />
              <h3 className='mt-4 text-lg font-medium'>No notifications</h3>
              <p
                className={`mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
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
      </main>
    </div>
  );
};

export default NotificationsPage;
