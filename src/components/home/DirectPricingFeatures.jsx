"use client";
import { FileText, Factory, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DirectPricingFeatures() {
  const { isEnglish } = useLanguage();
  return (
    <section className="py-24 px-6 md:px-12 bg-white" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-4xl font-bold font-tajawal">
          {isEnglish ? (
            <><span className="text-[#3A5DAA]">Direct </span><span className="text-[#EB682C]">Pricing </span><span className="text-[#010101]">from the Factory </span><span className="text-[#3A5DAA]">to the Construction Site</span></>
          ) : (
            <><span className="text-[#3A5DAA]">التسعير </span><span className="text-[#EB682C]">المباشر </span><span className="text-[#010101]">من المصنع </span><span className="text-[#3A5DAA]">إلى موقع البناء</span></>
          )}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Timeline */}
        <div className="relative mb-24 z-0">
          <div className="hidden md:block absolute top-[40px] right-[2%] h-[2px] bg-[#3A5DAA] z-0 draw-line-rtl"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#3A5DAA] rounded-full flex items-center justify-center text-white mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#010101] text-lg mb-2 font-tajawal">{isEnglish ? "Upload BOQ" : "رفع المقايسة"}</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                {isEnglish ? "The contractor uploads the project's BOQ to the platform." : "يقوم المقاول برفع مقايسة المشروع على المنصة"}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#3A5DAA] rounded-full flex items-center justify-center text-white mb-6">
                <Factory className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#010101] text-lg mb-2 font-tajawal">{isEnglish ? "Factory Access" : "وصول للمصانع"}</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                {isEnglish ? "The BOQ reaches approved factories directly." : "تصل المقايسة مباشرة إلى المصانع المعتمدة"}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#3A5DAA] rounded-full flex items-center justify-center text-white mb-6">
                <Tag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#010101] text-lg mb-2 font-tajawal">{isEnglish ? "Price Quotes" : "عروض الأسعار"}</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                {isEnglish ? "Factories submit their price offers directly without a middleman." : "المصانع تقدم عروض أسعارها مباشرة بدون وسيط"}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#3A5DAA] rounded-full flex items-center justify-center text-white mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#010101] text-lg mb-2 font-tajawal">{isEnglish ? "Direct Contract" : "التعاقد المباشر"}</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                {isEnglish ? "A direct contract between the contractor and the factory." : "تعاقد مباشر بين المقاول والمصنع"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAFBFC] p-8 rounded-2xl flex flex-col text-right">
            <div className="flex items-center justify-start gap-3 mb-6">
              <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#3A5DAA] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#010101] text-xl font-tajawal">{isEnglish ? "Cost Savings" : "توفير في التكاليف"}</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed text-right">
              {isEnglish ? "Direct factory pricing saves up to 30% of total material costs by avoiding the profit margin of middlemen and wholesalers." : "التسعير المباشر من المصنع يوفر ما يصل إلى 30% من التكلفة الإجمالية للمواد بتجنب هامش ربح الوسطاء وتجار الجملة"}
            </p>
          </div>
          <div className="bg-[#FAFBFC] p-8 rounded-2xl flex flex-col text-right">
            <div className="flex items-center justify-right gap-3 mb-6">
              <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#3A5DAA] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#010101] text-xl font-tajawal">{isEnglish ? "Guaranteed Quality" : "جودة مضمونة"}</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed text-right">
              {isEnglish ? "Dealing directly with the factory ensures high-quality materials with a manufacturer's warranty and after-sales service." : "التعامل المباشر مع المصنع يضمن الحصول على مواد بجودة عالية مع ضمان المصنع وخدمة ما بعد البيع"}
            </p>
          </div>
          <div className="bg-[#FAFBFC] p-8 rounded-2xl flex flex-col text-right">
            <div className="flex items-center justify-right gap-3 mb-6">
              <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#3A5DAA] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#010101] text-xl font-tajawal">{isEnglish ? "Direct Delivery" : "توصيل مباشر"}</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed text-right">
              {isEnglish ? "Direct shipping from the factory to the project site, reducing transportation costs and risks of damage in transit." : "شحن مباشر من المصنع إلى موقع المشروع مما يقلل من تكاليف النقل ومخاطر التلف أثناء النقل."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
