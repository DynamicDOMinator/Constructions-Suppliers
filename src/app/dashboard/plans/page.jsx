"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PlansPage() {
  const { isEnglish } = useLanguage();
  const [billingCycle, setBillingCycle] = useState(isEnglish ? "Monthly" : "شهري");

  const cycles = isEnglish 
    ? ["Yearly", "Bi-Annual", "Quarterly", "Monthly"]
    : ["سنوي", "نصف سنوي", "ربع سنوي", "شهري"];

  const plans = [
    {
      name: isEnglish ? "Premium Plan" : "الباقة المتميزة",
      price: "39",
      color: "blue",
      btnColor: "bg-[#3b82f6]",
      textColor: "text-[#3b82f6]",
      features: isEnglish ? [
        "Pricing Request Tools",
        "General Search Priority",
        "Pricing Requests Dashboard",
        "Featured Supplier on Homepage",
        "Monthly allowed requests quota"
      ] : [
        "أدوات طلبات التسعير",
        "أولوية البحث العام",
        "لوحة تحكم بـ طلبات التسعير",
        "مورد مميز في الصفحة الرئيسية",
        "عدد الطلبات المسموح استقبالها شهريا"
      ]
    },
    {
      name: isEnglish ? "Advanced Plan" : "الباقة المتقدمة",
      price: "39",
      color: "green",
      btnColor: "bg-[#22c55e]",
      textColor: "text-[#22c55e]",
      features: isEnglish ? [
        "General Search Priority",
        "Pricing Requests Dashboard",
        "Email Marketing Campaign",
        "Priority in Advanced Supplier Search",
        "Display as Suggested Supplier"
      ] : [
        "أولوية البحث العام",
        "لوحة تحكم بـ طلبات التسعير",
        "حملة التسويق عبر البريد الإلكتروني",
        "الأولوية في البحث المتقدم عن الموردين",
        "عرض في صفحة المنافسين كمورد مقترح"
      ]
    },
    {
      name: isEnglish ? "Basic Plan" : "الباقة الاساسية",
      price: "39",
      color: "orange",
      btnColor: "bg-[#EB682C]",
      textColor: "text-[#EB682C]",
      features: isEnglish ? [
        "Pricing Request Tools",
        "Pricing Requests Dashboard",
        "Featured Supplier on Homepage",
        "Email Marketing Campaign",
        "Monthly allowed requests quota"
      ] : [
        "أدوات طلبات التسعير",
        "لوحة تحكم بـ طلبات التسعير",
        "مورد مميز في الصفحة الرئيسية",
        "حملة التسويق عبر البريد الإلكتروني",
        "عدد الطلبات المسموح استقبالها شهريا"
      ]
    }
  ];

  return (
    <div className={`font-tajawal max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 ${isEnglish ? 'ltr' : 'rtl'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
      
      {/* Header section */}
      <div className={isEnglish ? 'text-left' : 'text-right'}>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEnglish ? 'Plans & Pricing' : 'الخطط والأسعار'}</h1>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-10 w-full overflow-x-auto pb-2">
        <div className={`bg-gray-100 p-1 rounded-xl flex ${isEnglish ? 'flex-row-reverse' : 'flex-row'} gap-1 shadow-inner min-w-max`}>
          {cycles.map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`px-4 sm:px-8 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                billingCycle === cycle 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {cycle}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="text-center mb-6">
              <div className={`flex justify-center items-end gap-1 mb-4 text-gray-900 font-bold ${isEnglish ? 'flex-row' : 'flex-row'}`}>
                {isEnglish ? (
                  <>
                    <span className="text-4xl">{plan.price}</span>
                    <span className="text-sm">SAR</span>
                    <span className="text-xl">/ Monthly</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">/ شهري</span>
                    <span className="text-sm">ريال</span>
                    <span className="text-4xl">{plan.price}</span>
                  </>
                )}
              </div>
              <h2 className={`text-2xl font-bold mb-4 ${plan.textColor}`}>{plan.name}</h2>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>

            <div  className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.textColor}`} />
                  <p className={isEnglish ? 'text-left' : 'text-right'}>{feature}</p>
                </div>
              ))}
            </div>

            <button className={`w-full text-white py-3.5 rounded-xl font-bold transition-colors hover:opacity-90 ${plan.btnColor}`}>
              {isEnglish ? 'Subscribe Now' : 'اشترك الان'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
