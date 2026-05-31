"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function PricingReplyPage() {
  const productsToReply = [
    { title: "المنتج الاول" },
    { title: "المنتج الاول 2" },
  ];

  return (
    <div className="font-tajawal max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">
          <ChevronDown className="w-4 h-4" />
          ترتيب
        </div>
        <div className="text-right flex-1">
          <h1 className="text-2xl font-bold text-gray-900">طلبات التسعير</h1>
          <p className="text-sm font-bold text-gray-900 mt-2">محمود فتوح فوزي</p>
        </div>
      </div>

      {/* Reply Form */}
      <div className="bg-white border border-orange-200 rounded-3xl p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden">
        
        {/* Very subtle orange tint outline */}
        <div className="absolute inset-0 border-2 border-orange-100/50 rounded-3xl pointer-events-none"></div>

        {productsToReply.map((product, idx) => (
          <div key={idx} className="flex flex-col gap-6 relative z-10 pb-8 mb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
            <h2 className="text-lg font-bold text-[#2A5CBA] text-center mb-2">{product.title}</h2>
            
            <div className="flex flex-col text-right gap-2">
              <label className="text-sm font-bold text-gray-700">مدة التوريد</label>
              <input type="text" placeholder="ملاحظات" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
            </div>

            <div className="flex flex-col text-right gap-2">
              <label className="text-sm font-bold text-gray-700">السعر</label>
              <input type="text" placeholder="ملاحظات" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
            </div>

            <div className="flex flex-col text-right gap-2">
              <label className="text-sm font-bold text-gray-700">الحد الادني للطلب</label>
              <input type="text" placeholder="50 قطعة" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
            </div>

            <div className="flex flex-col text-right gap-2">
              <label className="text-sm font-bold text-gray-700">الكمية المتوفرة</label>
              <input type="text" placeholder="500 قطعة" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
            </div>

            <div className="flex flex-col text-right gap-2">
              <label className="text-sm font-bold text-gray-700">ملاحظات</label>
              <textarea placeholder="ملاحظات" className="w-full p-4 border border-gray-200 rounded-xl text-sm min-h-[120px] resize-none focus:outline-none focus:border-[#EB682C] text-right"></textarea>
            </div>
          </div>
        ))}

        <Link href="/dashboard/pricing">
          <button className="w-full bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d65a22] transition-colors mt-4 relative z-10">
            ارسال
          </button>
        </Link>
      </div>

    </div>
  );
}
