"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

export default function ServicesSidebar({ selectedCategory, onSelectCategory }) {
  const { isEnglish } = useLanguage();
  const [categoriesData, setCategoriesData] = useState({
    all_count: 0,
    categories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/auth/services/categories");
        if (res.data) {
          setCategoriesData(res.data);
        }
      } catch (err) {
        console.error("Failed to load service categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside
      className="w-full lg:w-[280px] shrink-0 font-tajawal lg:sticky lg:top-28 self-start z-20"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs max-h-[calc(100vh-140px)] flex flex-col">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 shrink-0">
          <h3
            className={`text-base font-bold text-gray-900 ${
              isEnglish ? "text-left" : "text-right"
            }`}
          >
            {isEnglish ? "Categories" : "التصنيفات"}
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

        <div className="flex flex-col gap-2 overflow-y-auto pr-1 pl-1 max-h-[calc(100vh-210px)]">
          {/* All Categories Option */}
          <label
            onClick={() => onSelectCategory && onSelectCategory("")}
            className={`flex items-center justify-between cursor-pointer py-2 px-3 rounded-xl transition-all group ${
              !selectedCategory
                ? "bg-orange-50 text-[#EB682C] font-bold"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`relative flex items-center justify-center w-5 h-5 border rounded-[6px] transition-colors shrink-0 ${
                  !selectedCategory
                    ? "border-[#EB682C] bg-[#EB682C]"
                    : "border-gray-300 bg-white group-hover:border-[#EB682C]"
                }`}
              >
                {!selectedCategory && (
                  <svg
                    className="w-3 h-3 text-white pointer-events-none"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L4.5 8.5L13 1"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm select-none transition-colors">
                {isEnglish ? "All Services" : "الكل"}
              </span>
            </div>
            {categoriesData.all_count > 0 && (
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full ${
                  !selectedCategory
                    ? "bg-[#EB682C] text-white font-bold"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
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
                onClick={() =>
                  onSelectCategory &&
                  onSelectCategory(isSelected ? "" : catItem.name)
                }
                className={`flex items-center justify-between cursor-pointer py-2 px-3 rounded-xl transition-all group ${
                  isSelected
                    ? "bg-orange-50 text-[#EB682C] font-bold"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`relative flex items-center justify-center w-5 h-5 border rounded-[6px] transition-colors shrink-0 ${
                      isSelected
                        ? "border-[#EB682C] bg-[#EB682C]"
                        : "border-gray-300 bg-white group-hover:border-[#EB682C]"
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
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm select-none transition-colors">
                    {catItem.name}
                  </span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-[#EB682C] text-white font-bold"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
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
