"use client";
import { useState } from "react";
import { Bell, MessageSquare, ChevronDown, Globe, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Topbar({ onMenuClick }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isEnglish, toggleLanguage } = useLanguage();

  return (
    <header className={`h-24 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 font-tajawal`}>
      
      {/* Right Side: Company Details and Mobile Menu */}
      <div className={`flex items-center gap-4 ${isEnglish ? 'text-left' : 'text-right'}`}>
        <button 
          className="lg:hidden text-gray-500 hover:text-[#EB682C] transition-colors"
          onClick={onMenuClick}
        >
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

      {/* Left Side: Actions & Profile */}
      <div className="flex items-center gap-6" dir="ltr">
        
        {/* Language Switcher */}
        <div 
          onClick={toggleLanguage}
          className="hidden sm:flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[#EB682C] font-bold text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 transition-colors"
        >
          <span>{isEnglish ? "عربي" : "EN"}</span>
          <Globe className="w-4 h-4" />
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
              )}
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
                onClick={() => {
                  logout();
                  setIsProfileOpen(false);
                }}
                className={`w-full ${isEnglish ? 'text-left' : 'text-right'} px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50 transition-colors`}
              >
                {isEnglish ? "Logout" : "تسجيل الخروج"}
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>

        {/* Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/dashboard/chat" className="relative text-[#EB682C] hover:text-[#d65a22] transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
          
          {/* Notifications Icon with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative text-[#EB682C] hover:text-[#d65a22] transition-colors block"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className={`absolute top-full left-0 md:left-auto md:right-0 mt-4 w-[280px] md:w-80 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden font-tajawal ${isEnglish ? 'text-left' : 'text-right'} animate-in fade-in slide-in-from-top-2 duration-200`} dir={isEnglish ? "ltr" : "rtl"}>
                <div className="flex justify-between items-center px-4 pt-4 border-b border-gray-100">
                  <Link href="/dashboard/notifications" className="text-sm font-bold text-[#EB682C] mb-2 hover:underline">
                    {isEnglish ? "View All" : "عرض الكل"}
                  </Link>
                  <h3 className="text-sm font-bold text-gray-900 border-b-2 border-[#EB682C] pb-2 px-1">
                    {isEnglish ? "Notifications" : "الإشعارات"}
                  </h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="p-4 bg-[#F8F9FA] border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {isEnglish ? <><span className="font-bold text-gray-900">Mahmoud Fatouh</span> sent you a new pricing request</> : <>ارسل لك <span className="font-bold text-gray-900">محمود فتوح</span> طلب تسعير جديد</>}
                    </p>
                    <p className="text-xs font-bold text-gray-900 mt-2">{isEnglish ? "6 minutes ago" : "منذ 6 دقائق"}</p>
                  </div>
                  <div className="p-4 bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {isEnglish ? <><span className="font-bold text-gray-900">Mahmoud Fatouh</span> sent you a new pricing request</> : <>ارسل لك <span className="font-bold text-gray-900">محمود فتوح</span> طلب تسعير جديد</>}
                    </p>
                    <p className="text-xs font-bold text-gray-900 mt-2">{isEnglish ? "6 minutes ago" : "منذ 6 دقائق"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
