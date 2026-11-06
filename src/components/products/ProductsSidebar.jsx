"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

const DEFAULT_PRODUCT_CATEGORIES = [
  {
    id: 1,
    uuid: "01a063c6-ab1e-7012-ae35-408e27e9d482",
    name: "دهانات وكيماويات",
    name_ar: "دهانات وكيماويات",
    name_en: "Paints & Chemicals",
    type: "product",
    count: 1,
  },
  {
    id: 2,
    uuid: "01a063c6-ab26-7003-a44f-484422bdf967",
    name: "اضاءة ومفاتيح",
    name_ar: "اضاءة ومفاتيح",
    name_en: "Lighting & Switches",
    type: "product",
    count: 1,
  },
  {
    id: 3,
    uuid: "01a063c6-ab27-70eb-9473-1b68a74a0808",
    name: "الومنيوم وزجاج",
    name_ar: "الومنيوم وزجاج",
    name_en: "Aluminum & Glass",
    type: "product",
    count: 1,
  },
  {
    id: 4,
    uuid: "01a063c6-ab29-71f8-b127-c3f799460936",
    name: "صحي وسباكة",
    name_ar: "صحي وسباكة",
    name_en: "Plumbing & Sanitary",
    type: "product",
    count: 1,
  },
  {
    id: 5,
    uuid: "01a063c6-ab2a-73e5-b8c0-2eb0e9074a2e",
    name: "انذار واطفاء حريق",
    name_ar: "انذار واطفاء حريق",
    name_en: "Fire Alarm & Firefighting",
    type: "product",
    count: 1,
  },
  {
    id: 6,
    uuid: "01a063c6-ab2b-71df-9c68-037a911e133f",
    name: "مواد بناء وعزل",
    name_ar: "مواد بناء وعزل",
    name_en: "Building & Insulation Materials",
    type: "product",
    count: 1,
  },
  {
    id: 7,
    uuid: "01a063c6-ab2d-710f-9780-488c8d1fe5c2",
    name: "اجهزة مساحية",
    name_ar: "اجهزة مساحية",
    name_en: "Surveying Equipment",
    type: "product",
    count: 1,
  },
  {
    id: 8,
    uuid: "01a063c6-ab2e-704f-8616-1a9e5692401b",
    name: "امن صناعي",
    name_ar: "امن صناعي",
    name_en: "Industrial Safety",
    type: "product",
    count: 1,
  },
  {
    id: 9,
    uuid: "01a063c6-ab30-7362-9de2-d1ccd0f1d81e",
    name: "كهرباء",
    name_ar: "كهرباء",
    name_en: "Electricity",
    type: "product",
    count: 1,
  },
  {
    id: 10,
    uuid: "01a063c6-ab31-72fe-b6bf-84ecf93b1ff9",
    name: "ابواب",
    name_ar: "ابواب",
    name_en: "Doors",
    type: "product",
    count: 1,
  },
  {
    id: 11,
    uuid: "01a063c6-ab32-7152-9343-45e6133141f4",
    name: "ارضيات",
    name_ar: "ارضيات",
    name_en: "Flooring",
    type: "product",
    count: 1,
  },
  {
    id: 12,
    uuid: "01a063c6-ab33-7084-9984-4c2f62fde4ca",
    name: "مصاعد",
    name_ar: "مصاعد",
    name_en: "Elevators",
    type: "product",
    count: 1,
  },
  {
    id: 13,
    uuid: "01a063c6-ab37-707a-a095-e7bd392e0ac8",
    name: "تكييفات",
    name_ar: "تكييفات",
    name_en: "Air Conditioners",
    type: "product",
    count: 1,
  },
  {
    id: 14,
    uuid: "01a063c6-ab38-706f-b700-f53ff9289e7f",
    name: "رخام وجرانيت",
    name_ar: "رخام وجرانيت",
    name_en: "Marble & Granite",
    type: "product",
    count: 1,
  },
];

export default function ProductsSidebar({ selectedCategory, onSelectCategory }) {
  const { isEnglish } = useLanguage();
  const [categoriesData, setCategoriesData] = useState({
    all_count: 19,
    categories: DEFAULT_PRODUCT_CATEGORIES,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/auth/products/categories");
        if (res.data && Array.isArray(res.data.categories) && res.data.categories.length > 0) {
          setCategoriesData(res.data);
        }
      } catch (err) {
        console.error("Failed to load product categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const categories = categoriesData.categories && categoriesData.categories.length > 0
    ? categoriesData.categories
    : DEFAULT_PRODUCT_CATEGORIES;

  return (
    <aside
      className="w-full lg:w-[280px] shrink-0 font-tajawal lg:sticky lg:top-28 self-start z-20"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs max-h-[calc(100vh-140px)] flex flex-col">
        {/* Header with Title and Clear button */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 shrink-0">
          <h3 className={`text-base font-black text-gray-950 ${isEnglish ? "text-left" : "text-right"}`}>
            {isEnglish ? "Activities & Categories" : "الأنشطة والتصنيفات"}
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
                {isEnglish ? "All Products" : "الكل"}
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
