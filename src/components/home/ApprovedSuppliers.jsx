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
        {[1, 2, 3].map((item, idx) => (
          <div
            key={item}
            data-aos="fade-up"
            data-aos-delay={idx * 150 + 100}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-orange-200 transition-all duration-300 p-6 flex flex-col group"
          >
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center font-extrabold text-[#EB682C] shadow-xs group-hover:scale-105 transition-transform">Logo</div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-[#EB682C] transition-colors">{isEnglish ? "Al-Jubail Industrial Company" : "شركة الجبيل للصناعة"}</h3>
                  <div>
                    <p className="text-xs font-bold text-[#EB682C]">{isEnglish ? "Electrical parts manufacturing" : "تصنيع قطع غيار كهربائية"}</p>
                  </div>
                </div>
              </div>
              <span className="bg-[#08A02A] text-white text-xs px-3 py-1 rounded-full font-bold shadow-xs">{isEnglish ? "Approved" : "معتمد"}</span>
            </div>
            
            <p className="text-sm text-gray-800 font-semibold mb-6 flex-grow leading-relaxed">
              {isEnglish ? "A leading company in the manufacture and supply of building and construction materials, offering the best products with the highest international quality standards to ensure the sustainability of your projects." : "شركة رائدة في مجال صناعة وتوريد مواد البناء والتشييد، نقدم أفضل المنتجات بأعلى معايير الجودة العالمية لضمان استدامة مشاريعكم."}
            </p>
            
            <div className="flex justify-between items-center text-xs mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="flex flex-col gap-1">
                <span className="text-gray-700 font-bold">{isEnglish ? "City - Region" : "المدينة - المنطقة"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-950 font-black">{isEnglish ? "Riyadh" : "الرياض"}</span>
              </div>
            </div>
            
            <button className="w-full bg-[#EB682C] text-white py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-orange-500/20">
              {isEnglish ? "Request Pricing" : "طلب تسعير"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
