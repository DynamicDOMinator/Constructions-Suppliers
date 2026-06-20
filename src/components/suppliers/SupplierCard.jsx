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
            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shrink-0 overflow-hidden">
              {logo ? (
                <img src={logo} alt={title} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-gray-500 text-lg">{title ? title.charAt(0) : "S"}</span>
              )}
            </div>
            {/* Title & Category */}
            <div className={`pt-1 ${isEnglish ? 'text-left' : 'text-right'}`}>
              <h3 className="font-bold text-gray-900 text-base">{title}</h3>
              <p className="text-gray-500 text-xs mt-1">{category}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className={`${badgeColor} text-white px-4 py-1 rounded-full text-xs font-bold shrink-0`}>
            {status}
          </span>
        </div>

        {/* Description */}
        <p className={`text-gray-500 text-xs leading-relaxed mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
          {description}
        </p>

        {/* Info Rows */}
        <div className="flex flex-col gap-3 mb-6 mt-auto">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">{isEnglish ? "City : Region" : "المدينة : المنطقة"}</span>
            <span className="font-bold text-gray-700">{city}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">{isEnglish ? "Subcontractor" : "مقاول من الباطن"}</span>
            <span className="font-bold text-gray-700">{isSubcontractor ? "1" : "0"}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-[#EB682C] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#d65a22] transition-colors">
          {isEnglish ? "Request Pricing" : "طلب تسعير"}
        </button>

      </div>
    </Link>
  );
}
