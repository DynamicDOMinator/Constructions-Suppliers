"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

export default function SuppliersSidebar({ selectedCategory, onSelectCategory }) {
  const { isEnglish } = useLanguage();
  const [categoriesData, setCategoriesData] = useState({ all_count: 0, categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/auth/companies/categories");
        if (res.data) {
          setCategoriesData(res.data);
        }
      } catch (err) {
        console.error("Failed to load company categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="w-full lg:w-[270px] flex-shrink-0 font-tajawal" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm sticky top-24">
        
        {/* Header with Title and Clear button */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <h3 className={`text-base font-bold text-gray-900 ${isEnglish ? 'text-left' : 'text-right'}`}>
            {isEnglish ? "Specializations & Activities" : "الأنشطة والتخصصات"}
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
        
        {/* Categories List */}
        <div className="flex flex-col gap-2.5">
          {/* All option */}
          <label 
            onClick={() => onSelectCategory && onSelectCategory("")}
            className={`flex items-center justify-between cursor-pointer py-2 px-3 rounded-xl transition-all group ${
              !selectedCategory ? "bg-orange-50/80 border border-orange-200/60" : "hover:bg-slate-50 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`relative flex items-center justify-center w-5 h-5 border-2 rounded-[5px] transition-colors ${
                !selectedCategory ? "border-[#EB682C] bg-[#EB682C]" : "border-slate-300 bg-white group-hover:border-[#EB682C]"
              }`}>
                {!selectedCategory && (
                  <svg className="w-3 h-3 text-white pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className={`text-sm select-none transition-colors ${
                !selectedCategory ? "text-[#EB682C] font-extrabold" : "text-[#004b87] font-bold group-hover:text-[#EB682C]"
              }`}>
                {isEnglish ? "All" : "الكل"}
              </span>
            </div>
            {categoriesData.all_count > 0 && (
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                !selectedCategory ? "bg-[#EB682C] text-white shadow-xs" : "bg-slate-100 text-[#004b87] border border-slate-200/80"
              }`}>
                {categoriesData.all_count}
              </span>
            )}
          </label>

          {/* Dynamic Categories */}
          {categoriesData.categories?.map((catItem, idx) => {
            const isSelected = selectedCategory === catItem.name;
            return (
              <label 
                key={idx} 
                onClick={() => onSelectCategory && onSelectCategory(isSelected ? "" : catItem.name)}
                className={`flex items-center justify-between cursor-pointer py-2 px-3 rounded-xl transition-all group ${
                  isSelected ? "bg-orange-50/80 border border-orange-200/60" : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`relative flex items-center justify-center w-5 h-5 border-2 rounded-[5px] transition-colors ${
                    isSelected ? "border-[#EB682C] bg-[#EB682C]" : "border-slate-300 bg-white group-hover:border-[#EB682C]"
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm select-none transition-colors ${
                    isSelected ? "text-[#EB682C] font-extrabold" : "text-[#004b87] font-bold group-hover:text-[#EB682C]"
                  }`}>
                    {catItem.name}
                  </span>
                </div>

                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  isSelected ? "bg-[#EB682C] text-white shadow-xs" : "bg-slate-100 text-[#004b87] border border-slate-200/80"
                }`}>
                  {catItem.count}
                </span>
              </label>
            );
          })}
        </div>

      </div>
    </aside>
  );
}
