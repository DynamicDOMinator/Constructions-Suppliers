"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, MessageSquare, ChevronDown, Globe, Menu, User, CheckCheck, MessageCircle, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/context/NotificationsContext";

const getNotifIcon = (type) => {
  switch (type) {
    case 'new_chat_message': return <MessageCircle className="w-4 h-4 text-purple-500" />;
    case 'new_quote_request': return <FileText className="w-4 h-4 text-blue-500" />;
    case 'quote_request_status_updated': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    default: return <Bell className="w-4 h-4 text-gray-400" />;
  }
};

const getNotifUrl = (n) => {
  switch (n.notification_type) {
    case 'new_chat_message': return n.conversation_uuid ? `/dashboard/chat?conversation=${n.conversation_uuid}` : '/dashboard/chat';
    case 'new_quote_request':
    case 'quote_request_status_updated': return '/dashboard/quotas';
    default: return '/dashboard/notifications';
  }
};

const formatTime = (dateString, isEnglish) => {
  if (!dateString) return '';
  const diff = Date.now() - new Date(dateString).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (isEnglish) {
    if (m < 1) return 'now';
    if (m < 60) return `${m}m`;
    if (h < 24) return `${h}h`;
    return `${d}d`;
  } else {
    if (m < 1) return 'الآن';
    if (m < 60) return `${m}د`;
    if (h < 24) return `${h}س`;
    return `${d}ي`;
  }
};

export default function Topbar({ onMenuClick }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isEnglish, toggleLanguage } = useLanguage();
  const { notifications: rawNotifications, unreadCount, unreadMessagesCount, markAllAsRead, markAsRead, clearChatBadge } = useNotifications();
  const notifications = Array.isArray(rawNotifications) ? rawNotifications : [];
  const router = useRouter();
  const notifRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleNotifClick = async (n) => {
    if (!n.read_at) await markAsRead(n.id);
    setIsNotificationsOpen(false);
    router.push(getNotifUrl(n));
  };

  return (
    <header className="h-24 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 font-tajawal">

      {/* Right: Company info + mobile menu */}
      <div className={`flex items-center gap-4 ${isEnglish ? 'text-left' : 'text-right'}`}>
        <button className="lg:hidden text-gray-500 hover:text-[#EB682C] transition-colors" onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-1 hidden sm:block">
            {user?.company_profile?.company_name || (isEnglish ? "Company Name" : "اسم الشركة")}
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            {isEnglish ? `Welcome, ${user?.name || "User"}` : `مرحبا ${user?.name || "المستخدم"}`}
          </p>
        </div>
      </div>

      {/* Left: Actions */}
      <div className="flex items-center gap-4 md:gap-6" dir="ltr">

        {/* Language */}
        <div
          onClick={toggleLanguage}
          className="hidden sm:flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[#EB682C] font-bold text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 transition-colors"
        >
          <span>{isEnglish ? "عربي" : "EN"}</span>
          <Globe className="w-4 h-4" />
        </div>

        {/* Profile */}
        <div className="relative">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
              {user?.avatar
                ? <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                : <User className="w-5 h-5 text-gray-500" />}
            </div>
          </div>
          {isProfileOpen && (
            <div className={`absolute top-full left-0 mt-4 w-48 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden font-tajawal ${isEnglish ? 'text-left' : 'text-right'} animate-in fade-in slide-in-from-top-2 duration-200`} dir={isEnglish ? "ltr" : "rtl"}>
              <div className="p-3 border-b border-gray-100">
                <p className="font-bold text-sm text-gray-800">{user?.name || (isEnglish ? "User" : "المستخدم")}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
              </div>
              <Link href="/" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                {isEnglish ? "Home" : "الرئيسية"}
              </Link>
              <Link href="/dashboard/settings" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100" onClick={() => setIsProfileOpen(false)}>
                {isEnglish ? "Account Settings" : "إعدادات الحساب"}
              </Link>
              <button
                onClick={async () => { await logout(); setIsProfileOpen(false); }}
                className={`w-full ${isEnglish ? 'text-left' : 'text-right'} px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50 transition-colors`}
              >
                {isEnglish ? "Logout" : "تسجيل الخروج"}
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-200 hidden sm:block" />

        {/* Chat Icon */}
        <button
          onClick={() => { clearChatBadge(); router.push('/dashboard/chat'); }}
          className="relative text-[#EB682C] hover:text-[#d65a22] transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold px-0.5">
              {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
            </span>
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative text-[#EB682C] hover:text-[#d65a22] transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold px-0.5">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {isNotificationsOpen && (
            <div
              className={`absolute top-full mt-3 w-[300px] md:w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 font-tajawal ${isEnglish ? 'right-0' : 'left-0'}`}
              dir={isEnglish ? "ltr" : "rtl"}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
                <Link
                  href="/dashboard/notifications"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-xs font-bold text-[#EB682C] hover:underline transition-colors"
                >
                  {isEnglish ? "View All" : "عرض الكل"}
                </Link>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900">
                    {isEnglish ? "Notifications" : "الإشعارات"}
                  </h3>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>

              {/* List */}
              <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-gray-400 gap-2">
                    <Bell className="w-8 h-8 opacity-30" />
                    <p className="text-sm font-medium">{isEnglish ? 'No notifications yet' : 'لا توجد إشعارات'}</p>
                  </div>
                ) : (
                  notifications.slice(0, 6).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotifClick(n)}
                      className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors hover:bg-gray-50 ${!n.read_at ? 'bg-orange-50/40' : 'bg-white'}`}
                    >
                      {/* Icon bubble */}
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${!n.read_at ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                        {getNotifIcon(n.notification_type)}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug ${!n.read_at ? 'font-semibold text-gray-900' : 'font-medium text-gray-600'}`}>
                          {n.message}
                        </p>
                        {n.status && (
                          <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${n.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isEnglish ? n.status : n.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                          </span>
                        )}
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">
                          {formatTime(n.created_at, isEnglish)}
                        </p>
                      </div>

                      {/* Unread dot */}
                      {!n.read_at && (
                        <div className="w-2 h-2 bg-[#EB682C] rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {unreadCount > 0 && (
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/60">
                  <button
                    onClick={() => { markAllAsRead(); setIsNotificationsOpen(false); }}
                    className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#2A5CBA] transition-colors mx-auto"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    {isEnglish ? 'Mark all as read' : 'تحديد الكل كمقروء'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
