"use client";
import { Bell, MessageSquare, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";

export default function Topbar() {
  return (
    <header className="h-24 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-20 font-tajawal">
      
      {/* Right Side: Company Details */}
      <div className="flex flex-col text-right">
        <h1 className="text-xl font-bold text-gray-900 mb-1">اسم الشركة</h1>
        <p className="text-sm text-gray-500">مرحبا عبد العزيز عبدالرحمن الدوسري</p>
      </div>

      {/* Left Side: Actions & Profile */}
      <div className="flex items-center gap-6" dir="ltr">
        
        {/* Language Switcher */}
        <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-black font-semibold text-sm">
          <span>EN</span>
          <Globe className="w-4 h-4" />
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2 cursor-pointer">
          <ChevronDown className="w-4 h-4 text-gray-500" />
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="w-px h-6 bg-gray-200"></div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="relative text-[#EB682C] hover:text-[#d65a22] transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="relative text-[#EB682C] hover:text-[#d65a22] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

      </div>
    </header>
  );
}
