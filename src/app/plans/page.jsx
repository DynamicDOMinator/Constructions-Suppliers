import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/plans/PricingSection";

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] flex flex-col font-tajawal text-right">
      <Navbar />
      
      <div className="py-10">
        <PricingSection />
      </div>

      <Footer />
    </main>
  );
}
