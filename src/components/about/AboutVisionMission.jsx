"use client";
import { Target, Lightbulb } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutVisionMission() {
  const { isEnglish } = useLanguage();
  return (
    <section className="py-20 px-6 md:px-12 bg-white" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-start text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-[#EB682C]"></div>
            <span className="text-gray-500  text-sm font-medium">{isEnglish ? "Vision" : "الرؤية"}</span>
           
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-tajawal">
            <span className="text-black">{isEnglish ? "Our Vision " : "رؤيتنا "}</span>
            <span className="text-[#EB682C]">&amp;</span>
            <span className="text-black">{isEnglish ? " Mission" : " رسالتنا"}</span>
          </h2>
        </div>

        {/* Block 1: Mission (Text Left, Image Right) */}
        <div className="flex flex-col lg:flex-row-reverse  items-center gap-12 mb-20">
          {/* Mission Text (Left side visually, but we use order-last on large to swap in RTL) */}
          <div className={`w-full lg:w-1/2 order-2 lg:order-1 ${isEnglish ? 'text-left lg:pl-12' : 'text-right lg:pr-12'}`}>
            <h3 className={`text-2xl font-bold ${isEnglish ? 'text-left' : 'text-right'} text-[#EB682C] font-tajawal mb-4`}>{isEnglish ? "Our Mission" : "رسالتنا"}</h3>
            <p className={`text-gray-600 ${isEnglish ? 'text-left' : 'text-right'} leading-loose text-base lg:text-lg`}>
              {isEnglish ? "Our mission is to be the platform that brings together suppliers, factories, engineers, and buyers in the construction sector to ensure access to high-quality materials and services, enhance transparency and cooperation, and contribute to the success of projects and building a more advanced future." : "رسالتنا أن نكون المنصة التي تجمع الموردين والمصانع والمهندسين والمشترين في قطاع البناء لضمان الوصول إلى المواد والخدمات بجودة عالية، ونعزز الشفافية والتعاون، ولنساهم في نجاح المشاريع وبناء مستقبل أكثر تطوراً."}
            </p>
          </div>
          {/* Mission Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="aboutus-3.png
                " 
                alt="Our Mission" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Block 2: Vision (Image Left, Text Right) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          {/* Vision Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="aboutus-4.png" 
                alt="Our Vision" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Vision Text */}
          <div className={`w-full lg:w-1/2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <h3 className="text-2xl font-bold text-[#EB682C] font-tajawal mb-4">{isEnglish ? "Our Vision" : "رؤيتنا"}</h3>
            <p className="text-gray-600 leading-loose text-base lg:text-lg">
              {isEnglish ? "Our vision is to become the leading platform connecting construction industry parties in the region, and to be the first choice for everyone looking for quality, reliability, and ease in completing their projects. We look forward to a future where supply and construction processes are smarter, faster, and more aligned with market needs to contribute to building more developed and stable cities." : "رؤيتنا أن نصبح المنصة الرائدة في ربط أطراف صناعة البناء في المنطقة، وأن نكون الخيار الأول لكل من يبحث عن الجودة والموثوقية والسهولة في إنجاز مشاريعه. نتطلع إلى مستقبل تكون فيه عمليات التوريد والبناء أكثر ذكاءً وأكثر سرعة، وأكثر توافقاً مع احتياجات السوق لنساهم في بناء مدن أكثر تطوراً ونماء أكثر استقراراً."}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
