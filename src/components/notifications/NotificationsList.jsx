import React from 'react';
import { Bell, CheckCircle2, AlertCircle, FileText, Trash2, CheckCheck } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'طلب تسعير جديد',
    message: 'ارسل لك محمود فتوح طلب تسعير جديد بخصوص مشروع الفيو',
    time: 'منذ 6 دقائق',
    type: 'request',
    isRead: false,
  },
  {
    id: 2,
    title: 'تحديث حالة المشروع',
    message: 'تمت الموافقة على المخططات المعمارية من قبل المهندس أحمد',
    time: 'منذ ساعتين',
    type: 'success',
    isRead: false,
  },
  {
    id: 3,
    title: 'تنبيه نظام',
    message: 'يرجى تحديث بيانات الملف الشخصي لاستكمال عملية التوثيق',
    time: 'منذ 5 ساعات',
    type: 'alert',
    isRead: true,
  },
  {
    id: 4,
    title: 'رسالة جديدة',
    message: 'ارسل لك محمد عادل رسالة جديدة في المحادثات',
    time: 'منذ يوم واحد',
    type: 'message',
    isRead: true,
  },
  {
    id: 5,
    title: 'عرض سعر مقبول',
    message: 'تم قبول عرض السعر الخاص بمشروع تطوير الواجهات',
    time: 'منذ يومين',
    type: 'success',
    isRead: true,
  },
];

const getIcon = (type) => {
  switch(type) {
    case 'request': return <FileText className="w-5 h-5 text-blue-500" />;
    case 'success': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'alert': return <AlertCircle className="w-5 h-5 text-orange-500" />;
    case 'message': return <Bell className="w-5 h-5 text-purple-500" />;
    default: return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

const getBgColor = (type) => {
  switch(type) {
    case 'request': return 'bg-blue-50';
    case 'success': return 'bg-green-50';
    case 'alert': return 'bg-orange-50';
    case 'message': return 'bg-purple-50';
    default: return 'bg-gray-50';
  }
};

export default function NotificationsList() {
  return (
    <div className="max-w-4xl mx-auto w-full font-tajawal bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" dir="rtl">
      <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-[#EB682C]/10 p-3 rounded-xl">
            <Bell className="w-6 h-6 text-[#EB682C]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">كل الإشعارات</h1>
            <p className="text-sm text-gray-500 mt-1">تابع أحدث التحديثات والرسائل الخاصة بحسابك</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#2A5CBA] hover:bg-blue-50 rounded-lg transition-colors">
            <CheckCheck className="w-4 h-4" />
            <span className="hidden md:inline">تحديد الكل كمقروء</span>
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-6 md:p-8 flex gap-4 md:gap-6 items-start transition-colors hover:bg-gray-50 ${!notification.isRead ? 'bg-[#F9FAFC]' : ''}`}
          >
            <div className={`p-3 rounded-xl flex-shrink-0 ${getBgColor(notification.type)}`}>
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`text-base md:text-lg font-bold truncate pl-4 ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notification.title}
                </h3>
                <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap font-medium bg-gray-100 px-2.5 py-1 rounded-full">
                  {notification.time}
                </span>
              </div>
              
              <p className={`text-sm md:text-base leading-relaxed mt-2 ${!notification.isRead ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                {notification.message}
              </p>
              
              {!notification.isRead && (
                <div className="mt-4 flex gap-3">
                  <button className="bg-[#EB682C] text-white text-xs md:text-sm px-4 md:px-6 py-2 rounded-lg font-bold hover:bg-[#d65a22] transition-colors shadow-sm">
                    عرض التفاصيل
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-600 text-xs md:text-sm px-4 md:px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                    تجاهل
                  </button>
                </div>
              )}
            </div>
            
            {!notification.isRead && (
              <div className="w-2.5 h-2.5 bg-[#EB682C] rounded-full flex-shrink-0 mt-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
