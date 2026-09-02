"use client";
import { useLanguage } from "@/context/LanguageContext";
import PricingComparisonTable from "./PricingComparisonTable";

export default function PricingSection() {
  const { isEnglish } = useLanguage();

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-white font-tajawal" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className={`w-full ${isEnglish ? 'text-left' : 'text-right'} mb-4`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EB682C]"></span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#EB682C]">
              {isEnglish ? "Transparent Pricing" : "خطط وباقات مرنة"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {isEnglish ? "Plans & Packages Comparison" : "مقارنة باقات وخطط الاشتراك"}
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl">
            {isEnglish 
              ? "Choose the ideal plan tailored to your business needs and expand your reach to top construction suppliers and buyers." 
              : "اختر الباقة المناسبة لحجم أعمالك وانضم لأكبر شبكة موردين ومقاولي إنشاءات في المنطقة."}
          </p>
        </div>

        {/* Feature Comparison Matrix */}
        <PricingComparisonTable />

      </div>
    </section>
  );
}
