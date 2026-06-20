"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const { isEnglish } = useLanguage();

  // Step 1: Enter Phone Number
  if (step === 1) {
    return (
      <AuthLayout>
        <div className="text-center mb-10" dir={isEnglish ? 'ltr' : 'rtl'}>
          <h1 className="text-3xl font-bold text-[#EB682C] mb-3">{isEnglish ? 'Confirm Password' : 'تأكيد كلمة المرور'}</h1>
          <p className="text-gray-500 text-sm">{isEnglish ? 'A verification code will be sent to your registered phone number to confirm your identity and change the password' : 'سيتم إرسال رمز تحقق إلى رقم هاتفك المسجل لتأكيد هويتك وتغيير كلمة المرور'}</p>
        </div>

        <div className="flex flex-col gap-5" dir={isEnglish ? 'ltr' : 'rtl'}>
          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Phone Number' : 'رقم الهاتف'}</label>
            <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} h-12 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#EB682C]`}>
              <input 
                type="tel" 
                className={`flex-1 h-full px-4 text-sm focus:outline-none ${isEnglish ? 'text-left' : 'text-left'}`}
                dir="ltr"
              />
              <div className={`h-full px-4 bg-gray-50 border-${isEnglish ? 'r' : 'l'} border-gray-200 flex items-center justify-center gap-2 shrink-0`}>
                <span className="text-sm font-bold text-gray-600" dir="ltr">+966</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors mt-4"
          >
            {isEnglish ? 'Next' : 'التالي'}
          </button>
        </div>

        <div className="mt-8 text-center text-sm" dir={isEnglish ? 'ltr' : 'rtl'}>
          <Link href="/login" className="font-bold text-[#EB682C] hover:underline">
            {isEnglish ? 'Back to Login' : 'رجوع لتسجيل الدخول'}
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // Step 2: OTP Verification
  if (step === 2) {
    return (
      <AuthLayout>
        <div className="text-center mb-10" dir={isEnglish ? 'ltr' : 'rtl'}>
          <h1 className="text-3xl font-bold text-[#EB682C] mb-3">{isEnglish ? 'Verify' : 'تحقق'}</h1>
          <p className="text-gray-500 text-sm">{isEnglish ? 'Verify the 4 digits sent to your registered number' : 'تحقق من 4 أرقام التي أرسلت إلى رقمك المسجل'}</p>
        </div>

        <div className="flex justify-center gap-4 mb-8" dir="ltr">
          {[1, 2, 3, 4].map((i) => (
            <input 
              key={i}
              type="text" 
              maxLength="1"
              className="w-14 h-14 border border-gray-200 rounded-xl text-center text-xl font-bold text-[#2A5CBA] focus:outline-none focus:border-[#EB682C]"
            />
          ))}
        </div>

        <div className="text-center mb-8" dir={isEnglish ? 'ltr' : 'rtl'}>
          <button className="text-sm font-bold text-[#2A5CBA] hover:underline">{isEnglish ? 'Resend' : 'إعادة الإرسال'}</button>
        </div>

        <button 
          onClick={() => setStep(3)}
          className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors"
        >
          {isEnglish ? 'Next' : 'التالي'}
        </button>
      </AuthLayout>
    );
  }

  // Step 3: New Password
  if (step === 3) {
    return (
      <AuthLayout>
        <div className="text-center mb-10" dir={isEnglish ? 'ltr' : 'rtl'}>
          <h1 className="text-3xl font-bold text-[#EB682C] mb-3">{isEnglish ? 'Set New Password' : 'تعيين كلمة مرور جديدة'}</h1>
          <p className="text-gray-500 text-sm">{isEnglish ? 'Set a new password for your account to securely access all services' : 'قم بتعيين كلمة مرور جديدة لحسابك لتحتفظ بها بأمان للدخول إلى جميع الخدمات'}</p>
        </div>

        <div className="flex flex-col gap-5" dir={isEnglish ? 'ltr' : 'rtl'}>
          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? 'New Password' : 'كلمة المرور الجديدة'}</label>
            <input 
              type="password" 
              className={`w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-left'}`}
              dir="ltr"
            />
          </div>

          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Confirm Password' : 'تأكيد كلمة المرور'}</label>
            <input 
              type="password" 
              className={`w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-left'}`}
              dir="ltr"
            />
          </div>

          <button 
            onClick={() => setStep(4)}
            className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors mt-4"
          >
            {isEnglish ? 'Set Password' : 'تعيين كلمة المرور'}
          </button>
        </div>
      </AuthLayout>
    );
  }

  // Step 4: Success
  if (step === 4) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center text-center py-10" dir={isEnglish ? 'ltr' : 'rtl'}>
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#EB682C] mb-3">{isEnglish ? 'Successfully' : 'بنجاح'}</h1>
          <p className="text-gray-500 text-sm mb-12">{isEnglish ? 'You have successfully changed your password' : 'لقد قمت بتغيير كلمة المرور بنجاح'}</p>

          <Link href="/login" className="w-full">
            <button className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors">
              {isEnglish ? 'Return to Login' : 'العودة لتسجيل الدخول'}
            </button>
          </Link>
        </div>
      </AuthLayout>
    );
  }
}
