"use client";
import { useState } from "react";
import Link from "next/link";
import { Globe, User, Menu, X, Bell, MessageSquare } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationsContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { isEnglish, toggleLanguage } = useLanguage();
  const { notifications: rawNotifications, unreadCount, unreadMessagesCount, markAllAsRead, clearChatBadge } = useNotifications();
  const notifications = Array.isArray(rawNotifications) ? rawNotifications : [];

  const navLinks = [
    { name: isEnglish ? "Home" : "الرئيسية", href: "/" },
    { name: isEnglish ? "My Quotes" : "مقايستي", href: "/quotes" },
    { name: isEnglish ? "Products" : "المنتجات", href: "/products" },
    { name: isEnglish ? "Suppliers" : "الموردون", href: "/suppliers" },
    { name: isEnglish ? "Plans" : "الخطط", href: "/plans" },
    { name: isEnglish ? "Blogs" : "المدونات", href: "/blogs" },
    { name: isEnglish ? "About Us" : "معلومات عنا", href: "/about" },
    { name: isEnglish ? "Contact Us" : "اتصل بنا", href: "/contact" },
  ];
  return (
    <nav className={`w-full bg-white py-4 px-6 md:px-12 flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center justify-between sticky top-0 z-50`}>
      {/* Actions (Left side in RTL) */}
      <div className="flex  items-center gap-4" dir="ltr">
        {/* Language Switcher */}
        <div 
          onClick={toggleLanguage}
          className="hidden md:flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[#EB682C] font-bold text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 transition-colors"
        >
          <span>{isEnglish ? "عربي" : "EN"}</span>
          <Globe className="w-4 h-4" />
        </div>

        {isAuthenticated ? (
          <>
            {/* Profile Avatar with Dropdown */}
            <div className="relative">
              <div 
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 cursor-pointer ml-2 flex items-center justify-center bg-gray-100"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                {user?.avatar || user?.image ? (
                  <img src={user.avatar || user.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-gray-500" />
                )}
              </div>
              
              {isProfileOpen && (
                <div className={`absolute top-full ${isEnglish ? 'right-0' : 'left-0'} mt-4 w-48 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden font-tajawal ${isEnglish ? 'text-left' : 'text-right'} animate-in fade-in slide-in-from-top-2 duration-200`} dir={isEnglish ? "ltr" : "rtl"}>
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-bold text-sm text-gray-800">{user?.name || (isEnglish ? "User" : "المستخدم")}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                  </div>
                  {user?.type === 'engineer' ? (
                    <Link href={`/engineer/${user?.uuid || user?.id}`} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                      {isEnglish ? "Visit Profile" : "زيارة الملف الشخصي"}
                    </Link>
                  ) : (
                    <Link href="/dashboard" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                      {isEnglish ? "Dashboard" : "لوحة التحكم"}
                    </Link>
                  )}
                  <Link href="/settings" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                    {isEnglish ? "Settings" : "الإعدادات"}
                  </Link>
                  <button 
                    onClick={async () => {
                      await logout();
                      setIsProfileOpen(false);
                    }}
                    className={`w-full ${isEnglish ? 'text-left' : 'text-right'} px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50 transition-colors`}
                  >
                    {isEnglish ? "Logout" : "تسجيل الخروج"}
                  </button>
                </div>
              )}
            </div>

            {/* Icons: Chat + Notifications */}
            <div className="flex items-center gap-3">

              {/* Chat Icon */}
              <button
                type="button"
                onClick={() => {
                  clearChatBadge();
                  router.push(user?.type === 'supplier' || user?.type === 'admin' ? '/dashboard/chat' : '/chat');
                }}
                className="relative flex items-center justify-center text-[#EB682C] hover:text-[#d65a22] transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold px-0.5">
                    {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
                  </span>
                )}
              </button>

              {/* Notifications Icon with Dropdown */}
              <div className="relative flex items-center">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative flex items-center justify-center text-[#EB682C] hover:text-[#d65a22] transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold px-0.5">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className={`absolute top-full ${isEnglish ? 'right-0' : 'left-0'} mt-4 w-80 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden font-tajawal ${isEnglish ? 'text-left' : 'text-right'} animate-in fade-in slide-in-from-top-2 duration-200`} dir={isEnglish ? "ltr" : "rtl"}>
                    <div className="flex justify-between items-center px-4 pt-4 pb-3 border-b border-gray-100">
                      <Link href="/notifications" className="text-sm font-bold text-[#EB682C] hover:underline" onClick={() => setIsNotificationsOpen(false)}>{isEnglish ? "View All" : "عرض الكل"}</Link>
                      <h3 className="text-sm font-bold text-gray-900">{isEnglish ? "Notifications" : "الإشعارات"}</h3>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-sm text-gray-400">
                          {isEnglish ? 'No notifications yet' : 'لا توجد إشعارات'}
                        </div>
                      ) : notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${!n.read_at ? 'bg-[#F8F9FA]' : 'bg-white'}`}
                          onClick={() => { setIsNotificationsOpen(false); }}
                        >
                          <p className="text-sm text-gray-700 leading-relaxed">{n.message}</p>
                          {n.created_at && (
                            <p className="text-xs font-medium text-gray-400 mt-1.5">
                              {new Date(n.created_at).toLocaleString(isEnglish ? 'en-US' : 'ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          )}
                        </div>
                      ))}
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="w-full p-3 text-xs text-center text-[#EB682C] font-bold hover:bg-orange-50 transition-colors"
                        >
                          {isEnglish ? 'Mark all as read' : 'تحديد الكل كمقروء'}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </>
        ) : (
          <div className={`hidden md:flex items-center gap-3 ${isEnglish ? 'mr-2' : 'ml-2'}`} dir={isEnglish ? "ltr" : "rtl"}>
            <Link href="/login" className="bg-[#de6d3a] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#d65a22] transition-colors shadow-sm">
              {isEnglish ? "Log In" : "تسجيل الدخول"}
            </Link>
            <Link href="/register" className="bg-[#4169E1] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#3458c7] transition-colors shadow-sm">
              {isEnglish ? "Sign Up" : "إنشاء حساب"}
            </Link>
          </div>
        )}
      </div>

      {/* Nav Links (Center) */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`transition-colors ${isActive ? "text-[#010101] font-bold" : "text-[#666666] hover:text-[#010101]"}`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Logo (Right side in RTL) and Mobile Toggle */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="text-[#004b87] font-bold text-lg md:text-xl text-right leading-tight hidden sm:block">
              <div>CONSTRUCTIONS</div>
              <div className="text-[#EB682C] text-center">SUPPLIERS</div>
            </div>
            {/* Simple logo shape */}
            <Image src="/logo.png" alt="logo" width={80} height={80} className="w-12 md:w-20" />
          </div>
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg lg:hidden flex flex-col p-4 z-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`py-3 px-4 border-b border-gray-50 text-right transition-colors ${isActive ? "text-[#010101] font-bold bg-gray-50" : "text-[#666666]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          {isAuthenticated ? (
            <div className="flex flex-col gap-2 mt-4 md:hidden">
              {user?.type === 'engineer' ? (
                <Link href={`/engineer/${user?.uuid || user?.id}`} className="w-full text-center bg-gray-100 text-gray-800 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors block" onClick={() => setIsMenuOpen(false)}>
                  {isEnglish ? "Visit Profile" : "زيارة الملف الشخصي"}
                </Link>
              ) : (
                <Link href="/dashboard" className="w-full text-center bg-gray-100 text-gray-800 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors block" onClick={() => setIsMenuOpen(false)}>
                  {isEnglish ? "Dashboard" : "لوحة التحكم"}
                </Link>
              )}
              <Link href="/settings" className="w-full text-center bg-gray-100 text-gray-800 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors block" onClick={() => setIsMenuOpen(false)}>
                {isEnglish ? "Settings" : "الإعدادات"}
              </Link>
              <button onClick={async () => { await logout(); setIsMenuOpen(false); }} className="w-full text-center bg-red-50 text-red-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors block">
                {isEnglish ? "Logout" : "تسجيل الخروج"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4 md:hidden">
              <Link href="/register" className="w-full text-center bg-[#4169E1] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#3458c7] transition-colors block" onClick={() => setIsMenuOpen(false)}>
                {isEnglish ? "Sign Up" : "إنشاء حساب"}
              </Link>
              <Link href="/login" className="w-full text-center bg-[#de6d3a] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#d65a22] transition-colors block" onClick={() => setIsMenuOpen(false)}>
                {isEnglish ? "Log In" : "تسجيل الدخول"}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
