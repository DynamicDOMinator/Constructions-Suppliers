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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-stretch">
          {/* Manufacturing */}
          <Link href="/suppliers?type=factory" className="block group h-full" data-aos="fade-up" data-aos-delay="100">
            <div className="h-full bg-gradient-to-b from-white via-[#FCFDFE] to-[#F5F7FA] p-8 rounded-3xl border border-gray-100 border-b-[6px] border-b-gray-200/90 shadow-[0_16px_32px_-8px_rgba(15,23,42,0.1),0_4px_12px_-2px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,1)] hover:-translate-y-3 hover:border-b-[8px] hover:border-b-orange-300 hover:shadow-[0_28px_50px_-12px_rgba(235,104,44,0.22),0_12px_24px_-4px_rgba(15,23,42,0.08)] active:translate-y-0 active:border-b-[3px] transition-all duration-300 flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
              <div className="mb-5 w-14 h-14 bg-gradient-to-b from-orange-50 to-orange-100/70 rounded-2xl flex items-center justify-center text-[#EB682C] border border-orange-200/60 border-b-[3px] border-b-orange-300 shadow-[0_4px_10px_rgba(235,104,44,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:bg-[#EB682C] group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-3 transition-all duration-300">
                <Factory className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-gray-950 text-xl mb-4 font-tajawal group-hover:text-[#EB682C] transition-colors">{isEnglish ? "Manufacturing Companies" : "شركات التصنيع"}</h3>
              <p className="text-sm text-gray-800 font-semibold leading-relaxed mb-6">
                {isEnglish ? "Transform your factory from \"waiting for orders\" to active supply. Get full visibility into market projects before they start." : "حوّل مصنعك من \"انتظار الطلب\" إلى التوريد النشط. احصل على رؤية كاملة لمشاريع السوق قبل بدئها."}
              </p>
              <ul className="text-sm text-gray-900 space-y-3 font-bold mt-auto">
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-gradient-to-b from-orange-400 to-[#EB682C] rounded-full shrink-0 shadow-[0_2px_4px_rgba(235,104,44,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"></span> {isEnglish ? "Direct sales without middlemen" : "بيع مباشر بدون وسطاء"}
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-gradient-to-b from-orange-400 to-[#EB682C] rounded-full shrink-0 shadow-[0_2px_4px_rgba(235,104,44,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"></span> {isEnglish ? "Future demand forecasts" : "توقعات الطلب المستقبلي"}
                </li>
              </ul>
            </div>
          </Link>

          {/* Contracting (Orange/Featured 3D) */}
          <Link href="/suppliers?type=contractor" className="block group md:scale-105 z-10 h-full" data-aos="fade-up" data-aos-delay="200">
            <div className="h-full bg-gradient-to-br from-[#f27438] via-[#EB682C] to-[#d4541a] p-8 rounded-3xl border border-orange-400/40 border-b-[8px] border-b-[#9e380e] shadow-[0_24px_45px_-8px_rgba(235,104,44,0.5),0_8px_20px_-4px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-3 hover:border-b-[10px] hover:border-b-[#852f0b] hover:shadow-[0_32px_60px_-10px_rgba(235,104,44,0.6)] active:translate-y-0 active:border-b-[4px] transition-all duration-300 text-white flex flex-col items-start relative overflow-hidden group-hover:brightness-105">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <div className="mb-5 w-14 h-14 bg-gradient-to-b from-white to-gray-50 rounded-2xl flex items-center justify-center text-[#EB682C] border-b-[3px] border-b-orange-200 shadow-[0_6px_14px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,1)] group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-3 transition-all duration-300">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-white text-xl mb-4 font-tajawal drop-shadow-sm">{isEnglish ? "Contracting Companies" : "شركات المقاولات"}</h3>
              <p className="text-sm text-white/95 font-semibold leading-relaxed mb-6 drop-shadow-xs">
                {isEnglish ? "A complete control room for your procurement — compare offers technically and financially, and verify supplier quality with a single click." : "غرفة تحكم كاملة لمشترياتك، قارن العروض فنياً ومالياً وتحقق من جودة الموردين بضغطة زر."}
              </p>
              <ul className="text-sm text-white space-y-3 font-bold mt-auto">
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-white rounded-full shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.9)]"></span> {isEnglish ? "Vetted Suppliers" : "موردين موثوقين (Vetted)"}
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-white rounded-full shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.9)]"></span> {isEnglish ? "Smart offer comparison" : "مقارنة عروض ذكية"}
                </li>
              </ul>
            </div>
          </Link>

          {/* Suppliers */}
          <Link href="/suppliers?type=supplier" className="block group h-full" data-aos="fade-up" data-aos-delay="300">
            <div className="h-full bg-gradient-to-b from-white via-[#FCFDFE] to-[#F5F7FA] p-8 rounded-3xl border border-gray-100 border-b-[6px] border-b-gray-200/90 shadow-[0_16px_32px_-8px_rgba(15,23,42,0.1),0_4px_12px_-2px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,1)] hover:-translate-y-3 hover:border-b-[8px] hover:border-b-orange-300 hover:shadow-[0_28px_50px_-12px_rgba(235,104,44,0.22),0_12px_24px_-4px_rgba(15,23,42,0.08)] active:translate-y-0 active:border-b-[3px] transition-all duration-300 flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
              <div className="mb-5 w-14 h-14 bg-gradient-to-b from-orange-50 to-orange-100/70 rounded-2xl flex items-center justify-center text-[#EB682C] border border-orange-200/60 border-b-[3px] border-b-orange-300 shadow-[0_4px_10px_rgba(235,104,44,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:bg-[#EB682C] group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-3 transition-all duration-300">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-gray-950 text-xl mb-4 font-tajawal group-hover:text-[#EB682C] transition-colors">{isEnglish ? "Supplier Companies" : "شركات الموردين"}</h3>
              <p className="text-sm text-gray-800 font-semibold leading-relaxed mb-6">
                {isEnglish ? "Don't waste time searching for customers — get ready (Hot Leads) that match your inventory." : "لا تضيع وقتك في البحث عن عملاء احصل على طلبات جاهزة (Hot Leads) تناسب مخزونك."}
              </p>
              <ul className="text-sm text-gray-900 space-y-3 font-bold mt-auto">
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-gradient-to-b from-orange-400 to-[#EB682C] rounded-full shrink-0 shadow-[0_2px_4px_rgba(235,104,44,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"></span> {isEnglish ? "Daily sales opportunities" : "فرص بيع يومية"}
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-gradient-to-b from-orange-400 to-[#EB682C] rounded-full shrink-0 shadow-[0_2px_4px_rgba(235,104,44,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"></span> {isEnglish ? "Growth without operational cost" : "نمو بدون تكلفة تشغيل"}
                </li>
              </ul>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Equipment Rental */}
          <Link href="/suppliers?type=rental" className="block group h-full" data-aos="fade-up" data-aos-delay="150">
            <div className="h-full bg-gradient-to-b from-white via-[#FCFDFE] to-[#F5F7FA] p-8 rounded-3xl border border-gray-100 border-b-[6px] border-b-gray-200/90 shadow-[0_16px_32px_-8px_rgba(15,23,42,0.1),0_4px_12px_-2px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,1)] hover:-translate-y-3 hover:border-b-[8px] hover:border-b-orange-300 hover:shadow-[0_28px_50px_-12px_rgba(235,104,44,0.22),0_12px_24px_-4px_rgba(15,23,42,0.08)] active:translate-y-0 active:border-b-[3px] transition-all duration-300 flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
              <div className="mb-5 w-14 h-14 bg-gradient-to-b from-orange-50 to-orange-100/70 rounded-2xl flex items-center justify-center text-[#EB682C] border border-orange-200/60 border-b-[3px] border-b-orange-300 shadow-[0_4px_10px_rgba(235,104,44,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:bg-[#EB682C] group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-3 transition-all duration-300">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-gray-950 text-xl mb-4 font-tajawal group-hover:text-[#EB682C] transition-colors">{isEnglish ? "Equipment Rental Companies" : "شركات تاجير المعدات"}</h3>
              <p className="text-sm text-gray-800 font-semibold leading-relaxed mb-6">
                {isEnglish ? "Ensure the quality of materials used in your projects and reduce costly Change Orders." : "اضمن جودة المواد المستخدمة في مشاريعك، وقلل أوامر التغيير المكلفة (Change Orders)."}
              </p>
              <ul className="text-sm text-gray-900 space-y-3 font-bold mt-auto">
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-gradient-to-b from-orange-400 to-[#EB682C] rounded-full shrink-0 shadow-[0_2px_4px_rgba(235,104,44,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"></span> {isEnglish ? "Price transparency" : "شفافية الأسعار"}
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-gradient-to-b from-orange-400 to-[#EB682C] rounded-full shrink-0 shadow-[0_2px_4px_rgba(235,104,44,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"></span> {isEnglish ? "Specification compliance" : "مطابقة المواصفات"}
                </li>
              </ul>
            </div>
          </Link>

          {/* Engineering Consultancy */}
          <Link href="/suppliers?type=consultant" className="block group h-full" data-aos="fade-up" data-aos-delay="250">
            <div className="h-full bg-gradient-to-b from-white via-[#FCFDFE] to-[#F5F7FA] p-8 rounded-3xl border border-gray-100 border-b-[6px] border-b-gray-200/90 shadow-[0_16px_32px_-8px_rgba(15,23,42,0.1),0_4px_12px_-2px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,1)] hover:-translate-y-3 hover:border-b-[8px] hover:border-b-orange-300 hover:shadow-[0_28px_50px_-12px_rgba(235,104,44,0.22),0_12px_24px_-4px_rgba(15,23,42,0.08)] active:translate-y-0 active:border-b-[3px] transition-all duration-300 flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
              <div className="mb-5 w-14 h-14 bg-gradient-to-b from-orange-50 to-orange-100/70 rounded-2xl flex items-center justify-center text-[#EB682C] border border-orange-200/60 border-b-[3px] border-b-orange-300 shadow-[0_4px_10px_rgba(235,104,44,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:bg-[#EB682C] group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-3 transition-all duration-300">
                <PenTool className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-gray-950 text-xl mb-4 font-tajawal group-hover:text-[#EB682C] transition-colors">{isEnglish ? "Engineering Consultancy Office" : "مكتب الاستشارات الهندسية"}</h3>
              <p className="text-sm text-gray-800 font-semibold leading-relaxed mb-6">
                {isEnglish ? "Ensure the quality of materials used in your projects and reduce costly Change Orders." : "اضمن جودة المواد المستخدمة في مشاريعك، وقلل أوامر التغيير المكلفة (Change Orders)."}
              </p>
              <ul className="text-sm text-gray-900 space-y-3 font-bold mt-auto">
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-gradient-to-b from-orange-400 to-[#EB682C] rounded-full shrink-0 shadow-[0_2px_4px_rgba(235,104,44,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"></span> {isEnglish ? "Price transparency" : "شفافية الأسعار"}
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-gradient-to-b from-orange-400 to-[#EB682C] rounded-full shrink-0 shadow-[0_2px_4px_rgba(235,104,44,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]"></span> {isEnglish ? "Specification compliance" : "مطابقة المواصفات"}
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
