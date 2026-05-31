import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-[#EB682C] text-center mb-4">نسيت كلمة المرور</h1>
        <p className="text-gray-600 text-center mb-10 leading-relaxed">
          أدخل بريدك الإلكتروني أو رقم الهاتف لإتمام عملية التحقق.
          <br />
          سنرسل رمزاً مكوناً من 4 أرقام إلى بريدك الإلكتروني.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
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

          <div className="pt-4">
            <Link href="/verify-otp" className="block">
              <button
                type="button"
                className="w-full bg-[#EB682C] text-white py-3 rounded-xl hover:bg-[#d65a22] transition-colors font-medium text-lg"
              >
                التالي
              </button>
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
