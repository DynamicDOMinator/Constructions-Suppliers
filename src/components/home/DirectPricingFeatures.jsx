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
      className="py-24 px-6 md:px-12 bg-[#0A101F] relative overflow-hidden text-white" 
      dir={isEnglish ? "ltr" : "rtl"} 
      data-aos="fade-up"
    >
      {/* Blueprint Grid & Atmospheric Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-radial from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Main Section Header */}
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black font-tajawal tracking-tight mb-4 text-white">
          {isEnglish ? (
            <>
              Direct <span className="text-[#FF7A38]">Pricing</span> from the Factory to the Construction Site
            </>
          ) : (
            <>
              التسعير <span className="text-[#FF7A38]">المباشر</span> من المصنع إلى موقع البناء
            </>
          )}
        </h2>
        <p className="text-slate-400 text-sm md:text-base font-semibold max-w-2xl mx-auto">
          {isEnglish 
            ? "Without middlemen... directly from the production line to your project site" 
            : "بدون وسطاء... من خط الإنتاج إلى موقعك مباشرة"}
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Interactive 4-Step Process Timeline */}
        <div className="relative mb-24 z-0">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-orange-500/70 via-blue-500/40 to-orange-500/70 z-0 shadow-[0_0_12px_rgba(235,104,44,0.3)]" />

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
                  {/* Glowing Node with Number Badge */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1.5 bg-[#141C30] border-2 border-orange-500/50 shadow-[0_0_25px_rgba(235,104,44,0.35)] flex items-center justify-center group-hover:scale-110 group-hover:border-[#FF7A38] group-hover:shadow-[0_0_35px_rgba(235,104,44,0.5)] transition-all duration-300">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF7A38] via-[#EB682C] to-[#C24B12] flex items-center justify-center text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_6px_14px_rgba(235,104,44,0.4)]">
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md group-hover:rotate-6 transition-transform duration-300" />
                      </div>
                    </div>
                    {/* Step Number Badge */}
                    <div className={`absolute -top-1 ${isEnglish ? '-left-1' : '-right-1'} w-6 h-6 rounded-full bg-white text-[#EB682C] font-black text-xs flex items-center justify-center shadow-md border border-orange-200 select-none`}>
                      {step.num}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-white text-lg md:text-xl mb-2 font-tajawal group-hover:text-[#FF7A38] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed px-2">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Impact Feature Cards (Exact 100% Dark Blueprint Palette) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Cost Savings with 30% Donut Chart */}
          <div 
            className="bg-[#121829] p-8 rounded-3xl border border-[#1E2842] shadow-[0_16px_36px_-8px_rgba(0,0,0,0.5)] hover:border-orange-500/40 hover:-translate-y-2 hover:shadow-[0_24px_45px_-10px_rgba(235,104,44,0.2)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" 
            data-aos="fade-up" 
            data-aos-delay="150"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-white text-xl font-tajawal group-hover:text-[#FF7A38] transition-colors">
                  {isEnglish ? "Cost Savings" : "توفير في التكاليف"}
                </h4>
                <div className="w-10 h-10 rounded-xl bg-[#1A233A] border border-[#263558] flex items-center justify-center text-blue-400 group-hover:bg-[#2A5CBA] group-hover:text-white transition-colors shadow-xs">
                  <Percent className="w-4 h-4" />
                </div>
              </div>

              {/* 30% Circular Donut Gauge in Dark Mode */}
              <div className="my-5 flex flex-col items-center justify-center">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="9"
                      fill="transparent"
                    />
                    {/* 30% Glowing Orange Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#FF7A38"
                      strokeWidth="9"
                      strokeDasharray="251.2"
                      strokeDashoffset="175"
                      strokeLinecap="round"
                      fill="transparent"
                      style={{ filter: "drop-shadow(0 0 10px rgba(255, 122, 56, 0.6))" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-orange-400 leading-none">%</span>
                    <span className="text-2xl md:text-3xl font-black text-white tracking-tight">30</span>
                  </div>
                </div>
              </div>
            </div>

            <p className={`text-xs md:text-sm text-slate-400 font-medium leading-relaxed ${isEnglish ? 'text-left' : 'text-right'}`}>
              {isEnglish 
                ? "Direct factory pricing saves up to 30% of total material costs by avoiding the profit margin of middlemen and wholesalers." 
                : "التسعير المباشر من المصنع يوفر ما يصل إلى 30% من التكلفة الإجمالية للمواد بتجنب هامش ربح الوسطاء وتجار الجملة"}
            </p>
          </div>

          {/* Card 2: Guaranteed Quality */}
          <div 
            className="bg-[#121829] p-8 rounded-3xl border border-[#1E2842] shadow-[0_16px_36px_-8px_rgba(0,0,0,0.5)] hover:border-orange-500/40 hover:-translate-y-2 hover:shadow-[0_24px_45px_-10px_rgba(235,104,44,0.2)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" 
            data-aos="fade-up" 
            data-aos-delay="250"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-white text-xl font-tajawal group-hover:text-[#FF7A38] transition-colors">
                  {isEnglish ? "Guaranteed Quality" : "جودة مضمونة"}
                </h4>
                <div className="w-10 h-10 rounded-xl bg-[#1A233A] border border-[#263558] flex items-center justify-center text-blue-400 group-hover:bg-[#2A5CBA] group-hover:text-white transition-colors shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Visual Seal Icon in Dark Mode */}
              <div className="my-7 flex items-center justify-center">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#1C2640] to-[#12192B] border border-blue-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(42,92,186,0.2)] group-hover:scale-105 group-hover:border-orange-500/40 group-hover:shadow-[0_0_30px_rgba(235,104,44,0.25)] transition-all duration-300">
                  <ShieldCheck className="w-12 h-12 text-[#4E8CFF] drop-shadow-md group-hover:text-[#FF7A38] transition-colors" />
                </div>
              </div>
            </div>

            <p className={`text-xs md:text-sm text-slate-400 font-medium leading-relaxed ${isEnglish ? 'text-left' : 'text-right'}`}>
              {isEnglish 
                ? "Dealing directly with the factory ensures high-quality materials with a manufacturer's warranty and after-sales service." 
                : "التعامل المباشر مع المصنع يضمن الحصول على مواد بجودة عالية مع ضمان المصنع وخدمة ما بعد البيع"}
            </p>
          </div>

          {/* Card 3: Direct Delivery */}
          <div 
            className="bg-[#121829] p-8 rounded-3xl border border-[#1E2842] shadow-[0_16px_36px_-8px_rgba(0,0,0,0.5)] hover:border-orange-500/40 hover:-translate-y-2 hover:shadow-[0_24px_45px_-10px_rgba(235,104,44,0.2)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" 
            data-aos="fade-up" 
            data-aos-delay="350"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-white text-xl font-tajawal group-hover:text-[#FF7A38] transition-colors">
                  {isEnglish ? "Direct Delivery" : "توصيل مباشر"}
                </h4>
                <div className="w-10 h-10 rounded-xl bg-[#1A233A] border border-[#263558] flex items-center justify-center text-blue-400 group-hover:bg-[#2A5CBA] group-hover:text-white transition-colors shadow-xs">
                  <Truck className="w-4 h-4" />
                </div>
              </div>

              {/* Dashed Road Line with Truck Icon in Dark Mode */}
              <div className="my-8 flex flex-col items-center justify-center w-full px-2">
                <div className="flex items-center justify-center gap-2 w-full mb-3">
                  <div className="h-1.5 w-6 bg-[#FF7A38] rounded-full shadow-[0_0_8px_rgba(255,122,56,0.6)]" />
                  <div className="h-1.5 w-6 bg-[#FF7A38] rounded-full shadow-[0_0_8px_rgba(255,122,56,0.6)]" />
                  <div className="h-1.5 w-6 bg-[#FF7A38] rounded-full shadow-[0_0_8px_rgba(255,122,56,0.6)]" />
                  <div className="h-1.5 w-6 bg-[#FF7A38] rounded-full shadow-[0_0_8px_rgba(255,122,56,0.6)]" />
                  <div className="h-1.5 w-6 bg-[#FF7A38] rounded-full shadow-[0_0_8px_rgba(255,122,56,0.6)]" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#1A233A] border border-orange-500/40 flex items-center justify-center text-[#FF7A38] shadow-[0_0_20px_rgba(255,122,56,0.25)] group-hover:translate-x-2 transition-transform duration-300">
                  <Truck className="w-7 h-7" />
                </div>
              </div>
            </div>

            <p className={`text-xs md:text-sm text-slate-400 font-medium leading-relaxed ${isEnglish ? 'text-left' : 'text-right'}`}>
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
