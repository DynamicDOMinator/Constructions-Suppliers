"use client";
import Link from "next/link";
import { Wrench, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ServiceCard({
  service,
  title,
  description,
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
      {/* Top: Service Image */}
      <Link
        href={href}
        className="relative block w-full h-48 md:h-52 bg-slate-50 overflow-hidden border-b border-gray-100"
      >
        {image ? (
          <img
            src={image}
            alt={title || "Service"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-50/70 to-slate-100 flex flex-col items-center justify-center text-[#EB682C]">
            <Wrench className="w-10 h-10 text-[#EB682C]/70 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs text-gray-400 mt-2 font-medium">
              {isEnglish ? "Engineering Service" : "خدمة هندسية"}
            </span>
          </div>
        )}

      </Link>

      {/* Content Section */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        {/* Title */}
        <Link href={href}>
          <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1.5 line-clamp-2 group-hover:text-[#EB682C] transition-colors leading-snug">
            {title || (isEnglish ? "Untitled Service" : "خدمة بدون اسم")}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4 flex-1">
          {description ||
            (isEnglish
              ? "No description available for this service."
              : "لا يوجد وصف متوفر لهذه الخدمة.")}
        </p>

        {/* Action Button */}
        <Link href={href} className="w-full mt-auto pt-2">
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
