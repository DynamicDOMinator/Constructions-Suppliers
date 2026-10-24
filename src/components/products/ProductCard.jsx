"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductCard({
  title,
  model,
  description,
  discount,
  unit,
  image,
  companyId,
}) {
  const { isEnglish } = useLanguage();
  const href = companyId ? `/suppliers/${companyId}` : "#";

  return (
    <div
      className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col font-tajawal group h-full"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      {/* Top: Product Image */}
      <Link
        href={href}
        className="relative block w-full h-48 md:h-52 bg-slate-50 overflow-hidden border-b border-gray-100"
      >
        {image ? (
          <img
            src={image}
            alt={title || "Product"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <span className="text-4xl opacity-40 mb-1">📦</span>
            <span className="text-xs font-medium">
              {isEnglish ? "No image" : "لا توجد صورة"}
            </span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        {/* Title */}
        <Link href={href}>
          <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1.5 line-clamp-2 group-hover:text-[#EB682C] transition-colors leading-snug">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {description}
        </p>

        {/* Price & Unit Box */}
        <div className="bg-gray-50/90 rounded-xl p-3 border border-gray-100 mb-3.5 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">
            {isEnglish ? "Price / Unit" : "السعر / للوحدة"}
          </span>
          <div className="flex items-baseline gap-1" dir="ltr">
            <span className="text-base font-extrabold text-gray-900">
              {discount || "0"}
            </span>
            <span className="text-xs font-bold text-[#EB682C]">
              {isEnglish ? "SAR" : "ريال"}
            </span>
            {unit && (
              <span className="text-[11px] text-gray-400">
                / {unit}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link href={href} className="w-full mt-auto">
          <button className="w-full bg-[#EB682C] text-white py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold hover:bg-[#d65a22] transition-colors flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md">
            <span>{isEnglish ? "View Details" : "عرض التفاصيل"}</span>
            <ArrowUpRight
              className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                isEnglish ? "" : "rotate-[-90deg]"
              }`}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
