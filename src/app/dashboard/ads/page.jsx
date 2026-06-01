"use client";
import { useState } from "react";
import { UploadCloud, ChevronDown, MoreVertical, Trash2, Edit2 } from "lucide-react";
import Image from "next/image";

export default function AdsPage() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock data for ads
  const ads = [
    { id: 1, title: "اشتري ماتور واحصل على خصم 20%", date: "Sep 17, 2035", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=250" },
    { id: 2, title: "اشتري ماتور واحصل على خصم 20%", date: "Sep 17, 2035", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400&h=250" },
    { id: 3, title: "اشتري ماتور واحصل على خصم 20%", date: "Sep 17, 2035", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400&h=250" },
    { id: 4, title: "اشتري ماتور واحصل على خصم 20%", date: "Sep 17, 2035", image: "https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?auto=format&fit=crop&q=80&w=400&h=250" },
    { id: 5, title: "اشتري ماتور واحصل على خصم 20%", date: "Sep 17, 2035", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=250" },
  ];

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">الاعلانات</h1>
      </div>

      {/* Add Ad Form Section */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
        
        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">اسم الاعلان</label>
          <input type="text" placeholder="الاسم الاول" className="w-full h-14 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
        </div>

        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">ارفع صورة الاعلان الخاص بك</label>
          <div className="border-2 border-dashed border-[#EB682C]/30 bg-[#EB682C]/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-[#EB682C]/10 cursor-pointer transition-colors">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-6 h-6 text-[#EB682C]" />
            </div>
            <p className="text-sm font-bold text-gray-700 mb-1">
              اسحب ملفاتك هنا او <span className="text-[#EB682C]">اضغط لرفع الملفات</span>
            </p>
            <p className="text-xs text-gray-400">SPNG, JPG or PDF (max. 800x400px)</p>
          </div>
        </div>

      </div>

      {/* Ads List Section */}
      <div className="pt-4 border-t border-gray-100">
        
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">
            <ChevronDown className="w-4 h-4" />
            ترتيب
          </button>
          <h2 className="text-xl font-bold text-gray-900">الاعلانات</h2>
        </div>

        {ads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ads.map((ad) => (
              <div key={ad.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                {/* Ad Image */}
                <div className="h-32 w-full relative bg-gray-100">
                  <Image src={ad.image} alt={ad.title} fill className="object-cover" />
                </div>
                
                {/* Ad Content */}
                <div className="p-4 relative">
                  <div className="flex justify-between items-start mb-2">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === ad.id ? null : ad.id)}
                      className="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    <h3 className="font-bold text-gray-900 text-sm text-right leading-tight line-clamp-2">
                      {ad.title}
                    </h3>
                  </div>
                  
                  <div className="text-left text-xs text-gray-400 font-medium">
                    {ad.date}
                  </div>

                  {/* Dropdown Menu */}
                  {activeDropdown === ad.id && (
                    <div className="absolute top-10 left-4 w-28 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden text-right">
                      <button className="w-full flex items-center justify-end gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 font-bold transition-colors">
                        حذف
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <button className="w-full flex items-center justify-end gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 font-bold transition-colors border-t border-gray-50">
                        تعديل
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State Illustration (Simulated) */
          <div className="flex justify-center items-center py-20">
            <div className="w-64 h-64 opacity-50 flex items-center justify-center">
              {/* Fallback empty state representation since we don't have the exact illustration asset */}
              <div className="text-center text-gray-400 font-bold">
                <UploadCloud className="w-24 h-24 mx-auto mb-4 text-gray-200" />
                <p>لا توجد اعلانات حتى الان</p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
