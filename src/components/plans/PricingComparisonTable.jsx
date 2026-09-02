"use client";
import { useState } from "react";
import { Check, X, Briefcase, Star, Crown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingComparisonTable({ onSelectPlan }) {
  const { isEnglish } = useLanguage();
  const [billingCycle, setBillingCycle] = useState("annual"); // "monthly" | "quarterly" | "annual"
  const [selectedPlanId, setSelectedPlanId] = useState("advanced");

  // Plans data matching screenshot
  const plans = [
    {
      id: "starter",
      titleAr: "ابتدائية",
      titleEn: "Starter",
      icon: Briefcase,
      monthlyPrice: 53,
      quarterlyPrice: 41,
      annualPrice: 26,
    },
    {
      id: "basic",
      titleAr: "اساسية",
      titleEn: "Basic",
      icon: Star,
      monthlyPrice: 80,
      quarterlyPrice: 62,
      annualPrice: 40,
    },
    {
      id: "advanced",
      titleAr: "متقدم",
      titleEn: "Advanced",
      icon: ({ className }) => (
        <div className="flex items-center justify-center gap-0.5">
          <Star className={className} />
          <Star className={className} />
        </div>
      ),
      monthlyPrice: 107,
      quarterlyPrice: 82,
      annualPrice: 53,
      isHighlighted: true,
    },
    {
      id: "premium",
      titleAr: "متميز",
      titleEn: "Premium",
      icon: Crown,
      monthlyPrice: 147,
      quarterlyPrice: 113,
      annualPrice: 73,
    },
  ];

  // 17 exact features from the screenshot
  const features = [
    {
      titleAr: "التسجيل مع إضافة غير محدودة من المنتجات والخدمات والعلامات التجارية والموافقات",
      titleEn: "Registration with unlimited products, services, trademarks, and approvals",
      availability: { starter: true, basic: true, advanced: true, premium: true },
    },
    {
      titleAr: "لوحة تحكم بـ طلبات التسعير",
      titleEn: "Quotation Requests Dashboard",
      availability: { starter: true, basic: true, advanced: true, premium: true },
    },
    {
      titleAr: "عدد الطلبات المسموح استقبالها شهرياً",
      titleEn: "Number of monthly requests allowed",
      availability: { starter: true, basic: true, advanced: true, premium: true },
    },
    {
      titleAr: "قاعدة بيانات (مدنية، كهربائية، ميكانيكية)",
      titleEn: "Database (Civil, Electrical, Mechanical)",
      availability: { starter: true, basic: true, advanced: true, premium: true },
    },
    {
      titleAr: "أدوات طلبات التسعير",
      titleEn: "Quotation Request Tools",
      availability: { starter: true, basic: true, advanced: true, premium: true },
    },
    {
      titleAr: "لوحة التحكم لإدارة طلبات التسعير وفريق التوريدات",
      titleEn: "Control dashboard for quote requests and procurement team",
      availability: { starter: true, basic: true, advanced: true, premium: true },
    },
    {
      titleAr: "تقرير شهري عن المشاريع التي تم إنشاؤها مؤخراً",
      titleEn: "Monthly report on recently created projects",
      availability: { starter: false, basic: true, advanced: true, premium: true },
    },
    {
      titleAr: "مساحة إعلانات (الشريك الذهبي). متاحة في الصفحات الأكثر أهمية",
      titleEn: "Ad Space (Golden Partner). Available on highest traffic pages",
      availability: { starter: false, basic: false, advanced: false, premium: true },
    },
    {
      titleAr: "مورد مميز في الصفحة الرئيسية",
      titleEn: "Featured Supplier on the Home Page",
      availability: { starter: false, basic: false, advanced: false, premium: true },
    },
    {
      titleAr: "أولوية البحث العام",
      titleEn: "General Search Priority",
      availability: { starter: false, basic: false, advanced: false, premium: true },
    },
    {
      titleAr: "الأولوية في البحث المتقدم عن الموردين",
      titleEn: "Priority in Advanced Supplier Search",
      availability: { starter: false, basic: false, advanced: false, premium: true },
    },
    {
      titleAr: "عرض كل معلومات الاتصال لجميع الشركات",
      titleEn: "Full contact information display for all companies",
      availability: { starter: false, basic: false, advanced: false, premium: true },
    },
    {
      titleAr: "عرض في صفحة المنافسين كمورد مقترح",
      titleEn: "Display on competitor pages as a recommended supplier",
      availability: { starter: false, basic: false, advanced: false, premium: true },
    },
  ];

  const getPrice = (plan) => {
    if (billingCycle === "monthly") return plan.monthlyPrice;
    if (billingCycle === "quarterly") return plan.quarterlyPrice;
    return plan.annualPrice;
  };

  return (
    <div className="w-full font-tajawal max-w-[1240px] mx-auto py-6" dir={isEnglish ? "ltr" : "rtl"}>
      
      {/* Outer Table Container */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[850px] border border-[#E5E7EB] rounded-2xl bg-white shadow-sm overflow-hidden">
          
          {/* Table Header Row */}
          <div className="grid grid-cols-12 border-b border-[#E5E7EB]">
            
            {/* Right Header Cell (Billing Cycles) */}
            <div className="col-span-4 p-5 flex flex-col justify-end items-end pr-6">
              <div className="flex flex-col items-center">
                {/* Savings Pill labels */}
                <div className="flex items-center justify-between w-full px-2 mb-1.5 text-[11px] font-bold text-[#EB682C]">
                  <span className="opacity-0">.</span>
                  <span className="bg-orange-50 text-[#EB682C] px-1.5 py-0.5 rounded-md font-extrabold text-[10px]">
                    {isEnglish ? "Save 23%" : "وفّر 23%"}
                  </span>
                  <span className="bg-[#EB682C] text-white px-2 py-0.5 rounded-md font-extrabold text-[10px] shadow-sm">
                    {isEnglish ? "Save 50%" : "وفّر 50%"}
                  </span>
                </div>

                {/* Pill switch */}
                <div className="flex items-center bg-[#F1F5F9] p-1 rounded-full border border-gray-200/80">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      billingCycle === "monthly"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {isEnglish ? "Monthly" : "شهري"}
                  </button>
                  <button
                    onClick={() => setBillingCycle("quarterly")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      billingCycle === "quarterly"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {isEnglish ? "Quarterly" : "ربع سنوي"}
                  </button>
                  <button
                    onClick={() => setBillingCycle("annual")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      billingCycle === "annual"
                        ? "bg-[#EB682C] text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {isEnglish ? "Annual" : "سنوي"}
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Plan Columns Headers */}
            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const isHighlighted = plan.isHighlighted;
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    onSelectPlan && onSelectPlan(plan, billingCycle);
                  }}
                  className={`col-span-2 cursor-pointer transition-all p-4 flex flex-col items-center justify-between border-r border-[#E5E7EB] first:border-r-0 relative ${
                    isHighlighted
                      ? "bg-[#EB682C] text-white rounded-t-2xl md:rounded-t-3xl shadow-sm z-10"
                      : "bg-white text-gray-800 hover:bg-orange-50/20"
                  }`}
                >
                  {/* Top Radio Indicator */}
                  <div className="w-full flex justify-center mb-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? isHighlighted
                            ? "border-white bg-white"
                            : "border-[#EB682C] bg-[#EB682C]"
                          : isHighlighted
                          ? "border-white/70"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isHighlighted ? "bg-[#EB682C]" : "bg-white"
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Plan Icon */}
                  <div className="mb-2">
                    <Icon
                      className={`w-5 h-5 ${
                        isHighlighted ? "text-white" : "text-[#EB682C]"
                      }`}
                    />
                  </div>

                  {/* Plan Title */}
                  <h3
                    className={`text-base font-extrabold mb-3 tracking-wide ${
                      isHighlighted ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {isEnglish ? plan.titleEn : plan.titleAr}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-3xl font-black font-sans">
                      {getPrice(plan)}
                    </span>
                    <div className="flex flex-col text-[10px] leading-tight opacity-90 font-bold">
                      <span>USD</span>
                      <span>{isEnglish ? "mo" : "شهر"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Body (17 Comparison Rows) */}
          <div className="divide-y divide-gray-100">
            {features.map((feature, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`grid grid-cols-12 items-center transition-colors ${
                    isEven ? "bg-white" : "bg-[#F8FAFC]/60"
                  }`}
                >
                  {/* Feature Title (Right in RTL) */}
                  <div className="col-span-4 py-3.5 px-6 text-sm font-semibold text-gray-700 leading-snug">
                    {isEnglish ? feature.titleEn : feature.titleAr}
                  </div>

                  {/* 4 Availability Columns */}
                  {plans.map((plan) => {
                    const available = feature.availability[plan.id];
                    const isHighlighted = plan.isHighlighted;

                    return (
                      <div
                        key={plan.id}
                        className={`col-span-2 py-3.5 flex items-center justify-center border-r border-[#E5E7EB] first:border-r-0 ${
                          isHighlighted ? "bg-[#EB682C] text-white border-r-orange-400/30" : ""
                        }`}
                      >
                        {available ? (
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                              isHighlighted
                                ? "bg-white text-[#EB682C] shadow-sm"
                                : "bg-emerald-500 text-white shadow-sm"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                          </div>
                        ) : (
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              isHighlighted
                                ? "bg-white/20 text-white/80"
                                : "bg-gray-200/80 text-gray-400"
                            }`}
                          >
                            <X className="w-3 h-3 stroke-[2.5]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Table Footer Action Row */}
          <div className="grid grid-cols-12 border-t border-[#E5E7EB] bg-gray-50/50">
            <div className="col-span-4 py-5 px-6 flex items-center text-xs font-bold text-gray-500">
              {isEnglish
                ? "All plans include 24/7 technical support and cloud security."
                : "جميع الباقات تشمل الدعم الفني 24/7 والحماية السحابية."}
            </div>

            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const isHighlighted = plan.isHighlighted;

              return (
                <div
                  key={plan.id}
                  className={`col-span-2 py-5 px-3 flex items-center justify-center border-r border-[#E5E7EB] first:border-r-0 relative ${
                    isHighlighted ? "bg-[#EB682C] border-r-orange-400/30 rounded-b-2xl md:rounded-b-3xl" : ""
                  }`}
                >
                  <button
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      onSelectPlan && onSelectPlan(plan, billingCycle);
                    }}
                    className={`w-full py-2.5 px-2 rounded-xl font-extrabold text-xs transition-all duration-200 shadow-sm ${
                      isHighlighted
                        ? "bg-white text-[#EB682C] hover:bg-orange-50 hover:shadow-md"
                        : isSelected
                        ? "bg-[#EB682C] text-white hover:bg-[#d9571e]"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-[#EB682C] hover:text-[#EB682C]"
                    }`}
                  >
                    {isEnglish ? "Choose Plan" : "اختيار الباقة"}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
