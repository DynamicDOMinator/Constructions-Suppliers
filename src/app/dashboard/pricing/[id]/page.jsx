"use client";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function PricingRequestDetailsPage({ params }) {
  // Use a mocked ID for display if none provided
  const id = "1284795";

  const items = [
    { name: "هايم ريتاوم", qty: "5", notes: "عدم التاخر عن يوم 21/7/2027 في التسليم" },
    { name: "هايم ريساوم", qty: "3", notes: "" },
    { name: "تابحرا كيماريس", qty: "3", notes: "" },
  ];

  return (
    <div className="font-tajawal max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header section with User info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        
        <div className="flex items-center gap-4 text-right order-1 md:order-2">
          <div>
            <h3 className="font-bold text-gray-900 text-xl">محمود فتوح فاروق</h3>
            <div className="flex items-center justify-end gap-1 text-gray-500 text-sm mt-1">
              <span>السعودية الرياض</span>
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-right order-2 md:order-1 w-full md:w-auto">
          <h1 className="text-2xl font-bold text-gray-900">تفاصيل الطلب # {id}</h1>
        </div>

      </div>

      {/* Details Table */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
        
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-[#1e293b] text-white">
              <tr>
                <th className="py-4 px-6 font-bold w-1/2 border-l border-[#334155]">الملاحظات</th>
                <th className="py-4 px-6 font-bold w-1/4 border-l border-[#334155]">الكمية</th>
                <th className="py-4 px-6 font-bold w-1/4">أسم المنتج</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-600 border-l border-gray-200">{item.notes}</td>
                  <td className="py-4 px-6 text-gray-900 font-bold border-l border-gray-200">{item.qty}</td>
                  <td className="py-4 px-6 text-gray-900 font-bold">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link href={`/dashboard/pricing/${id}/reply`}>
          <button className="w-full bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d65a22] transition-colors mt-4">
            الرد علي طلب التسعير
          </button>
        </Link>

      </div>
    </div>
  );
}
