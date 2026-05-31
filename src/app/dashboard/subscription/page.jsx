"use client";
import { useState } from "react";
import { MoreVertical, ChevronDown, X } from "lucide-react";

export default function SubscriptionPage() {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const transactions = [
    { id: 1, plan: "الباقة الاساسية", price: "39 ريال", from: "يناير 15, 2026", to: "فبراير 15, 2026" },
    { id: 2, plan: "الباقة الاساسية", price: "39 ريال", from: "سبتمبر 16, 2025", to: "سبتمبر 16, 2035" },
    { id: 3, plan: "الباقة الاساسية", price: "39 ريال", from: "سبتمبر 16, 2025", to: "سبتمبر 16, 2035" },
    { id: 4, plan: "الباقة الاساسية", price: "39 ريال", from: "سبتمبر 16, 2025", to: "سبتمبر 16, 2035" },
    { id: 5, plan: "الباقة الاساسية", price: "39 ريال", from: "سبتمبر 16, 2025", to: "سبتمبر 16, 2035" },
    { id: 6, plan: "الباقة المتقدمة", price: "50 ريال", from: "سبتمبر 16, 2025", to: "سبتمبر 16, 2035" },
    { id: 7, plan: "الباقة المتميزة", price: "80 ريال", from: "سبتمبر 16, 2025", to: "سبتمبر 16, 2035" },
  ];

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header section */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">اشتراكك</h1>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-8 text-right">الباقة الاساسية</h2>
        
        <div className="flex flex-col md:flex-row justify-between mb-10 text-right gap-8">
          
          <div className="flex-1 space-y-6">
            <div className="flex justify-end gap-16">
              <span className="text-gray-900 font-medium">فبراير 15, 2026</span>
              <span className="text-gray-500 w-32 font-bold">تاريخ تجديد الاشتراك</span>
            </div>
            <div className="flex justify-end gap-16">
              <span className="text-gray-900 font-medium" dir="ltr">..........5236</span>
              <span className="text-gray-500 w-32 font-bold">طريقة الدفع</span>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex justify-end gap-16">
              <span className="text-gray-900 font-medium">يناير 15, 2026</span>
              <span className="text-gray-500 w-32 font-bold">بداية الاشتراك</span>
            </div>
            <div className="flex justify-end gap-16">
              <span className="text-gray-900 font-medium">الاساسية 39 ريال / شهري</span>
              <span className="text-gray-500 w-32 font-bold">باقتك الحالية</span>
            </div>
          </div>
          
        </div>

        <div className="flex justify-start gap-4" dir="ltr">
          <button 
            onClick={() => setIsCancelModalOpen(true)}
            className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            الغاء الاشتراك
          </button>
          <button className="bg-[#EB682C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors">
            ترقية الاشتراك
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">
            <ChevronDown className="w-4 h-4" />
            ترتيب
          </button>
          <h2 className="text-lg font-bold text-gray-900">تاريخ المعاملات</h2>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6 font-bold w-20 text-center">التحكم</th>
                  <th className="py-4 px-6 font-bold">التاريخ الى</th>
                  <th className="py-4 px-6 font-bold">التاريخ من</th>
                  <th className="py-4 px-6 font-bold">المجموع</th>
                  <th className="py-4 px-6 font-bold">الباقات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-center text-[#EB682C]">
                      <button className="hover:bg-orange-50 p-1 rounded-md transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="py-4 px-6 text-gray-500">{tx.to}</td>
                    <td className="py-4 px-6 text-gray-500">{tx.from}</td>
                    <td className="py-4 px-6 text-gray-900 font-medium">{tx.price}</td>
                    <td className="py-4 px-6 text-gray-900 font-medium">{tx.plan}</td>
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
              className="absolute top-6 left-6 text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 text-center mb-8 mt-2">
              ساعدنا نحسن تجربتك - ما سبب الإلغاء؟
            </h2>

            <div className="space-y-4 mb-8 text-right flex flex-col items-end">
              {[
                "السعر مرتفع",
                "لم أجد محتوى يهمني",
                "تجربة المستخدم غير مريحة",
                "شيء آخر"
              ].map((reason) => (
                <label key={reason} className="flex items-center justify-end gap-3 cursor-pointer group">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{reason}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    cancelReason === reason ? "border-[#EB682C]" : "border-gray-300"
                  }`}>
                    {cancelReason === reason && <div className="w-2.5 h-2.5 bg-[#EB682C] rounded-full"></div>}
                  </div>
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
                حافظ على الإشتراك
              </button>
              <button 
                onClick={() => {
                  // handle cancel
                  setIsCancelModalOpen(false);
                }}
                className="w-full bg-white border border-red-200 text-red-500 py-3.5 rounded-xl font-bold hover:bg-red-50 transition-colors"
              >
                تأكيد الالغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
