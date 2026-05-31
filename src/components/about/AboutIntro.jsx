import { CheckSquare } from "lucide-react";

export default function AboutIntro() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Right Content (Text) - Due to RTL, this is the text section */}
        <div className="w-full lg:w-1/2">
          {/* Top Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-[#EB682C]"></div>
            <span className="text-gray-500 text-sm font-medium">من نحن</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold font-tajawal mb-6 leading-snug">
            <span className="text-black">نبذة </span>
            <span className="text-[#EB682C]">تعريفية</span>
          </h2>

          {/* Intro Paragraph */}
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            نحن منصة رقمية متخصصة في ربط الموردين والمصانع والمهندسين والمشترين في قطاع البناء
            والتشييد. هدفنا هو خلق بيئة عمل متكاملة تتيح:
          </p>

          {/* Bullet Points */}
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <div className="mt-1 flex-shrink-0 w-2 h-2 bg-[#2653A6] rounded-full ">
           
              </div>
              <p className="text-gray-700">للموردين: عرض منتجاتهم والوصول إلى قاعدة واسعة من العملاء.</p>
            </li>
            <li className="flex items-center gap-3">
              <div className="mt-1 flex-shrink-0 w-2 h-2 bg-[#2653A6] rounded-full ">
           
              </div>
              <p className="text-gray-700">للمصانع: توسيع حضورهم وتوسيع شبكة شركاتهم.</p>
            </li>
            <li className="flex items-center gap-3">
              <div className="mt-1 flex-shrink-0 w-2 h-2 bg-[#2653A6] rounded-full ">
           
              </div>
              <p className="text-gray-700">للمهندسين: الحصول على حلول عملية ومواد موثوقة لمشاريعهم.</p>
            </li>
            <li className="flex items-center gap-3">
              <div className="mt-1 flex-shrink-0 w-2 h-2 bg-[#2653A6] rounded-full ">
           
              </div>
              <p className="text-gray-700">للمشترين: إيجاد أفضل العروض والخيارات بسهولة وشفافية.</p>
            </li>
          </ul>

          {/* Footer Paragraph */}
          <p className="text-gray-500 text-sm leading-relaxed border-r-4 border-gray-200 pr-4">
            نحن أكثر من مجرد موقع، نحن مجتمع يجمع الخبراء والموردين ليوفر منصة آمنة وفعالة
            لتبادل الثقة والنجاح بين جميع الأطراف.
          </p>
        </div>

        {/* Left Content (Image) */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-xl">
            <img 
              src="/aboutus-1.png" 
              alt="Construction Worker" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
