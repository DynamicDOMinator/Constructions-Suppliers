import { MapPin } from "lucide-react";

export default function QuoteCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow font-tajawal flex flex-col h-full" dir="rtl" data-aos="fade-up">
      
      {/* Header: Company Name & Logo */}
      <div className="flex items-start flex-row-reverse gap-5  mb-4">
        <div className="ml-auto">
          <h3 className="text-sm font-bold text-gray-900 mb-1">شركة الحلول الصناعية</h3>
          <p className="text-gray-500 text-[10px]">تصنيع قطع غيار كهربائية</p>
        </div>
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden p-1">
          {/* Logo Placeholder */}
          <span className="font-bold text-gray-600 text-sm">SPC</span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-gray-700 text-xs font-medium mb-3">
        <MapPin className="w-3.5 h-3.5" />
        <span>الرياض، المملكة العربية السعودية</span>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-[10px] leading-relaxed mb-6 line-clamp-3">
        شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية.
      </p>

      {/* Details Grid */}
      <div className="flex flex-col gap-3 mb-6 mt-auto">
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">السعر</span>
          <span className="font-bold text-gray-900">1000 ريال</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">مدة التوريد</span>
          <span className="font-bold text-gray-900">7-4 أيام</span>
        </div>
        
        <div className="flex flex-col gap-1 mt-2">
          <span className="text-gray-900 text-xs font-bold">ملاحظات المورد</span>
          <p className="text-gray-500 text-[10px] leading-relaxed">
            شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية.
          </p>
        </div>

      </div>

      {/* Action Button */}
      <button className="w-full bg-[#EB682C] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#d65a22] transition-colors mt-auto">
        عرض التفاصيل
      </button>

    </div>
  );
}
