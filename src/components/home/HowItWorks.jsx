"use client";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HowItWorks() {
  const { isEnglish } = useLanguage();

  const steps = [
    {
      num: "1",
      title: isEnglish ? "Search for Products" : "ابحث عن المنتجات",
      desc: isEnglish 
        ? "Use our advanced search to quickly find the required products or services, then easily add your selections to the request." 
        : "استخدم البحث المتقدم الذي نوفره للعثور بسرعة على المنتجات أو الخدمات المطلوبة ، ثم قم بإضافة اختياراتك بسهولة إلى الطلب.",
    },
    {
      num: "2",
      title: isEnglish ? "Enter Project Details" : "ادخل معلومات المشروع",
      desc: isEnglish 
        ? "Fill in your project details and specifications; this makes it easy for suppliers to connect with you and provide their best quote." 
        : "املأ معلومات وتفاصيل مشروعك، سيسهل ذلك على الموردين الاتصال بك وتقديم أفضل عرض أسعار لك.",
    },
    {
      num: "3",
      title: isEnglish ? "Sign In / Register" : "الدخول / التسجيل",
      desc: isEnglish 
        ? "Go to your account to review all sent pricing requests and see the complete list of offers received." 
        : "اذهب إلى حسابك للحصول على كل التفاصيل من طلبات الأسعار المرسلة، وعلى قائمة كاملة من العروض التي أرسلت إليك.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      {/* Background Decorative Blur Accents */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-24 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Section Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black font-tajawal text-[#010101] tracking-tight">
          {isEnglish ? (
            <>
              <span className="text-[#EB682C]">How</span> does the{" "}
              <span className="text-[#2A5CBA]">Construction Suppliers</span> platform work?
            </>
          ) : (
            <>
              <span className="text-[#EB682C]">كيف تعمل</span> منصة موردي{" "}
              <span className="text-[#2A5CBA]">مواد البناء؟</span>
            </>
          )}
        </h2>
      </div>

      {/* 3 Step Cards Grid (Platform Colors & 3D styling) */}
      <div className="max-w-6xl mx-auto relative z-10 mb-12 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {steps.map((item, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={(idx + 1) * 100}
              className="bg-white pt-10 pb-10 px-8 rounded-3xl border border-gray-100 border-b-[6px] border-b-gray-200/90 shadow-[0_18px_36px_-8px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.03)] hover:-translate-y-3 hover:border-b-[8px] hover:border-b-orange-400 hover:shadow-[0_26px_50px_-10px_rgba(235,104,44,0.2)] active:translate-y-0 active:border-b-[3px] transition-all duration-300 flex flex-col items-center text-center relative group"
            >
              {/* Protruding 3D Number Ribbon */}
              <div className={`absolute -top-7 ${isEnglish ? 'left-8' : 'right-8'} z-20 pointer-events-none`}>
                <span className="font-black text-6xl md:text-7xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#FF7A38] via-[#EB682C] to-[#C24B12] drop-shadow-[0_6px_12px_rgba(235,104,44,0.35)] group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 select-none inline-block">
                  {item.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-black text-[#010101] text-xl md:text-2xl mb-4 mt-2 font-tajawal group-hover:text-[#EB682C] transition-colors leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12 mb-16" data-aos="zoom-in" data-aos-delay="350">
          <Link
            href="/suppliers"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF7A38] via-[#EB682C] to-[#d6551b] hover:from-[#EB682C] hover:to-[#c24b12] text-white px-10 py-4 rounded-full font-black text-base md:text-lg shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>{isEnglish ? "Send a Free Quote Request!" : "أرسل طلب تسعير مجاناً!"}</span>
            {isEnglish ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </Link>
        </div>
      </div>

      {/* Blue Stats Banner */}
      <div 
        data-aos="zoom-in-up"
        data-aos-delay="200"
        className="max-w-5xl mx-auto rounded-3xl py-10 px-8 flex flex-col md:flex-row justify-around items-center text-white gap-10 shadow-2xl overflow-hidden relative"
        style={{ backgroundImage: "url('/bg-sec.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="text-center relative z-10 flex flex-col items-center group cursor-default p-3 rounded-xl hover:bg-white/10 transition-all duration-300">
          <Image src="/users.png" alt="Registered Suppliers" width={40} height={40} className="mb-3 object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="text-3xl md:text-4xl font-extrabold mb-1 font-tajawal">
            +<CountUp end={1.5} decimals={1} duration={2.5} enableScrollSpy /> {isEnglish ? "K" : "ألف"}
          </div>
          <div className="text-white text-sm font-bold">{isEnglish ? "Registered Suppliers" : "الموردون المسجلون"}</div>
        </div>
        <div className="hidden md:block w-px h-20 bg-blue-400/30 relative z-10"></div>
        <div className="text-center relative z-10 flex flex-col items-center group cursor-default p-3 rounded-xl hover:bg-white/10 transition-all duration-300">
          <Image src="/money.png" alt="Total Transactions" width={40} height={40} className="mb-3 object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="text-3xl md:text-4xl font-extrabold mb-1 font-tajawal">
            <CountUp end={10} duration={2.5} enableScrollSpy /> {isEnglish ? "M" : "ملايين"}
          </div>
          <div className="text-white text-sm font-bold">{isEnglish ? "Total Transactions" : "إجمالي المعاملات"}</div>
        </div>
        <div className="hidden md:block w-px h-20 bg-blue-400/30 relative z-10"></div>
        <div className="text-center relative z-10 flex flex-col items-center group cursor-default p-3 rounded-xl hover:bg-white/10 transition-all duration-300">
          <Image src="/Heart.png" alt="Customer Satisfaction" width={40} height={40} className="mb-3 object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="text-3xl md:text-4xl font-extrabold mb-1 font-tajawal">
            <CountUp end={95} duration={2.5} enableScrollSpy />%
          </div>
          <div className="text-white text-sm font-bold">{isEnglish ? "Customer Satisfaction" : "رضا العملاء"}</div>
        </div>
      </div>
    </section>
  );
}