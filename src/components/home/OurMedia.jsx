"use client"
import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Reply } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

const slidesAr = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582206771337-4d98a28e5db2?auto=format&fit=crop&q=80&w=1000",
    tag: "مدونة",
    text: "شهد قطاع العقارات بين مصر والمملكة العربية السعودية نمواً ملحوظاً في السنوات الأخيرة، حيث يسعى المستثمرون إلى اغتنام الفرص التي تجمع بين الاستقرار الاقتصادي والعوائد المرتفعة.",
    time: "دقيقة واحدة"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000",
    tag: "مشاريع جديدة",
    text: "تطورات البنية التحتية في المملكة تفتح آفاقاً جديدة للاستثمار والمقاولات، وتوفر بيئة مثالية لنمو الأعمال والمشاريع الاستراتيجية.",
    time: "٣ دقائق"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000",
    tag: "فيديو تعريفي",
    text: "تعرف على أهم المعالم العمرانية وتأثيرها على المشهد الحضري والاقتصادي، وكيف تساهم في تحقيق رؤية المستقبل للمنطقة.",
    time: "دقيقتان"
  }
];

const slidesEn = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582206771337-4d98a28e5db2?auto=format&fit=crop&q=80&w=1000",
    tag: "Blog",
    text: "The real estate sector between Egypt and Saudi Arabia has seen remarkable growth in recent years, as investors seek to seize opportunities that combine economic stability and high returns.",
    time: "1 minute"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000",
    tag: "New Projects",
    text: "Infrastructure developments in the Kingdom open new horizons for investment and contracting, providing an ideal environment for business growth and strategic projects.",
    time: "3 minutes"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000",
    tag: "Promo Video",
    text: "Learn about the most important urban landmarks and their impact on the urban and economic landscape, and how they contribute to achieving the region's future vision.",
    time: "2 minutes"
  }
];

export default function OurMedia() {
  const { isEnglish } = useLanguage();
  const slides = isEnglish ? slidesEn : slidesAr;
  const [currentIndex, setCurrentIndex] = useState(0);

  const getSlideIndex = (offset) => {
    const len = slides.length;
    return (currentIndex + offset + len) % len;
  };

  const centerSlide = slides[getSlideIndex(0)];
  const rightSlide = slides[getSlideIndex(-1)];
  const leftSlide = slides[getSlideIndex(1)];

  const handleNext = () => setCurrentIndex(getSlideIndex(1));
  const handlePrev = () => setCurrentIndex(getSlideIndex(-1));

  return (
    <section className="py-20 bg-white overflow-hidden" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-tajawal">
          {isEnglish ? (
            <><span className="text-[#EB682C]">Our</span> <span className="text-black">Media</span></>
          ) : (
            <><span className="text-[#EB682C]">وسائل الإعلام </span><span className="text-black">الخاصة بنا</span></>
          )}
        </h2>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center min-h-[450px]">
        
        {/* Right Blurred Image (RTL Start) */}
        <div 
          className="hidden md:block absolute right-0 translate-x-[60%] w-[350px] h-[380px] rounded-3xl overflow-hidden opacity-50 blur-[3px] z-0 cursor-pointer transition-all duration-500"
          onClick={handlePrev}
        >
           <img src={rightSlide.image} alt="Previous Slide" className="w-full h-full object-cover transition-all duration-500" />
           <div className="absolute inset-0 bg-white/20"></div>
        </div>

        {/* Left Blurred Image (RTL End) */}
        <div 
          className="hidden md:block absolute left-0 -translate-x-[60%] w-[350px] h-[380px] rounded-3xl overflow-hidden opacity-50 blur-[3px] z-0 cursor-pointer transition-all duration-500"
          onClick={handleNext}
        >
           <img src={leftSlide.image} alt="Next Slide" className="w-full h-full object-cover transition-all duration-500" />
           <div className="absolute inset-0 bg-white/20"></div>
        </div>

        {/* Center Active Image */}
        <div className="relative w-[90%] md:w-[850px] h-[450px] rounded-3xl overflow-hidden shadow-2xl z-10 shrink-0 bg-gray-900 transition-all duration-500">
          <img key={centerSlide.id} src={centerSlide.image} alt="Current Slide" className="absolute inset-0 w-full h-full object-cover opacity-90 animate-fadeIn" />
          
          {/* Frosted Glass Panel */}
          <div className={`absolute top-6 bottom-6 ${isEnglish ? 'left-6' : 'right-6'} w-[85%] md:w-[380px] bg-white/20 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between border border-white/10 shadow-lg animate-fadeIn`}>
            
            {/* Top Pill */}
            <div className={`flex ${isEnglish ? 'justify-end' : 'justify-start'}`}>
              <span className={`bg-white absolute ${isEnglish ? 'left-0 rounded-r-2xl' : 'right-0 rounded-l-2xl'} text-[#EB682C] px-6 py-2 text-sm font-bold font-tajawal shadow-sm`}>
                {centerSlide.tag}
              </span>
            </div>
            
            {/* Paragraph */}
            <p className={`text-white ${isEnglish ? 'text-left' : 'text-right'} text-base leading-loose font-tajawal drop-shadow-md`}>
              {centerSlide.text}
            </p>
            
            {/* Bottom Row */}
            <div className={`flex gap-10 items-center text-white text-sm font-tajawal mt-2 ${isEnglish ? 'flex-row' : 'flex-row'}`}>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{centerSlide.time}</span>
              </div>

              <button className="flex items-center gap-2 hover:text-gray-200 transition-colors">
                <span className="font-medium">{isEnglish ? "Share" : "مشاركة"}</span>
                <Reply className={`w-5 h-5 text-[#EB682C] ${isEnglish ? '-scale-x-100' : ''}`} />
              </button>
            </div>

          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={isEnglish ? handleNext : handlePrev}
          className={`absolute ${isEnglish ? 'left-[5%] md:left-[calc(50%-425px)] -translate-x-1/2' : 'right-[5%] md:right-[calc(50%-425px)] translate-x-1/2'} z-20 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#EB682C] shadow-lg hover:bg-white transition-colors border border-gray-100`}
        >
          {isEnglish ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
        </button>
        <button 
          onClick={isEnglish ? handlePrev : handleNext}
          className={`absolute ${isEnglish ? 'right-[5%] md:right-[calc(50%-425px)] translate-x-1/2' : 'left-[5%] md:left-[calc(50%-425px)] -translate-x-1/2'} z-20 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#EB682C] shadow-lg hover:bg-white transition-colors border border-gray-100`}
        >
          {isEnglish ? <ArrowRight className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
        </button>

      </div>
    </section>
  );
}
