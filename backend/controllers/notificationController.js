import { Notification } from "../models/notificationModel.js";

export const createNotification = async (req, res) => {
    try {
        const { title, message, type, priority } = req.body
        
        if (!title || !message || !type) {
            return res.status(400).json({
                success: false,
                message: "All fields must be filled"
            })
        }

        const notification = new Notification({
            title,
            message,
            type,
            priority: priority || "low",

        })

        await notification.save();

        const io = req.app.get("io");
        io.emit("new-notification", {
            ...notification.toObject(),
            time: formatTimeAgo(notification.createdAt)
        })

        res.status(201).json({
            success: true,
            notification
        })
    } catch (error) {
        res.status(500).json({  
          success: false,
          message: "Error creating notification",
          error:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
}

//get all notifications with filters
export const getNotifications = async (req, res) => {
    try {
        const { type, isRead, priority, sortBy, limit } = req.query;
        const filter = {}
        const sort = {}

        if (type) filter.type = type;
        if (isRead) filter.isRead = isRead === "true";
        if (priority) filter.priority = priority;

        sortBy === "oldest" ? sort.createdAt = 1 : sort.createdAt = -1;

        const notifications = await Notification.find(filter)
            .sort(sort)
            .limit(parseInt(limit) || 50);
        
        const formattedNotifications = notifications.map(notif => ({
            ...notif.toObject(),
            time: formatTimeAgo(notif.createdAt)
        }))

        res.json({
            success: true,
            count: notifications.length,
            notifications: formattedNotifications
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching notifications"
        })
    }
}

export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            })
        }

        res.json({
            success: true,
            notification
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating notification"
        })
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            })
        }

        res.json({
            success: true,
            message: 'Notification deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting notification"
        })
    }
}

export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { isRead: false },
            {$set: {isRead: true}}
        )

        const io = req.app.get("io")
        io.emit("notifications-marked-all-read")

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update notifications'
        })
    }
}
  function formatTimeAgo(timestamp) {
    const seconds = Math.floor((new Date() - timestamp) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
      }
    }

    return "Just now";
  };