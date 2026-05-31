"use client";

import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { Mail, User, EyeOff, Eye, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-[#EB682C] text-center mb-4">إنشاء حساب جديد</h1>
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          هلاً بك! أنشئ حسابك الآن لتبدأ رحلتك معنا، واستمتع بالفرص والخدمات
        </p>

        <form className="space-y-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                الاسم
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="الاسم"
                  className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              رقم الهاتف
            </label>
            <div className="flex relative border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#EB682C] focus-within:border-transparent bg-white overflow-hidden" dir="ltr">
              <div className="flex-1 w-full relative">
                <input
                  type="tel"
                  placeholder="05XXXXXXXX"
                  className="w-full px-4 py-3 focus:outline-none text-sm bg-transparent text-right"
                  dir="ltr"
                />
              </div>
              <div className="flex items-center bg-gray-50 border-l border-gray-200 px-3 cursor-pointer h-full" dir="ltr">
                <span className="text-sm text-gray-700 font-medium ml-1 mr-2">+966</span>
                <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-bold overflow-hidden relative">
                  <div className="absolute inset-0 bg-green-600 flex items-center justify-center">
                    <span className="text-[10px]">🇸🇦</span>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              كلمة المرور
            </label>
            <div className="relative">
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
              <input
                type={showPassword1 ? "text" : "password"}
                placeholder="*********"
                className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="*********"
                className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="pt-4">
            <Link href="/register/account-type" className="block">
              <button
                type="button"
                className="w-full bg-[#EB682C] text-white py-3 rounded-xl hover:bg-[#d65a22] transition-colors font-medium text-lg shadow-sm"
              >
                إنشاء الحساب
              </button>
            </Link>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          لديك حساب ؟{" "}
          <Link href="/" className="text-[#EB682C] font-medium hover:underline">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
