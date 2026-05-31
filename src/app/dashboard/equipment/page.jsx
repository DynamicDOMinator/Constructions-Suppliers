"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, MoreVertical, Trash2, Edit2, Grid, List, ChevronRight, ChevronLeft } from "lucide-react";

export default function EquipmentPage() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const equipments = [
    { id: 1, name: "مكواة لحام (SOLDERING IRON)", desc: "مصممة للعمل لتثبيت الأسلاك المقطوعة", date: "سبتمبر 16, 2035", price: "100 ريال / ساعة", icon: "🟢" },
    { id: 2, name: "صيانة - توريد - تنفيذ برك السباحة", desc: "مصممة للعمل لتثبيت الأسلاك المقطوعة", date: "سبتمبر 16, 2035", price: "100 ريال / ساعة", icon: "🔵" },
    { id: 3, name: "صيانة - توريد - تنفيذ برك السباحة", desc: "مصممة للعمل لتثبيت الأسلاك المقطوعة", date: "سبتمبر 16, 2035", price: "100 ريال / ساعة", icon: "🟢" },
    { id: 4, name: "صيانة - توريد - تنفيذ برك السباحة", desc: "مصممة للعمل لتثبيت الأسلاك المقطوعة", date: "سبتمبر 16, 2035", price: "100 ريال / ساعة", icon: "🔵" },
    { id: 5, name: "صيانة - توريد - تنفيذ برك السباحة", desc: "مصممة للعمل لتثبيت الأسلاك المقطوعة", date: "سبتمبر 16, 2035", price: "100 ريال / ساعة", icon: "🟢" },
    { id: 6, name: "صيانة - توريد - تنفيذ برك السباحة", desc: "مصممة للعمل لتثبيت الأسلاك المقطوعة", date: "سبتمبر 16, 2035", price: "100 ريال / ساعة", icon: "🔵" },
    { id: 7, name: "صيانة - توريد - تنفيذ برك السباحة", desc: "مصممة للعمل لتثبيت الأسلاك المقطوعة", date: "سبتمبر 16, 2035", price: "100 ريال / ساعة", icon: "🔵" },
  ];

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Link href="/dashboard/equipment/add" className="w-full md:w-auto">
          <button className="w-full bg-[#EB682C] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap">
            اضافة معدة جديدة +
          </button>
        </Link>
        <div className="text-right flex-1">
          <h1 className="text-2xl font-bold text-gray-900">المعدات</h1>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        
        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">التاريخ</label>
          <div className="relative">
            <input type="text" placeholder="ابحث عن النوع" className="w-full h-12 pr-10 pl-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
            <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">البحث</label>
          <div className="relative">
            <input type="text" placeholder="ابحث عن الخدمة" className="w-full h-12 pr-10 pl-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
            <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* List Header and Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">
            <ChevronDown className="w-4 h-4" />
            ترتيب
          </button>
          <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button className="p-2 bg-orange-50 text-[#EB682C] border-r border-gray-200">
              <List className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-50">
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-900">جميع الخدمات</h2>
      </div>

      {/* Equipment Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm mb-6 pb-2">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 font-bold w-20 text-center">التحكم</th>
                <th className="py-4 px-6 font-bold">التاريخ</th>
                <th className="py-4 px-6 font-bold">السعر</th>
                <th className="py-4 px-6 font-bold">وصف الخدمة</th>
                <th className="py-4 px-6 font-bold">المعدات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipments.map((eq) => (
                <tr key={eq.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-center text-[#EB682C] relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === eq.id ? null : eq.id)}
                      className="hover:bg-orange-50 p-1 rounded-md transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    
                    {/* Action Dropdown */}
                    {activeDropdown === eq.id && (
                      <div className="absolute top-12 left-4 w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden text-right">
                        <button className="w-full flex items-center justify-end gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-bold transition-colors">
                          حذف
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="w-full flex items-center justify-end gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors border-t border-gray-50">
                          تعديل
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-500">{eq.date}</td>
                  <td className="py-4 px-6 text-gray-500">{eq.price}</td>
                  <td className="py-4 px-6 text-gray-500">{eq.desc}</td>
                  <td className="py-4 px-6 text-gray-900 font-bold flex items-center justify-end gap-3">
                    {eq.name}
                    <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-lg">
                      {eq.icon}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-sm">10</button>
          <span className="text-gray-400">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-sm">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 text-sm">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-50 text-[#EB682C] border border-[#EB682C] font-bold text-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm font-bold text-gray-900">الصفحات 1 من 10</span>
      </div>

    </div>
  );
}
