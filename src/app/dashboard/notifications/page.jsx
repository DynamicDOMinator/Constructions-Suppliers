import React from 'react';
import NotificationsList from "@/components/notifications/NotificationsList";

export default function DashboardNotificationsPage() {
  return (
    <div className="w-full">
      <div className="mb-6 text-right">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">الإشعارات</h1>
        <p className="text-sm text-gray-500">تابع جميع التحديثات الخاصة بالطلبات والمشاريع</p>
      </div>
      <NotificationsList />
    </div>
  );
}
