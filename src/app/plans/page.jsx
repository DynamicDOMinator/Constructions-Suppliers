"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/plans/PricingSection";
import { useLanguage } from "@/context/LanguageContext";

export default function PlansPage() {
  const { isEnglish } = useLanguage();

  return (
    <main className={`min-h-screen bg-[#FAFBFC] flex flex-col font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar />
      
      <div className="py-10">
        <PricingSection />
      </div>

      <Footer />
    </main>
  );
}
