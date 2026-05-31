import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuotesGrid from "@/components/quotes/QuotesGrid";

export default function QuotesPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col font-tajawal text-right">
      <Navbar />
      
      <QuotesGrid />

      <Footer />
    </main>
  );
}
