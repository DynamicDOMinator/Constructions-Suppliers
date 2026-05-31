import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-[#EB682C] text-center mb-2">تسجيل الدخول</h1>
        <p className="text-gray-600 text-center mb-10">مرحباً بك! سجّل دخولك لتبدأ تجربة سلسة ومميزة</p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              البريد الإلكتروني أو رقم الهاتف
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="الاسم أو البريد الإلكتروني"
                className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              كلمة المرور
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="*********"
                className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="flex justify-start">
            <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              هل نسيت كلمة المرور؟
            </Link>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#EB682C] text-white py-3 rounded-xl hover:bg-[#d65a22] transition-colors font-medium text-lg"
            >
              تسجيل الدخول
            </button>
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
