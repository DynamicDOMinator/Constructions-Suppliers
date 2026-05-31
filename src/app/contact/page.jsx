import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col font-tajawal text-right">
      <Navbar />
      
      {/* Top Banner */}
      <ContactHero />

      {/* Main Forms and Info */}
      <ContactSection />

      <Footer />
    </main>
  );
}
