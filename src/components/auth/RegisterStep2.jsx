"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function RegisterStep2({ formData, setFormData, onNext }) {
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
    "مكاتب الاستشارات الهندسية": "real_estate", // Closest match in API
    "مقاول من الباطن": "subcontractor",
    "مهندس": "engineer"
  };

  const types = Object.keys(typeMapping);

  const handleSelect = (type) => {
    setFormData({
      ...formData,
      accountTypeDisplay: type,
      type: typeMapping[type]
    });
  };

  return (
    <div className="w-full" dir={isEnglish ? 'ltr' : 'rtl'}>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">{isEnglish ? 'Choose your account type to complete your information' : 'اختر نوع حسابك لتكملة بياناتك'}</h1>
      </div>

      <div className="flex flex-col gap-4 mb-16 max-w-2xl mx-auto items-center">
        {/* Row 1: 3 options */}
        <div className="flex flex-wrap justify-center gap-4">
          {types.slice(0, 3).map((type) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`px-6 py-3.5 rounded-[24px] text-sm transition-all border shadow-sm ${
                formData.accountTypeDisplay === type 
                  ? "bg-[#3e5ca8] text-white border-transparent font-bold" 
                  : "bg-white text-gray-700 border-gray-100 hover:border-gray-300 font-medium"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Row 2: 2 options */}
        <div className="flex flex-wrap justify-center gap-4">
          {types.slice(3, 5).map((type) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`px-6 py-3.5 rounded-[24px] text-sm transition-all border shadow-sm ${
                formData.accountTypeDisplay === type 
                  ? "bg-[#3e5ca8] text-white border-transparent font-bold" 
                  : "bg-white text-gray-700 border-gray-100 hover:border-gray-300 font-medium"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Row 3: 2 options */}
        <div className="flex flex-wrap justify-center gap-4">
          {types.slice(5, 7).map((type) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`px-6 py-3.5 rounded-[24px] text-sm transition-all border shadow-sm ${
                formData.accountTypeDisplay === type 
                  ? "bg-[#3e5ca8] text-white border-transparent font-bold" 
                  : "bg-white text-gray-700 border-gray-100 hover:border-gray-300 font-medium"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={onNext}
        disabled={!formData.type}
        className="w-full bg-[#de6d3a] text-white py-4 rounded-2xl font-bold hover:bg-[#d65a22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {isEnglish ? 'Next' : 'التالي'}
      </button>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">{isEnglish ? 'Already have an account? ' : 'لديك حساب؟ '}</span>
        <Link href="/login" className="font-bold text-[#de6d3a] hover:underline">
          {isEnglish ? 'Sign In' : 'تسجيل الدخول'}
        </Link>
      </div>
    </div>
  );
}
