"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, ExternalLink, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

const FALLBACK_SLIDES = [
  {
    id: 1,
    slug: "real-estate-growth-between-egypt-and-saudi-arabia",
    image: "https://eng.prosental.online/storage/blogs/real_estate_egypt_saudi.jpg",
    tag: "تحليلات السوق",
    tagEn: "Market Analytics",
    title: "نمو قطاع العقارات بين مصر والمملكة العربية السعودية",
    titleEn: "Real estate growth between Egypt and Saudi Arabia",
    text: "شهد قطاع العقارات بين مصر والمملكة العربية السعودية نمواً ملحوظاً في السنوات الأخيرة، حيث يسعى المستثمرون إلى اغتنام الفرص التي تجمع بين الاستقرار الاقتصادي والعوائد المرتفعة.",
    textEn: "The real estate sector between Egypt and Saudi Arabia has seen remarkable growth in recent years, as investors seek to seize opportunities that combine economic stability and high returns.",
    time: "دقيقة واحدة",
    timeEn: "1 minute"
  },
  {
    id: 2,
    slug: "how-to-choose-the-right-supplier-for-your-construction-project",
    image: "https://eng.prosental.online/storage/blogs/choose_supplier.jpg",
    tag: "نصائح وإرشادات",
    tagEn: "Tips & Guides",
    title: "كيف تختار المورد المناسب لمشروعك الإنشائي؟",
    titleEn: "How to choose the right supplier for your project?",
    text: "تعرف على أهم المعايير والخطوات الأساسية لاختيار أفضل الموردين لضمان جودة مواد البناء ونجاح مشروعك.",
    textEn: "Learn about the most important criteria and basic steps to choose the best suppliers to ensure building material quality.",
    time: "5 دقائق",
    timeEn: "5 minutes"
  },
  {
    id: 3,
    slug: "latest-technologies-in-construction-and-contracting",
    image: "https://eng.prosental.online/storage/blogs/construction_technology.jpg",
    tag: "تكنولوجيا",
    tagEn: "Technology",
    title: "أحدث التقنيات في عالم المقاولات والبناء",
    titleEn: "Latest technologies in construction and contracting",
    text: "نظرة شاملة على التكنولوجيا الحديثة التي تُحدث ثورة في قطاع التشييد والبناء حول العالم.",
    textEn: "A comprehensive look at modern technology revolutionizing the construction and contracting sector globally.",
    time: "4 دقائق",
    timeEn: "4 minutes"
  }
];

