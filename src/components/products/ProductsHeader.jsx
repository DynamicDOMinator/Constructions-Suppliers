"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronDown, ArrowLeft, Check, Search, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsHeader({
  onSearchChange,
  onSortChange,
  currentSort,
  totalProducts,
}) {
  const { isEnglish } = useLanguage();
  const [searchInput, setSearchInput] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
        setIsPriceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearchChange) {
      onSearchChange(searchInput.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  const handleSortSelect = (sortType) => {
    if (onSortChange) {
      onSortChange(sortType);
    }
    setIsSortOpen(false);
    setIsPriceOpen(false);
  };

  return (
    <div
      className="w-full pt-6 px-4 md:px-12 relative z-30"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Hero Section with Background Image */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-md min-h-[260px] md:min-h-[300px] flex flex-col justify-between p-6 md:p-10 text-white"
          data-aos="fade-up"
        >
          {/* Background Image */}
          <img
            src="/products-hero.jpg"
            alt="Products Hero Banner"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Comfortable Dark / Slate Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/75 to-slate-950/85 backdrop-blur-[0.5px]"></div>

          {/* Top Bar inside Hero */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm px-3.5 py-1.5 rounded-full transition-all border border-white/15"
            >
              {isEnglish ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              <span>{isEnglish ? "Back to Home" : "العودة للرئيسية"}</span>
            </Link>

            <span className="bg-[#EB682C] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
              {isEnglish ? "Products & Materials" : "المنتجات ومواد البناء"}
            </span>
          </div>

          {/* Content & Search in Hero */}
          <div className="relative z-10 max-w-2xl my-auto py-2">
            <h1 className="text-2xl md:text-4xl font-extrabold font-tajawal mb-2 tracking-tight">
              {isEnglish ? "Search Building Materials & Products" : "ابحث عن المنتجات ومواد البناء"}
            </h1>
            <p className="text-gray-200 text-xs md:text-sm font-tajawal leading-relaxed mb-5">
              {isEnglish
                ? "Browse certified construction materials, insulation, marble, and supplies from verified vendors."
                : "تصفح مئات الأصناف المعمارية، العوازل، والتشطيبات بأسعار تنافسية من أفضل الموردين والمصانع المعتمدة."}
            </p>

            {/* Clean, Functional Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="w-full max-w-xl"
            >
              <div className="flex items-center bg-white rounded-xl shadow-lg p-1 border border-white/20">
                <Search className="w-5 h-5 text-gray-400 mx-3 shrink-0" />
                <input
                  type="text"
                  placeholder={
                    isEnglish
                      ? "Search by product name or specifications..."
                      : "ابحث باسم المنتج، الموديل، أو المواصفات..."
                  }
                  value={searchInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchInput(val);
                    if (val === "" && onSearchChange) {
                      onSearchChange("");
                    }
                  }}
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-xs md:text-sm px-1 py-2 focus:outline-none"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-gray-400 hover:text-gray-600 p-1 mx-1 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#EB682C] text-white px-5 md:px-7 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm hover:bg-[#d65a22] transition-colors shrink-0 shadow-sm cursor-pointer"
                >
                  {isEnglish ? "Search" : "بحث"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Filters and Title Row */}
        <div className="pt-8 pb-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-tajawal">
              {isEnglish ? "All Products" : "جميع المنتجات"}
            </h2>
            {totalProducts !== undefined && (
              <span className="bg-white border border-gray-200/90 text-gray-600 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {totalProducts} {isEnglish ? "items" : "منتج"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Sort Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  setIsPriceOpen(false);
                }}
                className={`flex items-center gap-2 border rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-xs ${
                  currentSort?.startsWith("name")
                    ? "border-[#EB682C] text-[#EB682C] bg-orange-50/50"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
                <span>
                  {currentSort === "name_asc"
                    ? isEnglish
                      ? "Sort: A-Z"
                      : "الترتيب: أ - ي"
                    : currentSort === "name_desc"
                    ? isEnglish
                      ? "Sort: Z-A"
                      : "الترتيب: ي - أ"
                    : isEnglish
                    ? "Sort By"
                    : "ترتيب"}
                </span>
              </button>

              {isSortOpen && (
                <div
                  className={`absolute top-full mt-2 w-48 bg-white border border-gray-200/90 rounded-xl shadow-lg z-50 overflow-hidden ${
                    isEnglish ? "right-0" : "left-0"
                  }`}
                >
                  <div className="flex flex-col py-1 font-tajawal">
                    <button
                      onClick={() => handleSortSelect("")}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "" ? "text-[#EB682C] font-bold bg-orange-50/40" : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Default" : "الافتراضي"}</span>
                      {currentSort === "" && <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleSortSelect("name_asc")}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "name_asc"
                          ? "text-[#EB682C] font-bold bg-orange-50/40"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Name: A-Z" : "الاسم: أ - ي"}</span>
                      {currentSort === "name_asc" && <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleSortSelect("name_desc")}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "name_desc"
                          ? "text-[#EB682C] font-bold bg-orange-50/40"
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

            {/* Price Dropdown */}
            <div className="relative" ref={priceDropdownRef}>
              <button
                onClick={() => {
                  setIsPriceOpen(!isPriceOpen);
                  setIsSortOpen(false);
                }}
                className={`flex items-center gap-2 border rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-xs ${
                  currentSort?.startsWith("price")
                    ? "border-[#EB682C] text-[#EB682C] bg-orange-50/50"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isPriceOpen ? "rotate-180" : ""
                  }`}
                />
                <span>
                  {currentSort === "price_asc"
                    ? isEnglish
                      ? "Price: Low to High"
                      : "السعر: من الأقل للأعلى"
                    : currentSort === "price_desc"
                    ? isEnglish
                      ? "Price: High to Low"
                      : "السعر: من الأعلى للأقل"
                    : isEnglish
                    ? "Price"
                    : "السعر"}
                </span>
              </button>

              {isPriceOpen && (
                <div
                  className={`absolute top-full mt-2 w-56 bg-white border border-gray-200/90 rounded-xl shadow-lg z-50 overflow-hidden ${
                    isEnglish ? "right-0" : "left-0"
                  }`}
                >
                  <div className="flex flex-col py-1 font-tajawal">
                    <button
                      onClick={() => handleSortSelect("")}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "" ? "text-[#EB682C] font-bold bg-orange-50/40" : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Default" : "الافتراضي"}</span>
                      {(!currentSort || !currentSort.startsWith("price")) && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleSortSelect("price_asc")}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "price_asc"
                          ? "text-[#EB682C] font-bold bg-orange-50/40"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Lowest to Highest" : "من الأقل للأعلى"}</span>
                      {currentSort === "price_asc" && <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleSortSelect("price_desc")}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        currentSort === "price_desc"
                          ? "text-[#EB682C] font-bold bg-orange-50/40"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{isEnglish ? "Highest to Lowest" : "من الأعلى للأقل"}</span>
                      {currentSort === "price_desc" && <Check className="w-4 h-4" />}
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
