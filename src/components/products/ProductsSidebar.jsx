"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

const DEFAULT_ACTIVITIES_AR = [
  "دهانات وكيماويات",
  "اضاءة ومفاتيح",
  "الومنيوم وزجاج",
  "صحي وسباكة",
  "انذار واطفاء حريق",
  "مواد بناء وعزل",
  "اجهزة مساحية",
  "امن صناعي",
  "كهرباء",
  "ابواب",
  "ارضيات",
  "مصاعد",
  "تكييفات",
  "رخام وجرانيت"
];

const DEFAULT_ACTIVITIES_EN = [
  "Paints & Chemicals",
  "Lighting & Switches",
  "Aluminum & Glass",
  "Plumbing & Sanitation",
  "Fire Alarm & Suppression",
  "Construction & Insulation Materials",
  "Surveying Equipment",
  "Industrial Safety",
  "Electrical",
  "Doors",
  "Flooring",
  "Elevators",
  "Air Conditioning",
  "Marble & Granite"
];

export default function ProductsSidebar({ selectedCategory, onSelectCategory }) {
  const { isEnglish } = useLanguage();
  const [categoriesData, setCategoriesData] = useState({ all_count: 0, categories: [] });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/auth/products/categories");
        if (res.data) {
          setCategoriesData(res.data);
        }
      } catch (err) {
        console.error("Failed to load product categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const activities = isEnglish ? DEFAULT_ACTIVITIES_EN : DEFAULT_ACTIVITIES_AR;

  // Build count map from API response
  const countMap = {};
  if (Array.isArray(categoriesData.categories)) {
    categoriesData.categories.forEach((cat) => {
      if (cat.name) {
        countMap[cat.name] = cat.count;
      }
    });
  }

  return (
    <aside className="w-full lg:w-[260px] flex-shrink-0 font-tajawal" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
        
        {/* Title matching screenshot: الانشطة */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <h3 className={`text-base font-bold text-gray-900 ${isEnglish ? 'text-left' : 'text-right'}`}>
            {isEnglish ? "Activities" : "الانشطة"}
          </h3>
          {selectedCategory && (
            <button 
              onClick={() => onSelectCategory && onSelectCategory("")}
              className="text-xs text-[#EB682C] hover:underline font-bold"
            >
              {isEnglish ? "Clear" : "إلغاء التحديد"}
            </button>
          )}
        </div>
        
        <div className="flex flex-col gap-3.5">
          {activities.map((cat, idx) => {
            const arName = DEFAULT_ACTIVITIES_AR[idx];
            const isSelected = selectedCategory === arName || selectedCategory === cat;
            const count = countMap[arName] ?? (categoriesData.categories?.[idx]?.count ?? null);

            return (
              <label 
                key={idx} 
                onClick={() => onSelectCategory && onSelectCategory(isSelected ? "" : arName)}
                className={`flex items-center justify-between cursor-pointer py-1 px-2 rounded-lg transition-colors group ${
                  isSelected ? "bg-orange-50/70" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`relative flex items-center justify-center w-5 h-5 border rounded-[5px] transition-colors ${
                    isSelected ? "border-[#EB682C] bg-[#EB682C]" : "border-gray-300 bg-white group-hover:border-[#EB682C]"
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm select-none transition-colors ${
                    isSelected ? "text-[#EB682C] font-bold" : "text-gray-700 group-hover:text-black"
                  }`}>
                    {cat}
                  </span>
                </div>

                {count !== null && count !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-[#EB682C] text-white font-bold" : "bg-gray-100 text-gray-500"
                  }`}>
                    {count}
                  </span>
                )}
              </label>
            );
          })}
        </div>

      </div>
    </aside>
  );
}
