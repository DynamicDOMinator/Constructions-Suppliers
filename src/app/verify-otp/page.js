"use client";

import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    return `00:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#EB682C] text-center mb-4">التحقق</h1>
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          أدخل الرمز المكون من 4 أرقام الذي وصل إلى بريدك الإلكتروني.
        </p>



        <form className="w-full space-y-8">
          <div className="flex justify-center gap-3 md:gap-4" dir="ltr">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 md:w-16 md:h-16 border border-blue-200 rounded-xl text-center text-2xl font-bold text-[#004b87] focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent shadow-sm bg-white"
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-[#004b87] font-medium text-sm mb-1">{formatTime(timer)}</p>
            <p className="text-gray-500 text-sm">
              إذا لم يصلك الرمز؟{" "}
              <button 
                type="button" 
                className={`font-medium hover:underline focus:outline-none transition-colors ${timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#EB682C]'}`}
                disabled={timer > 0}
                onClick={() => setTimer(30)}
              >
                إعادة الإرسال
              </button>
            </p>
          </div>

          <div className="pt-2">
            <Link href="/reset-password" className="block">
              <button
                type="button"
                className="w-full bg-[#EB682C] text-white py-3 rounded-xl hover:bg-[#d65a22] transition-colors font-medium text-lg"
              >
                التالي
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
