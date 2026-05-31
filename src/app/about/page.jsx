import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutValues from "@/components/about/AboutValues";
import AboutVisionMission from "@/components/about/AboutVisionMission";
import AboutStory from "@/components/about/AboutStory";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-tajawal text-right" dir="rtl">
      {/* Shared Navbar */}
      <Navbar />

      {/* About Page Sections */}
      <AboutHero />
      <div className="flex flex-col gap-8 md:gap-16 py-12 bg-white">
        <AboutIntro />
        <AboutValues />
        <AboutVisionMission />
      </div>
      <AboutStory />

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
