"use client";
import { Search, Trash2, UploadCloud, ChevronDown, Plus, Minus, X } from "lucide-react";

export default function PricingRequestForm({ onBack }) {
  const selectedProducts = [
    { name: "ارضيات الخزف - بورسلان", supplier: "شركة الاسناد المتخصصة المحدودة", qty: 100, unit: "متر طولي", selected: true },
    { name: "تكنولوجيا التبريد الجاف", supplier: "شركة عبدالعزيز و عبدالرحمن", qty: 100, unit: "متر", selected: true },
    { name: "مكيف هواء 360 كاسيت", supplier: "شركة عبدالعزيز و عبدالرحمن", qty: 100, unit: "طقم", selected: false },
    { name: "تكنولوجيا التبريد الجاف", supplier: "شركة الفيصل للصناعات الحديدية", qty: 100, unit: "لفة", selected: true },
    { name: "أنابيب ووصلات ومآخذ توصيل", supplier: "شركة الحميدي صقر المورقي", qty: 100, unit: "قطعة", selected: false },
    { name: "ارضيات الخزف - بورسلان", supplier: "شركة عبدالعزيز و عبدالرحمن", qty: 100, unit: "م2", selected: false },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] pb-20 px-6 md:px-24" dir="rtl">
      <div className="max-w-[1400px] mx-auto mt-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#EB682C] mb-6">ارسال طلبات التسعير</h2>
          <h3 className="text-2xl font-bold text-gray-900 text-right">ادخل مقاسيتك</h3>
        </div>

        {/* Top Add Product Form */}
        <div className="flex flex-col md:flex-row items-end gap-6 mb-10">
          <div className="flex-1 w-full">
            <label className="block text-right font-bold text-gray-700 mb-3 text-sm">الموردين</label>
            <div className="relative">
              <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                    <X className="w-3 h-3 cursor-pointer" /> شركة الفيصل
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                    <X className="w-3 h-3 cursor-pointer" /> شركة الحميدي صقر المورقي
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-right font-bold text-gray-700 mb-3 text-sm">المنتج او الخدمة</label>
            <div className="relative">
              <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 appearance-none outline-none">
                <option>المنتج</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-right font-bold text-gray-700 mb-3 text-sm">الكمية</label>
            <input type="text" placeholder="500 قطعة" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 outline-none text-right" />
          </div>
          <button className="bg-[#EB682C] text-white px-10 py-3 rounded-xl font-bold text-sm w-full md:w-auto h-[46px] hover:bg-[#d65a22] transition-colors">
            اضف المنتج
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex  flex-col lg:flex-row-reverse gap-6">
          
          {/* Right Side - Files and Notes */}
        

          {/* Left Side - Selected Products */}
          <div className="w-full ">
            <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm h-full">
              
              <div className="flex flex-row-reverse justify-between items-center mb-6">
                <button className="flex items-center gap-1 text-red-500 text-xs font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                  حذف 12
                </button>
                <div className="text-right">
                  <h3 className="font-bold text-[#EB682C] text-lg mb-1">المنتجات المختارة</h3>
                  <p className="text-xs text-gray-500">عدد المنتجات 6 | عدد الموردين 4</p>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  placeholder="بحث" 
                  className="w-full border border-gray-100 rounded-xl py-3 pr-10 pl-4 text-xs outline-none focus:border-orange-300 transition-colors"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="text-xs text-gray-400 border-b border-gray-100">
                    <tr>
                      <th className="pb-4 font-medium w-1/3">الموردين</th>
                      <th className="pb-4 font-medium w-1/4">المنتجات</th>
                      <th className="pb-4 font-medium w-1/4">الكمية</th>
                      <th className="pb-4 font-medium w-1/6">الوحدة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {selectedProducts.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 text-sm text-gray-600 font-bold">{item.supplier}</td>
                        
                        <td className="py-5 flex items-center justify-start gap-3">
                           <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center ${item.selected ? 'bg-[#EB682C] border-[#EB682C]' : 'border-gray-300'}`}>
                            {item.selected && <span className="text-white text-[10px]">✓</span>}
                          </div>  
                          <span className="text-sm font-bold text-gray-800">{item.name}</span>
                         
                        </td>
                        <td className="py-5">
                          <div className="flex items-center justify-end gap-3 bg-gray-50 w-fit ml-auto rounded-lg px-2 py-1">
                            <button className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[#EB682C]">
                              <Plus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold text-gray-800 w-6 text-center">{item.qty}</span>
                            <button className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[#EB682C]">
                              <Minus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="relative w-fit ml-auto">
                            <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-600 outline-none w-24">
                              <option>{item.unit}</option>
                            </select>
                            <ChevronDown className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button className="w-full bg-[#D97746] hover:bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-sm">
            ارسال طلب التسعير
          </button>
        </div>

      </div>
    </div>
  );
}
