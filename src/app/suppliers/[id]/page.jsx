import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSections from "@/components/profile/ProfileSections";

export default function SupplierProfilePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal">
      <Navbar />
      
      <ProfileHero />
      <ProfileHeader />
      <ProfileSections />

      <Footer />
    </main>
  );
}
