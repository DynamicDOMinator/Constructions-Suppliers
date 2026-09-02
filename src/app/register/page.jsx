"use client";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterStep1 from "@/components/auth/RegisterStep1";
import RegisterStep2 from "@/components/auth/RegisterStep2";
import SupplierRegistration from "@/components/auth/SupplierRegistration";
import EngineerRegistration from "@/components/auth/EngineerRegistration";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { isEnglish } = useLanguage();

  const handleFinish = async (additionalData = {}) => {
    setLoading(true);
    setError("");

    const completeData = { ...formData, ...additionalData };

    // Construct FormData
    const data = new FormData();
    Object.keys(completeData).forEach(key => {
      if (Array.isArray(completeData[key])) {
        // Send array elements
        completeData[key].forEach((item, index) => {
          if (typeof item === 'object' && item !== null && !(item instanceof File)) {
            Object.keys(item).forEach(subKey => {
              const subItem = item[subKey];
              if (Array.isArray(subItem)) {
                // Handle nested arrays like 'files' in products
                subItem.forEach((nestedItem, nestedIndex) => {
                  if (nestedItem && nestedItem.file instanceof File) {
                    data.append(`${key}[${index}][${subKey}][${nestedIndex}]`, nestedItem.file);
                  } else {
                    data.append(`${key}[${index}][${subKey}][${nestedIndex}]`, nestedItem);
                  }
                });
              } else {
                data.append(`${key}[${index}][${subKey}]`, subItem);
              }
            });
          } else {
            data.append(`${key}[${index}]`, item);
          }
        });
      } else if (completeData[key] !== null && completeData[key] !== undefined) {
        data.append(key, completeData[key]);
      }
    });

    const res = await register(data);
    setLoading(false);

    if (res.success) {
      setCurrentStep("success");
    } else {
      setError(res.error);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <AuthLayout>
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-bold border border-red-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6 shadow-sm animate-in fade-in slide-in-from-top-2" dir={isEnglish ? "ltr" : "rtl"}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
            <span>{error}</span>
          </div>
          {(error.includes("البريد") || error.toLowerCase().includes("email") || error.includes("الهاتف") || error.toLowerCase().includes("phone")) && currentStep > 1 && (
            <button
              type="button"
              onClick={() => {
                setError("");
                setCurrentStep(1);
              }}
              className="bg-red-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shrink-0 shadow-sm"
            >
              {isEnglish ? "Change Email / Phone" : "العودة لتعديل البريد / الهاتف"}
            </button>
          )}
        </div>
      )}

      {currentStep === 1 && (
        <RegisterStep1 
          formData={formData} 
          setFormData={setFormData} 
          onNext={() => setCurrentStep(2)} 
        />
      )}

      {currentStep === 2 && (
        <RegisterStep2 
          formData={formData} 
          setFormData={setFormData} 
          onNext={() => setCurrentStep(3)} 
        />
      )}

      {currentStep === 3 && (
        <div className={loading ? "opacity-50 pointer-events-none" : ""}>
          {formData.type === "engineer" ? (
            <EngineerRegistration 
              formData={formData} 
              setFormData={setFormData} 
              onFinish={handleFinish} 
              registerError={error}
              isSubmitting={loading}
            />
          ) : (
            <SupplierRegistration 
              formData={formData} 
              setFormData={setFormData} 
              onFinish={handleFinish} 
              registerError={error}
              isSubmitting={loading}
            />
          )}
        </div>
      )}

      {currentStep === "success" && (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#EB682C] mb-3">{isEnglish ? 'Success!' : 'بنجاح'}</h1>
          <p className="text-gray-500 text-sm mb-12">{isEnglish ? 'Your account and profile have been created successfully. Your data will be reviewed shortly.' : 'تم إنشاء حسابك وملفك التعريفي بنجاح. سيتم مراجعة بياناتك قريباً.'}</p>

          <Link href="/" className="w-full">
            <button className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors">
              {isEnglish ? 'Back to Home' : 'العودة للرئيسية'}
            </button>
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
