"use client";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ApprovedSuppliers() {
  const { isEnglish } = useLanguage();
  return (
    <section className="py-20 px-6 md:px-12 bg-white" data-aos="fade-up" dir={isEnglish ? "ltr" : "rtl"}>
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#EB682C]">
          {isEnglish ? <>Approved <span className="text-black">Suppliers</span></> : <>الموردون <span className="text-black">المعتمدون</span></>}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500">Logo</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{isEnglish ? "Al-Jubail Industrial Company" : "شركة الجبيل للصناعة"}</h3>
                  <div>
                    <p className="text-sm">{isEnglish ? "Electrical parts manufacturing" : "تصنيع قطع غيار كهربائية"}</p>
                  </div>
                </div>
              </div>
              <span className="bg-[#08A02A] text-white text-xs px-3 py-1 rounded-full font-bold">{isEnglish ? "Approved" : "معتمد"}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
              {isEnglish ? "A leading company in the manufacture and supply of building and construction materials, offering the best products with the highest international quality standards to ensure the sustainability of your projects." : "شركة رائدة في مجال صناعة وتوريد مواد البناء والتشييد، نقدم أفضل المنتجات بأعلى معايير الجودة العالمية لضمان استدامة مشاريعكم."}
            </p>
            
            <div className="flex justify-between items-center text-xs text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-gray-400">{isEnglish ? "City - Region" : "المدينة - المنطقة"}</span>
                <span className="font-bold text-gray-400">{isEnglish ? "Subcontractor" : "مقاول من الباطن"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-black">{isEnglish ? "Riyadh" : "الرياض"}</span>
                <span className="text-gray-700 text-center">0</span>
              </div>
            </div>
            
            <button className="w-full bg-[#EB682C] text-white py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors shadow-md shadow-orange-200">
              {isEnglish ? "Request Pricing" : "طلب تسعير"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
