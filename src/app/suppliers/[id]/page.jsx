"use client";
import { useState, useEffect, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSections from "@/components/profile/ProfileSections";
import PricingRequestForm from "@/components/profile/PricingRequestForm";
import BoqRequestForm from "@/components/profile/BoqRequestForm";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";

export default function SupplierProfilePage({ params }) {
  const { isEnglish } = useLanguage();
  const unwrappedParams = use(params);
  const id = unwrappedParams?.id;
  const [activeView, setActiveView] = useState("profile");
  const [supplier, setSupplier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/auth/companies/${id}`);
        setSupplier(response.data);
      } catch (error) {
        console.error("Failed to fetch supplier profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSupplier();
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB682C]"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!supplier) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 font-bold text-xl">{isEnglish ? "Supplier not found" : "لم يتم العثور على المورد"}</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal">
      <Navbar />
      
      <ProfileHero supplier={supplier} />
      <ProfileHeader activeView={activeView} setActiveView={setActiveView} supplier={supplier} />
      
      {activeView === "profile" && <ProfileSections supplier={supplier} />}
      {activeView === "pricing" && <PricingRequestForm onBack={() => setActiveView("profile")} supplier={supplier} />}
      {activeView === "quotas" && <BoqRequestForm onBack={() => setActiveView("profile")} supplier={supplier} />}

      <Footer />
    </main>
  );
}
