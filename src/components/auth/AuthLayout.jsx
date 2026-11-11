"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AuthLayout({ children }) {
  const { isEnglish } = useLanguage();

  return (
    <div className="min-h-screen w-full flex font-tajawal bg-white" dir={isEnglish ? "ltr" : "rtl"} suppressHydrationWarning>
      
      {/* Form Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between min-h-screen px-6 md:px-12 py-6 md:py-8" suppressHydrationWarning>
        
        {/* Logo at Top in regular document flow (never overlaps headings) */}
        <div className="w-full flex items-center justify-between mb-6 md:mb-8 shrink-0" suppressHydrationWarning>
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className={`text-[#004b87] font-bold text-lg md:text-xl leading-tight hidden sm:block ${isEnglish ? 'text-left' : 'text-right'}`}>
                <div>CONSTRUCTIONS</div>
                <div className="text-[#EB682C] text-center">SUPPLIERS</div>
              </div>
              <Image src="/logo.png" alt="Constructions Suppliers" width={80} height={80} className="w-12 md:w-16 object-contain" priority />
            </div>
          </Link>
        </div>

        {/* The dynamic form content: Centered vertically when space permits */}
        <div className="w-full max-w-[500px] mx-auto my-auto flex flex-col justify-center" suppressHydrationWarning>
          {children}
        </div>

        {/* Bottom subtle spacer */}
        <div className="w-full h-4 shrink-0" suppressHydrationWarning></div>
      </div>

      {/* Left Side: Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 relative bg-slate-900 overflow-hidden">
        {/* We use a placeholder image resembling an engineer with a hard hat */}
        <img 
          src="/bg.png" 
          alt="Auth Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        {/* Dark overlay with slight orange/warm tint like in screenshot */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-[#EB682C]/20 mix-blend-multiply"></div>
      </div>

    </div>
  );
}
