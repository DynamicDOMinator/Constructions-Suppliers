"use client";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ServiceCard({
  service,
  title,
  description,
  image,
  companyId,
}) {
  const { isEnglish } = useLanguage();

  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col font-tajawal group h-full justify-between hover:border-[#EB682C]/30"
      dir={isEnglish ? "ltr" : "rtl"}
      data-aos="fade-up"
    >
      {/* Top Section */}
      <div>
        <div className={`flex ${isEnglish ? "flex-row" : "flex-row-reverse"} gap-4 items-start mb-4`}>
          {/* Details */}
          <div className={`flex-1 ${isEnglish ? "text-left" : "text-right"}`}>
            <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-1 group-hover:text-[#EB682C] transition-colors">
              {title || (isEnglish ? "Untitled Service" : "خدمة بدون اسم")}
            </h3>

            <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-2">
              {description || (isEnglish ? "No description provided for this service." : "لا يوجد وصف متوفر لهذه الخدمة.")}
            </p>
          </div>

          {/* Image / Icon container */}
          <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 shrink-0 relative group-hover:shadow-inner transition-shadow">
            {image ? (
              <img
                src={image}
                alt={title || "Service"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-50 to-blue-50 flex flex-col items-center justify-center text-[#EB682C]">
                <Wrench className="w-7 h-7 text-[#EB682C]/70 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[9px] text-gray-400 mt-1 font-medium">
                  {isEnglish ? "Service" : "خدمة"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className={`flex ${isEnglish ? "flex-row" : "flex-row-reverse"} items-center justify-between pt-3 mt-3 border-t border-gray-50`}>
        <Link href={companyId ? `/suppliers/${companyId}` : "#"}>
          <button className="bg-[#EB682C] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#d65a22] transition-colors shadow-sm shrink-0">
            {isEnglish ? "Show Details" : "عرض التفاصيل"}
          </button>
        </Link>
      </div>
    </div>
  );
}
