import { MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNotificationContext, useThemeContext } from "../context/index.js";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  MonitorCog,
  Banknote,
  Package,
  Warehouse,
  ChartNoAxesCombined,
} from "lucide-react";

const Messages = () => {
        const {  unreadCount, getNotificationsByFilter } =
          useNotificationContext();
    const { theme } = useThemeContext();
    const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

    const recentMessages = getNotificationsByFilter("unread").slice(0, 5);
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/notifications");
  };

  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case "user":
        return <User className='size-10 max-sm:size-8' />;
      case "system":
        return <MonitorCog className='size-10 max-sm:size-8' />;
      case "payment":
        return <Banknote className='size-10 max-sm:size-8' />;
      case "order":
        return <Package className='size-10 max-sm:size-8' />;
      case "inventory":
        return <Warehouse className='size-10 max-sm:size-8' />;
      case "report":
        return <ChartNoAxesCombined className='size-10 max-sm:size-8' />;
      default:
        return <Bell className='size-10 max-sm:size-8' />;
    }
  };

  const getNotificationIcon = (type, priority) => {
    let bgColor = "";

    if (theme === "dark") {
      switch (priority) {
        case "high":
          bgColor = "bg-red-600 text-red-200";
          break;
        case "medium":
          bgColor = "bg-yellow-600 text-yellow-200";
          break;
        case "low":
          bgColor = "bg-green-600 text-green-200";
          break;
        default:
          bgColor = "bg-blue-600 text-blue-200";
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
        {getNotificationTypeIcon(type)}
      </div>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className='relative flex justify-end items-center mr-2'
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='cursor-pointer outline-none focus:outline-none dark:text-white'
      >
        <MessageSquare className='text-xl' />
        {unreadCount > 0 && (
          <span className='absolute -top-4 -right-3 bg-light-button dark:bg-dark-button text-xs font-medium rounded-full px-3 py-1'>
            {unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className='absolute right-0 max-sm:-right-35 top-17 mt-2 p-6 w-auto min-w-[280px] rounded-lg shadow-lg z-10 bg-white dark:bg-slate-800 dark:text-dark-text'>
          <div className='border-b-1 py-4 pt-1 border-light-border dark:border-dark-border'>
            <h3 className='font-extrabold text-xl'>Notifications</h3>
          </div>
          <div className='py-4'>
            {recentMessages.map((message) => (
              <div
                key={message._id}
                className='flex gap-6 items-center justify-start py-5'
              >
                <div>{getNotificationIcon(message.type, message.priority)}</div>
                <div>
                  <h4
                    className={`text-md font-medium  ${
                      message.isRead
                        ? "text-light-text-secondary dark:text-dark-text-secondary"
                        : "text-light-text dark:text-dark-text"
                    }`}
                  >
                    {message.title}
                  </h4>
                  <p
                    className={`text-wrap text-ellipsis overflow-clip text-xs  ${
                      message.isRead
                        ? "text-light-text-secondary dark:text-dark-text-secondary font-medium"
                        : "text-light-text dark:text-dark-text font-medium"
                    }`}
                  >
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='w-full flex items-center justify-center'>
            <button
              onClick={handleButtonClick}
              className='bg-light-button dark:bg-dark-button w-full rounded-md p-4 cursor-pointer hover:bg-light-buttonhover dark:hover:bg-dark-buttonhover font-medium'
            >
              {" "}
              View All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Messages;
