import React from 'react';
import Navbar from "@/components/Navbar";
import NotificationsList from "@/components/notifications/NotificationsList";

export default function UserNotificationsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFC] flex flex-col font-tajawal">
      <Navbar />
      <div className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        <NotificationsList />
      </div>
    </div>
  );
}
