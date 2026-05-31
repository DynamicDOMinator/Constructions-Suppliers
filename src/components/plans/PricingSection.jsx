"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState("شهري");

  const tabs = ["سنوي", "نصف سنوي", "ربع سنوي", "شهري"];

  return (
    <section className="py-20 px-6 md:px-12 bg-white font-tajawal" dir="rtl" data-aos="fade-up">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="w-full text-right mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">الخطط والأسعار</h2>
        </div>

        {/* Tab Switcher */}
        <div className="w-full bg-[#F8FAFC] p-1.5 rounded-xl flex items-center justify-between mb-16 max-w-4xl border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm md:text-base font-bold rounded-lg transition-all ${
                activeTab === tab 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Card 1: Premium (Blue) */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-2" dir="ltr">
              <span className="text-sm font-normal text-gray-500">/ شهري</span> 39 ريال 
            </h3>
            <h4 className="text-2xl font-bold text-[#4D93F8] mb-6">الباقة المتميزة</h4>
            <p className="text-gray-500 text-xs leading-relaxed mb-8 max-w-[200px] mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            
            <div className="w-full border-t border-gray-100 pt-8 flex flex-col gap-5 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#4D93F8] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">أدوات طلبات التسعير</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#4D93F8] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">أولوية البحث العام</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#4D93F8] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">لوحة تحكم ب طلبات التسعير</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#4D93F8] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">مورّد مميز في الصفحة الرئيسية</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#4D93F8] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">عدد الطلبات المسموح استقبالها شهريا</span>
              </div>
            </div>

            <button className="w-full bg-[#4D93F8] text-white py-3.5 rounded-xl font-bold hover:bg-[#3a7ad4] transition-colors mt-auto">
              اشترك الان
            </button>
          </div>

          {/* Card 2: Advanced (Green) */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-2" dir="ltr">
              <span className="text-sm font-normal text-gray-500">/ شهري</span> 39 ريال 
            </h3>
            <h4 className="text-2xl font-bold text-[#5DB06D] mb-6">الباقة المتقدمة</h4>
            <p className="text-gray-500 text-xs leading-relaxed mb-8 max-w-[200px] mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            
            <div className="w-full border-t border-gray-100 pt-8 flex flex-col gap-5 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5DB06D] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">أولوية البحث العام</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5DB06D] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">لوحة تحكم ب طلبات التسعير</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5DB06D] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">حملة التسويق عبر البريد الإلكتروني</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5DB06D] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">الأولوية في البحث المتقدم عن الموردين</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5DB06D] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">عرض في صفحة المنافسين كمورد مقترح</span>
              </div>
            </div>

            <button className="w-full bg-[#5DB06D] text-white py-3.5 rounded-xl font-bold hover:bg-[#4d945a] transition-colors mt-auto">
              اشترك الان
            </button>
          </div>

          {/* Card 3: Basic (Orange) */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-2" dir="ltr">
              <span className="text-sm font-normal text-gray-500">/ شهري</span> 39 ريال 
            </h3>
            <h4 className="text-2xl font-bold text-[#F27A45] mb-6">الباقة الاساسية</h4>
            <p className="text-gray-500 text-xs leading-relaxed mb-8 max-w-[200px] mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            
            <div className="w-full border-t border-gray-100 pt-8 flex flex-col gap-5 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F27A45] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">أدوات طلبات التسعير</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F27A45] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">لوحة تحكم ب طلبات التسعير</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F27A45] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">مورّد مميز في الصفحة الرئيسية</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F27A45] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">حملة التسويق عبر البريد الإلكتروني</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F27A45] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">عدد الطلبات المسموح استقبالها شهريا</span>
              </div>
            </div>

            <button className="w-full bg-[#F27A45] text-white py-3.5 rounded-xl font-bold hover:bg-[#d96736] transition-colors mt-auto">
              اشترك الان
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
