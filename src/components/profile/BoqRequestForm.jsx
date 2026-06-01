"use client";
import { Trash2, UploadCloud, ChevronDown, Plus, X } from "lucide-react";

export default function BoqRequestForm({ onBack }) {
  const boqItems = [
    { id: 1, name: "كابلات رئيسية", spec: "كابل نحاس (NYA) 4x16 مم2", qty: 1, unit: "متر طولي" },
    { id: 2, name: "مجاري هواء", spec: "متر طولي", qty: 1, unit: "قطعة" },
    { id: 3, name: "مواسير ppr", spec: "متر طولي", qty: 1, unit: "لفة" },
    { id: 4, name: "", spec: "", qty: 0, unit: "لفة", empty: true },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] pb-20 px-6 md:px-24" dir="rtl">
      <div className="max-w-[1400px] mx-auto mt-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#EB682C] mb-6">ارسال طلبات المقايسة</h2>
          <h3 className="text-2xl font-bold text-gray-900 text-right">ادخل مقاسيتك</h3>
        </div>

        {/* Top Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="w-full">
            <label className="block text-right font-bold text-gray-700 mb-3 text-sm">اسم الشركة</label>
            <div className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-500 flex items-center justify-between">
              <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
                <X className="w-3 h-3 cursor-pointer" /> شركة الحميدي صقر المورقي
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="w-full">
            <label className="block text-right font-bold text-gray-700 mb-3 text-sm">تخصص الشركة</label>
            <div className="relative">
              <select className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-400 appearance-none outline-none">
                <option>توريدات</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-right font-bold text-gray-700 mb-3 text-sm">اسم المشروع</label>
            <div className="relative">
              <select className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-400 appearance-none outline-none">
                <option>اسم المشروع</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-right font-bold text-gray-700 mb-3 text-sm">نوع المشروع</label>
            <div className="relative">
              <select className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-400 appearance-none outline-none">
                <option>خدمي</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
          <div className="flex-1 w-full">
            <label className="block text-right font-bold text-gray-700 mb-3 text-sm">موقع المشروع</label>
            <input type="text" placeholder="المحافظة / المنطقة" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-400 outline-none text-right" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-right font-bold text-gray-700 mb-3 text-sm">وصف/مواصفات المشروع</label>
            <input type="text" placeholder="ادخل وصفا دقيقا للمشروع والمواصفات العامة..." className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-400 outline-none text-right" />
          </div>
          <button className="bg-[#EB682C] text-white px-12 py-3 rounded-xl font-bold text-sm w-full md:w-auto h-[46px] hover:bg-[#d65a22] transition-colors">
            بحث
          </button>
        </div>

        {/* BOQ Table Section */}
        <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="font-bold text-[#EB682C] text-lg mb-1 text-right">جدول المقايسة الإلكتروني (BOQ) والمرفقات</h3>
          <p className="text-xs text-gray-500 text-right mb-6">أضف البنود بحرية - سيقوم النظام بمقارنة العروض تلقائياً</p>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-separate border-spacing-y-3">
              <thead className="text-xs text-gray-500 bg-gray-50">
                <tr>
                  <th className="py-3 px-4 font-bold rounded-r-lg w-[30%]">اسم البند ↕</th>
                  <th className="py-3 px-4 font-bold w-[40%]">الوصف الفني/ المواصفات ↕</th>
                  <th className="py-3 px-4 font-bold w-[10%]">الكمية ↕</th>
                  <th className="py-3 px-4 font-bold rounded-l-lg w-[20%]">الوحدة ↕</th>
                </tr>
              </thead>
              <tbody>
                {boqItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-2">
                      <input type="text" placeholder="اسم البند" defaultValue={item.name} className="w-full border border-gray-100 rounded-lg px-4 py-2.5 text-xs text-gray-700 outline-none focus:border-orange-300 bg-white" />
                    </td>
                    <td className="px-2">
                      <input type="text" placeholder="الوصف الفني" defaultValue={item.spec} className="w-full border border-gray-100 rounded-lg px-4 py-2.5 text-xs text-gray-700 outline-none focus:border-orange-300 bg-white" />
                    </td>
                    <td className="px-2">
                      <div className="relative">
                        <input type="number" defaultValue={item.qty} className="w-full border border-gray-100 rounded-lg px-4 py-2.5 text-xs text-gray-700 outline-none focus:border-orange-300 text-center bg-white" />
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center">
                          <ChevronDown className="w-3 h-3 text-gray-400 rotate-180" />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                          <select className="w-full appearance-none bg-white border border-gray-100 rounded-lg px-4 py-2.5 text-xs text-gray-700 outline-none focus:border-orange-300">
                            <option>{item.unit}</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <button className="text-red-400 hover:text-red-600 transition-colors bg-white border border-gray-100 p-2.5 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-start mt-4">
            <button className="flex items-center gap-2 bg-orange-50 text-[#EB682C] border border-orange-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors">
              <Plus className="w-4 h-4" /> اضافة بند جديد
            </button>
          </div>
        </div>

        {/* Technical Files Section */}
        <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="font-bold text-[#EB682C] text-lg mb-6 text-right">المرفقات والوثائق الفنية</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-right text-xs font-bold text-gray-700 mb-2">ملف المقايسة الأصلي</h4>
              <div className="border border-dashed border-orange-300 rounded-xl py-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-orange-50 transition-colors">
                <UploadCloud className="w-6 h-6 text-orange-200" />
                <span className="text-xs font-medium text-[#2A5CBA]">اختر الملفات من جهازك للرفع</span>
              </div>
            </div>
            <div>
              <h4 className="text-right text-xs font-bold text-gray-700 mb-2">المواصفات الفنية (Specs)</h4>
              <div className="border border-dashed border-orange-300 rounded-xl py-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-orange-50 transition-colors">
                <UploadCloud className="w-6 h-6 text-orange-200" />
                <span className="text-xs font-medium text-[#2A5CBA]">اختر الملفات من جهازك للرفع</span>
              </div>
            </div>
            <div>
              <h4 className="text-right text-xs font-bold text-gray-700 mb-2">الرسومات الهندسية(إن وجدت)</h4>
              <div className="border border-dashed border-orange-300 rounded-xl py-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-orange-50 transition-colors">
                <UploadCloud className="w-6 h-6 text-orange-200" />
                <span className="text-xs font-medium text-[#2A5CBA]">اختر الملفات من جهازك للرفع</span>
              </div>
            </div>
          </div>
        </div>

        {/* Our Clients */}
        <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm mb-8 text-right">
          <h4 className="font-bold text-[#EB682C] mb-6">بعض عملائنا</h4>
          <div className="flex flex-wrap justify-between items-center opacity-60 grayscale gap-4">
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button className="w-full bg-[#D97746] hover:bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-sm">
            ارسال طلب المقايسة
          </button>
        </div>

      </div>
    </div>
  );
}
