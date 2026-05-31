import { FileText, Factory, Tag } from "lucide-react";

export default function DirectPricingFeatures() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white" dir="rtl" data-aos="fade-up">
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-4xl font-bold font-tajawal">
          <span className="text-[#3A5DAA]">التسعير </span>
          <span className="text-[#EB682C]">المباشر </span>
          <span className="text-[#010101]">من المصنع </span>
          <span className="text-[#3A5DAA]">إلى موقع البناء</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Timeline */}
        <div className="relative mb-24 z-0">
          {/* Connecting Line (Animated from Right to Left) */}
          <div className="hidden md:block absolute top-[40px] right-[2%] h-[2px] bg-[#3A5DAA] z-0 draw-line-rtl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#3A5DAA] rounded-full flex items-center justify-center text-white mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#010101] text-lg mb-2 font-tajawal">رفع المقايسة</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                يقوم المقاول برفع مقايسة المشروع على المنصة
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#3A5DAA] rounded-full flex items-center justify-center text-white mb-6">
                <Factory className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#010101] text-lg mb-2 font-tajawal">وصول للمصانع</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                تصل المقايسة مباشرة إلى المصانع المعتمدة
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#3A5DAA] rounded-full flex items-center justify-center text-white mb-6">
                <Tag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#010101] text-lg mb-2 font-tajawal">عروض الأسعار</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                المصانع تقدم عروض أسعارها مباشرة بدون وسيط
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#3A5DAA] rounded-full flex items-center justify-center text-white mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#010101] text-lg mb-2 font-tajawal">التعاقد المباشر</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                تعاقد مباشر بين المقاول والمصنع
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#FAFBFC] p-8 rounded-2xl flex flex-col text-right">
            <div  className="flex items-center justify-start gap-3 mb-6">
              <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#3A5DAA] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#010101] text-xl font-tajawal">توفير في التكاليف</h4>
              
            </div>
            <p className="text-sm text-gray-500 leading-relaxed text-right">
              التسعير المباشر من المصنع يوفر ما يصل إلى 30% من التكلفة الإجمالية للمواد بتجنب هامش ربح الوسطاء وتجار الجملة
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAFBFC] p-8 rounded-2xl flex flex-col text-right">
            <div  className="flex items-center justify-right gap-3 mb-6">
              <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#3A5DAA] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#010101] text-xl font-tajawal">جودة مضمونة</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed text-right">
              التعامل المباشر مع المصنع يضمن الحصول على مواد بجودة عالية مع ضمان المصنع وخدمة ما بعد البيع
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FAFBFC] p-8 rounded-2xl flex flex-col text-right">
            <div className="flex items-center justify-right gap-3 mb-6">
              <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#3A5DAA] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#010101] text-xl font-tajawal">توصيل مباشر</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed text-right">
              شحن مباشر من المصنع إلى موقع المشروع مما يقلل من تكاليف النقل ومخاطر التلف أثناء النقل.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
