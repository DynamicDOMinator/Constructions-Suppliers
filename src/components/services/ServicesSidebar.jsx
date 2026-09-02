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
      className="w-full lg:w-[280px] flex-shrink-0 font-tajawal"
      dir={isEnglish ? "ltr" : "rtl"}
      data-aos="fade-up"
    >
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
        <h3
          className={`text-base font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 ${
            isEnglish ? "text-left" : "text-right"
          }`}
        >
          {isEnglish ? "Categories" : "التصنيفات"}
        </h3>

        <div className="flex flex-col gap-2">
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
                className={`relative flex items-center justify-center w-4 h-4 border rounded-[4px] transition-colors ${
                  !selectedCategory
                    ? "border-[#EB682C] bg-[#EB682C]"
                    : "border-gray-300 bg-white group-hover:border-[#EB682C]"
                }`}
              >
                {!selectedCategory && (
                  <svg
                    className="w-2.5 h-2.5 text-white pointer-events-none"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L4.5 8.5L13 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-xs group-hover:text-black transition-colors select-none">
                {isEnglish ? "All Services" : "الكل"}
              </span>
            </div>
            {categoriesData.all_count > 0 && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  !selectedCategory
                    ? "bg-[#EB682C] text-white"
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
                    className={`relative flex items-center justify-center w-4 h-4 border rounded-[4px] transition-colors ${
                      isSelected
                        ? "border-[#EB682C] bg-[#EB682C]"
                        : "border-gray-300 bg-white group-hover:border-[#EB682C]"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-2.5 h-2.5 text-white pointer-events-none"
                        viewBox="0 0 14 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5L4.5 8.5L13 1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs group-hover:text-black transition-colors select-none">
                    {catItem.name}
                  </span>
                </div>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-[#EB682C] text-white"
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
