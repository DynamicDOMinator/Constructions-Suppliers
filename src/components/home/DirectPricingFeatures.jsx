"use client";
import { FileText, Factory, Tag, FileCheck, ShieldCheck, Truck, Percent } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DirectPricingFeatures() {
  const { isEnglish } = useLanguage();

  const steps = [
    {
      num: isEnglish ? "1" : "١",
      icon: FileText,
      title: isEnglish ? "Upload BOQ" : "رفع المقايسة",
      desc: isEnglish 
        ? "The contractor uploads the project's BOQ directly to the platform." 
        : "يقوم المقاول برفع مقايسة المشروع على المنصة",
    },
    {
      num: isEnglish ? "2" : "٢",
      icon: Factory,
      title: isEnglish ? "Factory Access" : "وصول للمصانع",
      desc: isEnglish 
        ? "The BOQ reaches approved factories directly." 
        : "تصل المقايسة مباشرة إلى المصانع المعتمدة",
    },
    {
      num: isEnglish ? "3" : "٣",
      icon: Tag,
      title: isEnglish ? "Price Quotes" : "عروض الأسعار",
      desc: isEnglish 
        ? "Factories submit their price offers directly without a middleman." 
        : "المصانع تقدم عروض أسعارها مباشرة بدون وسيط",
    },
    {
      num: isEnglish ? "4" : "٤",
      icon: FileCheck,
      title: isEnglish ? "Direct Contract" : "التعاقد المباشر",
      desc: isEnglish 
        ? "A direct contract is formed between the contractor and the factory." 
        : "تعاقد مباشر بين المقاول والمصنع",
    },
  ];

  return (
    <section 
      className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#FAFBFC] via-white to-[#F8FAFC] relative overflow-hidden" 
      dir={isEnglish ? "ltr" : "rtl"} 
      data-aos="fade-up"
    >
      {/* Background Lighting & Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(42,92,186,0.08),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-orange-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-100/35 rounded-full blur-3xl pointer-events-none" />

      {/* Main Section Header */}
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black font-tajawal tracking-tight mb-4 text-[#010101]">
          {isEnglish ? (
            <>
              Direct <span className="text-[#EB682C]">Pricing</span> from the Factory to the <span className="text-[#2A5CBA]">Construction Site</span>
            </>
          ) : (
            <>
              التسعير <span className="text-[#EB682C]">المباشر</span> من المصنع إلى <span className="text-[#2A5CBA]">موقع البناء</span>
            </>
          )}
        </h2>
        <p className="text-gray-600 text-sm md:text-base font-semibold max-w-2xl mx-auto">
          {isEnglish 
            ? "Without middlemen... directly from the production line to your project site" 
            : "بدون وسطاء... من خط الإنتاج إلى موقعك مباشرة"}
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Interactive 4-Step Process Timeline */}
        <div className="relative mb-24 z-0">
          {/* Connecting Pipe Line */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-[#2A5CBA] via-[#EB682C] to-[#2A5CBA] z-0 shadow-xs" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx} 
                  className="flex flex-col items-center text-center group cursor-default" 
                  data-aos="fade-up" 
                  data-aos-delay={(idx + 1) * 100}
                >
                  {/* Glowing 3D Node with Number Badge */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1.5 bg-orange-50/80 border-2 border-[#EB682C]/40 shadow-[0_8px_20px_rgba(235,104,44,0.2)] flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_12px_28px_rgba(235,104,44,0.35)] group-hover:border-[#EB682C] transition-all duration-300">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF7A38] via-[#EB682C] to-[#d6551b] flex items-center justify-center text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_6px_14px_rgba(235,104,44,0.3)]">
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md group-hover:rotate-6 transition-transform duration-300" />
                      </div>
                    </div>
                    {/* Step Number Badge */}
                    <div className={`absolute -top-1 ${isEnglish ? '-left-1' : '-right-1'} w-6 h-6 rounded-full bg-white text-[#EB682C] font-black text-xs flex items-center justify-center shadow-md border-2 border-orange-100`}>
                      {step.num}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-black text-[#010101] text-lg md:text-xl mb-2 font-tajawal group-hover:text-[#EB682C] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold leading-relaxed px-2">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Impact Feature Cards (Light 3D Website Palette) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Cost Savings with 30% Donut Chart */}
          <div 
            className="bg-white p-8 rounded-3xl border border-gray-100 border-b-[5px] border-b-gray-200/90 shadow-[0_12px_28px_-6px_rgba(15,23,42,0.08),0_4px_10px_-2px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-orange-200 hover:border-b-orange-300 hover:-translate-y-2.5 hover:shadow-[0_24px_45px_-10px_rgba(235,104,44,0.18)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" 
            data-aos="fade-up" 
            data-aos-delay="150"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black text-[#010101] text-xl font-tajawal group-hover:text-[#EB682C] transition-colors">
                  {isEnglish ? "Cost Savings" : "توفير في التكاليف"}
                </h4>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2A5CBA] group-hover:bg-[#2A5CBA] group-hover:text-white transition-colors shadow-xs">
                  <Percent className="w-4 h-4" />
                </div>
              </div>

              {/* 30% Circular Donut Gauge in Website Colors */}
              <div className="my-5 flex flex-col items-center justify-center">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-gray-100"
                      strokeWidth="9"
                      fill="transparent"
                    />
                    {/* 30% Glowing Orange Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-[#EB682C]"
                      strokeWidth="9"
                      strokeDasharray="251.2"
                      strokeDashoffset="175"
                      strokeLinecap="round"
                      fill="transparent"
                      style={{ filter: "drop-shadow(0 2px 6px rgba(235, 104, 44, 0.45))" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-[#EB682C] leading-none">%</span>
                    <span className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight">30</span>
                  </div>
                </div>
              </div>
            </div>

            <p className={`text-xs md:text-sm text-gray-700 font-semibold leading-relaxed ${isEnglish ? 'text-left' : 'text-right'}`}>
              {isEnglish 
                ? "Direct factory pricing saves up to 30% of total material costs by avoiding the profit margin of middlemen and wholesalers." 
                : "التسعير المباشر من المصنع يوفر ما يصل إلى 30% من التكلفة الإجمالية للمواد بتجنب هامش ربح الوسطاء وتجار الجملة"}
            </p>
          </div>

          {/* Card 2: Guaranteed Quality */}
          <div 
            className="bg-white p-8 rounded-3xl border border-gray-100 border-b-[5px] border-b-gray-200/90 shadow-[0_12px_28px_-6px_rgba(15,23,42,0.08),0_4px_10px_-2px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-orange-200 hover:border-b-orange-300 hover:-translate-y-2.5 hover:shadow-[0_24px_45px_-10px_rgba(235,104,44,0.18)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" 
            data-aos="fade-up" 
            data-aos-delay="250"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black text-[#010101] text-xl font-tajawal group-hover:text-[#EB682C] transition-colors">
                  {isEnglish ? "Guaranteed Quality" : "جودة مضمونة"}
                </h4>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2A5CBA] group-hover:bg-[#2A5CBA] group-hover:text-white transition-colors shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Visual Seal Icon in Website Colors */}
              <div className="my-7 flex items-center justify-center">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/60 to-orange-50/60 border border-gray-100 border-b-[3px] border-b-blue-200 flex items-center justify-center shadow-[0_6px_16px_rgba(42,92,186,0.1)] group-hover:scale-105 group-hover:shadow-[0_10px_22px_rgba(235,104,44,0.18)] transition-all duration-300">
                  <ShieldCheck className="w-12 h-12 text-[#2A5CBA] drop-shadow-xs group-hover:text-[#EB682C] transition-colors" />
                </div>
              </div>
            </div>

            <p className={`text-xs md:text-sm text-gray-700 font-semibold leading-relaxed ${isEnglish ? 'text-left' : 'text-right'}`}>
              {isEnglish 
                ? "Dealing directly with the factory ensures high-quality materials with a manufacturer's warranty and after-sales service." 
                : "التعامل المباشر مع المصنع يضمن الحصول على مواد بجودة عالية مع ضمان المصنع وخدمة ما بعد البيع"}
            </p>
          </div>

          {/* Card 3: Direct Delivery */}
          <div 
            className="bg-white p-8 rounded-3xl border border-gray-100 border-b-[5px] border-b-gray-200/90 shadow-[0_12px_28px_-6px_rgba(15,23,42,0.08),0_4px_10px_-2px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-orange-200 hover:border-b-orange-300 hover:-translate-y-2.5 hover:shadow-[0_24px_45px_-10px_rgba(235,104,44,0.18)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" 
            data-aos="fade-up" 
            data-aos-delay="350"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black text-[#010101] text-xl font-tajawal group-hover:text-[#EB682C] transition-colors">
                  {isEnglish ? "Direct Delivery" : "توصيل مباشر"}
                </h4>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2A5CBA] group-hover:bg-[#2A5CBA] group-hover:text-white transition-colors shadow-xs">
                  <Truck className="w-4 h-4" />
                </div>
              </div>

              {/* Dashed Road Line with Truck Icon in Website Colors */}
              <div className="my-8 flex flex-col items-center justify-center w-full px-2">
                <div className="flex items-center justify-center gap-2 w-full mb-3">
                  <div className="h-1.5 w-6 bg-[#EB682C] rounded-full shadow-[0_2px_4px_rgba(235,104,44,0.3)]" />
                  <div className="h-1.5 w-6 bg-[#EB682C] rounded-full shadow-[0_2px_4px_rgba(235,104,44,0.3)]" />
                  <div className="h-1.5 w-6 bg-[#EB682C] rounded-full shadow-[0_2px_4px_rgba(235,104,44,0.3)]" />
                  <div className="h-1.5 w-6 bg-[#EB682C] rounded-full shadow-[0_2px_4px_rgba(235,104,44,0.3)]" />
                  <div className="h-1.5 w-6 bg-[#EB682C] rounded-full shadow-[0_2px_4px_rgba(235,104,44,0.3)]" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200/80 border-b-[3px] border-b-orange-300 flex items-center justify-center text-[#EB682C] shadow-[0_4px_10px_rgba(235,104,44,0.15)] group-hover:translate-x-2 transition-transform duration-300">
                  <Truck className="w-7 h-7" />
                </div>
              </div>
            </div>

            <p className={`text-xs md:text-sm text-gray-700 font-semibold leading-relaxed ${isEnglish ? 'text-left' : 'text-right'}`}>
              {isEnglish 
                ? "Direct shipping from the factory to the project site, reducing transportation costs and risks of damage in transit." 
                : "شحن مباشر من المصنع إلى موقع المشروع مما يقلل من تكاليف النقل ومخاطر التلف أثناء النقل."}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}