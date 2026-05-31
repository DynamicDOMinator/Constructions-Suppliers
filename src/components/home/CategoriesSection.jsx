import { Building2, Package, Factory, PenTool, Truck } from "lucide-react";

export default function CategoriesSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#FAFBFC]" dir="rtl" data-aos="fade-up">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold font-tajawal text-[#010101]">
          منصة <span className="text-[#EB682C]">واحدة</span> لاربع لاعبين <span className="text-[#2A5CBA]">كبار</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Right Card: Manufacturing */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300">
            <div className="mb-4 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#EB682C]">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-4 font-tajawal">شركات التصنيع</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              حوّل مصنعك من "انتظار الطلب" إلى التوريد النشط. احصل على رؤية كاملة لمشاريع السوق قبل بدئها.
            </p>
            <ul className="text-sm text-gray-500 space-y-3 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> بيع مباشر بدون وسطاء
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> توقعات الطلب المستقبلي
              </li>
            </ul>
          </div>

          {/* Middle Card: Contracting (Orange) */}
          <div className="bg-[#EB682C] p-8 rounded-2xl shadow-xl border border-[#EB682C] flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300 text-white transform md:scale-105 z-10">
            <div className="mb-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#EB682C] shadow-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-xl mb-4 font-tajawal">شركات المقاولات</h3>
            <p className="text-sm text-orange-50 leading-relaxed mb-6">
              غرفة تحكم كاملة لمشترياتك، قارن العروض فنياً ومالياً وتحقق من جودة الموردين بضغطة زر.
            </p>
            <ul className="text-sm text-orange-100 space-y-3 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span> موردين موثوقين (Vetted)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span> مقارنة عروض ذكية
              </li>
            </ul>
          </div>

          {/* Left Card: Suppliers */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300">
            <div className="mb-4 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#EB682C]">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-4 font-tajawal">شركات الموردين</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              لا تضيع وقتك في البحث عن عملاء احصل على طلبات جاهزة (Hot Leads) تناسب مخزونك.
            </p>
            <ul className="text-sm text-gray-500 space-y-3 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> فرص بيع يومية
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> نمو بدون تكلفة تشغيل
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Right Bottom Card: Equipment */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300">
            <div className="mb-4 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#EB682C]">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-4 font-tajawal">شركات تاجير المعدات</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              اضمن جودة المواد المستخدمة في مشاريعك، وقلل أوامر التغيير المكلفة (Change Orders).
            </p>
            <ul className="text-sm text-gray-500 space-y-3 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> شفافية الأسعار
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> مطابقة المواصفات
              </li>
            </ul>
          </div>

          {/* Left Bottom Card: Consulting */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300">
            <div className="mb-4 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#EB682C]">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-4 font-tajawal">مكتب الاستشارات الهندسية</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              اضمن جودة المواد المستخدمة في مشاريعك، وقلل أوامر التغيير المكلفة (Change Orders).
            </p>
            <ul className="text-sm text-gray-500 space-y-3 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> شفافية الأسعار
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> مطابقة المواصفات
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
