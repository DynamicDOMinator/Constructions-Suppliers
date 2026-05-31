import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { Check } from "lucide-react";

export default function SuccessPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-md">
          <Check className="text-white w-8 h-8" strokeWidth={3} />
        </div>
        
        <h1 className="text-3xl font-bold text-[#EB682C] text-center mb-3">بنجاح</h1>
        <p className="text-gray-600 text-center mb-12">
          تمت إعادة تعيين كلمة المرور بنجاح
        </p>

        <div className="w-full">
          <Link href="/" className="block">
            <button
              type="button"
              className="w-full bg-[#EB682C] text-white py-3 rounded-xl hover:bg-[#d65a22] transition-colors font-medium text-lg"
            >
              تابع تسجيل الدخول
            </button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
