"use client";
import Link from "next/link";

export default function ProductCard({ title, model, description, discount, unit }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col font-tajawal cursor-pointer group h-full" dir="rtl" data-aos="fade-up">
      
      {/* Top Section: Text (Right) and Image (Left) */}
      <div className="flex flex-row-reverse gap-4 items-start mb-4">
        {/* Details (Right side in RTL) */}
        <div className="flex-1 text-right">
          <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{title}</h3>
          <p className="text-gray-500 text-[10px] mb-2">-موديل {model}</p>
          <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
        
        {/* Image (Left side in RTL) */}
        <div className="w-24 h-24   ">
           <img 
             src="/service.png" 
           
             alt="Product" 
             className="w-full h-full object-contain mix-blend-multiply p-2 transition-transform group-hover:scale-105" 
           />
        </div>
      </div>

      {/* Bottom Section: Button (Right) and Price (Left) */}
      <div className="flex flex-row-reverse items-center justify-between mt-auto pt-2">
        <button className="bg-[#EB682C] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#d65a22] transition-colors shrink-0">
          عرض التفاصيل
        </button>
        
        <div className="flex items-center gap-1 text-[10px] text-right " dir="ltr">
          <span className="text-gray-400">{unit} / </span>
          <span className="font-bold text-gray-900" dir="rtl">خصم {discount} ريال</span>
        </div>
      </div>

    </div>
  );
}
