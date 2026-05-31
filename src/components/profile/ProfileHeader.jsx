import { Bookmark } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="w-full bg-white pt-20 pb-8 px-6 md:px-24" dir="rtl">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Right Content: Titles */}
        <div className="flex-1 text-right">
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-tajawal">
              شركة عبدالعزيز و عبدالرحمن الدوسري
            </h1>
            <span className="bg-[#4176F9] text-white px-4 py-1 rounded-full text-xs font-bold">
              متميز
            </span>
          </div>
          
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2 max-w-3xl">
            احد الشركات المصنعة لقطع الغيار في المملكة العربية السعودية تاسست منذ عام 1920 وبملكها
          </p>
          <p className="text-gray-400 text-sm">
            رقم التسجيل الضريبي 10124587
          </p>
        </div>

        {/* Left Content: Action Buttons */}
        <div className="flex flex-row-reverse flex-wrap items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button className="flex-1 md:flex-none border border-gray-300 text-[#4176F9] bg-white hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
            <Bookmark className="w-4 h-4" />
            حفظ المورد
          </button>
          
          <button className="flex-1 md:flex-none bg-[#2A5CBA] text-white hover:bg-blue-700 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">
            ارسال طلب مقايسة
          </button>
          
          <button className="flex-1 md:flex-none bg-[#EB682C] text-white hover:bg-[#d65a22] px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">
            ارسال طلب تسعير
          </button>
        </div>

      </div>
    </div>
  );
}
