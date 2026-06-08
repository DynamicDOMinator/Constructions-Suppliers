"use client";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#F9FAFB] w-full relative overflow-x-hidden" dir="rtl">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar on the Right (RTL) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full lg:w-[calc(100%-16rem)]">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
