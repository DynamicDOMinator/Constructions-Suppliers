"use client";
import { useLanguage } from "@/context/LanguageContext";
import PricingComparisonTable from "@/components/plans/PricingComparisonTable";

export default function DashboardPlansPage() {
  const { isEnglish } = useLanguage();

  return (
    <div className={`font-tajawal max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 ${isEnglish ? 'ltr' : 'rtl'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
      
      {/* Header section */}
      <div className={isEnglish ? 'text-left' : 'text-right'}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {isEnglish ? 'Plans & Packages' : 'الباقات والخطط'}
        </h1>
        <p className="text-sm text-gray-500">
          {isEnglish
            ? 'Compare features across packages and choose the ideal subscription for your business.'
            : 'قارن بين مميزات الباقات المختلفة واختر خطة الاشتراك المناسبة لمشروعك.'}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl border border-gray-100 p-4 md:p-6 shadow-sm">
        <PricingComparisonTable />
      </div>

    </div>
  );
}
