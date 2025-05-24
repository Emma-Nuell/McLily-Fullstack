import { SET_NOTIFICATIONS, MARK_AS_READ, MARK_ALL_AS_READ, DELETE_NOTIFICATIONS, UNREAD_COUNT, FILTERED_NOTIFICATIONS, CLEAR_READ_NOTIFICATIONS } from "../actions";

const notification_reducer = (state, action) => {
    if (action.type === SET_NOTIFICATIONS) {
        const notifications = [...action.payload].sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        return { ...state, notifications: notifications };
    }
    if (action.type === MARK_AS_READ) {
        const updatedNotifications = state.notifications.map((notification) => {
            if (notification.id === action.payload) {
                return { ...notification, isRead: true };
            }
            return notification;
        });
        return { ...state, notifications: updatedNotifications };
    }
    if(action.type === MARK_ALL_AS_READ) {
        const updatedNotifications = state.notifications.map((notification) => {
            return { ...notification, isRead: true };
        });
        return { ...state, notifications: updatedNotifications };
    }
    if (action.type === DELETE_NOTIFICATIONS) {
        const updatedNotifications = state.notifications.filter((notification) => notification.id !== action.payload);
        return { ...state, notifications: updatedNotifications };
    }
    if(action.type === CLEAR_READ_NOTIFICATIONS) {
        const updatedNotifications = state.notifications.filter((notification) => !notification.isRead);
        return { ...state, notifications: updatedNotifications };
    }
    if (action.type === UNREAD_COUNT) {
        const unreadCount = state.notifications.filter((notification) => !notification.isRead).length;
        return { ...state, unreadCount: unreadCount };
    }
    

    throw new Error(`No Matching "${action.type}" - action type`);
}

export default notification_reducer