"use client";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">تسجيل الدخول</h1>
        <p className="text-gray-500 text-sm">مرحباً بك مجدداً! أدخل بياناتك للوصول لحسابك</p>
      </div>

      <form className="flex flex-col gap-5">
        
        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">البريد الإلكتروني</label>
          <input 
            type="email" 
            placeholder="example@gmail.com" 
            className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left"
            dir="ltr"
          />
        </div>

        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
          <input 
            type="password" 
            placeholder="********" 
            className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left"
            dir="ltr"
          />
        </div>

        <div className="flex justify-start mt-[-10px]">
          <Link href="/forgot-password" className="text-xs font-bold text-[#2A5CBA] hover:underline">
            هل نسيت كلمة المرور؟
          </Link>
        </div>

        <button 
          type="button" 
          className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors mt-2"
        >
          تسجيل الدخول
        </button>

      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">ليس لديك حساب؟ </span>
        <Link href="/register" className="font-bold text-[#EB682C] hover:underline">
          إنشاء حساب جديد
        </Link>
      </div>
    </AuthLayout>
  );
}
