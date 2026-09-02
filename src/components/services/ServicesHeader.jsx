"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronDown, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesHeader({ onSearchChange, onSortChange, currentSort }) {
  const { isEnglish } = useLanguage();
  const [searchInput, setSearchInput] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearchChange) {
      onSearchChange(searchInput);
    }
  };

  const handleSortSelect = (sortType) => {
    if (onSortChange) {
      onSortChange(sortType);
    }
    setIsSortOpen(false);
  };

  const getSortLabel = () => {
    switch (currentSort) {
      case "name_asc":
        return isEnglish ? "Name: A-Z" : "الاسم: أ - ي";
      case "name_desc":
        return isEnglish ? "Name: Z-A" : "الاسم: ي - أ";
      case "newest":
        return isEnglish ? "Newest" : "الأحدث";
      case "oldest":
        return isEnglish ? "Oldest" : "الأقدم";
      default:
        return isEnglish ? "Sort By" : "ترتيب حسب";
    }
  };

  return (
    <div
      className="w-full bg-white pt-8 pb-12 px-6 md:px-12 relative z-40"
      data-aos="fade-up"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <div className={`max-w-[1400px] mx-auto ${isEnglish ? "text-left" : "text-right"}`}>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="w-8"></div>
          <h1 className="text-2xl font-bold text-[#EB682C] font-tajawal">
            {isEnglish ? "Services" : "الخدمات"}
          </h1>
          <Link
            href="/"
            className="text-[#EB682C] hover:text-[#d65a22] transition-colors"
          >
            {isEnglish ? (
              <ArrowLeft className="w-6 h-6" />
            ) : (
              <ArrowRight className="w-6 h-6" />
            )}
          </Link>
        </div>

        {/* Search Section */}
        <div className={`mb-8 ${isEnglish ? "text-left" : "text-right"}`}>
          <h2 className="text-3xl font-bold text-gray-900 font-tajawal mb-6">
            {isEnglish ? "Search Services" : "ابحث عن الخدمات"}
          </h2>

          <div className="flex flex-col mb-8">
            <label className="text-sm font-bold text-gray-700 mb-2">
              {isEnglish ? "Service Name or Description" : "اسم الخدمة أو الوصف"}
            </label>
            <div className="flex h-12">
              <input
                type="text"
                placeholder={isEnglish ? "e.g. Electrical installation, Plastering..." : "مثال: تمديدات كهربائية، لياسة، تشطيبات..."}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className={`flex-1 h-full border border-gray-200 ${
                  isEnglish ? "rounded-l-lg pr-4" : "rounded-r-lg px-4"
                } text-sm focus:outline-none focus:border-[#EB682C] bg-white ${
                  isEnglish ? "-ml-1" : "-mr-1"
                }`}
              />
              <button
                onClick={handleSearch}
                className={`bg-[#EB682C] text-white px-10 h-full ${
                  isEnglish ? "rounded-r-lg" : "rounded-l-lg"
                } font-bold hover:bg-[#d65a22] transition-colors shrink-0 z-10`}
              >
                {isEnglish ? "Search" : "بحث"}
              </button>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 gap-4">
          <h3 className="text-xl font-bold text-gray-900 font-tajawal">
            {isEnglish ? "All Services" : "جميع الخدمات"}
          </h3>

          <div className="flex items-center gap-3 relative">
            {/* Sort Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-2 border rounded-lg px-4 py-2 text-sm transition-colors ${
                  currentSort
                    ? "border-[#EB682C] text-[#EB682C] bg-[#FFF5F0]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50 bg-white"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
                <span>{getSortLabel()}</span>
              </button>

              {isSortOpen && (
                <div
                  className={`absolute top-full mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden ${
                    isEnglish ? "right-0" : "left-0"
                  }`}
                >
                  <div className="flex flex-col py-2 font-tajawal">
                    <button
                      onClick={() => handleSortSelect("")}
                      className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === ""
                          ? "text-[#EB682C] font-bold bg-[#FFF5F0]"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Default" : "الافتراضي"}</span>
                      {currentSort === "" && <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleSortSelect("newest")}
                      className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "newest"
                          ? "text-[#EB682C] font-bold bg-[#FFF5F0]"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Newest" : "الأحدث"}</span>
                      {currentSort === "newest" && <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleSortSelect("oldest")}
                      className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "oldest"
                          ? "text-[#EB682C] font-bold bg-[#FFF5F0]"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Oldest" : "الأقدم"}</span>
                      {currentSort === "oldest" && <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleSortSelect("name_asc")}
                      className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "name_asc"
                          ? "text-[#EB682C] font-bold bg-[#FFF5F0]"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Name: A-Z" : "الاسم: أ - ي"}</span>
                      {currentSort === "name_asc" && <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleSortSelect("name_desc")}
                      className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "name_desc"
                          ? "text-[#EB682C] font-bold bg-[#FFF5F0]"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Name: Z-A" : "الاسم: ي - أ"}</span>
                      {currentSort === "name_desc" && <Check className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
