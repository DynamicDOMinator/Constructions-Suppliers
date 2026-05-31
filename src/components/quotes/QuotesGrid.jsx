import { ArrowRight } from "lucide-react";
import Link from "next/link";
import QuoteCard from "@/components/quotes/QuoteCard";

export default function QuotesGrid() {
  // Generate 6 placeholder cards to match the grid in the screenshot
  const quotes = Array(6).fill(null);

  return (
    <section className="py-12 px-6 md:px-12 bg-white font-tajawal w-full" dir="rtl" data-aos="fade-up">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header Row */}
        <div className="relative flex items-center justify-center mb-16">
          <h1 className="text-2xl md:text-3xl font-bold text-[#EB682C]">
            طلبات التسعير
          </h1>
          <Link href="/" className="absolute right-0 text-[#EB682C] hover:text-[#d65a22] transition-colors">
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Subtitle */}
        <div className="text-right mb-8">
          <h2 className="text-2xl font-bold text-gray-900">عروض الموردين</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((_, idx) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
              <QuoteCard />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
