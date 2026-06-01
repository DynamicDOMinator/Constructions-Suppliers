"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSections from "@/components/profile/ProfileSections";
import PricingRequestForm from "@/components/profile/PricingRequestForm";
import BoqRequestForm from "@/components/profile/BoqRequestForm";

export default function SupplierProfilePage() {
  const [activeView, setActiveView] = useState("profile");

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal">
      <Navbar />
      
      <ProfileHero />
      <ProfileHeader activeView={activeView} setActiveView={setActiveView} />
      
      {activeView === "profile" && <ProfileSections />}
      {activeView === "pricing" && <PricingRequestForm onBack={() => setActiveView("profile")} />}
      {activeView === "quotas" && <BoqRequestForm onBack={() => setActiveView("profile")} />}

      <Footer />
    </main>
  );
}
