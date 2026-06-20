"use client";
import { Building2, Package, Factory, PenTool, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function CategoriesSection() {
  const { isEnglish } = useLanguage();

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FAFBFC]" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold font-tajawal text-[#010101]">
          {isEnglish ? (
            <>One <span className="text-[#EB682C]">platform</span> for four <span className="text-[#2A5CBA]">major players</span></>
          ) : (
            <>منصة <span className="text-[#EB682C]">واحدة</span> لاربع لاعبين <span className="text-[#2A5CBA]">كبار</span></>
          )}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Manufacturing */}
          <Link href="/suppliers?type=factory" className="block group">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300 h-full">
              <div className="mb-4 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#EB682C] group-hover:bg-[#EB682C] group-hover:text-white transition-colors">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-4 font-tajawal group-hover:text-[#EB682C] transition-colors">{isEnglish ? "Manufacturing Companies" : "شركات التصنيع"}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {isEnglish ? "Transform your factory from \"waiting for orders\" to active supply. Get full visibility into market projects before they start." : "حوّل مصنعك من \"انتظار الطلب\" إلى التوريد النشط. احصل على رؤية كاملة لمشاريع السوق قبل بدئها."}
              </p>
              <ul className="text-sm text-gray-500 space-y-3 font-medium mt-auto">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EB682C] rounded-full"></span> {isEnglish ? "Direct sales without middlemen" : "بيع مباشر بدون وسطاء"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EB682C] rounded-full"></span> {isEnglish ? "Future demand forecasts" : "توقعات الطلب المستقبلي"}
                </li>
              </ul>
            </div>
          </Link>

          {/* Contracting (Orange/Featured) */}
          <Link href="/suppliers?type=contractor" className="block group md:scale-105 z-10">
            <div className="bg-[#EB682C] p-8 rounded-2xl shadow-xl border border-[#EB682C] flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300 text-white h-full group-hover:bg-[#d65a22]">
              <div className="mb-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#EB682C] shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-xl mb-4 font-tajawal">{isEnglish ? "Contracting Companies" : "شركات المقاولات"}</h3>
              <p className="text-sm text-orange-50 leading-relaxed mb-6">
                {isEnglish ? "A complete control room for your procurement — compare offers technically and financially, and verify supplier quality with a single click." : "غرفة تحكم كاملة لمشترياتك، قارن العروض فنياً ومالياً وتحقق من جودة الموردين بضغطة زر."}
              </p>
              <ul className="text-sm text-orange-100 space-y-3 font-medium mt-auto">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span> {isEnglish ? "Vetted Suppliers" : "موردين موثوقين (Vetted)"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span> {isEnglish ? "Smart offer comparison" : "مقارنة عروض ذكية"}
                </li>
              </ul>
            </div>
          </Link>

          {/* Suppliers */}
          <Link href="/suppliers?type=supplier" className="block group">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300 h-full">
              <div className="mb-4 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#EB682C] group-hover:bg-[#EB682C] group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-4 font-tajawal group-hover:text-[#EB682C] transition-colors">{isEnglish ? "Supplier Companies" : "شركات الموردين"}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {isEnglish ? "Don't waste time searching for customers — get ready (Hot Leads) that match your inventory." : "لا تضيع وقتك في البحث عن عملاء احصل على طلبات جاهزة (Hot Leads) تناسب مخزونك."}
              </p>
              <ul className="text-sm text-gray-500 space-y-3 font-medium mt-auto">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EB682C] rounded-full"></span> {isEnglish ? "Daily sales opportunities" : "فرص بيع يومية"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EB682C] rounded-full"></span> {isEnglish ? "Growth without operational cost" : "نمو بدون تكلفة تشغيل"}
                </li>
              </ul>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Equipment Rental */}
          <Link href="/suppliers?type=rental" className="block group">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300 h-full">
              <div className="mb-4 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#EB682C] group-hover:bg-[#EB682C] group-hover:text-white transition-colors">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-4 font-tajawal group-hover:text-[#EB682C] transition-colors">{isEnglish ? "Equipment Rental Companies" : "شركات تاجير المعدات"}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {isEnglish ? "Ensure the quality of materials used in your projects and reduce costly Change Orders." : "اضمن جودة المواد المستخدمة في مشاريعك، وقلل أوامر التغيير المكلفة (Change Orders)."}
              </p>
              <ul className="text-sm text-gray-500 space-y-3 font-medium mt-auto">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EB682C] rounded-full"></span> {isEnglish ? "Price transparency" : "شفافية الأسعار"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EB682C] rounded-full"></span> {isEnglish ? "Specification compliance" : "مطابقة المواصفات"}
                </li>
              </ul>
            </div>
          </Link>

          {/* Engineering Consultancy */}
          <Link href="/suppliers?type=consultant" className="block group">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start relative hover:-translate-y-2 transition-all duration-300 h-full">
              <div className="mb-4 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#EB682C] group-hover:bg-[#EB682C] group-hover:text-white transition-colors">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-4 font-tajawal group-hover:text-[#EB682C] transition-colors">{isEnglish ? "Engineering Consultancy Office" : "مكتب الاستشارات الهندسية"}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {isEnglish ? "Ensure the quality of materials used in your projects and reduce costly Change Orders." : "اضمن جودة المواد المستخدمة في مشاريعك، وقلل أوامر التغيير المكلفة (Change Orders)."}
              </p>
              <ul className="text-sm text-gray-500 space-y-3 font-medium mt-auto">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EB682C] rounded-full"></span> {isEnglish ? "Price transparency" : "شفافية الأسعار"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EB682C] rounded-full"></span> {isEnglish ? "Specification compliance" : "مطابقة المواصفات"}
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
