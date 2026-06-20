"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogsHero() {
  const { isEnglish } = useLanguage();
  return (
    <section className="relative w-[1500px] max-w-full mx-auto h-[350px] md:h-[400px] bg-slate-900 rounded-[2rem] overflow-hidden shadow-lg mt-6" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      {/* Background Image (Placeholder) */}
      <img 
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000" 
        alt="Blogs Hero" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold font-tajawal drop-shadow-md mb-4">
          {isEnglish ? "Latest " : "أحدث "}<span className="text-[#EB682C]">{isEnglish ? "Articles" : "المقالات"}</span>{isEnglish ? " & Blogs" : " والمدونات"}
        </h1>
        <p className="text-gray-200 text-sm md:text-base max-w-2xl font-tajawal">
          {isEnglish ? "Follow the latest news, analytics, and tips in the construction sector. Everything you need to grow your business and keep up with market developments." : "تابع أحدث الأخبار، التحليلات، والنصائح في قطاع المقاولات والبناء. كل ما تحتاجه لتنمية أعمالك ومواكبة تطورات السوق."}
        </p>
      </div>
    </section>
  );
}
