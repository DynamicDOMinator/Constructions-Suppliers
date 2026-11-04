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
    <aside
      className="w-full lg:w-[280px] shrink-0 font-tajawal lg:sticky lg:top-28 self-start z-20"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs max-h-[calc(100vh-140px)] flex flex-col">
        {/* Title matching screenshot: الانشطة */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 shrink-0">
          <h3 className={`text-base font-bold text-gray-900 ${isEnglish ? "text-left" : "text-right"}`}>
            {isEnglish ? "Activities" : "الأنشطة"}
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

        <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 pl-1 max-h-[calc(100vh-190px)]">
          {activities.map((cat, idx) => {
            const arName = DEFAULT_ACTIVITIES_AR[idx];
            const isSelected = selectedCategory === arName || selectedCategory === cat;
            const count = countMap[arName] ?? (categoriesData.categories?.[idx]?.count ?? null);

            return (
              <label
                key={idx}
                onClick={() => onSelectCategory && onSelectCategory(isSelected ? "" : arName)}
                className={`flex items-center justify-between cursor-pointer py-2 px-3 rounded-xl transition-all group ${
                  isSelected
                    ? "bg-orange-50/80 border border-orange-200/60"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`relative flex items-center justify-center w-5 h-5 border-2 rounded-[6px] transition-colors shrink-0 ${
                      isSelected
                        ? "border-[#EB682C] bg-[#EB682C]"
                        : "border-slate-300 bg-white group-hover:border-[#EB682C]"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white pointer-events-none"
                        viewBox="0 0 14 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5L4.5 8.5L13 1"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm select-none transition-colors ${
                      isSelected
                        ? "text-[#EB682C] font-extrabold"
                        : "text-[#004b87] font-bold group-hover:text-[#EB682C]"
                    }`}
                  >
                    {cat}
                  </span>
                </div>

                {count !== null && count !== undefined && (
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      isSelected
                        ? "bg-[#EB682C] text-white shadow-xs"
                        : "bg-slate-100 text-[#004b87] border border-slate-200/80"
                    }`}
                  >
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
