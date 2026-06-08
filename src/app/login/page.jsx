"use client";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { Mail, EyeOff } from 'lucide-react';

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">تسجيل الدخول</h1>
        <p className="text-gray-500 text-sm">
          مرحباً بك! سجّل دخولك لتبدأ تجربة سلسة ومميزة
        </p>
      </div>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">
            البريد الالكتروني
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="البريد الالكتروني"
              className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
          <div className="relative">
            <EyeOff className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-left tracking-widest"
              dir="ltr"
            />
          </div>
        </div>

        <div className="flex  justify-end mt-[-10px]">
          <Link
            href="/forgot-password"
            className="text-xs font-bold text-[#2A5CBA] hover:underline"
          >
            هل نسيت كلمة المرور؟
          </Link>
        </div>

        <button
          type="button"
          className="w-full bg-[#de6d3a] text-white py-4 rounded-2xl font-bold hover:bg-[#d65a22] transition-colors mt-6 text-lg"
        >
          تسجيل الدخول
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">ليس لديك حساب؟ </span>
        <Link
          href="/register"
          className="font-bold text-[#EB682C] hover:underline"
        >
          إنشاء حساب جديد
        </Link>
      </div>
    </AuthLayout>
  );
}
