import NotificationContext from "./NotificationContext";
import notification_reducer from "../../reducers/notification-reducer";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { NotificationAPI } from "../../lib/endpoints";
import { useToast } from "../Modal/useModal&Toast";
import io from "socket.io-client"
import {
  FILTERED_NOTIFICATIONS,
  CLEAR_READ_NOTIFICATIONS,
  UNREAD_COUNT,
  FETCH_NOTIFICATIONS_ERROR,
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  ADD_NOTIFICATION,
  MARK_AS_READ_START,
  MARK_AS_READ_SUCCESS,
  MARK_AS_READ_ERROR,
  MARK_ALL_AS_READ_START,
  MARK_ALL_AS_READ_SUCCESS,
  MARK_ALL_AS_READ_ERROR,
  DELETE_NOTIFICATION_START,
  DELETE_NOTIFICATION_ERROR,
  DELETE_NOTIFICATION_SUCCESS
} from "../../actions";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  updatingNotifications: [],
  isMarkingAll: false,
  lastMarkedAll: null,
  deletingIds: [],
};

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notification_reducer, initialState);
  const [filter, setFilter] = useState("all"); 
  const { showToast, TOAST_TYPES } = useToast();

  

  const fetchNotifications = async () => {
    dispatch({type: FETCH_NOTIFICATIONS_START})
    try {
      const res = await NotificationAPI.getAll()
      dispatch({type: FETCH_NOTIFICATIONS_SUCCESS, payload: res.data})
    } catch (error) {
      dispatch({
        type: FETCH_NOTIFICATIONS_ERROR,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  useEffect(() => {
    fetchNotifications()
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL);

    socket.on("new-notification", (notification) => {
      dispatch({type: ADD_NOTIFICATION, payload: notification});
    });

    return () => socket.disconnect();
  }, []);

  const markAsRead = async(id) =>  {
    dispatch({type: MARK_AS_READ_START, payload: id})
    try {
      await NotificationAPI.markAsRead(id);
      dispatch({ type: MARK_AS_READ_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: MARK_AS_READ_ERROR,
        payload: {id, error: error.response?.data?.message || "Failed to mark as read"}
      });
    }
  };
  const markAllAsRead = () => async (dispatch) => {
    dispatch({ type: MARK_ALL_AS_READ_START });

    try {
      await NotificationAPI.markAllAsRead()

      dispatch({ type: MARK_ALL_AS_READ_SUCCESS, payload: new Date() })
      showToast("All Notifications marked as read", TOAST_TYPES.INFO);
      
    } catch (error) {
      dispatch({
        type: MARK_ALL_AS_READ_ERROR,
        payload: error.response?.data?.message || "Failed to mark as read",
      });
      showToast(`Error marking all Notifications as read`, TOAST_TYPES.ERROR);

    }
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL);

    socket.on("notifications-marked-all-read", () => {
      dispatch({ type: "MARK_ALL_AS_READ_SUCCESS", payload: new Date() });
    });

    return () => socket.disconnect();
  }, []);
  const deleteNotification = async(id) =>  {
    dispatch({ type: DELETE_NOTIFICATION_START, payload: id });

    try {
      await NotificationAPI.delete(id);
      dispatch({ type: DELETE_NOTIFICATION_SUCCESS, payload: id })
      showToast("Notification deleted successfully", TOAST_TYPES.SUCCESS);
      
    } catch (error) {
      dispatch({
        type: DELETE_NOTIFICATION_ERROR,
        payload:
          error.response?.data?.message || "Failed to delete notification",
      });
      showToast(`Failed to delete Notification`, TOAST_TYPES.ERROR);

    }
  };
  const clearReadNotifications = () => {
    dispatch({ type: CLEAR_READ_NOTIFICATIONS });
  };
  const unreadCount = () => {
    dispatch({ type: UNREAD_COUNT });
  };
  const filteredNotifications = useMemo(() => {
    const notifications = Array.isArray(state.notifications)
      ? state.notifications
      : [];

    switch (filter) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "read":
        return notifications.filter((n) => n.isRead);
      default:
        return notifications;
    }
  }, [state.notifications, filter]);

  const getNotificationsByFilter = useCallback(
    (filterType) => {
      const notifications = Array.isArray(state.notifications)
        ? state.notifications
        : [];

      switch (filterType) {
        case "unread":
          return notifications.filter((n) => !n.isRead);
        case "read":
          return notifications.filter((n) => n.isRead);
        default:
          return notifications;
      }
    },
    [state.notifications]
  );
  
  useCallback

 
      useEffect(() => {
        unreadCount()
      }, [state.notifications]);

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearReadNotifications,
        filteredNotifications,
        setFilter,
        filter,
        getNotificationsByFilter
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
