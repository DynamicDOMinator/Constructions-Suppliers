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
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-orange-200 transition-all duration-300 h-full flex flex-col cursor-pointer" dir={isEnglish ? "ltr" : "rtl"}>
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-start">
            {/* Logo */}
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
              {logo ? (
                <img src={logo} alt={title} className="w-full h-full object-cover brightness-105 contrast-105" />
              ) : (
                <span className="font-black text-[#2A5CBA] text-2xl">{title ? title.charAt(0) : "S"}</span>
              )}
            </div>
            {/* Title & Category */}
            <div className={`pt-1 ${isEnglish ? 'text-left' : 'text-right'}`}>
              <h3 className="font-black text-gray-950 text-base md:text-lg group-hover:text-[#EB682C] transition-colors leading-snug">{title}</h3>
              <p className="text-[#EB682C] text-xs font-extrabold mt-1">{category}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className={`${badgeColor} text-white px-3.5 py-1 rounded-full text-xs font-black shrink-0 shadow-xs`}>
            {status}
          </span>
        </div>

        {/* Description */}
        <p className={`text-gray-950 text-xs md:text-sm font-bold leading-relaxed line-clamp-3 mb-6 min-h-[40px] ${isEnglish ? 'text-left' : 'text-right'}`}>
          {description}
        </p>

        {/* Info Rows */}
        <div className="flex flex-col gap-3 mb-6 mt-auto pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <span className="text-gray-800 font-extrabold">{isEnglish ? "City : Region" : "المدينة : المنطقة"}</span>
            <span className="font-black text-gray-950">{city}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-[#EB682C] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#d65a22] transition-all group-hover:scale-[1.02] active:scale-95 shadow-xs group-hover:shadow-md shadow-orange-500/20">
          {isEnglish ? "Request Pricing" : "طلب تسعير"}
        </button>

      </div>
    </Link>
  );
}
