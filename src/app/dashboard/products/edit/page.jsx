"use client";
import Link from "next/link";
import { UploadCloud } from "lucide-react";

export default function EditProductPage() {
  return (
    <div className="font-tajawal max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-900">تعديل المنتج</h1>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
        
        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">اسم المنتج</label>
          <input type="text" placeholder="الاسم" defaultValue="مضخة مياة" className="w-full h-14 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
        </div>

        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">السعر</label>
          <input type="text" placeholder="120 ريال" defaultValue="150 ريال" className="w-full h-14 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
        </div>

        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">وصف المنتج</label>
          <textarea placeholder="وصف المنتج ......." defaultValue="مضخة مياة عالية الجودة مصنوعة من الفولاذ المقاوم للصدأ." className="w-full p-4 border border-gray-200 rounded-xl text-sm min-h-[150px] resize-none focus:outline-none focus:border-[#EB682C] text-right"></textarea>
        </div>

        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">صورة المنتج</label>
          <div className="border-2 border-dashed border-[#EB682C]/30 bg-[#EB682C]/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-[#EB682C]/10 cursor-pointer transition-colors">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-6 h-6 text-[#EB682C]" />
            </div>
            <p className="text-sm font-bold text-gray-700 mb-1">
              اسحب ملفاتك هنا او <span className="text-[#EB682C]">اضغط لرفع الملفات</span>
            </p>
            <p className="text-xs text-gray-400">SPNG, JPG or PDF (max. 800x400px)</p>
          </div>
        </div>

        <div className="flex gap-4 mt-4" dir="ltr">
          <Link href="/dashboard/products" className="flex-1">
            <button className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              إلغاء
            </button>
          </Link>
          <Link href="/dashboard/products" className="flex-1">
            <button className="w-full bg-[#EB682C] text-white py-4 rounded-xl font-bold hover:bg-[#d65a22] transition-colors">
              حفظ
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
