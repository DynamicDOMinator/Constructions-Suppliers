"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutHero() {
  const { isEnglish } = useLanguage();
  return (
    <section className="pt-6 px-6 md:px-12 bg-white" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="relative w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-lg">
        {/* Background Image (Placeholder) */}
        <img 
          src="/aboutus.png" 
          alt="About Us Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-bold font-tajawal drop-shadow-md">
            {isEnglish ? "About Us" : "من نحن"}
          </h1>
        </div>
      </div>
    </section>
  );
}
