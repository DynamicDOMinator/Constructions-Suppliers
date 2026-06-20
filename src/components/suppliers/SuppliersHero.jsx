"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function SuppliersHero({ type }) {
  const { isEnglish } = useLanguage();

  let titleEn = "Suppliers";
  let titleAr = "الموردين";

  switch (type) {
    case "factory":
      titleEn = "Manufacturing Companies";
      titleAr = "شركات التصنيع";
      break;
    case "contractor":
      titleEn = "Contracting Companies";
      titleAr = "شركات المقاولات";
      break;
    case "supplier":
      titleEn = "Supplier Companies";
      titleAr = "شركات الموردين";
      break;
    case "rental":
      titleEn = "Equipment Rental Companies";
      titleAr = "شركات تأجير المعدات";
      break;
    case "consultant":
      titleEn = "Engineering Consultancy Offices";
      titleAr = "مكاتب الاستشارات الهندسية";
      break;
    default:
      titleEn = "Companies";
      titleAr = "الشركات";
  }

  return (
    <section className="relative w-[92%] md:w-[95%] max-w-[1500px] mx-auto h-[350px] md:h-[400px] bg-slate-900 rounded-[2rem] overflow-hidden shadow-lg mt-6" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <img 
        src="suppliers.png" 
        alt="Suppliers Hero" 
        className="absolute inset-0 w-full h-full "
      />
      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <h1 className="text-white text-4xl md:text-5xl font-bold font-tajawal drop-shadow-md">
          {isEnglish ? titleEn : titleAr}
        </h1>
      </div>
    </section>
  );
}
