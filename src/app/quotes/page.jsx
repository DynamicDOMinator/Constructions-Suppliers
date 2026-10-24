import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuotesGrid from "@/components/quotes/QuotesGrid";

export default function QuotesPage() {
  return (
    <main className="min-h-screen bg-[#EEF2F6] flex flex-col font-tajawal">
      <Navbar />
      
      <QuotesGrid />

      <Footer />
    </main>
  );
}
