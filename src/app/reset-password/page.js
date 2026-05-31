"use client";

import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-[#EB682C] text-center mb-4">تعيين كلمة مرور جديدة</h1>
        <p className="text-gray-600 text-center mb-10 leading-relaxed">
          قم بتعيين كلمة مرور جديدة لحسابك لتتمكن من تسجيل الدخول والوصول إلى جميع الميزات
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              كلمة مرور جديدة
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
            <Link href="/success" className="block">
              <button
                type="button"
                className="w-full bg-[#EB682C] text-white py-3 rounded-xl hover:bg-[#d65a22] transition-colors font-medium text-lg"
              >
                تحديث كلمة المرور
              </button>
            </Link>
          </div>
        </form>

        <div className="mt-12 text-center text-sm text-gray-600">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="text-[#EB682C] font-medium hover:underline">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
