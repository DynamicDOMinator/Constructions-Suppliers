import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function ProductsHeader() {
  return (
    <div className="w-full bg-white pt-8 pb-12 px-6 md:px-12 relative overflow-hidden" data-aos="fade-up" dir="rtl">
      <div className="max-w-[1400px] mx-auto text-right">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="w-8"></div> {/* Spacer for center alignment */}
          <h1 className="text-2xl font-bold text-[#EB682C] font-tajawal">المنتجات</h1>
          <Link href="/" className="text-[#EB682C] hover:text-[#d65a22] transition-colors">
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Search Section */}
        <div className="mb-8 text-right">
          <h2 className="text-3xl font-bold text-gray-900 font-tajawal mb-6">ابحث عن المنتجات</h2>
          
          <div className="flex flex-col mb-8">
            <label className="text-sm font-bold text-gray-700 mb-2">المنتج</label>
            <div className="flex h-12">
              {/* Search Button (Left side visually, but order-last in RTL or flex) */}
              <button className="bg-[#EB682C] text-white px-10 h-full rounded-r-lg font-bold hover:bg-[#d65a22] transition-colors shrink-0 z-10">
                بحث
              </button>
              {/* Input Field */}
              <input 
                type="text" 
                placeholder="المنتج"
                className="flex-1 h-full border border-gray-200 rounded-l-lg px-4 text-sm focus:outline-none focus:border-[#EB682C] bg-white -mr-1"
              />
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 font-tajawal">جميع المنتجات</h3>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white">
              <ChevronDown className="w-4 h-4" />
              ترتيب
            </button>
            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white">
              <ChevronDown className="w-4 h-4" />
              السعر
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
