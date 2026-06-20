"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Pagination({ currentPage, totalPages, totalItems, onPageChange, perPage = 10 }) {
  const { isEnglish } = useLanguage();
  if (!totalPages || totalPages <= 1) return null;

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="w-full flex items-center justify-between mt-12 pt-6 font-tajawal" dir={isEnglish ? "ltr" : "rtl"}>
      {/* Items count */}
      <div className="text-xs text-gray-500 font-bold">
        {totalItems > 0 ? (isEnglish ? `${startItem}-${endItem} of ${totalItems} items` : `${endItem}-${startItem} من أصل ${totalItems} منتج`) : ""}
      </div>

      {/* Pages */}
      <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-[#EB682C] hover:opacity-70 transition-opacity disabled:opacity-50"
        >
          {isEnglish ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button 
            key={page}
            onClick={() => onPageChange(page)}
            className={`transition-colors ${currentPage === page ? "text-[#EB682C] font-bold" : "hover:text-[#EB682C]"}`}
          >
            {page}
          </button>
        ))}
        
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-[#EB682C] hover:opacity-70 transition-opacity disabled:opacity-50"
        >
          {isEnglish ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
