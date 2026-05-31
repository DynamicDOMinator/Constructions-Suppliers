"use client";

import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const accountTypes = [
  "شركات التصنيع",
  "شركات الموردين",
  "شركات المقاولات",
  "مكاتب الاستشارات الهندسية",
  "شركات خدمات وتأجير معدات",
  "مهندس",
  "مقاول من الباطن"
];

export default function AccountTypePage() {
  const [selectedType, setSelectedType] = useState("مقاول من الباطن");

  return (
    <AuthLayout>
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#EB682C] text-center mb-8">اختر نوع حسابك لتكملة بياناتك</h1>
        


        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {accountTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedType === type
                  ? "bg-[#3B5BDB] text-white border-transparent shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="w-full max-w-sm">
          <Link href="/register/profile" className="block">
            <button
              type="button"
              className="w-full bg-[#EB682C] text-white py-3 rounded-xl hover:bg-[#d65a22] transition-colors font-medium text-lg shadow-sm"
            >
              التالي
            </button>
          </Link>
        </div>

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
