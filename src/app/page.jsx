import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import PartnersLogos from "@/components/home/PartnersLogos";
import HowItWorks from "@/components/home/HowItWorks";
import CategoriesSection from "@/components/home/CategoriesSection";
import DirectPricingFeatures from "@/components/home/DirectPricingFeatures";
import ConsultantBanner from "@/components/home/ConsultantBanner";
import ApprovedSuppliers from "@/components/home/ApprovedSuppliers";
import SpecializedEngineers from "@/components/home/SpecializedEngineers";
import OurMedia from "@/components/home/OurMedia";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pb-20">
        <HeroSection />
        <PartnersLogos />
        <HowItWorks />
        <CategoriesSection />
        <DirectPricingFeatures />
        <ConsultantBanner />
        <ApprovedSuppliers />
        <SpecializedEngineers />
        <OurMedia />
      </main>

      <Footer />
    </div>
  );
}
