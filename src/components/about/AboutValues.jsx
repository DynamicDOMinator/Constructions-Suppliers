"use client";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutValues() {
  const { isEnglish } = useLanguage();
  const values = isEnglish ? [
    {
      title: "Commitment",
      description: "We consider commitment a fundamental principle in everything we offer and ensure a pure work environment.",
    },
    {
      title: "Excellence",
      description: "We always strive to provide high-quality services and solutions that exceed expectations.",
    },
    {
      title: "Trust",
      description: "We build our dealings on transparency and credibility to be everyone's trusted partner.",
    },
    {
      title: "Competition",
      description: "We believe in the spirit of positive competition that drives us towards continuous development and success.",
    }
  ] : [
    {
      title: "الالتزام",
      description: "نضع الالتزام مبدأ أساسياً في كل ما نقدمه ونحرص على بيئة عمل نقية.",
    },
    {
      title: "التميز",
      description: "نسعى دائماً لتقديم خدمات وحلول عالية الجودة تفوق التوقعات.",
    },
    {
      title: "الثقة",
      description: "نبني تعاملاتنا على الشفافية والمصداقية لتكون الشريك الموثوق للجميع.",
    },
    {
      title: "المنافسة",
      description: "نؤمن بروح المنافسة الإيجابية التي تدفعنا نحو التطور المستمر والنجاح.",
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white" dir={isEnglish ? "ltr" : "rtl"}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Right Content (Text) */}
        <div className="w-full lg:w-1/2">
          {/* Top Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-[#EB682C]"></div>
            <span className="text-gray-500 text-sm font-medium">{isEnglish ? "Values" : "القيم"}</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold font-tajawal mb-10 leading-snug">
            <span className="text-black">{isEnglish ? "Our Core " : "قيمنا "}</span>
            <span className="text-[#EB682C]">{isEnglish ? "Values" : "الاساسية"}</span>
          </h2>

          {/* Grid of Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((item, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-full  flex items-center justify-center text-[#2653A6]">
                  <CheckCircle2 className="w-6 h-6 fill-current text-[#2653A6]" stroke="white" strokeWidth={2} />
                </div>
                <h3 className="font-bold text-lg text-black font-tajawal">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Left Content (Image) */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-xl">
            <img 
              src="/aboutus-2.png" 
              alt="Construction Core Values" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
