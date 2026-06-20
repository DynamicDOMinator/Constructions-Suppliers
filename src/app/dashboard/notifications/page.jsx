"use client";
import React from 'react';
import NotificationsList from "@/components/notifications/NotificationsList";
import { useLanguage } from "@/context/LanguageContext";

export default function DashboardNotificationsPage() {
  const { isEnglish } = useLanguage();
  return (
    <div className="w-full">
      <div className={`mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{isEnglish ? 'Notifications' : 'الإشعارات'}</h1>
        <p className="text-sm text-gray-500">{isEnglish ? 'Follow all updates regarding requests and projects' : 'تابع جميع التحديثات الخاصة بالطلبات والمشاريع'}</p>
      </div>
      <NotificationsList />
    </div>
  );
}
