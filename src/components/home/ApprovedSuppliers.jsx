"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import AuthRequiredModal from "@/components/common/AuthRequiredModal";

export default function ApprovedSuppliers() {
  const { isEnglish } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handlePricingRequest = (e) => {
    e.preventDefault();
    if (!user && !isAuthenticated) {
      setShowAuthModal(true);
    } else {
      router.push("/suppliers");
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-white" data-aos="fade-up" dir={isEnglish ? "ltr" : "rtl"}>
      {/* Top Header Section with Badges and CTA Button (Identical to Engineers Section) */}
      <div className="max-w-6xl mx-auto mb-14">
        {/* Top Row: Register Button (Left in RTL) and Opportunity Badge (Right in RTL) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Register Supplier CTA Button */}
          <Link
            href="/register?role=supplier"
            className="order-2 sm:order-1 inline-flex items-center gap-2.5 bg-gradient-to-r from-[#FF7A38] via-[#EB682C] to-[#d6551b] hover:from-[#EB682C] hover:to-[#c24b12] text-white px-6 py-2.5 rounded-xl font-black text-sm md:text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-orange-400/30"
          >
            <UserPlus className="w-4 h-4 shrink-0" />
            <span>{isEnglish ? "Register Supplier Account" : "قم بتسجيل حساب موردين"}</span>
          </Link>

          {/* Opportunity Badge */}
          <div className="order-1 sm:order-2 inline-flex items-center bg-[#0B1B3D] text-white px-5 py-2.5 rounded-xl font-extrabold text-xs md:text-sm shadow-md border border-blue-900/50">
            <span>{isEnglish ? "Your opportunity is here.. and the choice is yours!" : "فرصتك هنا.. واختيارك بإيدك!"}</span>
          </div>
        </div>

        {/* Center Main Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#EB682C] font-tajawal mb-4 tracking-tight">
            {isEnglish ? (
              <>Approved <span className="text-[#010101]">Suppliers</span></>
            ) : (
              <>الموردون <span className="text-[#010101]">المعتمدون</span></>
            )}
          </h2>

          {/* Center Marketplace Description Badge */}
          <div className="inline-block bg-[#0B1B3D] text-white px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-md border border-blue-900/50 max-w-2xl">
            {isEnglish 
              ? "A platform bringing together engineers, suppliers, manufacturers, and contractors in one marketplace."
              : "منصة تجمع المهندسين والموردين والمصنعين والمقاولين في سوق واحد."
            }
          </div>
        </div>
      </div>

      {/* Suppliers Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item, idx) => (
          <div
            key={item}
            data-aos="fade-up"
            data-aos-delay={idx * 150 + 100}
            className="bg-white rounded-3xl border border-gray-100 border-b-[6px] border-b-gray-200/90 shadow-[0_12px_28px_-6px_rgba(15,23,42,0.06),0_4px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_24px_48px_-10px_rgba(235,104,44,0.18)] hover:-translate-y-2 hover:border-b-[8px] hover:border-b-orange-300 transition-all duration-300 p-6 flex flex-col group"
          >
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center font-black text-[#EB682C] shadow-xs group-hover:scale-105 transition-transform">
                  Logo
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-[#EB682C] transition-colors">
                    {isEnglish ? "Al-Jubail Industrial Company" : "شركة الجبيل للصناعة"}
                  </h3>
                  <div>
                    <p className="text-xs font-bold text-[#EB682C]">
                      {isEnglish ? "Electrical parts manufacturing" : "تصنيع قطع غيار كهربائية"}
                    </p>
                  </div>
                </div>
              </div>
              <span className="bg-[#08A02A] text-white text-xs px-3 py-1 rounded-full font-bold shadow-xs">
                {isEnglish ? "Approved" : "معتمد"}
              </span>
            </div>
            
            <p className="text-sm text-gray-800 font-semibold mb-6 flex-grow leading-relaxed">
              {isEnglish 
                ? "A leading company in the manufacture and supply of building and construction materials, offering the best products with the highest international quality standards to ensure the sustainability of your projects." 
                : "شركة رائدة في مجال صناعة وتوريد مواد البناء والتشييد، نقدم أفضل المنتجات بأعلى معايير الجودة العالمية لضمان استدامة مشاريعكم."
              }
            </p>
            
            <div className="flex justify-between items-center text-xs mb-6 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 font-bold">{isEnglish ? "City - Region" : "المدينة - المنطقة"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-950 font-black">{isEnglish ? "Riyadh" : "الرياض"}</span>
              </div>
            </div>
            
            <button 
              type="button"
              onClick={handlePricingRequest}
              className="w-full bg-[#EB682C] hover:bg-[#d65a22] text-white py-3.5 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-orange-500/20 cursor-pointer"
            >
              {isEnglish ? "Request Pricing" : "طلب تسعير"}
            </button>
          </div>
        ))}
      </div>

      {/* View All Suppliers CTA (Matching Engineers Section) */}
      <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="200">
        <Link href="/suppliers">
          <button className="px-8 py-3 bg-white border-2 border-[#EB682C] text-[#EB682C] hover:bg-[#EB682C] hover:text-white rounded-2xl font-black text-sm md:text-base transition-all shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer">
            <span>{isEnglish ? "View All Suppliers" : "عرض كل الموردين"}</span>
            {isEnglish ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
        </Link>
      </div>

      {/* Authentication Required Modal Alert */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        messageAr="يرجى تسجيل الدخول أو إنشاء حساب جديد لتتمكن من إرسال طلبات التسعير والتواصل مع الموردين المعتمدين."
        messageEn="Please sign in or create an account to submit pricing requests and connect with approved suppliers."
      />
    </section>
  );
}
