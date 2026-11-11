"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function RegisterStep2({ formData, setFormData, onNext, onBack }) {
  const { isEnglish } = useLanguage();

  const typeMapping = isEnglish ? {
    "Manufacturing Companies": "factory",
    "Supplier Companies": "supplier",
    "Contracting Companies": "contractor",
    "Equipment Services & Rental Companies": "rental",
    "Engineering Consultancy Offices": "real_estate",
    "Subcontractor": "subcontractor",
    "Engineer": "engineer"
  } : {
    "شركات التصنيع": "factory",
    "شركات الموردين": "supplier",
    "شركات المقاولات": "contractor",
    "شركات خدمات وتأجير معدات": "rental",
    "مكاتب الاستشارات الهندسية": "real_estate",
    "مقاول من الباطن": "subcontractor",
    "مهندس": "engineer"
  };

  const types = Object.keys(typeMapping);

  // Distinct background & border styles for each account type/category
  const categoryStyles = {
    factory: {
      // Manufacturing / شركات التصنيع (Yellow/Amber - matches highlighted preview)
      unselected: "bg-amber-50 text-amber-950 border-amber-300/90 hover:bg-amber-100 hover:border-amber-400",
      selected: "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-md shadow-amber-500/25 ring-2 ring-amber-400/40"
    },
    supplier: {
      // Supplier / شركات الموردين (Emerald/Green)
      unselected: "bg-emerald-50 text-emerald-950 border-emerald-300/90 hover:bg-emerald-100 hover:border-emerald-400",
      selected: "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/40"
    },
    contractor: {
      // Contracting / شركات المقاولات (Sky/Navy Blue)
      unselected: "bg-blue-50 text-blue-950 border-blue-300/90 hover:bg-blue-100 hover:border-blue-400",
      selected: "bg-gradient-to-r from-[#004b87] to-[#2A5CBA] text-white border-[#004b87] shadow-md shadow-blue-900/25 ring-2 ring-blue-400/40"
    },
    rental: {
      // Equipment & Rental / شركات خدمات وتأجير معدات (Warm Orange)
      unselected: "bg-orange-50 text-orange-950 border-orange-300/90 hover:bg-orange-100 hover:border-orange-400",
      selected: "bg-gradient-to-r from-[#EB682C] to-[#d65a22] text-white border-[#EB682C] shadow-md shadow-orange-500/25 ring-2 ring-orange-400/40"
    },
    real_estate: {
      // Engineering Consultancy / مكاتب الاستشارات الهندسية (Purple/Violet)
      unselected: "bg-purple-50 text-purple-950 border-purple-300/90 hover:bg-purple-100 hover:border-purple-400",
      selected: "bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-700 shadow-md shadow-purple-600/25 ring-2 ring-purple-400/40"
    },
    subcontractor: {
      // Subcontractor / مقاول من الباطن (Teal/Cyan)
      unselected: "bg-teal-50 text-teal-950 border-teal-300/90 hover:bg-teal-100 hover:border-teal-400",
      selected: "bg-gradient-to-r from-teal-600 to-teal-700 text-white border-teal-700 shadow-md shadow-teal-600/25 ring-2 ring-teal-400/40"
    },
    engineer: {
      // Engineer / مهندس (Indigo/Slate)
      unselected: "bg-indigo-50 text-indigo-950 border-indigo-300/90 hover:bg-indigo-100 hover:border-indigo-400",
      selected: "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-700 shadow-md shadow-indigo-600/25 ring-2 ring-indigo-400/40"
    }
  };

  const handleSelect = (type) => {
    setFormData({
      ...formData,
      accountTypeDisplay: type,
      type: typeMapping[type]
    });
  };

  const renderButton = (type) => {
    const typeKey = typeMapping[type];
    const isSelected = formData.type === typeKey || formData.accountTypeDisplay === type;
    const style = categoryStyles[typeKey] || {
      unselected: "bg-gray-100 text-gray-950 border-gray-300 hover:bg-gray-200",
      selected: "bg-[#2A5CBA] text-white border-[#2A5CBA] shadow-md"
    };

    return (
      <button
        key={type}
        type="button"
        onClick={() => handleSelect(type)}
        className={`px-6 py-3.5 rounded-[24px] text-sm md:text-base font-extrabold transition-all duration-200 border-2 shadow-xs cursor-pointer flex items-center justify-center gap-2 select-none ${
          isSelected
            ? `${style.selected} scale-[1.03]`
            : `${style.unselected} hover:scale-[1.02]`
        }`}
      >
        {isSelected && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
        <span>{type}</span>
      </button>
    );
  };

  return (
    <div className="w-full" dir={isEnglish ? 'ltr' : 'rtl'}>
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#EB682C] mb-3 font-tajawal">
          {isEnglish ? 'Choose your account type to complete your information' : 'اختر نوع حسابك لتكملة بياناتك'}
        </h1>
      </div>

      <div className="flex flex-col gap-4 mb-14 max-w-2xl mx-auto items-center">
        {/* Row 1: 3 options */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {types.slice(0, 3).map((type) => renderButton(type))}
        </div>

        {/* Row 2: 2 options */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {types.slice(3, 5).map((type) => renderButton(type))}
        </div>

        {/* Row 3: 2 options */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {types.slice(5, 7).map((type) => renderButton(type))}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <button 
          type="button"
          onClick={onNext}
          disabled={!formData.type}
          className="flex-1 bg-[#EB682C] text-white py-4 rounded-2xl font-bold hover:bg-[#d65a22] transition-all disabled:opacity-40 disabled:cursor-not-allowed text-lg shadow-md hover:shadow-lg disabled:shadow-none"
        >
          {isEnglish ? 'Next' : 'التالي'}
        </button>

        <button 
          type="button"
          onClick={onBack || (() => { if (typeof window !== "undefined") window.history.back(); })}
          className="flex-1 bg-white border border-gray-300 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-all text-lg shadow-xs"
        >
          {isEnglish ? 'Back' : 'الرجوع'}
        </button>
      </div>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">{isEnglish ? 'Already have an account? ' : 'لديك حساب؟ '}</span>
        <Link href="/login" className="font-bold text-[#EB682C] hover:underline">
          {isEnglish ? 'Sign In' : 'تسجيل الدخول'}
        </Link>
      </div>
    </div>
  );
}
