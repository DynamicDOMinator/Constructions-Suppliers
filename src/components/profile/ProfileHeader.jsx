"use client";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import AuthRequiredModal from "@/components/common/AuthRequiredModal";
import ShareMenu from "@/components/common/ShareMenu";

export default function ProfileHeader({ activeView, setActiveView, supplier }) {
  const { isEnglish } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const companyName = supplier?.company_profile?.company_name || supplier?.name || (isEnglish ? "Company name not available" : "اسم الشركة غير متوفر");
  const bio = supplier?.company_profile?.bio || (isEnglish ? "No bio available" : "لا توجد نبذة تعريفية");
  const taxNumber = supplier?.company_profile?.tax_number || "-";
  const status = supplier?.type === 'supplier' ? (isEnglish ? "Basic" : "اساسي") : (isEnglish ? "Premium" : "متميز");

  const handleActionClick = (view) => {
    if (!user && !isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setActiveView(view);
  };

  const handleSaveSupplier = () => {
    if (!user && !isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
  };

  return (
    <div className="w-full bg-white pt-20 pb-8 px-6 md:px-24" dir={isEnglish ? "ltr" : "rtl"}>
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Right Content: Titles */}
        <div className={`flex-1 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-tajawal">
              {companyName}
            </h1>
            <span className="bg-[#4176F9] text-white px-4 py-1 rounded-full text-xs font-bold">
              {status}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2 max-w-3xl">
            {bio}
          </p>
          <p className="text-gray-400 text-sm">
            {isEnglish ? "Tax Registration Number" : "رقم التسجيل الضريبي"} {taxNumber}
          </p>
        </div>

        {/* Left Content: Action Buttons */}
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} flex-wrap items-center gap-3 w-full md:w-auto mt-4 md:mt-0`}>
          <button 
            type="button"
            onClick={handleSaveSupplier}
            className="flex-1 md:flex-none border border-gray-300 text-[#4176F9] bg-white hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Bookmark className="w-4 h-4" />
            {isEnglish ? "Save Supplier" : "حفظ المورد"}
          </button>
          
          <button 
            type="button"
            onClick={() => handleActionClick("quotas")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeView === "quotas" 
                ? "bg-[#1e40af] text-white" 
                : "bg-[#2A5CBA] text-white hover:bg-blue-700"
            }`}
          >
            {isEnglish ? "Send BOQ Request" : "ارسال طلب مقايسة"}
          </button>
          
          <button 
            type="button"
            onClick={() => handleActionClick("pricing")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeView === "pricing" 
                ? "bg-[#c2410c] text-white" 
                : "bg-[#EB682C] text-white hover:bg-[#d65a22]"
            }`}
          >
            {isEnglish ? "Send Pricing Request" : "ارسال طلب تسعير"}
          </button>

          <ShareMenu
            title={companyName}
            description={bio}
            direction="down"
            align="end"
          />
        </div>

      </div>

      {/* Authentication Required Modal Alert */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        messageAr="يرجى تسجيل الدخول أو إنشاء حساب جديد لتتمكن من إرسال طلب المقايسة أو التسعير والتواصل مع الموردين."
        messageEn="Please sign in or create an account to submit pricing or BOQ requests and interact with suppliers."
      />
    </div>
  );
}
