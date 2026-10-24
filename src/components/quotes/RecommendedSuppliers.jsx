"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";

// Fallback curated suppliers representing top industry sectors
const DEFAULT_RECOMMENDED_SUPPLIERS = [
  {
    id: "yamama-paints",
    name: "مجموعة اليمامة للدهانات ومواد العزل",
    nameEn: "Al Yamama Paints & Insulation Group",
    category: "دهانات وعوازل مائية وحرارية",
    categoryEn: "Paints & Waterproofing Materials",
    location: "الرياض • مكة المكرمة",
    locationEn: "Riyadh • Makkah",
    initial: "ي",
  },
  {
    id: "rajhi-steel",
    name: "شركة الراجحي للحديد والصلب",
    nameEn: "Al Rajhi Steel & Structural Industries",
    category: "حديد تسليح وهياكل معدنية",
    categoryEn: "Rebar & Structural Steel",
    location: "الدمام • الرياض",
    locationEn: "Dammam • Riyadh",
    initial: "ر",
  },
  {
    id: "saudi-ceramics",
    name: "مصانع الخزف والبورسلان المعتمدة",
    nameEn: "Certified Ceramics & Porcelain Co.",
    category: "سيراميك، رخام وأدوات صحية",
    categoryEn: "Ceramics, Marble & Sanitary",
    location: "الرياض • جدة",
    locationEn: "Riyadh • Jeddah",
    initial: "خ",
  },
  {
    id: "wataniya-concrete",
    name: "الوطنية للخرسانة الجاهزة والبلوك",
    nameEn: "National Ready-Mix & Blocks",
    category: "خرسانة جاهزة وبلوك إسمنتي عازل",
    categoryEn: "Ready-Mix Concrete & Blocks",
    location: "جدة • مكة المكرمة",
    locationEn: "Jeddah • Makkah",
    initial: "و",
  },
];

export default function RecommendedSuppliers() {
  const { isEnglish } = useLanguage();
  const [suppliers, setSuppliers] = useState(DEFAULT_RECOMMENDED_SUPPLIERS);

  useEffect(() => {
    let isMounted = true;
    const fetchCompanies = async () => {
      try {
        const res = await api.get("/auth/companies", { params: { per_page: 4 } });
        if (res?.data) {
          const list = res.data.data || (Array.isArray(res.data) ? res.data : []);
          if (list.length > 0 && isMounted) {
            // Transform backend suppliers to our card format
            const formatted = list.slice(0, 4).map((s, idx) => ({
              id: s.uuid || s.id || `sup-${idx}`,
              name: s.company_profile?.company_name || s.name || (isEnglish ? "Approved Supplier" : "مورد معتمد"),
              nameEn: s.company_profile?.company_name || s.name || "Approved Supplier",
              category: s.company_profile?.work_field || (isEnglish ? "Building Materials" : "مواد بناء وتشطيبات"),
              categoryEn: s.company_profile?.work_field || "Building Materials",
              location: s.company_profile?.location || (isEnglish ? "Saudi Arabia" : "المملكة العربية السعودية"),
              locationEn: s.company_profile?.location || "Saudi Arabia",
              logo: s.avatar_url || s.avatar,
              initial: (s.company_profile?.company_name || s.name || "م").charAt(0),
            }));
            setSuppliers(formatted);
          }
        }
      } catch (err) {
        // Fallback remains active
      }
    };

    fetchCompanies();
    return () => {
      isMounted = false;
    };
  }, [isEnglish]);

  return (
    <section className="mt-16 pt-12 border-t border-gray-200/90 font-tajawal" dir={isEnglish ? "ltr" : "rtl"}>
      {/* Marketing Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8" data-aos="fade-up">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {isEnglish ? "Recommended Suppliers for Direct Quotes" : "شركات ومصانع موصى بها للتسعير المباشر"}
          </h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
            {isEnglish
              ? "Connect directly with leading factories to receive competitive quotes and exclusive project discounts."
              : "تواصل مباشرة مع نخبة من المصانع والموردين للحصول على عروض أسعار منافسة لمشروعك."}
          </p>
        </div>

        {/* View All Suppliers Link */}
        <Link
          href="/suppliers"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#EB682C] hover:text-[#d65a22] transition-colors shrink-0 group self-start md:self-auto"
        >
          <span>{isEnglish ? "View all certified suppliers" : "تصفح كافة الموردين والمصانع"}</span>
          {isEnglish ? (
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          ) : (
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          )}
        </Link>
      </div>

      {/* Suggested Suppliers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suppliers.map((item, idx) => (
          <div
            key={item.id}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col h-full group relative overflow-hidden"
          >
            {/* Top Accent Gradient Bar on Hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EB682C] via-orange-400 to-[#3A5DAA] opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Avatar / Logo */}
            <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center font-bold text-[#EB682C] text-xl shrink-0 overflow-hidden shadow-xs mb-4">
              {item.logo ? (
                <img src={item.logo} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <span>{item.initial}</span>
              )}
            </div>

            {/* Name & Specialty */}
            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#EB682C] transition-colors leading-snug mb-1 line-clamp-1">
              {isEnglish ? item.nameEn : item.name}
            </h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-1">
              {isEnglish ? item.categoryEn : item.category}
            </p>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{isEnglish ? item.locationEn : item.location}</span>
            </div>

            {/* CTA Button */}
            <Link
              href={`/suppliers/${item.id}`}
              className="mt-auto block w-full"
            >
              <button className="w-full bg-[#EB682C] text-white py-2.5 px-4 rounded-xl text-xs font-bold hover:bg-[#d65a22] transition-colors flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md cursor-pointer">
                <span>{isEnglish ? "Request Direct Quote" : "طلب تسعير مباشر"}</span>
                <ArrowUpRight
                  className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                    isEnglish ? "" : "rotate-[-90deg]"
                  }`}
                />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
