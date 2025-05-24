import NotificationContext from "./NotificationContext";
import notification_reducer from "../../reducers/notification-reducer";
import { useEffect, useReducer } from "react";
import { sampleNotifications } from "../../lib/constants";
import {
  SET_NOTIFICATIONS,
  MARK_AS_READ,
  MARK_ALL_AS_READ,
  FILTERED_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  CLEAR_READ_NOTIFICATIONS,
  UNREAD_COUNT,
} from "../../actions";

const initialState = {
  notifications: [],
  unreadCount: 0,
};

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notification_reducer, initialState);

  const setNotification = () => {
    dispatch({ type: SET_NOTIFICATIONS, payload: sampleNotifications });
  };

  const markAsRead = (id) => {
    dispatch({ type: MARK_AS_READ, payload: id });
  };
  const markAllAsRead = () => {
    dispatch({ type: MARK_ALL_AS_READ });
  };
  const deleteNotification = (id) => {
    dispatch({ type: DELETE_NOTIFICATIONS, payload: id });
  };
  const clearReadNotifications = () => {
    dispatch({ type: CLEAR_READ_NOTIFICATIONS });
  };
  const unreadCount = () => {
    dispatch({ type: UNREAD_COUNT });
  };
  const getFilteredNotifications = (filter) => {
    switch (filter) {
      case "unread":
        return state.notifications.filter((n) => !n.isRead);
      case "read":
        return state.notifications.filter((n) => n.isRead);
      default:
        return state.notifications;
    }
    };
    
      useEffect(() => {
        setNotification()
      }, []);

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        setNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearReadNotifications,
        getFilteredNotifications,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