export default function OurMedia() {
  const { isEnglish } = useLanguage();
  const [blogs, setBlogs] = useState(FALLBACK_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/auth/blogs?per_page=6");
        const list = Array.isArray(res.data?.data) ? res.data.data : [];
        if (list.length > 0) {
          const mapped = list.map((item) => ({
            id: item.id || item.uuid,
            slug: item.slug || item.uuid || item.id,
            image: item.image_url || item.image || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1000",
            tag: item.category || (isEnglish ? "Blog" : "مدونة"),
            tagEn: item.category || "Blog",
            title: item.title,
            titleEn: item.title,
            text: item.excerpt || item.title,
            textEn: item.excerpt || item.title,
            time: item.read_time || (isEnglish ? "3 min" : "٣ دقائق"),
            timeEn: item.read_time || "3 min"
          }));
          setBlogs(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch home media blogs:", err);
      }
    };

    fetchBlogs();
  }, [isEnglish]);

  const slides = blogs.length > 0 ? blogs : FALLBACK_SLIDES;

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
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-tajawal">
          {isEnglish ? (
            <><span className="text-[#EB682C]">Our</span> <span className="text-black">Media & Articles</span></>
          ) : (
            <><span className="text-[#EB682C]">وسائل الإعلام </span><span className="text-black">والمقالات</span></>
          )}
        </h2>
        <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto font-tajawal">
          {isEnglish 
            ? "Explore our latest insights, construction market analytics, and guides."
            : "استكشف أحدث المقالات والتحليلات المتخصصة في قطاع المقاولات والبناء."}
        </p>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center min-h-[450px]">
        
        {/* Right Blurred Image (RTL Start) */}
        {slides.length > 1 && (
          <div 
            className="hidden md:block absolute right-0 translate-x-[60%] w-[350px] h-[380px] rounded-3xl overflow-hidden opacity-50 blur-[3px] z-0 cursor-pointer transition-all duration-500"
            onClick={handlePrev}
          >
            <img src={rightSlide.image} alt="Previous Slide" className="w-full h-full object-cover transition-all duration-500" />
            <div className="absolute inset-0 bg-white/20"></div>
          </div>
        )}

        {/* Left Blurred Image (RTL End) */}
        {slides.length > 1 && (
          <div 
            className="hidden md:block absolute left-0 -translate-x-[60%] w-[350px] h-[380px] rounded-3xl overflow-hidden opacity-50 blur-[3px] z-0 cursor-pointer transition-all duration-500"
            onClick={handleNext}
          >
            <img src={leftSlide.image} alt="Next Slide" className="w-full h-full object-cover transition-all duration-500" />
            <div className="absolute inset-0 bg-white/20"></div>
          </div>
        )}

        {/* Center Active Image */}
        <div className="relative w-[90%] md:w-[850px] h-[450px] rounded-3xl overflow-hidden shadow-2xl z-10 shrink-0 bg-gray-900 transition-all duration-500">
          <img 
            key={centerSlide.id} 
            src={centerSlide.image} 
            alt={isEnglish ? (centerSlide.titleEn || centerSlide.title) : centerSlide.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-90 animate-fadeIn" 
          />
          
          {/* Frosted Glass Panel */}
          <div className={`absolute top-6 bottom-6 ${isEnglish ? 'left-6' : 'right-6'} w-[88%] md:w-[420px] bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-white/20 shadow-xl animate-fadeIn`}>
            
            {/* Top Pill & Title */}
            <div>
              <div className={`flex ${isEnglish ? 'justify-start' : 'justify-start'} mb-4`}>
                <span className="bg-[#EB682C] text-white px-4 py-1.5 rounded-full text-xs font-bold font-tajawal shadow-sm">
                  {isEnglish ? (centerSlide.tagEn || centerSlide.tag) : centerSlide.tag}
                </span>
              </div>
              <h3 className={`text-white font-bold text-lg md:text-xl line-clamp-2 ${isEnglish ? 'text-left' : 'text-right'} leading-snug drop-shadow-md mb-2`}>
                {isEnglish ? (centerSlide.titleEn || centerSlide.title) : centerSlide.title}
              </h3>
              <p className={`text-gray-200 ${isEnglish ? 'text-left' : 'text-right'} text-sm leading-relaxed font-tajawal drop-shadow-md line-clamp-3`}>
                {isEnglish ? (centerSlide.textEn || centerSlide.text) : centerSlide.text}
              </p>
            </div>
            
            {/* Bottom Row */}
            <div className="flex justify-between items-center text-white text-sm font-tajawal pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 text-gray-200 text-xs">
                <Clock className="w-4 h-4 text-[#EB682C]" />
                <span>{isEnglish ? (centerSlide.timeEn || centerSlide.time) : centerSlide.time}</span>
              </div>

              <Link 
                href={`/blogs/${centerSlide.slug}`}
                className="flex items-center gap-1.5 bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#EB682C] hover:text-white transition-colors shadow-md group"
              >
                <span>{isEnglish ? "Read Article" : "قراءة المقال"}</span>
                <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isEnglish ? '' : '-scale-x-100'}`} />
              </Link>
            </div>

          </div>
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button 
              onClick={isEnglish ? handleNext : handlePrev}
              className={`absolute ${isEnglish ? 'left-[4%] md:left-[calc(50%-440px)] -translate-x-1/2' : 'right-[4%] md:right-[calc(50%-440px)] translate-x-1/2'} z-20 w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#EB682C] shadow-lg hover:bg-white transition-colors border border-gray-100`}
              aria-label="Previous"
            >
              {isEnglish ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
            </button>
            <button 
              onClick={isEnglish ? handlePrev : handleNext}
              className={`absolute ${isEnglish ? 'right-[4%] md:right-[calc(50%-440px)] translate-x-1/2' : 'left-[4%] md:left-[calc(50%-440px)] -translate-x-1/2'} z-20 w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#EB682C] shadow-lg hover:bg-white transition-colors border border-gray-100`}
              aria-label="Next"
            >
              {isEnglish ? <ArrowRight className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
            </button>
          </>
        )}

      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link 
          href="/blogs"
          className="inline-flex items-center gap-2 bg-transparent border-2 border-[#EB682C] text-[#EB682C] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#EB682C] hover:text-white transition-all shadow-sm group"
        >
          <span>{isEnglish ? "View All Articles & Blogs" : "عرض جميع المقالات والمدونات"}</span>
          <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isEnglish ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
        </Link>
      </div>
    </section>
  );
}
