"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const NotificationsContext = createContext({
  notifications: [],
  unreadCount: 0,
  unreadMessagesCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  deleteNotifications: async () => {},
  clearChatBadge: () => {},
  fetchNotifications: () => {},
});

// Helper: flatten a raw API notification to a simpler shape
// API shape: { id, type, data: { message, type, conversation_uuid, quote_request_uuid, status }, read_at, created_at }
const normalizeNotification = (raw) => ({
  id: raw.id,
  message: raw.data?.message || raw.message || '',
  notification_type: raw.data?.type || raw.notification_type || raw.type || '',
  conversation_uuid: raw.data?.conversation_uuid || null,
  quote_request_uuid: raw.data?.quote_request_uuid || null,
  boq_request_uuid: raw.data?.boq_request_uuid || null,
  status: raw.data?.status || null,
  read_at: raw.read_at,
  created_at: raw.created_at,
});

export const NotificationsProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const echoRef = useRef(null);

  // Reset the chat icon badge (call this when user opens the chat page)
  const clearChatBadge = () => setUnreadMessagesCount(0);

  // Fetch existing notifications from the API
  // Response shape: { unread_count: 4, notifications: { data: [...], current_page, ... } }
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/auth/notifications");
      const raw = res.data;

      // Extract unread count from API if provided
      if (typeof raw?.unread_count === 'number') {
        setUnreadCount(raw.unread_count);
      }

      // Extract notifications array from paginated response
      let list = [];
      if (Array.isArray(raw)) {
        list = raw;
      } else if (Array.isArray(raw?.data)) {
        list = raw.data;
      } else if (Array.isArray(raw?.notifications)) {
        list = raw.notifications;
      } else if (Array.isArray(raw?.notifications?.data)) {
        // Paginated: { notifications: { data: [...] } }
        list = raw.notifications.data;
      }

      const normalized = list.map(normalizeNotification);
      setNotifications(normalized);

      // Set unread messages count (new_chat_message notifications that are unread)
      const unreadMsgs = normalized.filter(
        (n) => !n.read_at && n.notification_type === 'new_chat_message'
      ).length;
      setUnreadMessagesCount(unreadMsgs);

      // Only set unread count from list if API didn't give us one directly
      if (typeof raw?.unread_count !== 'number') {
        setUnreadCount(normalized.filter((n) => !n.read_at).length);
      }
    } catch (e) {
      console.error("[Notifications] Failed to fetch notifications", e);
    }
  };

  // Mark a single notification as read
  const markAsRead = async (id) => {
    try {
      await api.post(`/auth/notifications/${id}/mark-read`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (e) {
      console.error("[Notifications] Failed to mark as read", e);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await api.post("/auth/notifications/mark-all-read");
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() }))
      );
      setUnreadCount(0);
      setUnreadMessagesCount(0);
    } catch (e) {
      console.error("[Notifications] Failed to mark all as read", e);
    }
  };

  // Delete selected notifications by IDs — POST /auth/notifications/bulk-delete
  const deleteNotifications = async (ids) => {
    if (!ids || ids.length === 0) return;
    try {
      await api.post("/auth/notifications/bulk-delete", { ids });
      // Remove deleted notifications from state
      setNotifications((prev) => {
        const remaining = prev.filter((n) => !ids.includes(n.id));
        // Recalculate counts from remaining
        setUnreadCount(remaining.filter((n) => !n.read_at).length);
        setUnreadMessagesCount(
          remaining.filter((n) => !n.read_at && n.notification_type === 'new_chat_message').length
        );
        return remaining;
      });
    } catch (e) {
      console.error("[Notifications] Failed to delete notifications", e);
      throw e;
    }
  };

  // Add an incoming real-time notification to state
  const addNotification = (notification) => {
    console.log("[Notifications] Real-time notification received:", notification);
    const normalized = normalizeNotification(notification);
    setNotifications((prev) => [normalized, ...prev]);
    setUnreadCount((prev) => prev + 1);
    // Also bump the chat badge if it's a message notification
    if (normalized.notification_type === 'new_chat_message') {
      setUnreadMessagesCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Fetch existing notifications on mount
    fetchNotifications();

    const token = localStorage.getItem("access_token");
    if (!token) return;

    // Initialise Echo (shared instance for notifications)
    window.Pusher = Pusher;
    const echo = new Echo({
      broadcaster: "reverb",
      key: "8f4c1d2a9b7e6c5d3a1f0e9d8c7b6a5",
      wsHost: "backend.prosental.com",
      wsPort: 443,
      wssPort: 443,
      forceTLS: true,
      enabledTransports: ["ws", "wss"],
      authEndpoint: "https://backend.prosental.com/api/broadcasting/auth",
      auth: {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      },
    });

    echoRef.current = echo;

    const userUuid = user.uuid || user.id;
    if (!userUuid) return;

    // Subscribe to private notification channel: App.Models.User.{uuid}
    echo
      .private(`App.Models.User.${userUuid}`)
      .notification((notification) => {
        addNotification(notification);
      })
      .error((err) => {
        console.error("[Notifications] Channel subscription error:", err);
      });

    console.log(`[Notifications] Subscribed to App.Models.User.${userUuid}`);

    return () => {
      try {
        echo.leave(`App.Models.User.${userUuid}`);
        echo.disconnect();
      } catch (e) {}
    };
  }, [isAuthenticated, user?.uuid, user?.id]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        unreadMessagesCount,
        markAsRead,
        markAllAsRead,
        deleteNotifications,
        clearChatBadge,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
