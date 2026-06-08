"use client";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterStep1 from "@/components/auth/RegisterStep1";
import RegisterStep2 from "@/components/auth/RegisterStep2";
import SupplierRegistration from "@/components/auth/SupplierRegistration";
import EngineerRegistration from "@/components/auth/EngineerRegistration";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState("");

  const handleFinish = () => {
    setCurrentStep("success");
  };

  return (
    <AuthLayout>
      {currentStep === 1 && (
        <RegisterStep1 onNext={() => setCurrentStep(2)} />
      )}

      {currentStep === 2 && (
        <RegisterStep2 
          accountType={accountType} 
          setAccountType={setAccountType} 
          onNext={() => setCurrentStep(3)} 
        />
      )}

      {currentStep === 3 && (
        <>
          {accountType === "مهندس" ? (
            <EngineerRegistration onFinish={handleFinish} />
          ) : (
            <SupplierRegistration onFinish={handleFinish} />
          )}
        </>
      )}

      {currentStep === "success" && (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#EB682C] mb-3">بنجاح</h1>
          <p className="text-gray-500 text-sm mb-12">تم إنشاء حسابك وملفك التعريفي بنجاح. سيتم مراجعة بياناتك قريباً.</p>

          <Link href="/" className="w-full">
            <button className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors">
              العودة للرئيسية
            </button>
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
