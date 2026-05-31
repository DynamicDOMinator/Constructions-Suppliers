"use client";

import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import { Camera, UploadCloud, Check } from "lucide-react";

export default function ProfilePage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-[#EB682C] text-center mb-8">أنشئ ملفك التعريفي</h1>
        
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-10 px-4 relative">
          <div className="absolute top-4 left-10 right-10 h-0.5 bg-gray-200 -z-10"></div>
          <div className="absolute top-4 right-10 w-1/2 h-0.5 bg-[#3B5BDB] -z-10"></div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3B5BDB] flex items-center justify-center text-white">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs text-gray-500 font-medium">معلومات الحساب</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-[#3B5BDB] flex items-center justify-center text-[#3B5BDB] font-bold text-sm">
              2
            </div>
            <span className="text-xs text-[#3B5BDB] font-medium">تفاصيل الشركة</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 font-bold text-sm">
              3
            </div>
            <span className="text-xs text-gray-400 font-medium">التحقق</span>
          </div>
        </div>

        <form className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-2/3 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  اسم الشركة
                </label>
                <input
                  type="text"
                  placeholder="اسم الشركة"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  رقم السجل التجاري
                </label>
                <input
                  type="text"
                  placeholder="رقم السجل التجاري"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  الرقم الضريبي
                </label>
                <input
                  type="text"
                  placeholder="الرقم الضريبي"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C] focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div className="w-full md:w-1/3 flex justify-center pt-6">
              <div className="relative">
                <div 
                  className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center relative shadow-sm"
                >
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <button 
                  type="button"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-[#EB682C] rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-[#d65a22] transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-2">
            <div className="flex-1 border-2 border-dashed border-[#EB682C]/30 rounded-xl p-4 flex flex-col items-center justify-center bg-orange-50/50 cursor-pointer hover:bg-orange-50 transition-colors">
              <UploadCloud className="w-6 h-6 text-[#EB682C] mb-2" />
              <span className="text-sm font-medium text-[#EB682C] mb-1">إرفاق السجل التجاري</span>
              <span className="text-[10px] text-gray-400">الحد الأقصى 5 ميجابايت بصيغة PDF, JPG</span>
            </div>
            <div className="flex-1 border-2 border-dashed border-[#EB682C]/30 rounded-xl p-4 flex flex-col items-center justify-center bg-orange-50/50 cursor-pointer hover:bg-orange-50 transition-colors">
              <UploadCloud className="w-6 h-6 text-[#EB682C] mb-2" />
              <span className="text-sm font-medium text-[#EB682C] mb-1">إرفاق الشهادة الضريبية</span>
              <span className="text-[10px] text-gray-400">الحد الأقصى 5 ميجابايت بصيغة PDF, JPG</span>
            </div>
          </div>

          <div className="pt-6">
            <Link href="/verify-otp" className="block">
              <button
                type="button"
                className="w-full bg-[#EB682C] text-white py-3 rounded-xl hover:bg-[#d65a22] transition-colors font-medium text-lg shadow-sm"
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
