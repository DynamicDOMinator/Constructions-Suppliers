"use client";
import Image from "next/image";
import CountUp from "react-countup";

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white relative" data-aos="fade-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-tajawal">
          <span className="text-[#EB682C]">كيف تعمل</span>{" "}
          <span className="text-[#010101]">منصة موردي</span>{" "}
          <span className="text-[#2A5CBA]">مواد البناء؟</span>
        </h2>
      </div>

      {/* Desktop View with mathematically perfect Sine Wave */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[350px] my-20">
        {/* SVG Wave */}
        <svg
          className="absolute top-[150px] left-0 w-full h-[100px] z-0"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 50 C 66.6 50, 100 100, 166.6 100 C 300 100, 366.6 0, 500 0 C 633.4 0, 700 100, 833.3 100 C 900 100, 933.4 50, 1000 50"
            stroke="#FDEEE8"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Step 3 (Left) */}
        <div className="absolute bottom-[140px] left-0 w-[33%] flex flex-col items-center text-center z-10 px-4">
          <div className="bg-[#EB682C] text-white text-sm px-6 py-1.5 rounded-full mb-6 font-medium shadow-sm">
            الخطوة الثالثة
          </div>
          <h3 className="font-bold text-[#010101] text-lg mb-3">
            تلقي العروض واختيار الأفضل
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">
            تلقي عروض الأسعار، ومقارنتها، واختيار العرض الذي يناسب احتياجات
            شركتك على أفضل وجه.
          </p>
        </div>
        {/* Dot 3 */}
        <div className="absolute top-[235px] left-[16.66%] -translate-x-1/2 w-6 h-6 bg-[#EB682C] rounded-full shadow-[0_0_0_6px_#fff] z-20"></div>

        {/* Step 2 (Center) */}
        <div className="absolute top-[164px] left-[50%] -translate-x-1/2 w-[33%] flex flex-col items-center text-center z-10 px-4">
          <div className="bg-[#EB682C] text-white text-sm px-6 py-1.5 rounded-full mb-6 font-medium shadow-sm">
            الخطوة الثانية
          </div>
          <h3 className="font-bold text-[#010101] text-lg mb-3">
            قارن وأرسل طلبات عروض الأسعار
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">
            قارن بين الموردين وأرسل طلب عرض أسعار (RFQ) إلى عدة موردين في وقت
            واحد.
          </p>
        </div>
        {/* Dot 2 */}
        <div className="absolute top-[135px] left-[50%] -translate-x-1/2 w-6 h-6 bg-[#EB682C] rounded-full shadow-[0_0_0_6px_#fff] z-20"></div>

        {/* Step 1 (Right) */}
        <div className="absolute bottom-[140px] right-0 w-[33%] flex flex-col items-center text-center z-10 px-4">
          <div className="bg-[#EB682C] text-white text-sm px-6 py-1.5 rounded-full mb-6 font-medium shadow-sm">
            الخطوة الأولى
          </div>
          <h3 className="font-bold text-[#010101] text-lg mb-3">
            البحث عن الموردين
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">
            استخدم أدوات البحث المتقدمة للعثور على موردين مناسبين بناءً على
            القطاع والموقع والشهادات.
          </p>
        </div>
        {/* Dot 1 */}
        <div className="absolute top-[235px] right-[16.66%] translate-x-1/2 w-6 h-6 bg-[#EB682C] rounded-full shadow-[0_0_0_6px_#fff] z-20"></div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-16 mt-12 relative z-10 text-center">
        {[
          {
            step: "الخطوة الأولى",
            title: "البحث عن الموردين",
            desc: "استخدم أدوات البحث المتقدمة للعثور على موردين مناسبين بناءً على القطاع والموقع والشهادات.",
          },
          {
            step: "الخطوة الثانية",
            title: "قارن وأرسل طلبات عروض الأسعار",
            desc: "قارن بين الموردين وأرسل طلب عرض أسعار (RFQ) إلى عدة موردين في وقت واحد.",
          },
          {
            step: "الخطوة الثالثة",
            title: "تلقي العروض واختيار الأفضل",
            desc: "تلقي عروض الأسعار، ومقارنتها، واختيار العرض الذي يناسب احتياجات شركتك على أفضل وجه.",
          },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-6 h-6 bg-[#EB682C] rounded-full mb-6 shadow-[0_0_0_4px_#fff] ring-1 ring-gray-100"></div>
            <div className="bg-[#EB682C] text-white text-xs px-6 py-1.5 rounded-full mb-4 font-medium">
              {item.step}
            </div>
            <h3 className="font-bold text-[#010101] text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed px-4">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Blue Stats Banner */}
      <div 
        className="max-w-5xl mx-auto rounded-2xl py-10 px-8 flex flex-col md:flex-row justify-around items-center text-white gap-10 shadow-xl overflow-hidden relative"
        style={{ backgroundImage: "url('/bg-sec.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="text-center relative z-10 flex flex-col items-center">
          <Image
            src="/users.png"
            alt="الموردون المسجلون"
            width={40}
            height={40}
            className="mb-3 object-contain"
          />
          <div className="text-3xl md:text-4xl font-bold mb-1 font-tajawal">
            +<CountUp end={1.5} decimals={1} duration={2.5} enableScrollSpy /> ألف
          </div>
          <div className="text-blue-100 text-sm">الموردون المسجلون</div>
        </div>
        <div className="hidden md:block w-px h-20 bg-blue-400/30 relative z-10"></div>
        <div className="text-center relative z-10 flex flex-col items-center">
          <Image
            src="/money.png"
            alt="إجمالي المعاملات"
            width={40}
            height={40}
            className="mb-3 object-contain"
          />
          <div className="text-3xl md:text-4xl font-bold mb-1 font-tajawal">
            <CountUp end={10} duration={2.5} enableScrollSpy /> ملايين
          </div>
          <div className="text-blue-100 text-sm">إجمالي المعاملات</div>
        </div>
        <div className="hidden md:block w-px h-20 bg-blue-400/30 relative z-10"></div>
        <div className="text-center relative z-10 flex flex-col items-center">
          <Image
            src="/Heart.png"
            alt="رضا العملاء"
            width={40}
            height={40}
            className="mb-3 object-contain"
          />
          <div className="text-3xl md:text-4xl font-bold mb-1 font-tajawal">
            <CountUp end={95} duration={2.5} enableScrollSpy />%
          </div>
          <div className="text-blue-100 text-sm">رضا العملاء</div>
        </div>
      </div>
    </section>
  );
}
