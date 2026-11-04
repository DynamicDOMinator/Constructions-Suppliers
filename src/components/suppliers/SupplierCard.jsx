"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function SupplierCard({ id, status, title, category, description, city, isSubcontractor, logo }) {
  const { isEnglish } = useLanguage();
  let badgeColor = "bg-blue-500";
  if (status === "اساسي") badgeColor = "bg-[#EB682C]";
  if (status === "متقدم") badgeColor = "bg-[#4CAF50]";

  return (
    <Link href={`/suppliers/${id}`} className="block group">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer" dir={isEnglish ? "ltr" : "rtl"}>
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-start">
            {/* Logo */}
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden shadow-xs">
              {logo ? (
                <img src={logo} alt={title} className="w-full h-full object-cover" />
              ) : (
                <span className="font-extrabold text-gray-700 text-xl">{title ? title.charAt(0) : "S"}</span>
              )}
            </div>
            {/* Title & Category */}
            <div className={`pt-1 ${isEnglish ? 'text-left' : 'text-right'}`}>
              <h3 className="font-extrabold text-gray-900 text-base md:text-lg group-hover:text-[#EB682C] transition-colors leading-snug">{title}</h3>
              <p className="text-[#EB682C] text-xs font-bold mt-1">{category}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className={`${badgeColor} text-white px-3.5 py-1 rounded-full text-xs font-bold shrink-0 shadow-xs`}>
            {status}
          </span>
        </div>

        {/* Description */}
        <p className={`text-gray-700 text-xs md:text-sm font-medium leading-relaxed line-clamp-3 mb-6 min-h-[40px] ${isEnglish ? 'text-left' : 'text-right'}`}>
          {description}
        </p>

        {/* Info Rows */}
        <div className="flex flex-col gap-3 mb-6 mt-auto pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <span className="text-gray-600 font-semibold">{isEnglish ? "City : Region" : "المدينة : المنطقة"}</span>
            <span className="font-extrabold text-gray-900">{city}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-[#EB682C] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#d65a22] transition-colors shadow-xs group-hover:shadow-md">
          {isEnglish ? "Request Pricing" : "طلب تسعير"}
        </button>

      </div>
    </Link>
  );
}
