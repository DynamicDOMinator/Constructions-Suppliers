"use client";
import { useState } from "react";
import { MoreVertical, ChevronDown, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SubscriptionPage() {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const { isEnglish } = useLanguage();

  const transactions = [
    { id: 1, plan: isEnglish ? "Basic Plan" : "الباقة الاساسية", price: isEnglish ? "39 SAR" : "39 ريال", from: isEnglish ? "Jan 15, 2026" : "يناير 15, 2026", to: isEnglish ? "Feb 15, 2026" : "فبراير 15, 2026" },
    { id: 2, plan: isEnglish ? "Basic Plan" : "الباقة الاساسية", price: isEnglish ? "39 SAR" : "39 ريال", from: isEnglish ? "Sep 16, 2025" : "سبتمبر 16, 2025", to: isEnglish ? "Sep 16, 2035" : "سبتمبر 16, 2035" },
    { id: 3, plan: isEnglish ? "Basic Plan" : "الباقة الاساسية", price: isEnglish ? "39 SAR" : "39 ريال", from: isEnglish ? "Sep 16, 2025" : "سبتمبر 16, 2025", to: isEnglish ? "Sep 16, 2035" : "سبتمبر 16, 2035" },
    { id: 4, plan: isEnglish ? "Basic Plan" : "الباقة الاساسية", price: isEnglish ? "39 SAR" : "39 ريال", from: isEnglish ? "Sep 16, 2025" : "سبتمبر 16, 2025", to: isEnglish ? "Sep 16, 2035" : "سبتمبر 16, 2035" },
    { id: 5, plan: isEnglish ? "Basic Plan" : "الباقة الاساسية", price: isEnglish ? "39 SAR" : "39 ريال", from: isEnglish ? "Sep 16, 2025" : "سبتمبر 16, 2025", to: isEnglish ? "Sep 16, 2035" : "سبتمبر 16, 2035" },
    { id: 6, plan: isEnglish ? "Advanced Plan" : "الباقة المتقدمة", price: isEnglish ? "50 SAR" : "50 ريال", from: isEnglish ? "Sep 16, 2025" : "سبتمبر 16, 2025", to: isEnglish ? "Sep 16, 2035" : "سبتمبر 16, 2035" },
    { id: 7, plan: isEnglish ? "Premium Plan" : "الباقة المتميزة", price: isEnglish ? "80 SAR" : "80 ريال", from: isEnglish ? "Sep 16, 2025" : "سبتمبر 16, 2025", to: isEnglish ? "Sep 16, 2035" : "سبتمبر 16, 2035" },
  ];

  return (
    <div className={`font-tajawal max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 ${isEnglish ? 'ltr' : 'rtl'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
      
      {/* Header section */}
      <div className={isEnglish ? 'text-left' : 'text-right'}>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEnglish ? 'Your Subscription' : 'اشتراكك'}</h1>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <h2 className={`text-xl font-bold text-gray-900 mb-8 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? 'Basic Plan' : 'الباقة الاساسية'}</h2>
        
        <div className={`flex flex-col md:${isEnglish ? 'flex-row-reverse' : 'flex-row'} justify-between mb-10 ${isEnglish ? 'text-left' : 'text-right'} gap-8`}>
          
          <div className="flex-1 space-y-6">
            <div className={`flex ${isEnglish ? 'justify-start' : 'justify-end'} gap-16 ${isEnglish ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-900 font-medium">{isEnglish ? 'Feb 15, 2026' : 'فبراير 15, 2026'}</span>
              <span className={`text-gray-500 w-32 font-bold ${isEnglish ? 'text-right' : 'text-left'}`}>{isEnglish ? 'Renewal Date' : 'تاريخ تجديد الاشتراك'}</span>
            </div>
            <div className={`flex ${isEnglish ? 'justify-start' : 'justify-end'} gap-16 ${isEnglish ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-900 font-medium" dir="ltr">..........5236</span>
              <span className={`text-gray-500 w-32 font-bold ${isEnglish ? 'text-right' : 'text-left'}`}>{isEnglish ? 'Payment Method' : 'طريقة الدفع'}</span>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className={`flex ${isEnglish ? 'justify-start' : 'justify-end'} gap-16 ${isEnglish ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-900 font-medium">{isEnglish ? 'Jan 15, 2026' : 'يناير 15, 2026'}</span>
              <span className={`text-gray-500 w-32 font-bold ${isEnglish ? 'text-right' : 'text-left'}`}>{isEnglish ? 'Start Date' : 'بداية الاشتراك'}</span>
            </div>
            <div className={`flex ${isEnglish ? 'justify-start' : 'justify-end'} gap-16 ${isEnglish ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-gray-900 font-medium">{isEnglish ? 'Basic 39 SAR / mo' : 'الاساسية 39 ريال / شهري'}</span>
              <span className={`text-gray-500 w-32 font-bold ${isEnglish ? 'text-right' : 'text-left'}`}>{isEnglish ? 'Current Plan' : 'باقتك الحالية'}</span>
            </div>
          </div>
          
        </div>

        <div className={`flex ${isEnglish ? 'justify-end' : 'justify-start'} gap-4`} dir="ltr">
          <button 
            onClick={() => setIsCancelModalOpen(true)}
            className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            {isEnglish ? 'Cancel Subscription' : 'الغاء الاشتراك'}
          </button>
          <button className="bg-[#EB682C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors">
            {isEnglish ? 'Upgrade Plan' : 'ترقية الاشتراك'}
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} justify-between items-center mb-6`}>
          <h2 className="text-lg font-bold text-gray-900">{isEnglish ? 'Transaction History' : 'تاريخ المعاملات'}</h2>
          <button className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50`}>
            <ChevronDown className="w-4 h-4" />
            {isEnglish ? 'Sort' : 'ترتيب'}
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className={`w-full ${isEnglish ? 'text-left' : 'text-right'} text-sm`}>
              <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className={`py-4 px-6 font-bold ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? 'Plans' : 'الباقات'}</th>
                  <th className={`py-4 px-6 font-bold ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? 'Total' : 'المجموع'}</th>
                  <th className={`py-4 px-6 font-bold ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? 'Date From' : 'التاريخ من'}</th>
                  <th className={`py-4 px-6 font-bold ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? 'Date To' : 'التاريخ الى'}</th>
                  <th className="py-4 px-6 font-bold w-20 text-center">{isEnglish ? 'Actions' : 'التحكم'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-900 font-medium">{tx.plan}</td>
                    <td className="py-4 px-6 text-gray-900 font-medium">{tx.price}</td>
                    <td className="py-4 px-6 text-gray-500">{tx.from}</td>
                    <td className="py-4 px-6 text-gray-500">{tx.to}</td>
                    <td className="py-4 px-6 text-center text-[#EB682C]">
                      <button className="hover:bg-orange-50 p-1 rounded-md transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsCancelModalOpen(false)}
              className={`absolute top-6 ${isEnglish ? 'right-6' : 'left-6'} text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 rounded-full p-1`}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 text-center mb-8 mt-2">
              {isEnglish ? 'Help us improve - what is the reason for cancellation?' : 'ساعدنا نحسن تجربتك - ما سبب الإلغاء؟'}
            </h2>

            <div className={`space-y-4 mb-8 ${isEnglish ? 'text-left items-start' : 'text-right items-end'} flex flex-col`}>
              {(isEnglish ? [
                "Price is too high",
                "Did not find interesting content",
                "User experience is not comfortable",
                "Other"
              ] : [
                "السعر مرتفع",
                "لم أجد محتوى يهمني",
                "تجربة المستخدم غير مريحة",
                "شيء آخر"
              ]).map((reason) => (
                <label key={reason} className={`flex items-center ${isEnglish ? 'justify-start' : 'justify-end'} gap-3 cursor-pointer group ${isEnglish ? 'flex-row' : 'flex-row'}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    cancelReason === reason ? "border-[#EB682C]" : "border-gray-300"
                  }`}>
                    {cancelReason === reason && <div className="w-2.5 h-2.5 bg-[#EB682C] rounded-full"></div>}
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{reason}</span>
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="hidden" 
                  />
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setIsCancelModalOpen(false)}
                className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors"
              >
                {isEnglish ? 'Keep Subscription' : 'حافظ على الإشتراك'}
              </button>
              <button 
                onClick={() => {
                  // handle cancel
                  setIsCancelModalOpen(false);
                }}
                className="w-full bg-white border border-red-200 text-red-500 py-3.5 rounded-xl font-bold hover:bg-red-50 transition-colors"
              >
                {isEnglish ? 'Confirm Cancellation' : 'تأكيد الالغاء'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
