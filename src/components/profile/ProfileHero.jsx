"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfileHero({ supplier }) {
  const { isEnglish } = useLanguage();
  const avatar = supplier?.avatar_url || supplier?.avatar;
  const companyName = supplier?.company_profile?.company_name || supplier?.name || "U";
  const initial = companyName.charAt(0);

  return (
    <div className="relative w-full h-[250px] md:h-[350px] bg-slate-100" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      {/* Banner Image */}
      <img 
        src="/suppliers.png" 
        alt="Company Banner" 
        className="w-full h-full object-cover"
      />
      
      {/* Overlapping Logo */}
      <div className={`absolute -bottom-16 ${isEnglish ? 'left-8 md:left-24' : 'right-8 md:right-24'} w-32 h-32 rounded-full bg-[#E5E9F2] border-4 border-white shadow-md flex items-center justify-center overflow-hidden`}>
        {avatar ? (
          <img src={avatar} alt={companyName} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl font-bold text-gray-800">{initial}</span>
        )}
      </div>
    </div>
  );
}
