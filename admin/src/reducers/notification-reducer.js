import {  UNREAD_COUNT, FILTERED_NOTIFICATIONS, CLEAR_READ_NOTIFICATIONS, FETCH_NOTIFICATIONS_ERROR, FETCH_NOTIFICATIONS_START, FETCH_NOTIFICATIONS_SUCCESS, ADD_NOTIFICATION, MARK_AS_READ_START, MARK_AS_READ_SUCCESS, MARK_AS_READ_ERROR, MARK_ALL_AS_READ_START, MARK_ALL_AS_READ_SUCCESS, MARK_ALL_AS_READ_ERROR, DELETE_NOTIFICATION_START, DELETE_NOTIFICATION_SUCCESS } from "../actions";

const notification_reducer = (state, action) => {
    if (action.type === FETCH_NOTIFICATIONS_START) {
        return {...state, loading: true, error: null}
    }
    if (action.type === FETCH_NOTIFICATIONS_SUCCESS) {
        return {...state, loading: false, notifications: action.payload.notifications}
    }
    if (action.type === FETCH_NOTIFICATIONS_ERROR) {
        return {...state, loading: false, error: action.payload}
    }
    if (action.type === ADD_NOTIFICATION) {
        return {...state, notifications: [action.payload, ...state.notifications]}
    }
    if (action.type === MARK_AS_READ_START) {
        return {...state, updatingNotifications: [...state.updatingNotifications, action.payload], notifications: state.notifications.map(n => n._id === action.payload ? {...n, isRead: true} : n)}
    }
    if (action.type === MARK_AS_READ_SUCCESS) {
        return {...state, updatingNotifications: state.updatingNotifications.filter(id => id !== action.payload)}
    }
    if (action.type === MARK_AS_READ_ERROR) {
       
        return {
          ...state,
          error: action.payload.error,
          updatingNotifications: state.updatingNotifications.filter(
            (id) => id !== action.payload
          ),
          notifications: state.notifications.map((n) =>
            n._id === action.payload.id ? { ...n, isRead: false } : n
          ),
        };
    }
    if(action.type === MARK_ALL_AS_READ_START) {
        return { ...state, isMarkingAll: true, notifications:  state.notifications.map(n => ({
            ...n,
            isRead: true
          }))};
    }
    if(action.type === MARK_ALL_AS_READ_SUCCESS) {
        return { ...state, isMarkingAll: false, lastMarkedAll: action.payload};
    }
    if(action.type === MARK_ALL_AS_READ_ERROR) {
        return { ...state, isMarkingAll: false,error: action.payload, notifications:  state.notifications.map(n => ({
            ...n,
            isRead: false
          }))};
    }
    if (action.type === DELETE_NOTIFICATION_START) { 
        return {
          ...state,
          deletingIds: [...state.deletingIds, action.payload],
          notifications: state.notifications.filter((n) => n._id !== action.payload),
        };
    }
    if (action.type === DELETE_NOTIFICATION_SUCCESS) { 
        return {
          ...state,
          deletingIds: state.deletingIds.filter(id => id !== action.payload),
        };
    }
    if (action.type === DELETE_NOTIFICATION_START) { 
        return {
          ...state,
          error: action.payload.error,
          deletingIds: state.deletingIds.filter(
            (id) => id !== action.payload.id
          ),
        };
    }
    if(action.type === CLEAR_READ_NOTIFICATIONS) {
        const updatedNotifications = state.notifications.filter((notification) => !notification.isRead);
        return { ...state, notifications: updatedNotifications };
    }
    if (action.type === UNREAD_COUNT) {

      const notifications = Array.isArray(state.notifications)
        ? state.notifications
        : [];
        const unreadCount = notifications.filter(
          (notification) => !notification.isRead
        ).length;
        return { ...state, unreadCount: unreadCount };
    }
    

    throw new Error(`No Matching "${action.type}" - action type`);
}

export default notification_reducer