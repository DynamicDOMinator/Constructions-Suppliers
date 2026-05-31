import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Pagination() {
  return (
    <div className="w-full flex items-center justify-between mt-12 pt-6 font-tajawal" dir="rtl">
      {/* Items count */}
      <div className="text-xs text-gray-500 font-bold">
        14-1 من أصل 100 منتج
      </div>

      {/* Pages */}
      <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
        <button className="text-[#EB682C] hover:opacity-70 transition-opacity">
          <ChevronRight className="w-4 h-4" />
        </button>
        
        <button className="text-[#EB682C] hover:opacity-70 transition-opacity">1</button>
        <button className="hover:text-[#EB682C] transition-colors">2</button>
        <button className="hover:text-[#EB682C] transition-colors">3</button>
        <button className="hover:text-[#EB682C] transition-colors">4</button>
        <button className="hover:text-[#EB682C] transition-colors">5</button>
        
        <button className="text-[#EB682C] hover:opacity-70 transition-opacity">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
