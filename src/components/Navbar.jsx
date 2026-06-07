"use client";
import { useState } from "react";
import Link from "next/link";
import { Globe, User, Menu, X, Bell, MessageSquare } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "مقايستي", href: "/quotes" },
    { name: "المنتجات", href: "/products" },
    { name: "الموردون", href: "/suppliers" },
    { name: "الخطط", href: "/plans" },
    { name: "المدونات", href: "/blogs" },
    { name: "معلومات عنا", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
  ];
  return (
    <nav className="w-full bg-white py-4 px-6 md:px-12 flex flex-row-reverse items-center justify-between sticky top-0 z-50">
      {/* Actions (Left side in RTL) */}
      <div className="flex  items-center gap-4" dir="ltr">
        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-1 cursor-pointer text-gray-700 hover:text-black font-semibold text-sm">
          <span>EN</span>
          <Globe className="w-4 h-4" />
        </div>

        {/* Profile Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 cursor-pointer ml-2">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
        </div>

        {/* Chat Icon */}
        <Link href="/chat" className="relative text-[#EB682C] hover:text-[#d65a22] transition-colors ml-2">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>
        
        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative text-[#EB682C] hover:text-[#d65a22] transition-colors ml-2 block"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute top-full left-0 mt-4 w-80 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden font-tajawal text-right" dir="rtl">
              <div className="flex justify-between items-center px-4 pt-4 border-b border-gray-100">
                <Link href="/notifications" className="text-sm font-bold text-[#EB682C] mb-2 hover:underline">عرض الكل</Link>
                <h3 className="text-sm font-bold text-gray-900 border-b-2 border-[#EB682C] pb-2 px-1">الإشعارات</h3>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {/* Notification Item 1 (Unread) */}
                <div className="p-4 bg-[#F8F9FA] border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    ارسل لك <span className="font-bold text-gray-900">محمود فتوح</span> طلب تسعير جديد
                  </p>
                  <p className="text-xs font-bold text-gray-900 mt-2">منذ 6 دقائق</p>
                </div>
                {/* Notification Item 2 (Read) */}
                <div className="p-4 bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    ارسل لك <span className="font-bold text-gray-900">محمود فتوح</span> طلب تسعير جديد
                  </p>
                  <p className="text-xs font-bold text-gray-900 mt-2">منذ 6 دقائق</p>
                </div>
                {/* Notification Item 3 (Read) */}
                <div className="p-4 bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    ارسل لك <span className="font-bold text-gray-900">محمود فتوح</span> طلب تسعير جديد
                  </p>
                  <p className="text-xs font-bold text-gray-900 mt-2">منذ 6 دقائق</p>
                </div>
              </div>
            </div>
          )}
        </div>
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
          <div className="flex flex-col gap-2 mt-4 md:hidden">
            <Link href="/register" className="w-full text-center bg-[#EB682C] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#d65a22] transition-colors block" onClick={() => setIsMenuOpen(false)}>
              حساب جديد
            </Link>
            <Link href="/login" className="w-full text-center bg-[#2A5CBA] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#20499b] transition-colors block" onClick={() => setIsMenuOpen(false)}>
              تسجيل الدخول
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
