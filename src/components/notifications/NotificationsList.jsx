"use client";
import React, { useState } from 'react';
import { Bell, CheckCircle2, FileText, MessageSquare, CheckCheck, ArrowLeft, ArrowRight, Trash2, Square, CheckSquare } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationsContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const getIconAndColor = (type) => {
  switch (type) {
    case 'new_chat_message':
      return { icon: <MessageSquare className="w-5 h-5 text-purple-500" />, bg: 'bg-purple-50' };
    case 'new_quote_request':
      return { icon: <FileText className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50' };
    case 'quote_request_status_updated':
      return { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, bg: 'bg-green-50' };
    case 'new_boq_request':
      return { icon: <FileText className="w-5 h-5 text-orange-500" />, bg: 'bg-orange-50' };
    case 'boq_request_status_updated':
      return { icon: <CheckCircle2 className="w-5 h-5 text-teal-500" />, bg: 'bg-teal-50' };
    default:
      return { icon: <Bell className="w-5 h-5 text-gray-500" />, bg: 'bg-gray-50' };
  }
};

const getNotificationUrl = (notification, user) => {
  const isDashboard = user?.type === 'supplier' || user?.type === 'admin';
  switch (notification.notification_type) {
    case 'new_chat_message':
      const chatBase = isDashboard ? '/dashboard/chat' : '/chat';
      return notification.conversation_uuid
        ? `${chatBase}?conversation=${notification.conversation_uuid}`
        : chatBase;
    case 'new_quote_request':
    case 'quote_request_status_updated':
      return isDashboard ? '/dashboard/quotas' : '/quotes';
    case 'new_boq_request':
    case 'boq_request_status_updated':
      return isDashboard ? '/dashboard/quotas' : '/boqs';
    default:
      return null;
  }
};

const formatRelativeTime = (dateString, isEnglish) => {
  if (!dateString) return '';
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (isEnglish) {
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  } else {
    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} د`;
    if (hours < 24) return `منذ ${hours} س`;
    return `منذ ${days} يوم`;
  }
};

export default function NotificationsList() {
  const { isEnglish } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotifications } = useNotifications();
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === safeNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(safeNotifications.map((n) => n.id));
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    setDeleting(true);
    try {
      await deleteNotifications(selectedIds);
      setSelectedIds([]);
      setIsSelecting(false);
    } catch (e) {
      // error handled in context
    } finally {
      setDeleting(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (isSelecting) {
      toggleSelect(notification.id);
      return;
    }
    if (!notification.read_at) {
      await markAsRead(notification.id);
    }
    const url = getNotificationUrl(notification, user);
    if (url) router.push(url);
  };

  const allSelected = safeNotifications.length > 0 && selectedIds.length === safeNotifications.length;

  return (
    <div
      className={`max-w-4xl mx-auto w-full font-tajawal bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${isEnglish ? 'text-left' : 'text-right'}`}
      dir={isEnglish ? "ltr" : "rtl"}
    >
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50" data-aos="fade-down">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#EB682C]/10 p-3 rounded-xl relative">
              <Bell className="w-6 h-6 text-[#EB682C]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold px-1">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {isEnglish ? "All Notifications" : "كل الإشعارات"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {isEnglish ? "Follow the latest updates and messages" : "تابع أحدث التحديثات والرسائل"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isSelecting ? (
              <>
                {/* Select All */}
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {allSelected
                    ? <CheckSquare className="w-4 h-4 text-[#EB682C]" />
                    : <Square className="w-4 h-4" />
                  }
                  <span className="hidden md:inline">
                    {isEnglish ? 'Select All' : 'تحديد الكل'}
                  </span>
                </button>

                {/* Delete selected */}
                <button
                  onClick={handleDelete}
                  disabled={selectedIds.length === 0 || deleting}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden md:inline">
                    {deleting
                      ? (isEnglish ? 'Deleting...' : 'جاري الحذف...')
                      : `${isEnglish ? 'Delete' : 'حذف'} ${selectedIds.length > 0 ? `(${selectedIds.length})` : ''}`
                    }
                  </span>
                </button>

                {/* Cancel */}
                <button
                  onClick={() => { setIsSelecting(false); setSelectedIds([]); }}
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isEnglish ? 'Cancel' : 'إلغاء'}
                </button>
              </>
            ) : (
              <>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#2A5CBA] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span className="hidden md:inline">{isEnglish ? "Mark all read" : "تحديد كمقروء"}</span>
                  </button>
                )}
                {safeNotifications.length > 0 && (
                  <button
                    onClick={() => setIsSelecting(true)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden md:inline">{isEnglish ? "Delete" : "حذف"}</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Selection status bar */}
        {isSelecting && (
          <div className={`mt-4 text-xs font-medium text-gray-500 ${isEnglish ? 'text-left' : 'text-right'}`}>
            {isEnglish
              ? `${selectedIds.length} of ${safeNotifications.length} selected`
              : `${selectedIds.length} من ${safeNotifications.length} محدد`}
          </div>
        )}
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {safeNotifications.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-gray-400">
            <Bell className="w-12 h-12 mb-4 opacity-30" />
            <p className="font-medium text-lg">{isEnglish ? 'No notifications yet' : 'لا توجد إشعارات بعد'}</p>
            <p className="text-sm mt-1">{isEnglish ? "You're all caught up!" : 'أنت مواكب لكل شيء!'}</p>
          </div>
        ) : (
          safeNotifications.map((notification, idx) => {
            const { icon, bg } = getIconAndColor(notification.notification_type);
            const isUnread = !notification.read_at;
            const isSelected = selectedIds.includes(notification.id);
            const url = getNotificationUrl(notification, user);

            return (
              <div
                key={notification.id}
                data-aos="fade-up"
                data-aos-delay={idx * 40}
                onClick={() => handleNotificationClick(notification)}
                className={`p-6 md:p-8 flex gap-4 md:gap-5 items-start transition-all duration-200 cursor-pointer
                  ${isSelected ? 'bg-red-50 border-l-2 border-red-400' : isUnread ? 'bg-[#F9FAFC] hover:bg-gray-50' : 'bg-white hover:bg-gray-50'}
                `}
              >
                {/* Checkbox (selection mode) or Icon */}
                {isSelecting ? (
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-1 flex items-center justify-center transition-colors ${isSelected ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
                    {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                ) : (
                  <div className={`p-3 rounded-xl flex-shrink-0 ${bg}`}>{icon}</div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <p className={`text-sm md:text-base leading-snug ${isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                      {formatRelativeTime(notification.created_at, isEnglish)}
                    </span>
                  </div>

                  {notification.status && (
                    <span className={`inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      notification.status === 'accepted' ? 'bg-green-100 text-green-700'
                      : notification.status === 'rejected' ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isEnglish ? notification.status
                        : notification.status === 'accepted' ? 'مقبول'
                        : notification.status === 'rejected' ? 'مرفوض'
                        : notification.status}
                    </span>
                  )}

                  {!isSelecting && url && (
                    <div className={`mt-2 flex items-center gap-1 text-xs font-bold text-[#EB682C] ${isEnglish ? 'flex-row' : 'flex-row-reverse'}`}>
                      <span>
                        {notification.notification_type === 'new_chat_message'
                          ? (isEnglish ? 'Open Conversation' : 'فتح المحادثة')
                          : notification.notification_type?.includes('quote')
                          ? (isEnglish ? 'View Quote Request' : 'عرض طلب التسعير')
                          : (isEnglish ? 'View Details' : 'عرض التفاصيل')}
                      </span>
                      {isEnglish ? <ArrowRight className="w-3 h-3" /> : <ArrowLeft className="w-3 h-3" />}
                    </div>
                  )}
                </div>

                {/* Unread dot */}
                {!isSelecting && isUnread && (
                  <div className="w-2.5 h-2.5 bg-[#EB682C] rounded-full flex-shrink-0 mt-2 animate-pulse" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
