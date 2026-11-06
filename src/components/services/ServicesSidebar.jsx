"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

const DEFAULT_SERVICES_CATEGORIES = [
  {
    id: 15,
    uuid: "01a063c6-ab3a-7089-8b13-2ae639e4d680",
    name: "استشارات هندسية ومعمارية",
    name_ar: "استشارات هندسية ومعمارية",
    name_en: "Architectural & Engineering Consulting",
    type: "service",
    count: 1,
  },
  {
    id: 17,
    uuid: "01a063c6-ab3d-70ad-b09f-9e2e9aa573e6",
    name: "مقاولات عامة",
    name_ar: "مقاولات عامة",
    name_en: "General Contracting",
    type: "service",
    count: 1,
  },
  {
    id: 19,
    uuid: "01a063c6-ab40-7273-a2b9-6a7faba50968",
    name: "تشطيبات وديكور",
    name_ar: "تشطيبات وديكور",
    name_en: "Finishing & Decoration",
    type: "service",
    count: 1,
  },
  {
    id: 21,
    uuid: "01a063c6-ab43-714d-a1fe-b334bc6d0420",
    name: "تمديدات وتركيبات كهربائية",
    name_ar: "تمديدات وتركيبات كهربائية",
    name_en: "Electrical Installations",
    type: "service",
    count: 1,
  },
  {
    id: 23,
    uuid: "01a063c6-ab46-7348-a947-2057c3e72917",
    name: "صحي وسباكة",
    name_ar: "صحي وسباكة",
    name_en: "Plumbing & Sanitary",
    type: "service",
    count: 1,
  },
  {
    id: 25,
    uuid: "01a063c6-ab4a-73ab-9696-70980641d6fe",
    name: "تكييف وتهوية",
    name_ar: "تكييف وتهوية",
    name_en: "HVAC & Ventilation",
    type: "service",
    count: 1,
  },
  {
    id: 27,
    uuid: "01a063c6-ab4d-731c-bd7c-e3046149a88f",
    name: "إطفاء حريق وأمن صناعي",
    name_ar: "إطفاء حريق وأمن صناعي",
    name_en: "Fire Fighting & Industrial Safety",
    type: "service",
    count: 1,
  },
  {
    id: 29,
    uuid: "01a063c6-ab4f-715a-8530-1fb8d18fd9ea",
    name: "مساحة وفحص تربة",
    name_ar: "مساحة وفحص تربة",
    name_en: "Surveying & Soil Testing",
    type: "service",
    count: 1,
  },
  {
    id: 31,
    uuid: "01a063c6-ab53-730e-bb62-6677b0beb1dc",
    name: "تأجير معدات",
    name_ar: "تأجير معدات",
    name_en: "Equipment Rental",
    type: "service",
    count: 1,
  },
  {
    id: 33,
    uuid: "01a063c6-ab57-70fa-a62a-59f98e05f8bc",
    name: "ترميم وصيانة",
    name_ar: "ترميم وصيانة",
    name_en: "Restoration & Maintenance",
    type: "service",
    count: 1,
  },
  {
    id: 35,
    uuid: "01a063c6-ab5a-729d-8190-3b3efac22671",
    name: "خدمات أخرى",
    name_ar: "خدمات أخرى",
    name_en: "Other Services",
    type: "service",
    count: 0,
  },
];

export default function ServicesSidebar({ selectedCategory, onSelectCategory }) {
  const { isEnglish } = useLanguage();
  const [categoriesData, setCategoriesData] = useState({
    all_count: 15,
    categories: DEFAULT_SERVICES_CATEGORIES,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/auth/services/categories");
        if (res.data && Array.isArray(res.data.categories) && res.data.categories.length > 0) {
          setCategoriesData(res.data);
        }
      } catch (err) {
        console.error("Failed to load service categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const categories = categoriesData.categories && categoriesData.categories.length > 0
    ? categoriesData.categories
    : DEFAULT_SERVICES_CATEGORIES;

  return (
    <aside
      className="w-full lg:w-[280px] shrink-0 font-tajawal lg:sticky lg:top-28 self-start z-20"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs max-h-[calc(100vh-140px)] flex flex-col">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 shrink-0">
          <h3
            className={`text-base font-black text-gray-950 ${
              isEnglish ? "text-left" : "text-right"
            }`}
          >
            {isEnglish ? "Categories" : "التصنيفات"}
          </h3>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory && onSelectCategory("")}
              className="text-xs text-[#EB682C] hover:underline font-black"
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
                ? "bg-orange-50/80 border border-orange-200/60"
                : "hover:bg-slate-50 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`relative flex items-center justify-center w-5 h-5 border-2 rounded-[6px] transition-colors shrink-0 ${
                  !selectedCategory
                    ? "border-[#EB682C] bg-[#EB682C]"
                    : "border-gray-400 bg-white group-hover:border-[#EB682C]"
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
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className={`text-sm select-none transition-colors ${
                !selectedCategory ? "text-[#EB682C] font-black" : "text-gray-950 font-extrabold group-hover:text-[#EB682C]"
              }`}>
                {isEnglish ? "All Services" : "الكل"}
              </span>
            </div>
            {categoriesData.all_count > 0 && (
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                  !selectedCategory
                    ? "bg-[#EB682C] text-white shadow-xs"
                    : "bg-slate-100 text-gray-950 border border-gray-300"
                }`}
              >
                {categoriesData.all_count}
              </span>
            )}
          </label>

          {/* Dynamic Categories */}
          {categories.map((catItem, idx) => {
            const displayName = isEnglish
              ? (catItem.name_en || catItem.name)
              : (catItem.name_ar || catItem.name);

            const isSelected =
              selectedCategory === catItem.name ||
              selectedCategory === catItem.name_ar ||
              selectedCategory === catItem.name_en;

            return (
              <label
                key={catItem.id || catItem.uuid || idx}
                onClick={() =>
                  onSelectCategory &&
                  onSelectCategory(isSelected ? "" : catItem.name)
                }
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
                        : "border-gray-400 bg-white group-hover:border-[#EB682C]"
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
                        ? "text-[#EB682C] font-black"
                        : "text-gray-950 font-extrabold group-hover:text-[#EB682C]"
                    }`}
                  >
                    {displayName}
                  </span>
                </div>

                {catItem.count !== undefined && catItem.count !== null && (
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                      isSelected
                        ? "bg-[#EB682C] text-white shadow-xs"
                        : "bg-slate-100 text-gray-950 border border-gray-300"
                    }`}
                  >
                    {catItem.count}
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
