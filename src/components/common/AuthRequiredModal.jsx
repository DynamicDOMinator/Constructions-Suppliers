"use client";
import Link from "next/link";
import { Lock, X, LogIn, UserPlus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AuthRequiredModal({ isOpen, onClose, messageAr, messageEn }) {
  const { isEnglish } = useLanguage();
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      dir={isEnglish ? "ltr" : "rtl"}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md p-6 md:p-8 relative transform transition-all animate-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-5 ${isEnglish ? 'right-5' : 'left-5'} w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer`}
          aria-label={isEnglish ? "Close" : "إغلاق"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 text-[#EB682C] flex items-center justify-center mx-auto mb-5 shadow-sm ring-8 ring-orange-50/60">
          <Lock className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Title & Subtitle based on selected language */}
        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-1 font-tajawal">
          {isEnglish ? "Authentication Required" : "تسجيل الدخول مطلوب"}
        </h3>
        <p className="text-xs md:text-sm font-semibold text-gray-400 mb-4">
          {isEnglish ? "Please sign in to continue" : "يرجى تسجيل الدخول للمتابعة"}
        </p>

        {/* Message Body in current language */}
        <div className={`bg-gray-50/90 border border-gray-100 rounded-2xl p-4 mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <p className="text-gray-700 text-sm md:text-base font-semibold leading-relaxed">
            {isEnglish 
              ? (messageEn || "Please sign in or create an account to submit pricing or BOQ requests and interact with suppliers.")
              : (messageAr || "يرجى تسجيل الدخول أو إنشاء حساب جديد لتتمكن من إرسال طلبات التسعير والمقايسة والتواصل مع الموردين.")
            }
          </p>
        </div>

        {/* Action Buttons in current language */}
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#EB682C] hover:bg-[#d65a22] text-white font-bold text-base transition-all shadow-md shadow-orange-500/20 active:scale-[0.98]"
          >
            <LogIn className={`w-5 h-5 ${isEnglish ? '' : 'rotate-180'}`} />
            <span>{isEnglish ? "Sign In" : "تسجيل الدخول"}</span>
          </Link>

          <Link
            href="/register"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl border-2 border-[#2A5CBA] text-[#2A5CBA] hover:bg-blue-50 font-bold text-base transition-all active:scale-[0.98]"
          >
            <UserPlus className="w-5 h-5" />
            <span>{isEnglish ? "Create Account" : "إنشاء حساب جديد"}</span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="mt-1 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors py-1 cursor-pointer"
          >
            {isEnglish ? "Cancel" : "إلغاء"}
          </button>
        </div>
      </div>
    </div>
  );
}